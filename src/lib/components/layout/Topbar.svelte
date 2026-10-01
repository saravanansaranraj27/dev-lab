<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
	import { TopbarState } from '$lib/features/layout/topbar.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	let { title = 'DevLab', subtitle = '' } = $props();
	const topbarState = new TopbarState();
	const route = (path: string) => resolve(path as RouteId);
</script>

<div class="topbar-component">
	<header class="topbar">
		<div class="heading">
			<span class="eyebrow">DEVLAB</span>
			<h1>{title}</h1>
			{#if subtitle}<p>{subtitle}</p>{/if}
		</div>

		<div class="actions">
			<button
				class="search-control search-button"
				type="button"
				onclick={() => topbarState.openPalette()}
				aria-label="Open command palette"
			>
				<span class="search-icon"><Icon name="search" size={16} /></span>
				<span class="search-label">Search anything</span>
			</button>
		</div>
	</header>

	{#if topbarState.paletteOpen}
		<div
			class="palette-backdrop"
			role="presentation"
			onclick={(event) => topbarState.handleBackdropClick(event)}
		>
			<div class="palette glass" role="dialog" aria-modal="true" aria-label="Command palette">
				<div class="palette-search">
					<Icon name="search" size={17} />
					<input
						bind:value={topbarState.query}
						placeholder="Jump to a workspace..."
						aria-label="Search workspace"
					/>
					<button
						class="close"
						type="button"
						onclick={() => topbarState.closePalette()}
						aria-label="Close command palette">×</button
					>
				</div>

				<div class="command-list">
					{#if topbarState.filteredCommands.length}
						{#each topbarState.filteredCommands as command (command.name)}
							<a href={route(command.href)} onclick={() => topbarState.closePalette()}>
								<span class="command-icon">↗</span>
								<span class="command-copy">
									<strong>{command.name}</strong>
									<small>{command.description}</small>
								</span>
								<kbd>{command.key}</kbd>
							</a>
						{/each}
					{:else}
						<div class="empty">No workspace matches “{topbarState.query}”.</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
