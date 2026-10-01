import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

describe('DevLab navigation and UI smoke tests', () => {
	test('sidebar declares every required destination', () => {
		const nav = fs.readFileSync(path.join(root, 'src/lib/data/nav.ts'), 'utf8');
		for (const id of [
			'home',
			'learn',
			'playground',
			'visualizer',
			'api',
			'tools',
			'snippets',
			'patterns',
			'settings'
		]) {
			assert.match(nav, new RegExp(`id:\\s*['"]${id}['"]`));
		}
	});

	test('API response copy action exists and has accessible labelling', () => {
		const page = fs.readFileSync(path.join(root, 'src/routes/api/+page.svelte'), 'utf8');
		assert.match(page, /class="button response-copy"/);
		assert.match(page, /aria-label=\{apiState\.copied \? 'Response copied' : 'Copy response'\}/);
	});

	test('settings contains the four diagram sections', () => {
		const page = fs.readFileSync(path.join(root, 'src/routes/settings/+page.svelte'), 'utf8');
		for (const label of ['Content', 'UI and state', 'Browser execution', 'Feedback']) {
			assert.match(page, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
		}
	});

	test('loader retains the expected 800ms delay contract', () => {
		const layout = fs.readFileSync(path.join(root, 'src/routes/+layout.svelte'), 'utf8');
		assert.match(layout, /800/);
		assert.match(layout, /Loading/);
	});

	test('no top-right theme/settings control is reintroduced', () => {
		const topbar = fs.readFileSync(
			path.join(root, 'src/lib/components/layout/Topbar.svelte'),
			'utf8'
		);
		assert.doesNotMatch(topbar, /theme.*button|settings.*button/i);
	});
});
