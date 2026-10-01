import { SvelteSet } from 'svelte/reactivity';
import ts from 'typescript';
import type { Lesson } from '$lib/data/lessons';
import type { PlaygroundMode } from './content';
import { runSqlQuery } from './sql';

export type Diagnostic = {
	line?: number;
	column?: number;
	message: string;
	severity: 'error' | 'warning' | 'info';
};

export const modeForLesson = (lesson: Lesson): PlaygroundMode =>
	lesson.playgroundMode ?? 'JavaScript';

export const hasPlayground = (lesson: Lesson): boolean => {
	if (!lesson.runnable || !lesson.playgroundMode) return false;

	const mode = lesson.playgroundMode;
	const source = lesson.example.trim();

	if (!source) return false;

	if (mode === 'JavaScript' || mode === 'TypeScript') {
		if (/^\s*(import|export)\b/m.test(source)) return false;
		if (/\b(?:document|window|localStorage|sessionStorage)\s*[.[]/.test(source)) return false;
	}

	if (mode === 'TypeScript') {
		const result = ts.transpileModule(source, {
			reportDiagnostics: true,
			fileName: 'lesson.ts',
			compilerOptions: {
				target: ts.ScriptTarget.ES2020,
				module: ts.ModuleKind.ES2020,
				strict: true,
				isolatedModules: true
			}
		});
		if (result.diagnostics?.length) return false;
		if (/^\s*(import|export)\b/m.test(result.outputText)) return false;
	}

	if (mode === 'HTML')
		return validateHtml(source).every((diagnostic) => diagnostic.severity !== 'error');
	if (mode === 'CSS')
		return validateCss(source).every((diagnostic) => diagnostic.severity !== 'error');

	if (mode === 'JSON') {
		try {
			JSON.parse(source);
			return true;
		} catch {
			return false;
		}
	}

	if (mode === 'SQL') return runSqlQuery(source).error === '';

	return false;
};

export const formatTypeScriptDiagnostics = (diagnostics: readonly ts.Diagnostic[]) =>
	ts.formatDiagnosticsWithColorAndContext(diagnostics, {
		getCurrentDirectory: () => '',
		getCanonicalFileName: (fileName) => fileName,
		getNewLine: () => '\n'
	});

export const scanBalancedSyntax = (source: string, open: string, close: string): Diagnostic[] => {
	const diagnostics: Diagnostic[] = [];
	let depth = 0;
	let line = 1;
	let column = 0;
	let quote = '';
	let escaped = false;
	let inLineComment = false;
	let inBlockComment = false;

	for (let index = 0; index < source.length; index += 1) {
		const char = source[index];
		const next = source[index + 1] ?? '';
		column += 1;
		if (char === '\n') {
			line += 1;
			column = 0;
			inLineComment = false;
			continue;
		}
		if (inLineComment) continue;
		if (inBlockComment) {
			if (char === '*' && next === '/') {
				inBlockComment = false;
				index += 1;
				column += 1;
			}
			continue;
		}
		if (!quote && char === '/' && next === '/') {
			inLineComment = true;
			index += 1;
			column += 1;
			continue;
		}
		if (!quote && char === '/' && next === '*') {
			inBlockComment = true;
			index += 1;
			column += 1;
			continue;
		}
		if (quote) {
			if (escaped) escaped = false;
			else if (char === '\\') escaped = true;
			else if (char === quote) quote = '';
			continue;
		}
		if (char === '"' || char === "'" || char === '`') {
			quote = char;
			continue;
		}
		if (char === open) depth += 1;
		if (char === close) {
			depth -= 1;
			if (depth < 0) {
				diagnostics.push({
					line,
					column,
					message: `Unexpected closing ${close}.`,
					severity: 'error'
				});
				depth = 0;
			}
		}
	}
	if (quote) diagnostics.push({ message: `Unterminated ${quote} string.`, severity: 'error' });
	if (inBlockComment)
		diagnostics.push({ message: 'Unterminated block comment.', severity: 'error' });
	if (depth > 0) diagnostics.push({ message: `Missing ${close} for ${open}.`, severity: 'error' });
	return diagnostics;
};

export const validateHtml = (source: string): Diagnostic[] => {
	const value = source.trim();
	if (!value) return [{ message: 'HTML is empty.', severity: 'error' }];
	const diagnostics: Diagnostic[] = [];
	const stack: string[] = [];
	const voidTags = new SvelteSet([
		'area',
		'base',
		'br',
		'col',
		'embed',
		'hr',
		'img',
		'input',
		'link',
		'meta',
		'param',
		'source',
		'track',
		'wbr'
	]);
	const tokenPattern = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w:-]*)(?:\s[^<>]*?)?>/g;
	let match: RegExpExecArray | null;
	while ((match = tokenPattern.exec(value))) {
		const token = match[0];
		const tag = match[1]?.toLowerCase();
		if (!tag || token.startsWith('<!--') || voidTags.has(tag)) continue;
		if (token.startsWith('</')) {
			const expected = stack.pop();
			if (expected !== tag) {
				diagnostics.push({ message: `Unexpected closing tag </${tag}>.`, severity: 'error' });
				if (expected) stack.push(expected);
			}
		} else if (!token.endsWith('/>')) {
			stack.push(tag);
		}
	}
	for (let index = stack.length - 1; index >= 0; index -= 1) {
		diagnostics.push({ message: `Missing closing tag </${stack[index]}>.`, severity: 'error' });
	}
	const commentStart = value.indexOf('<!--');
	const commentEnd = value.indexOf('-->');
	if (commentStart >= 0 && commentEnd < commentStart)
		diagnostics.push({ message: 'Unterminated HTML comment.', severity: 'error' });
	return diagnostics;
};

export const validateCss = (source: string): Diagnostic[] => {
	const diagnostics = scanBalancedSyntax(source, '{', '}');
	if (!source.trim()) diagnostics.push({ message: 'CSS is empty.', severity: 'error' });
	return diagnostics;
};
