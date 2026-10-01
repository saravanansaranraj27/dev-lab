import { SvelteURL } from 'svelte/reactivity';
import ts from 'typescript';
import { onMount } from 'svelte';
import { lessons } from '$lib/data/lessons';
import {
	playgroundModes,
	starterJavaScript,
	starterTypeScript,
	starterHtml,
	starterCss,
	starterSql,
	starterJson,
	type PlaygroundMode
} from './content';
import { workerSource } from './worker';
import {
	formatTypeScriptDiagnostics,
	modeForLesson,
	hasPlayground,
	validateCss,
	validateHtml,
	type Diagnostic
} from './validation';
import { runSqlQuery } from './sql';

export type { PlaygroundMode } from './content';

export class PlaygroundPageState {
	mode = $state<PlaygroundMode>('JavaScript');
	code = $state(starterJavaScript);
	html = $state(starterHtml);
	css = $state(starterCss);
	output = $state('Click Run to execute your code.');
	error = $state('');
	running = $state(false);
	status = $state('Ready');
	duration = $state<number | null>(null);
	lessonTitle = $state('JavaScript playground');
	previewKey = $state(0);
	formattedJson = $state('');
	minifiedJson = $state('');
	diagnostics = $state<Diagnostic[]>([]);
	lastCompiledCode = $state('');

	private worker: Worker | undefined;
	private workerUrl: string | undefined;
	private timeoutId: number | undefined;
	private runToken = 0;

	constructor() {
		onMount(() => {
			this.loadLessonFromUrl();

			return () => {
				this.disposeWorker();
			};
		});
	}

	get isWebPreview() {
		return this.mode === 'HTML' || this.mode === 'CSS';
	}

	get fileName() {
		return {
			JavaScript: 'main.js',
			TypeScript: 'main.ts',
			HTML: 'index.html',
			CSS: 'styles.css',
			JSON: 'data.json',
			SQL: 'query.sql'
		}[this.mode];
	}

	get modeDescription() {
		return {
			JavaScript: 'Run modern JavaScript in an isolated browser worker.',
			TypeScript: 'Compile TypeScript in the browser, then run the emitted JavaScript.',
			HTML: 'Edit HTML and render it immediately in an isolated preview.',
			CSS: 'Edit HTML and CSS together and render the result in an isolated preview.',
			JSON: 'Validate, format, and minify JSON with clear syntax errors.',
			SQL: 'Run SQL against a local in-browser practice database with schema and result feedback.'
		}[this.mode];
	}

	loadLessonFromUrl() {
		const url = new SvelteURL(window.location.href);

		const lessonId = url.searchParams.get('lesson');

		if (!lessonId) {
			return;
		}

		const lesson = lessons.find((item) => item.id === lessonId);

		if (!lesson) {
			return;
		}

		if (!hasPlayground(lesson)) {
			window.location.replace('/learn');
			return;
		}

		this.mode = modeForLesson(lesson);
		this.lessonTitle = lesson.title;
		this.error = '';
		this.status = 'Ready';
		this.diagnostics = [];
		this.formattedJson = '';
		this.minifiedJson = '';

		if (this.mode === 'CSS') {
			this.html = starterHtml;
			this.css = lesson.example;
		} else {
			this.code = lesson.example;
		}

		if (this.mode === 'HTML' || this.mode === 'CSS') this.previewKey += 1;
		this.runCode();
	}

	setMode(value: string) {
		if (!playgroundModes.includes(value as PlaygroundMode)) {
			return;
		}

		const next = value as PlaygroundMode;

		if (next === this.mode) {
			return;
		}

		this.disposeWorker();
		this.mode = next;
		this.error = '';
		this.status = 'Ready';
		this.duration = null;
		this.diagnostics = [];
		this.formattedJson = '';
		this.minifiedJson = '';

		if (next === 'JavaScript') {
			this.code = starterJavaScript;
			this.lessonTitle = 'JavaScript playground';
			this.output = 'Click Run to execute your code.';
		}

		if (next === 'TypeScript') {
			this.code = starterTypeScript;
			this.lessonTitle = 'TypeScript playground';
			this.output = 'Click Run to compile and execute your TypeScript.';
		}

		if (next === 'HTML') {
			this.code = starterHtml;
			this.lessonTitle = 'HTML playground';
			this.output = 'Preview updates as you edit.';
		}

		if (next === 'CSS') {
			this.html = starterHtml;
			this.code = starterCss;
			this.lessonTitle = 'CSS playground';
			this.output = 'Preview updates as you edit.';
		}

		if (next === 'JSON') {
			this.code = starterJson;
			this.lessonTitle = 'JSON playground';
			this.output = 'Click Validate to inspect your JSON.';
		}

		if (next === 'SQL') {
			this.code = starterSql;
			this.lessonTitle = 'SQL playground';
			this.output = 'Click Run to execute the query against the local practice database.';
		}

		if (next === 'HTML' || next === 'CSS') {
			this.previewKey += 1;
		}
	}

	get previewDocument() {
		const source = this.mode === 'HTML' ? this.code : this.html;

		const style = this.mode === 'CSS' ? `<style>${this.css}</style>` : '';

		const guard = `<script>(function(){document.addEventListener('click',function(event){const target=event.target instanceof Element?event.target.closest('a'):null;if(target){event.preventDefault();event.stopPropagation();}},true);document.addEventListener('submit',function(event){event.preventDefault();event.stopPropagation();},true);document.addEventListener('click',function(event){const target=event.target instanceof HTMLButtonElement?event.target:null;if(target&&target.type!=='button'){event.preventDefault();event.stopPropagation();}},true);})();</script>`;

		return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${style}</head><body>${source}${guard}</body></html>`;
	}

	runCode() {
		this.diagnostics = [];

		if (this.mode === 'HTML') {
			this.validateHtml();

			if (!this.hasErrors()) {
				this.previewKey += 1;
				this.status = 'Live preview';
			}

			return;
		}

		if (this.mode === 'CSS') {
			this.validateCss();

			if (!this.hasErrors()) {
				this.previewKey += 1;
				this.status = 'Live preview';
			}

			return;
		}

		if (this.mode === 'JSON') {
			this.validateJson();
			return;
		}

		if (this.mode === 'SQL') {
			this.runSql();
			return;
		}

		if (this.running) {
			return;
		}

		let executable = this.code;

		if (this.mode === 'TypeScript') {
			const compiled = this.compileTypeScript(this.code);

			if (compiled === null) {
				return;
			}

			executable = compiled;
		}

		this.executeJavaScript(executable);
	}

	private compileTypeScript(source: string): string | null {
		const result = ts.transpileModule(source, {
			reportDiagnostics: true,
			fileName: 'main.ts',
			compilerOptions: {
				target: ts.ScriptTarget.ES2020,
				module: ts.ModuleKind.ES2020,
				moduleResolution: ts.ModuleResolutionKind.Bundler,
				isolatedModules: true,
				strict: true,
				removeComments: false,
				inlineSourceMap: true,
				inlineSources: true,
				esModuleInterop: true,
				allowSyntheticDefaultImports: true
			}
		});

		const diagnostics = result.diagnostics ?? [];

		if (diagnostics.length) {
			this.status = 'TypeScript error';

			this.output = 'Compilation stopped before execution.';

			this.error = formatTypeScriptDiagnostics(diagnostics);

			return null;
		}

		if (/^\s*(import|export)\s/m.test(result.outputText)) {
			this.status = 'Module code not supported';

			this.output = 'Compilation stopped before execution.';

			this.error =
				'Import/export syntax requires module loading. The isolated worker currently executes a single script file.';

			return null;
		}

		this.lastCompiledCode = result.outputText;

		return result.outputText;
	}

	private runSql() {
		const result = runSqlQuery(this.code);
		this.output = result.output;
		this.error = result.error;
		this.status = result.status;
	}

	validateJson() {
		try {
			const value = JSON.parse(this.code);

			this.formattedJson = JSON.stringify(value, null, 2);

			this.minifiedJson = JSON.stringify(value);

			this.output = this.formattedJson;

			this.error = '';
			this.status = 'Valid JSON';
			this.diagnostics = [];
		} catch (error) {
			this.formattedJson = '';
			this.minifiedJson = '';
			this.output = 'JSON validation failed.';

			this.error = error instanceof Error ? error.message : String(error);

			this.status = 'Invalid JSON';

			this.diagnostics = [
				{
					message: this.error,
					severity: 'error'
				}
			];
		}
	}

	formatJson() {
		this.validateJson();

		if (this.formattedJson) {
			this.code = this.formattedJson;
		}
	}

	minifyJson() {
		this.validateJson();

		if (this.minifiedJson) {
			this.code = this.minifiedJson;
		}
	}

	private validateHtml() {
		this.diagnostics = validateHtml(this.code);
		this.status = this.diagnostics.length ? 'HTML diagnostics' : 'HTML valid';
	}

	private validateCss() {
		this.diagnostics = validateCss(this.css);
		this.status = this.diagnostics.length ? 'CSS diagnostics' : 'CSS valid';
	}

	private hasErrors() {
		return this.diagnostics.some((diagnostic) => diagnostic.severity === 'error');
	}

	private executeJavaScript(executable: string) {
		this.disposeWorker();

		this.running = true;

		this.status = this.mode === 'TypeScript' ? 'Running TypeScript…' : 'Running…';

		this.error = '';
		this.output = 'Running…';
		this.duration = null;

		const started = performance.now();

		const token = ++this.runToken;

		const workerUrl = URL.createObjectURL(
			new Blob([workerSource], {
				type: 'text/javascript'
			})
		);

		const worker = new Worker(workerUrl);

		this.worker = worker;
		this.workerUrl = workerUrl;

		let settled = false;

		const finish = (callback: () => void) => {
			if (settled || token !== this.runToken) {
				return;
			}

			settled = true;

			if (this.timeoutId !== undefined) {
				window.clearTimeout(this.timeoutId);
			}

			this.timeoutId = undefined;

			this.duration = Math.round(performance.now() - started);

			worker.terminate();

			URL.revokeObjectURL(workerUrl);

			if (this.worker === worker) {
				this.worker = undefined;
			}

			if (this.workerUrl === workerUrl) {
				this.workerUrl = undefined;
			}

			this.running = false;

			callback();
		};

		worker.onmessage = (event) => {
			if (event.data.type === 'success') {
				finish(() => {
					this.status = 'Ran successfully';

					this.output = event.data.output;
				});

				return;
			}

			finish(() => {
				this.status = event.data.kind;

				this.output = event.data.output;

				this.error = event.data.message;
			});
		};

		worker.onerror = (event) => {
			finish(() => {
				this.status = 'Runtime error';

				this.output = 'Execution failed.';

				this.error = event.message || 'The worker could not execute this code.';
			});
		};

		worker.postMessage({
			code: executable
		});

		this.timeoutId = window.setTimeout(() => {
			finish(() => {
				this.status = 'Timed out';

				this.output = 'Execution stopped after 4 seconds.';

				this.error = 'The code did not finish within the 4 second execution limit.';
			});
		}, 4000);
	}

	reset() {
		this.disposeWorker();

		this.error = '';
		this.status = 'Ready';
		this.duration = null;
		this.diagnostics = [];
		this.formattedJson = '';
		this.minifiedJson = '';

		if (this.mode === 'JavaScript') {
			this.code = starterJavaScript;
		}

		if (this.mode === 'TypeScript') {
			this.code = starterTypeScript;
		}

		if (this.mode === 'HTML') {
			this.code = starterHtml;
		}

		if (this.mode === 'CSS') {
			this.html = starterHtml;

			this.code = starterCss;

			this.css = starterCss;
		}

		if (this.mode === 'JSON') {
			this.code = starterJson;
		}

		if (this.mode === 'SQL') {
			this.code = starterSql;
		}

		if (this.isWebPreview) {
			this.previewKey += 1;
		}

		this.output = this.isWebPreview
			? 'Preview updates as you edit.'
			: this.mode === 'JSON'
				? 'Click Validate to inspect your JSON.'
				: 'Click Run to execute your code.';
	}

	private disposeWorker() {
		this.runToken += 1;

		if (this.timeoutId !== undefined) {
			window.clearTimeout(this.timeoutId);
		}

		this.timeoutId = undefined;

		if (this.worker) {
			this.worker.terminate();
		}

		this.worker = undefined;

		if (this.workerUrl) {
			URL.revokeObjectURL(this.workerUrl);
		}

		this.workerUrl = undefined;

		this.running = false;
	}
}
