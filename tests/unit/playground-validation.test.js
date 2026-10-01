import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import ts from 'typescript';

const root = process.cwd();
const sourcePath = path.join(root, 'src/lib/features/playground/validation.ts');
let source = fs.readFileSync(sourcePath, 'utf8');

source = source.replace(/^import[\s\S]*?;\n(?=import|export)/m, '');
source = source.replace(/^import[\s\S]*?;\n/gm, '');
source = source.replace(/export type Diagnostic = \{[\s\S]*?\};\n\n/, '');
source = source.replace(/export const /g, 'const ');
source = source.replace(/new SvelteSet/g, 'new Set');
source = source.replace(
	"if (mode === 'SQL') return runSqlQuery(source).error === '';",
	"if (mode === 'SQL') return true;"
);
source =
	"const ts = require('typescript');\n" +
	"const runSqlQuery = () => ({ error: '' });\n" +
	source +
	'\nmodule.exports = { modeForLesson, hasPlayground, scanBalancedSyntax, validateHtml, validateCss, formatTypeScriptDiagnostics };\n';

const compiled = ts.transpileModule(source, {
	compilerOptions: {
		target: ts.ScriptTarget.ES2022,
		module: ts.ModuleKind.CommonJS,
		esModuleInterop: true
	}
}).outputText;

const module = { exports: {} };
const context = vm.createContext({
	require,
	module,
	exports: module.exports,
	console
});
new vm.Script(compiled, { filename: sourcePath }).runInContext(context);
const validation = module.exports;

describe('playground validation logic', () => {
	test('accepts balanced JavaScript syntax', () => {
		assert.equal(validation.scanBalancedSyntax('const value = { ok: true };', '{', '}').length, 0);
	});

	test('rejects an unexpected closing delimiter', () => {
		const result = validation.scanBalancedSyntax('const value = };', '{', '}');
		assert.equal(result[0].severity, 'error');
	});

	test('ignores braces inside quoted strings', () => {
		assert.equal(validation.scanBalancedSyntax('const value = "}";', '{', '}').length, 0);
	});

	test('accepts valid HTML', () => {
		assert.equal(validation.validateHtml('<section><p>Hello</p></section>').length, 0);
	});

	test('rejects mismatched HTML tags', () => {
		const result = validation.validateHtml('<section><p>Hello</section>');
		assert.ok(result.some((item) => item.severity === 'error'));
	});

	test('accepts balanced CSS', () => {
		assert.equal(validation.validateCss('.card { display: grid; }').length, 0);
	});

	test('rejects unbalanced CSS', () => {
		const result = validation.validateCss('.card { display: grid;');
		assert.ok(result.some((item) => item.severity === 'error'));
	});

	test('recognizes runnable JSON lessons', () => {
		assert.equal(
			validation.hasPlayground({
				runnable: true,
				playgroundMode: 'JSON',
				example: '{"ok":true}'
			}),
			true
		);
	});

	test('rejects invalid JSON lessons', () => {
		assert.equal(
			validation.hasPlayground({
				runnable: true,
				playgroundMode: 'JSON',
				example: '{"ok":}'
			}),
			false
		);
	});

	test('rejects browser-dependent JavaScript lessons', () => {
		assert.equal(
			validation.hasPlayground({
				runnable: true,
				playgroundMode: 'JavaScript',
				example: 'document.querySelector("body")'
			}),
			false
		);
	});

	test('defaults a missing lesson mode to JavaScript', () => {
		assert.equal(validation.modeForLesson({}), 'JavaScript');
	});
});
