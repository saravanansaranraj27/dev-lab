<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { ToolsPageState, toolNames, type ToolName } from '$lib/features/tools/tools.svelte';
	import ConsoleOutput from '$lib/components/ui/ConsoleOutput.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	const toolsState = new ToolsPageState();
	let copied = $state(false);
	async function copyInput() {
		const value =
			toolsState.tool === 'Regex'
				? `Pattern: ${toolsState.regexPattern}\nFlags: ${toolsState.regexFlags}\nInput: ${toolsState.regexTest}`
				: toolsState.input;
		if (!value) return;
		await navigator.clipboard.writeText(value);
		copied = true;
		window.setTimeout(() => (copied = false), 1200);
	}
</script>

<Sidebar active="tools" />

<main class="page-shell page-tools page-playground">
	<Topbar
		title="Developer Toolbox"
		subtitle="Small utilities for data formatting, encoding, timestamps and pattern testing."
	/>

	<section class="playground-toolbar glass">
		<div class="field mode-field">
			<Select
				value={toolsState.tool}
				options={[...toolNames]}
				label="Tool"
				ariaLabel="Developer tool"
				onchange={(value) => toolsState.setTool(value as ToolName)}
			/>
		</div>
		<div class="playground-context">
			<span class="eyebrow">{toolsState.tool} · SANDBOXED</span>
			<strong>Developer toolbox</strong>
			<p>{toolsState.description}</p>
		</div>
		<div class="actions">
			<button class="button" type="button" onclick={() => toolsState.setTool(toolsState.tool)}
				>Reset</button
			>
			{#if toolsState.tool === 'Base64'}
				<button class="button primary" type="button" onclick={() => toolsState.process()}
					>Run ▶</button
				>
			{:else if toolsState.tool === 'URL'}
				<button class="button primary" type="button" onclick={() => toolsState.process()}
					>Run ▶</button
				>
			{:else if toolsState.tool === 'UUID'}
				<button class="button primary" type="button" onclick={() => toolsState.generate()}
					>Run ▶</button
				>
			{:else if toolsState.tool === 'Regex'}
				<button class="button primary" type="button" onclick={() => toolsState.process()}
					>Run ▶</button
				>
			{:else}
				<button class="button primary" type="button" onclick={() => toolsState.process()}
					>Run ▶</button
				>
			{/if}
		</div>
	</section>

	<section class="editor-grid tool-playground-grid">
		<article class="editor-panel glass tool-editor">
			<div class="panel-bar">
				<span class="file-label"
					><span class="file-dot"></span>{toolsState.tool === 'Regex'
						? 'pattern.txt'
						: 'input.txt'}</span
				>
				<span class="panel-bar-end"
					><span>{toolsState.hasRun ? 'Executed' : 'Ready'}</span><button
						class="icon-button"
						type="button"
						aria-label="Copy tool input"
						title={copied ? 'Copied' : 'Copy input'}
						onclick={copyInput}><Icon name={copied ? 'check' : 'copy'} size={16} /></button
					></span
				>
			</div>

			{#if toolsState.tool === 'Regex'}
				<div class="regex-fields">
					<label class="field"
						><span>Pattern</span><input
							bind:value={toolsState.regexPattern}
							placeholder="e.g. \\b[A-Z][a-z]+\\b"
						/></label
					>
					<label class="field"
						><span>Flags</span><input bind:value={toolsState.regexFlags} placeholder="gi" /></label
					>
					<label class="field full"
						><span>Input</span><textarea bind:value={toolsState.regexTest} spellcheck="false"
						></textarea></label
					>
				</div>
			{:else}
				<label class="field tool-input-field">
					<textarea
						bind:value={toolsState.input}
						spellcheck="false"
						disabled={toolsState.tool === 'UUID'}></textarea>
				</label>
			{/if}

			<div class="editor-footer"><span>{toolsState.tool}</span></div>
		</article>

		<article class="output-panel tool-output">
			<ConsoleOutput
				label="Console"
				output={toolsState.hasRun ? toolsState.output : ''}
				error={toolsState.error}
				onClear={() => {
					toolsState.output = '';
					toolsState.error = '';
					toolsState.hasRun = false;
				}}
			/>
		</article>
	</section>

	{#if toolsState.tool === 'Regex' && toolsState.hasRun && toolsState.regexMatches.length}
		<div class="match-strip">
			<strong>{toolsState.regexMatches.length}</strong>
			<span>matches found</span>
			<code>{toolsState.regexMatches.join(' · ')}</code>
		</div>
	{/if}

	{#if toolsState.output}
		<div class="tool-copy-row">
			<button class="button" type="button" onclick={() => toolsState.copyOutput()}
				>{toolsState.copied
					? 'Copied'
					: toolsState.tool === 'UUID'
						? 'Copy UUID'
						: 'Copy output'}</button
			>
		</div>
	{/if}

	<section class="glass page-learning-notes">
		<span class="eyebrow">TOOLBOX GUIDE</span>
		<h3>Use utilities to inspect data, not replace understanding.</h3>
		<div class="notes-grid">
			<div>
				<strong>Transform</strong>
				<p>Format and encode values when moving data between systems.</p>
			</div>
			<div>
				<strong>Inspect</strong>
				<p>Use regex and timestamps to understand structured input.</p>
			</div>
			<div>
				<strong>Verify</strong>
				<p>Copy the output into your application and test the real boundary.</p>
			</div>
		</div>
	</section>
</main>
