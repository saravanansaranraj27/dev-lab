<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { patterns } from '$lib/data/patterns';

	let query = $state('');
	let copied = $state('');
	const categories = $derived(['All', ...new Set(patterns.map((pattern) => pattern.category))]);
	let category = $state('All');
	const visible = $derived(
		patterns.filter((pattern) => {
			const q = query.trim().toLowerCase();
			return (
				(!q ||
					`${pattern.title} ${pattern.category} ${pattern.summary}`.toLowerCase().includes(q)) &&
				(category === 'All' || pattern.category === category)
			);
		})
	);

	async function copyPattern(id: string, code: string) {
		try {
			await navigator.clipboard.writeText(code);
			copied = id;
			window.setTimeout(() => {
				if (copied === id) copied = '';
			}, 1200);
		} catch {
			copied = '';
		}
	}
</script>

<Sidebar active="patterns" />
<main class="page-shell page-library">
	<Topbar
		title="Patterns"
		subtitle="Twenty-five reusable problem-solving models for interviews and production code."
	/>
	<section class="library-hero glass">
		<span class="eyebrow">PROBLEM-SOLVING PATTERNS</span>
		<h2>Recognize the structure before writing code.</h2>
		<p>
			Use the pattern catalog to identify invariants, data structures, and trade-offs before
			choosing an implementation.
		</p>
	</section>
	<section class="library-toolbar glass">
		<div class="search-control">
			<span class="search-icon"><Icon name="search" size={16} /></span>
			<input bind:value={query} aria-label="Search patterns" placeholder="Search patterns" />
		</div>
		<div class="chip-row">
			{#each categories as item (item)}
				<button type="button" class:active={category === item} onclick={() => (category = item)}
					>{item}</button
				>
			{/each}
		</div>
	</section>
	<section class="pattern-grid">
		{#each visible as pattern (pattern.id)}
			<article class="glass pattern-card">
				<div class="card-meta"><span>{pattern.category}</span></div>
				<h3>{pattern.title}</h3>
				<p>{pattern.summary}</p>
				<div class="pattern-section">
					<strong>When to use</strong>
					<p>{pattern.when}</p>
				</div>
				<div class="pattern-section">
					<strong>Example</strong>
					<div class="snippet-code">
						<pre><code>{pattern.code}</code></pre>
						<button
							class="icon-button copy-button"
							type="button"
							onclick={() => copyPattern(pattern.id, pattern.code)}
							aria-label={copied === pattern.id ? 'Code copied' : 'Copy code'}
							title={copied === pattern.id ? 'Code copied' : 'Copy code'}
							><Icon name={copied === pattern.id ? 'check' : 'copy'} size={16} /></button
						>
					</div>
				</div>
				<div class="pattern-section">
					<strong>Common mistakes</strong>
					<ul>
						{#each pattern.mistakes as mistake (mistake)}<li>{mistake}</li>{/each}
					</ul>
				</div>
			</article>
		{/each}
	</section>
	{#if !visible.length}<div class="glass empty-library">No patterns match this search.</div>{/if}
</main>
