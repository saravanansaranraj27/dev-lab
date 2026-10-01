import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routeFiles = [
	'src/routes/+page.svelte',
	'src/routes/learn/+page.svelte',
	'src/routes/playground/+page.svelte',
	'src/routes/visualizer/+page.svelte',
	'src/routes/api/+page.svelte',
	'src/routes/tools/+page.svelte',
	'src/routes/snippets/+page.svelte',
	'src/routes/patterns/+page.svelte',
	'src/routes/settings/+page.svelte'
];
const styleFiles = [
	'src/app.css',
	'src/lib/styles/components/sidebar.css',
	'src/lib/styles/components/topbar.css',
	'src/lib/styles/pages/home.css',
	'src/lib/styles/pages/learn.css',
	'src/lib/styles/pages/playground.css',
	'src/lib/styles/pages/visualizer.css',
	'src/lib/styles/pages/api.css',
	'src/lib/styles/pages/tools.css',
	'src/lib/styles/pages/library.css',
	'src/lib/styles/pages/settings.css'
];

const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

describe('responsive design contracts', () => {
	test('every primary page uses the shared responsive shell', () => {
		for (const file of routeFiles) {
			const source = read(file);
			assert.match(source, /<Topbar\b/, file);
			assert.match(source, /<Sidebar\b/, file);
			assert.match(source, /page-shell|page-/i, file);
		}
	});

	test('project styles define responsive breakpoints for the application', () => {
		const css = styleFiles.map(read).join('\n');
		assert.match(css, /@media\s*\(max-width:/, 'missing max-width responsive rules');
		assert.match(css, /@media\s*\(min-width:/, 'missing min-width responsive rules');
	});

	test('mobile navigation and topbar have dedicated responsive rules', () => {
		const sidebar = read('src/lib/styles/components/sidebar.css');
		const topbar = read('src/lib/styles/components/topbar.css');
		assert.match(sidebar, /@media\s*\(max-width:/);
		assert.match(topbar, /@media\s*\(max-width:/);
	});

	test('Settings retains fixed artwork dimensions at narrow widths', () => {
		const css = read('src/lib/styles/pages/settings.css');
		assert.match(
			css,
			/@media\s*\(max-width:\s*480px\)[\s\S]*?\.page-settings \.project-visual[\s\S]*?width:\s*170px[\s\S]*?height:\s*170px/
		);
	});

	test('responsive CSS avoids forbidden global important overrides', () => {
		for (const file of styleFiles) assert.doesNotMatch(read(file), /!important/);
	});
});
