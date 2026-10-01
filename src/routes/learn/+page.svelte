<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import { LearnPageState } from '$lib/features/learn/learn.svelte';
	import { hasPlayground } from '$lib/features/playground/validation';

	const learnState = new LearnPageState();
	let copied = $state(false);

	async function copyExample() {
		try {
			await navigator.clipboard.writeText(learnState.active.example);
			copied = true;
			window.setTimeout(() => (copied = false), 1200);
		} catch {
			copied = false;
		}
	}
	const route = (path: string) => resolve(path as RouteId);
</script>

<Sidebar active="learn" />
<main class="page-shell page-learn">
	<Topbar
		title="Learn"
		subtitle="Short explanations with enough context to take the next step yourself."
	/>

	<div class="toolbar glass">
		<div class="search-wrap search-control">
			<span class="search-icon"><Icon name="search" size={16} /></span>
			<input
				bind:value={learnState.search}
				placeholder="Search concepts, topics or lessons..."
				aria-label="Search lessons"
			/>
		</div>
		<div class="filters">
			{#each learnState.areas as item (item)}
				<button
					type="button"
					class:active={learnState.area === item}
					onclick={() => learnState.setArea(item)}>{item}</button
				>
			{/each}
		</div>
	</div>

	<section class="learn-layout">
		<div class="lesson-catalog">
			<div class="catalog-head">
				<span>{learnState.visible.length} lessons</span>
				<span>Read · inspect · experiment</span>
			</div>

			{#if learnState.visible.length}
				{#each learnState.visible as lesson (lesson.id)}
					<button
						type="button"
						class:selected={learnState.selected === lesson.id}
						class="lesson-card"
						onclick={() => {
							learnState.selected = lesson.id;
							learnState.showConcept = false;
						}}
					>
						<span class="lesson-badge"
							>{lesson.area === 'JavaScript'
								? 'JS'
								: lesson.area === 'TypeScript'
									? 'TS'
									: lesson.area === 'HTML'
										? 'HTML'
										: lesson.area === 'CSS'
											? 'CSS'
											: lesson.area === 'SQL'
												? 'SQL'
												: lesson.area === 'Algorithms'
													? 'ALGO'
													: lesson.area === 'Tooling'
														? 'TOOL'
														: lesson.area === 'Security'
															? 'SEC'
															: 'WEB'}</span
						>
						<span class="lesson-info">
							<strong>{lesson.title}</strong>
							<small>{lesson.level} · {lesson.time}</small>
							<span>{lesson.desc}</span>
						</span>
						<span class="chevron"><Icon name="arrow" size={16} /></span>
					</button>
				{/each}
			{:else}
				<div class="empty glass">No lessons match your search.</div>
			{/if}
		</div>

		<article class="lesson-detail glass">
			<div class="detail-top">
				<div>
					<span class="eyebrow">{learnState.active.area} · {learnState.active.level}</span>
					<h2>{learnState.active.title}</h2>
					<p>{learnState.active.desc}</p>
				</div>
				<span class="time">{learnState.active.time}</span>
			</div>

			<div class="topics">
				{#each learnState.active.topics as topic (topic)}<span>{topic}</span>{/each}
			</div>

			<section class="concept-card">
				<span class="tip-label">Tip</span>
				<p>{learnState.active.concept}</p>
			</section>

			<section class="example">
				<div class="example-head">
					<span>Example</span>
					<button
						type="button"
						class="notes-button"
						onclick={() => (learnState.showConcept = !learnState.showConcept)}
						aria-label={learnState.showConcept ? 'Hide notes' : 'Show notes'}
						title={learnState.showConcept ? 'Hide notes' : 'Show notes'}
						>{learnState.showConcept ? 'Hide Notes' : 'Show Notes'}</button
					>
				</div>
				<div class="snippet-code learn-code">
					<pre><code>{learnState.active.example}</code></pre>
					<button
						class="icon-button copy-button"
						type="button"
						onclick={copyExample}
						aria-label={copied ? 'Code copied' : 'Copy code'}
						title={copied ? 'Code copied' : 'Copy code'}
						><Icon name={copied ? 'check' : 'copy'} size={16} /></button
					>
				</div>
				{#if learnState.showConcept}
					<div class="note">
						Try changing one line in the Playground, then come back here and explain what changed.
					</div>
				{/if}
			</section>

			<div class="detail-actions">
				{#if hasPlayground(learnState.active)}
					<a
						class="button primary"
						href={route(
							`/playground?lesson=${encodeURIComponent(learnState.active.id)}&mode=${encodeURIComponent(learnState.active.playgroundMode ?? 'JavaScript')}`
						)}>Try this in Playground <Icon name="arrow" size={15} /></a
					>
				{/if}
			</div>
		</article>
	</section>

	<section class="glass page-learning-notes">
		<span class="eyebrow">STUDY LOOP</span>
		<h3>Turn each lesson into a repeatable practice cycle.</h3>
		<div class="notes-grid">
			<div>
				<strong>1 · Explain</strong>
				<p>State the concept in your own words.</p>
			</div>
			<div>
				<strong>2 · Modify</strong>
				<p>Change the example and predict the output before running it.</p>
			</div>
			<div>
				<strong>3 · Retrieve</strong>
				<p>Close the example and reproduce the idea from memory.</p>
			</div>
		</div>
	</section>
</main>
