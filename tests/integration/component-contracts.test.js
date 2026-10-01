import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routes = [
	'learn',
	'playground',
	'visualizer',
	'api',
	'tools',
	'snippets',
	'patterns',
	'settings'
];
const routeFiles = routes.map((route) => path.join(root, 'src/routes', route, '+page.svelte'));

const read = (file) => fs.readFileSync(file, 'utf8');

describe('interactive component contracts', () => {
	test('every primary route has an interactive page and Topbar', () => {
		for (const file of routeFiles) {
			const source = read(file);
			assert.match(source, /<Topbar\b/, file);
			assert.match(source, /<Sidebar\b/, file);
		}
	});

	test('every route button has an explicit click handler', () => {
		for (const file of routeFiles) {
			const source = read(file);
			const buttons = source.match(/<button\b[\s\S]*?<\/button>/g) ?? [];
			for (const button of buttons)
				assert.match(button, /onclick=/, `${file}: ${button.slice(0, 80)}`);
		}
	});

	test('Learn exposes search, filters, notes, copy and playground actions', () => {
		const source = read(path.join(root, 'src/routes/learn/+page.svelte'));
		assert.match(source, /aria-label="Search lessons"/);
		assert.match(source, /setArea\(item\)/);
		assert.match(source, /showConcept/);
		assert.match(source, /copyExample/);
		assert.match(source, /Try this in Playground/);
	});

	test('Playground exposes reset, run and code-copy actions', () => {
		const source = read(path.join(root, 'src/routes/playground/+page.svelte'));
		assert.match(source, /\bReset\b/);
		assert.match(source, /runCode\(\)/);
		assert.match(source, /copyText\(/);
	});

	test('Visualizer exposes generation, previous, next and play controls', () => {
		const source = read(path.join(root, 'src/routes/visualizer/+page.svelte'));
		for (const token of ['randomArray()', 'previous()', 'next()', 'play()'])
			assert.ok(source.includes(token), token);
	});

	test('API Lab exposes request, reset, copy request and copy response actions', () => {
		const source = read(path.join(root, 'src/routes/api/+page.svelte'));
		assert.match(source, /sendRequest\(\)/);
		assert.match(source, /copyRequest/);
		assert.match(source, /copyResponse\(\)/);
		assert.match(source, /\bReset\b/);
	});

	test('Toolbox exposes all six tools and run/reset/copy controls', () => {
		const source = read(path.join(root, 'src/lib/features/tools/tools.svelte.ts'));
		const page = read(path.join(root, 'src/routes/tools/+page.svelte'));
		for (const tool of ['JSON', 'Base64', 'URL', 'Timestamp', 'UUID', 'Regex'])
			assert.ok(source.includes(tool), tool);
		assert.match(page, /setTool\(/);
		assert.match(page, /process\(\)/);
		assert.match(page, /generate\(\)/);
		assert.match(page, /copyOutput\(\)/);
	});

	test('Regex keeps Pattern, Flags and Input controls', () => {
		const source = read(path.join(root, 'src/routes/tools/+page.svelte'));
		assert.match(source, />Pattern<\/span>/);
		assert.match(source, />Flags<\/span>/);
		assert.match(source, />Input<\/span>/);
		assert.doesNotMatch(source, />Test text<\/span>/);
	});

	test('Settings exposes all theme and accent choices', () => {
		const source = read(path.join(root, 'src/routes/settings/+page.svelte'));
		for (const theme of ['system', 'light', 'dark']) assert.ok(source.includes(theme), theme);
		for (const accent of [
			'orange',
			'blue',
			'cyan',
			'teal',
			'green',
			'lime',
			'yellow',
			'purple',
			'pink',
			'red'
		]) {
			assert.ok(source.includes(accent), accent);
		}
		for (const diagram of ['Content', 'UI and state', 'Browser execution', 'Feedback'])
			assert.ok(source.includes(diagram), diagram);
	});

	test('ConsoleOutput exposes its Clear action', () => {
		const source = read(path.join(root, 'src/lib/components/ui/ConsoleOutput.svelte'));
		assert.match(source, /onClear/);
		assert.match(source, />Clear<\/button>/);
	});

	test('Topbar has search and no theme/settings action', () => {
		const source = read(path.join(root, 'src/lib/components/layout/Topbar.svelte'));
		assert.match(source, /Open command palette/);
		assert.match(source, /Search anything/);
		assert.doesNotMatch(source, /setTheme|settings.*button/i);
	});
});

describe('route interaction coverage', () => {
	const cases = [
		['Home', '+page.svelte', ['Start learning', 'Open playground']],
		['Learn', 'learn/+page.svelte', ['Try this in Playground']],
		['Playground', 'playground/+page.svelte', ['Run', 'Reset']],
		['Visualizer', 'visualizer/+page.svelte', ['Prev', 'Next', 'Play']],
		['API Lab', 'api/+page.svelte', ['Run ▶', 'Reset', 'Copy request', 'Copy response']],
		['Toolbox', 'tools/+page.svelte', ['setTool(', 'process()', 'generate()', 'copyOutput()']],
		['Snippets', 'snippets/+page.svelte', ['Copy']],
		['Patterns', 'patterns/+page.svelte', ['Copy']],
		['Settings', 'settings/+page.svelte', ['System', 'Light', 'Dark']]
	];

	for (const [name, relative, controls] of cases) {
		test(`${name} exposes its primary controls`, () => {
			const file =
				relative === '+page.svelte'
					? path.join(root, 'src/routes/+page.svelte')
					: path.join(root, 'src/routes', relative);
			const source = read(file);
			for (const control of controls) assert.ok(source.includes(control), `${name}: ${control}`);
		});
	}

	test('every route form control has a bound value or event handler', () => {
		for (const file of routeFiles) {
			const source = read(file);
			const controls = source.match(/<(?:input|textarea|select)\\b[\\s\\S]*?>/g) ?? [];
			for (const control of controls) {
				assert.match(
					control,
					/(bind:value|bind:checked|oninput=|onchange=|onclick=)/,
					`${file}: ${control}`
				);
			}
		}
	});
});
