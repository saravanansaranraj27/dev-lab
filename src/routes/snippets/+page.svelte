<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { snippets } from '$lib/data/snippets';

	let query = $state('');
	let language = $state('All');
	let copied = $state('');
	const languages = ['All', ...new Set(snippets.map((snippet) => snippet.language))];

	async function copySnippet(id: string, code: string) {
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
	const visible = $derived(
		snippets.filter((snippet) => {
			const q = query.trim().toLowerCase();
			return (
				(!q ||
					`${snippet.title} ${snippet.description} ${snippet.category}`
						.toLowerCase()
						.includes(q)) &&
				(language === 'All' || snippet.language === language)
			);
		})
	);
</script>

<Sidebar active="snippets" />
<main class="page-shell page-library">
	<Topbar title="Snippets" subtitle="Reusable implementation patterns for everyday development." />
	<section class="library-hero glass">
		<span class="eyebrow">REFERENCE LIBRARY</span>
		<h2>Copy the shape, then adapt it.</h2>
		<p>
			These snippets focus on small, production-minded techniques. Read the constraint before
			copying the implementation.
		</p>
	</section>
	<section class="library-toolbar glass">
		<div class="search-control">
			<span class="search-icon"><Icon name="search" size={16} /></span>
			<input bind:value={query} aria-label="Search snippets" placeholder="Search snippets" />
		</div>
		<div class="chip-row">
			{#each languages as item (item)}<button
					type="button"
					class:active={language === item}
					onclick={() => (language = item)}>{item}</button
				>{/each}
		</div>
	</section>
	<section class="library-grid">
		{#each visible as snippet (snippet.id)}<article class="glass library-card">
				<div class="card-meta"><span>{snippet.language}</span><span>{snippet.category}</span></div>
				<h3>{snippet.title}</h3>
				<p>{snippet.description}</p>
				<div class="pattern-section">
					<strong>Example</strong>
					<div class="snippet-code">
						<pre><code>{snippet.code}</code></pre>
						<button
							class="icon-button copy-button"
							type="button"
							onclick={() => copySnippet(snippet.id, snippet.code)}
							aria-label={copied === snippet.id ? 'Code copied' : 'Copy code'}
							title={copied === snippet.id ? 'Code copied' : 'Copy code'}
							><Icon name={copied === snippet.id ? 'check' : 'copy'} size={16} /></button
						>
					</div>
				</div>
				<div class="pattern-section">
					<strong>Watch for</strong>
					<ul>
						<li>Copying the example without adapting its inputs and error path.</li>
						<li>Skipping the constraint that makes the technique useful.</li>
					</ul>
				</div>
			</article>{/each}
	</section>
	{#if !visible.length}<div class="glass empty-library">No snippets match this filter.</div>{/if}
</main>
