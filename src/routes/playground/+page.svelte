<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import ConsoleOutput from '$lib/components/ui/ConsoleOutput.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { PlaygroundPageState } from '$lib/features/playground/playground.svelte';
	import { getPracticeTables } from '$lib/features/playground/sql';

	const playgroundState = new PlaygroundPageState();
	const modes = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'JSON', 'SQL'];
	const practiceTables = getPracticeTables();
	let copiedPanel = $state('');
	async function copyText(id: string, value: string) {
		if (!value) return;
		await navigator.clipboard.writeText(value);
		copiedPanel = id;
		window.setTimeout(() => {
			if (copiedPanel === id) copiedPanel = '';
		}, 1200);
	}
</script>

<Sidebar active="playground" />
<main class="page-shell page-playground">
	<Topbar
		title="Code Playground"
		subtitle="Practice JavaScript, TypeScript, HTML, CSS, JSON, and SQL in focused browser-based labs."
	/>

	<section class="playground-toolbar glass">
		<div class="field mode-field">
			<Select
				value={playgroundState.mode}
				options={modes}
				label="Language"
				ariaLabel="Playground language"
				onchange={(value) => playgroundState.setMode(value)}
			/>
		</div>
		<div class="playground-context">
			<span class="eyebrow">{playgroundState.mode} · SANDBOXED</span>
			<strong>{playgroundState.lessonTitle}</strong>
			<p>{playgroundState.modeDescription}</p>
		</div>
		<div class="actions">
			<button class="button" type="button" onclick={() => playgroundState.reset()}>Reset</button>
			<button
				class="button primary"
				type="button"
				onclick={() => playgroundState.runCode()}
				disabled={playgroundState.running}
			>
				{playgroundState.mode === 'JSON'
					? 'Validate'
					: playgroundState.isWebPreview
						? 'Refresh preview'
						: playgroundState.running
							? 'Running…'
							: 'Run ▶'}
			</button>
		</div>
	</section>

	{#if playgroundState.mode === 'CSS'}
		<section class="editor-grid web-editors">
			<article class="editor-panel glass">
				<div class="panel-bar">
					<span class="file-label"><span class="file-dot"></span>index.html</span><span
						class="panel-bar-end"
						><span>Live</span><button
							class="icon-button"
							type="button"
							aria-label="Copy HTML"
							title={copiedPanel === 'html-css' ? 'Copied' : 'Copy HTML'}
							onclick={() => copyText('html-css', playgroundState.html)}
							><Icon name={copiedPanel === 'html-css' ? 'check' : 'copy'} size={16} /></button
						></span
					>
				</div>
				<textarea
					class="editor code"
					bind:value={playgroundState.html}
					spellcheck="false"
					aria-label="HTML editor"></textarea>
			</article>
			<article class="editor-panel glass">
				<div class="panel-bar">
					<span class="file-label"><span class="file-dot"></span>styles.css</span><span
						class="panel-bar-end"
						><span>Live</span><button
							class="icon-button"
							type="button"
							aria-label="Copy CSS"
							title={copiedPanel === 'css' ? 'Copied' : 'Copy CSS'}
							onclick={() => copyText('css', playgroundState.css)}
							><Icon name={copiedPanel === 'css' ? 'check' : 'copy'} size={16} /></button
						></span
					>
				</div>
				<textarea
					class="editor code"
					bind:value={playgroundState.css}
					spellcheck="false"
					aria-label="CSS editor"></textarea>
			</article>
		</section>
		<section class="preview-panel glass">
			<div class="panel-bar">
				<span class="file-label"><span class="console-dot"></span>Live preview</span><span
					>{playgroundState.status}</span
				>
			</div>
			<iframe
				title="CSS live preview"
				sandbox="allow-scripts"
				srcdoc={playgroundState.previewDocument}
			></iframe>
		</section>
	{:else if playgroundState.mode === 'HTML'}
		<section class="editor-grid">
			<article class="editor-panel glass">
				<div class="panel-bar">
					<span class="file-label"><span class="file-dot"></span>index.html</span><span
						>{playgroundState.status}</span
					>
				</div>
				<textarea
					class="editor code"
					bind:value={playgroundState.code}
					spellcheck="false"
					aria-label="HTML editor"></textarea>
			</article>
			<article class="preview-panel glass">
				<div class="panel-bar">
					<span class="file-label"><span class="console-dot"></span>Live preview</span><span
						>Isolated iframe</span
					>
				</div>
				<iframe
					title="HTML live preview"
					sandbox="allow-scripts"
					srcdoc={playgroundState.previewDocument}
				></iframe>
			</article>
		</section>
	{:else if playgroundState.mode === 'SQL'}
		<section class="sql-layout">
			<article class="editor-panel glass">
				<div class="panel-bar">
					<span class="file-label"><span class="file-dot"></span>query.sql</span><span
						>{playgroundState.status}</span
					>
				</div>
				<textarea
					class="editor code sql-editor"
					bind:value={playgroundState.code}
					spellcheck="false"
					aria-label="SQL editor"></textarea>
				<div class="editor-footer">
					<span>Local practice database</span>
				</div>
			</article>
			<article class="sql-schema glass">
				<div class="panel-bar">
					<span class="file-label"><span class="console-dot"></span>Schema</span><span
						>4 tables</span
					>
				</div>
				<div class="schema-list">
					{#each Object.entries(practiceTables) as [tableName, rows] (tableName)}
						<div class="schema-table">
							<strong>{tableName}</strong>
							<div class="schema-columns">{Object.keys(rows[0] ?? {}).join(' · ')}</div>
							<div class="schema-rows">
								{#each rows as row, rowIndex (rowIndex)}
									<div>
										{Object.values(row)
											.map((value) => value ?? 'NULL')
											.join(' | ')}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</article>
		</section>
		<section class="sql-result">
			<ConsoleOutput
				label="Query result"
				output={playgroundState.output}
				error={playgroundState.error}
				onClear={() => (playgroundState.output = '')}
			/>
		</section>
	{:else}
		<section class="editor-grid">
			<article class="editor-panel glass">
				<div class="panel-bar">
					<span class="file-label"><span class="file-dot"></span>{playgroundState.fileName}</span>
					<span class="panel-bar-end"
						><span
							>{playgroundState.status}{#if playgroundState.duration !== null}
								· {playgroundState.duration} ms{/if}</span
						><button
							class="icon-button"
							type="button"
							aria-label="Copy code"
							title={copiedPanel === 'code' ? 'Copied' : 'Copy code'}
							onclick={() => copyText('code', playgroundState.code)}
							><Icon name={copiedPanel === 'code' ? 'check' : 'copy'} size={16} /></button
						></span
					>
				</div>
				<textarea
					class="editor code"
					bind:value={playgroundState.code}
					spellcheck="false"
					aria-label={`${playgroundState.mode} editor`}></textarea>
				<div class="editor-footer">
					<span>{playgroundState.mode}</span>
				</div>
			</article>
			<article class="output-panel">
				<ConsoleOutput
					label={playgroundState.mode === 'JSON' ? 'Formatted output' : 'Console'}
					output={playgroundState.output}
					error={playgroundState.error}
					onClear={() => (playgroundState.output = '')}
				/>
			</article>
		</section>
	{/if}

	<section class="content-strip">
		{#if playgroundState.mode === 'JavaScript'}
			<article class="glass tip">
				<span>JS</span>
				<div>
					<strong>Runtime experiments</strong>
					<p>
						Test arrays, functions, promises, timers, console APIs, and runtime errors inside an
						isolated worker.
					</p>
				</div>
			</article>
			<article class="glass tip">
				<span>DEBUG</span>
				<div>
					<strong>Read the output</strong>
					<p>
						Use the console output and error state to connect each code change with a concrete
						runtime result.
					</p>
				</div>
			</article>
		{:else if playgroundState.mode === 'TypeScript'}
			<article class="glass tip">
				<span>TS</span>
				<div>
					<strong>Types before runtime</strong>
					<p>
						Compile TypeScript in the browser and inspect diagnostics before the emitted JavaScript
						executes.
					</p>
				</div>
			</article>
			<article class="glass tip">
				<span>MODEL</span>
				<div>
					<strong>Make contracts explicit</strong>
					<p>
						Practice unions, interfaces, generics, narrowing, and the boundary between static types
						and runtime values.
					</p>
				</div>
			</article>
		{:else if playgroundState.mode === 'HTML'}
			<article class="glass tip">
				<span>HTML</span>
				<div>
					<strong>Document structure</strong>
					<p>
						Build semantic markup and see the document update immediately in an isolated preview.
					</p>
				</div>
			</article>
			<article class="glass tip">
				<span>WEB</span>
				<div>
					<strong>Isolated preview</strong>
					<p>
						Links, forms, and scripts remain inside the sandboxed preview instead of navigating the
						DevLab shell.
					</p>
				</div>
			</article>
		{:else if playgroundState.mode === 'CSS'}
			<article class="glass tip">
				<span>CSS</span>
				<div>
					<strong>Layout experiments</strong>
					<p>
						Practice selectors, box model, grid, flexbox, spacing, and responsive behavior against
						the starter markup.
					</p>
				</div>
			</article>
			<article class="glass tip">
				<span>WEB</span>
				<div>
					<strong>Style in isolation</strong>
					<p>
						HTML and CSS render together in a sandbox so malformed styles cannot affect the main
						application.
					</p>
				</div>
			</article>
		{:else if playgroundState.mode === 'JSON'}
			<article class="glass tip">
				<span>JSON</span>
				<div>
					<strong>Validate data shape</strong>
					<p>
						Check syntax, format nested objects and arrays, and minify payloads before sending them
						across an API boundary.
					</p>
				</div>
			</article>
			<article class="glass tip">
				<span>DATA</span>
				<div>
					<strong>Readable contracts</strong>
					<p>
						Use formatted JSON to inspect structure and compact JSON when you need a
						transport-friendly representation.
					</p>
				</div>
			</article>
		{:else}
			<article class="glass tip">
				<span>SQL</span>
				<div>
					<strong>Interview-ready SQL</strong>
					<p>
						Practice SELECT, filtering, sorting, grouping, aggregates, and common query shapes
						against synthetic local data.
					</p>
				</div>
			</article>
			<article class="glass tip">
				<span>DATA</span>
				<div>
					<strong>Think in result sets</strong>
					<p>
						Read the schema first, predict the rows, then use joins, grouping, and conditions to
						shape the final result.
					</p>
				</div>
			</article>
		{/if}
	</section>

	<section class="tips">
		<article class="glass tip">
			<span>01</span>
			<div>
				<strong>Learn → Playground</strong>
				<p>Lesson examples open here with the matching language and starting code.</p>
			</div>
		</article>
		<article class="glass tip">
			<span>02</span>
			<div>
				<strong>Safe execution</strong>
				<p>
					JavaScript and TypeScript run inside a short-lived browser worker with a four-second
					limit.
				</p>
			</div>
		</article>
		<article class="glass tip">
			<span>03</span>
			<div>
				<strong>Web preview</strong>
				<p>
					HTML and CSS render inside an isolated iframe so markup and styles stay separate from
					DevLab itself.
				</p>
			</div>
		</article>
	</section>
	<section class="page-bottom-section glass">
		<div class="bottom-section-head">
			<span class="eyebrow">HOW TO USE THE PLAYGROUND</span>
			<h2>Write, run, inspect, and iterate in one place.</h2>
		</div>
		<div class="bottom-section-grid">
			<article>
				<strong>Languages</strong>
				<p>
					Svelte, TypeScript, JavaScript, HTML, CSS, JSON, and SQL workflows are supported across
					focused browser labs.
				</p>
			</article>
			<article>
				<strong>Experiment</strong>
				<p>
					Change a small piece of code, run it, inspect the result, and use the feedback to guide
					the next edit.
				</p>
			</article>
			<article>
				<strong>Practice loop</strong>
				<p>
					Move from a lesson example to a runnable experiment without leaving the DevLab workspace.
				</p>
			</article>
		</div>
	</section>
</main>
