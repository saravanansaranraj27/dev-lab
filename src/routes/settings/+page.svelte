<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import { SettingsPageState, type ThemeMode } from '$lib/features/settings/settings.svelte';

	const settingsState = new SettingsPageState();
	const accents = [
		{ value: 'orange', title: 'DevLab orange' },
		{ value: 'blue', title: 'Blue' },
		{ value: 'cyan', title: 'Cyan' },
		{ value: 'teal', title: 'Teal' },
		{ value: 'green', title: 'Green' },
		{ value: 'lime', title: 'Lime' },
		{ value: 'yellow', title: 'Yellow' },
		{ value: 'purple', title: 'Purple' },
		{ value: 'pink', title: 'Pink' },
		{ value: 'red', title: 'Red' }
	] as const;
	const themes: { value: ThemeMode; title: string; description: string }[] = [
		{ value: 'system', title: 'System', description: 'Follow your device appearance.' },
		{ value: 'light', title: 'Light', description: 'Use a bright workspace.' },
		{ value: 'dark', title: 'Dark', description: 'Use a low-light workspace.' }
	];
</script>

<Sidebar active="settings" />
<main class="page-shell page-settings">
	<Topbar title="Settings" subtitle="Choose how DevLab looks across your workspace." />

	<section class="settings glass">
		<div class="group">
			<span class="eyebrow">APPEARANCE</span>
			<h2>Theme</h2>
			<p>
				Select System, Light, or Dark. Your choice is applied immediately and saved for this browser
				context.
			</p>

			<div class="themes" aria-label="Theme options">
				{#each themes as option (option.value)}
					<button
						type="button"
						class:selected={settingsState.theme === option.value}
						aria-pressed={settingsState.theme === option.value}
						onclick={() => settingsState.setTheme(option.value)}
					>
						<span class={`preview ${option.value}`} aria-hidden="true">
							<span></span><span></span><span></span>
						</span>
						<strong>{option.title}</strong>
						<small>{option.description}</small>
					</button>
				{/each}
			</div>
		</div>

		<div class="group color-group">
			<span class="eyebrow">ACCENT COLOR</span>
			<h2>Color</h2>
			<p>
				Keep the default DevLab orange or choose an accent that fits your workspace. The selection
				works with every theme.
			</p>
			<div class="accent-options" aria-label="Accent color options">
				{#each accents as option (option.value)}
					<button
						type="button"
						class:selected={settingsState.accent === option.value}
						aria-pressed={settingsState.accent === option.value}
						onclick={() => settingsState.setAccent(option.value)}
						title={option.title}
					>
						<span class={`accent-swatch ${option.value}`} aria-hidden="true"></span>
						<strong>{option.title}</strong>
					</button>
				{/each}
			</div>
		</div>

		<div class="group project-flow">
			<span class="eyebrow">HOW THIS PROJECT WORKS</span>
			<h2>From lesson to result</h2>
			<p>
				DevLab keeps content, interface state, browser execution, and feedback connected in one
				learning loop.
			</p>

			<div class="flow-grid">
				<article class="flow-card">
					<div class="project-visual content-visual" aria-hidden="true">
						<div class="content-book">
							<div class="book-cover">DEVLAB</div>
							<div class="book-page left"><i></i><i></i><i></i><b>LESSON</b></div>
							<div class="book-page right"><i></i><i></i><i></i><b>CONTENT</b></div>
						</div>
					</div>
					<div>
						<strong>Content</strong>
						<p>Lessons, snippets, and patterns provide the material to study and practice.</p>
					</div>
				</article>
				<article class="flow-card">
					<div class="project-visual monitor-visual" aria-hidden="true">
						<span class="monitor-frame"
							><span class="monitor-dot"></span><strong>DEVLAB</strong><small>STATE</small></span
						><span class="monitor-stand"></span>
					</div>
					<div>
						<strong>UI and state</strong>
						<p>
							Svelte components keep the selected lesson, tool, theme, and editor state
							synchronized.
						</p>
					</div>
				</article>
				<article class="flow-card">
					<div class="project-visual execution-visual" aria-hidden="true">
						<div class="execution-device">
							<div class="execution-top"><i></i><i></i><i></i><b>RUN</b></div>
							<div class="execution-code"><span></span><span></span><span></span><span></span></div>
							<div class="execution-preview">
								<b>PREVIEW</b><span></span><span></span><span></span>
							</div>
						</div>
						<div class="execution-tag worker">WORKER</div>
						<div class="execution-tag ts">TS</div>
						<div class="execution-tag sql">SQL</div>
					</div>
					<div>
						<strong>Browser execution</strong>
						<p>
							Workers, previews, TypeScript compilation, JSON validation, and SQL process the
							selected example.
						</p>
					</div>
				</article>
				<article class="flow-card">
					<div class="project-visual feedback-visual" aria-hidden="true">
						<div class="feedback-device">
							<div class="feedback-title"><span></span><b>CONSOLE</b></div>
							<div class="feedback-output"><i></i><span></span></div>
							<div class="feedback-output diagnostic"><i></i><span></span></div>
							<div class="feedback-output preview"><i></i><span></span></div>
						</div>
						<div class="feedback-tag">RESULT</div>
						<div class="feedback-action">RETRY</div>
					</div>
					<div>
						<strong>Feedback</strong>
						<p>
							Results, diagnostics, previews, and examples help you change the code and try again.
						</p>
					</div>
				</article>
			</div>
		</div>

		<div class="group about-build">
			<span class="eyebrow">ABOUT THIS BUILD</span>
			<h2>Developer learning lab</h2>
			<p>
				DevLab keeps interactive developer labs in the browser so lessons, examples, experiments,
				and visual feedback stay in one focused workspace.
			</p>
			<strong class="build-credit"
				>Built with Svelte · TypeScript · Vite © 2026 Saran Raj Saravanan</strong
			>
		</div>
	</section>
</main>
