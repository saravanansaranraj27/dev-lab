<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { labs, lessons } from '$lib/features/home/home';
	const route = (path: string) => resolve(path as RouteId);
</script>

<Sidebar active="home" />

<main class="page-shell page-home">
	<Topbar
		title="Developer workspace"
		subtitle="A practical lab for learning, experimenting, debugging and building."
	/>

	<section class="hero glass">
		<div class="hero-copy">
			<span class="learn-try-build">LEARN → TRY → BUILD</span>
			<h2>Make concepts <em>click</em> through practice.</h2>
			<p>
				DevLab combines short explanations with runnable experiments, visual feedback, developer
				utilities and focused practice. Everything runs in your browser.
			</p>
			<div class="hero-actions">
				<a class="button primary" href={resolve('/learn')}
					>Start learning <Icon name="arrow" size={15} /></a
				>
				<a class="button" href={resolve('/playground')}>Open playground</a>
			</div>
		</div>

		<div class="hero-console code">
			<div class="console-bar"><span></span><span></span><span></span><small>devlab.js</small></div>
			<pre><code
					><span class="kw">const</span> idea = <span class="str">"learn by doing"</span>;
<span class="kw">const</span> labs = <span class="num"
						>&#123;lessons: {lessons.length}, labs: {labs.length}&#125;</span
					>;

<span class="fn">console</span>.log(idea);
<span class="comment">your browser, your experiments</span></code
				></pre>
		</div>
	</section>

	<section class="quick-grid" aria-label="Workspace capabilities">
		<article class="glass quick">
			<span class="quick-icon"><Icon name="search" size={18} /></span>
			<div>
				<strong>Command palette</strong>
				<p>Use search to jump anywhere.</p>
			</div>
		</article>
		<article class="glass quick">
			<span class="quick-icon"><Icon name="play" size={18} /></span>
			<div>
				<strong>Instant experiments</strong>
				<p>Run code locally without an account.</p>
			</div>
		</article>
		<article class="glass quick">
			<span class="quick-icon"><Icon name="visualizer" size={18} /></span>
			<div>
				<strong>Responsive by default</strong>
				<p>Designed for small screens and desktop.</p>
			</div>
		</article>
	</section>

	<section class="section-head">
		<div>
			<span class="eyebrow">WORKSPACE</span>
			<h3>Choose a lab</h3>
		</div>
		<span class="count">{labs.length} interactive labs</span>
	</section>

	<section class="lab-grid">
		{#each labs as lab (lab.href)}
			<a class="glass lab-card" href={route(lab.href)}>
				<span class="lab-icon"><Icon name={lab.icon} size={19} /></span>
				<div>
					<strong>{lab.label}</strong>
					<p>{lab.desc}</p>
				</div>
				<span class="arrow"><Icon name="arrow" size={15} /></span>
			</a>
		{/each}
	</section>

	<section class="lower-grid">
		<article class="glass panel">
			<div class="panel-head">
				<div>
					<span class="eyebrow">LEARNING PATH</span>
					<h3>Concepts to explore</h3>
				</div>
				<a href={resolve('/learn')}>View lessons</a>
			</div>
			<div class="lesson-list">
				{#each lessons.slice(0, 4) as lesson (lesson.id)}
					<a href={resolve('/learn')} class="lesson-row">
						<span class="lesson-number">{lesson.id.slice(0, 2).toUpperCase()}</span>
						<span class="lesson-copy"
							><strong>{lesson.title}</strong><small
								>{lesson.area} · {lesson.level} · {lesson.time}</small
							></span
						>
						<span class="arrow"><Icon name="arrow" size={15} /></span>
					</a>
				{/each}
			</div>
		</article>

		<article class="glass panel">
			<div class="panel-head">
				<div>
					<span class="eyebrow">REFERENCE</span>
					<h3>Snippets and patterns</h3>
				</div>
			</div>
			<div class="reference-list">
				<a href={resolve('/snippets')} class="reference-row">
					<span><strong>Snippets</strong><small>Reusable implementation techniques.</small></span>
					<Icon name="arrow" size={15} />
				</a>
				<a href={resolve('/patterns')} class="reference-row">
					<span
						><strong>Patterns</strong><small>Problem-solving structures and trade-offs.</small
						></span
					>
					<Icon name="arrow" size={15} />
				</a>
			</div>
		</article>
	</section>

	<section class="glass page-learning-notes">
		<span class="eyebrow">HOW TO USE DEVLAB</span>
		<h3>Learn by moving between explanation and execution.</h3>
		<div class="notes-grid">
			<div>
				<strong>Read</strong>
				<p>Start with a focused concept and its mental model.</p>
			</div>
			<div>
				<strong>Experiment</strong>
				<p>Change the example in a matching lab and observe the result.</p>
			</div>
			<div>
				<strong>Practice</strong>
				<p>Use the visualizer and pattern library to retrieve the approach without copying it.</p>
			</div>
		</div>
	</section>
</main>
