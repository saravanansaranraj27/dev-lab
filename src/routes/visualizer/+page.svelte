<script>
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { VisualizerPageState } from '$lib/features/visualizer/visualizer.svelte';

	const state = new VisualizerPageState();
</script>

<Sidebar active="visualizer" />
<main class="page-shell page-visualizer">
	<Topbar
		title="Algorithm Visualizer"
		subtitle="Watch comparisons, moves and swaps happen step by step with controllable playback."
	/>

	<section class="controls glass">
		<div class="field algorithm-field">
			<Select
				value={state.algorithm}
				options={state.algorithmOptions}
				label="Algorithm"
				ariaLabel="Algorithm"
				onchange={(value) => state.setAlgorithm(value)}
			/>
		</div>

		<label class="field size-field">
			<span>Items · {state.size}</span>
			<input
				type="range"
				min="6"
				max="24"
				bind:value={state.size}
				onchange={() => state.changeSize()}
				aria-label="Array size"
			/>
		</label>

		<label class="field speed-field">
			<span>Speed · {state.speedLabel}</span>
			<input
				type="range"
				min="80"
				max="800"
				step="20"
				bind:value={state.speed}
				oninput={() => state.changeSpeed()}
				aria-label="Animation speed"
			/>
		</label>

		<div class="control-actions">
			<button class="button" type="button" onclick={() => state.randomArray()}
				><Icon name="refresh" size={15} /> New array</button
			>
			<button
				class="button"
				type="button"
				onclick={() => state.previous()}
				disabled={state.stepIndex === 0}><Icon name="arrow" size={15} /> Prev</button
			>
			<button
				class="button"
				type="button"
				onclick={() => state.next()}
				disabled={state.stepIndex >= state.steps.length - 1}
				>Next <Icon name="arrow" size={15} /></button
			>
			<button class="button primary" type="button" onclick={() => state.play()}>
				{state.playing ? 'Pause' : state.stepIndex >= state.steps.length - 1 ? 'Replay' : 'Play'}
				<Icon name={state.playing ? 'pause' : 'play'} size={15} />
			</button>
		</div>
	</section>

	<section class="visual glass">
		<div class="visual-head">
			<div>
				<span class="eyebrow">STEP {state.stepIndex + 1} / {state.steps.length}</span>
				<h2>{state.current.label}</h2>
				<p>{state.currentInfo.description}</p>
				<p>Comparisons {state.current.comparisons} · Writes / swaps {state.current.swaps}</p>
			</div>
			<div class="legend">
				<span><i class="legend-dot normal"></i>Value</span>
				<span><i class="legend-dot active"></i>Active</span>
			</div>
		</div>

		<div class="bars" aria-label="Algorithm state">
			{#each state.current.values as value, index (index)}
				<div class:active={state.current.active.includes(index)} class="bar-wrap">
					<div class="bar-track">
						<span class="bar" style={`height: ${Math.max(24, value * 2.4)}px`}></span>
					</div>
					<small>{value}</small>
				</div>
			{/each}
		</div>

		<div class="visual-footer">
			<span>Array updates after every operation.</span>
			<span>{state.playing ? `Playing every ${state.speed} ms` : 'Manual step mode'}</span>
		</div>
	</section>

	<section class="info-grid">
		<article class="glass info">
			<span>ALGORITHM</span><strong>{state.algorithm}</strong>
			<p>{state.currentInfo.description}</p>
		</article>
		<article class="glass info">
			<span>COMPLEXITY</span><strong>{state.currentInfo.complexity}</strong>
			<p>
				Space: {state.currentInfo.space}. Use the step counter to connect the visual state to the
				algorithm.
			</p>
		</article>
		<article class="glass info">
			<span>PLAYBACK</span><strong>{state.speedLabel}</strong>
			<p>
				Use the playback controls to inspect each {state.algorithm} operation at your own pace.
			</p>
		</article>
	</section>

	<section class="page-bottom-section glass visualizer-bottom">
		<div class="bottom-section-head">
			<span class="eyebrow">UNDERSTAND THE VISUAL</span>
			<h2>Connect each animation step to the algorithm.</h2>
		</div>
		<div class="bottom-section-grid">
			<article>
				<span class="eyebrow">WHY IT WORKS</span>
				<strong>{state.algorithm} mental model</strong>
				<p>{state.currentInfo.description}</p>
				<p>
					The input stays fixed while the selected algorithm rebuilds its operation sequence, making
					the state transitions directly inspectable.
				</p>
			</article>
			<article>
				<span class="eyebrow">OPERATION TRACE</span>
				<strong>Operation trace</strong>
				<p>
					{state.current.label}. Comparison count: {state.current.comparisons}. Writes or swaps: {state
						.current.swaps}.
				</p>
				<p>The active indexes show which values the current operation is inspecting or changing.</p>
			</article>
		</div>
	</section>
</main>
