import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceExtensions = new Set(['.svelte', '.ts', '.js', '.css', '.scss', '.html', '.json']);

function sourceFiles(dir) {
	const result = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (['node_modules', '.svelte-kit', 'build', '.git', 'tests'].includes(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) result.push(...sourceFiles(full));
		else if (sourceExtensions.has(path.extname(entry.name))) result.push(full);
	}
	return result;
}

const files = sourceFiles(root);

describe('project quality contracts', () => {
	test('contains no forbidden important declarations', () => {
		const hits = files.filter((file) => fs.readFileSync(file, 'utf8').includes('!' + 'important'));
		assert.deepEqual(hits, []);
	});

	test('applies explicit heading and LEARN → TRY → BUILD colors', () => {
		const css = fs.readFileSync(path.join(root, 'src/app.css'), 'utf8');
		assert.match(css, /h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6 \{[\s\S]*?color: var\(--heading\);/);
		assert.match(css, /\.eyebrow,\s*\.section-label \{[\s\S]*?color: var\(--primary\);/);
		assert.match(css, /\.learn-try-build \{[\s\S]*?color: var\(--primary\);/);
		assert.match(css, /\.topbar-component \.heading \.eyebrow \{[\s\S]*?color: var\(--primary\);/);
		assert.match(css, /\.page-home \.section-head h3,\s*\.page-home \.panel-head h3/);
	});

	test('uses a dedicated class for LEARN → TRY → BUILD', () => {
		const home = fs.readFileSync(path.join(root, 'src/routes/+page.svelte'), 'utf8');
		const css = fs.readFileSync(path.join(root, 'src/app.css'), 'utf8');
		assert.match(home, /class="learn-try-build"/);
		assert.match(css, /\.learn-try-build\b/);
	});

	test('has one authoritative Copy response rule', () => {
		const css = fs.readFileSync(path.join(root, 'src/lib/styles/pages/api.css'), 'utf8');
		const matches = css.match(/\.page-api \.result-actions \.response-copy\s*\{/g) ?? [];
		assert.equal(matches.length, 1);
		assert.match(css, /\.page-api \.result-actions \.response-copy \{[\s\S]*?box-shadow: none;/);
		assert.match(
			css,
			/\.page-api \.result-actions \.response-copy \{[\s\S]*?height: 44px;[\s\S]*?min-height: 44px;/
		);
	});

	test('has the intended sidebar navigation weight', () => {
		const css = fs.readFileSync(path.join(root, 'src/app.css'), 'utf8');
		assert.match(css, /\.sidebar-component \.nav-list a \{[\s\S]*?font-weight: 600;/);
	});

	test('keeps the four Settings diagrams at their fixed artwork size on narrow screens', () => {
		const css = fs.readFileSync(path.join(root, 'src/lib/styles/pages/settings.css'), 'utf8');
		assert.match(
			css,
			/@media \(max-width: 480px\)[\s\S]*?\.page-settings \.project-visual,[\s\S]*?width: 170px;[\s\S]*?height: 170px;/
		);
	});

	test('all primary sidebar routes exist', () => {
		for (const route of [
			'learn',
			'playground',
			'visualizer',
			'api',
			'tools',
			'snippets',
			'patterns',
			'settings'
		]) {
			assert.ok(fs.existsSync(path.join(root, 'src/routes', route, '+page.svelte')), route);
		}
	});
});
