<script lang="ts">
	let {
		label = 'Console',
		output = '',
		error = '',
		onClear
	}: {
		label?: string;
		output?: string;
		error?: string;
		onClear?: () => void;
	} = $props();
</script>

<div class="devlab-console glass">
	<div class="panel-bar console-bar">
		<span class="file-label"><span class="console-dot"></span>{label}</span>
		{#if onClear}
			<button type="button" onclick={onClear}>Clear</button>
		{/if}
	</div>
	<pre class="output code">{#if output}{output}{:else if !error}<span class="console-placeholder"
				>Click Run to execute your code.</span
			>{/if}</pre>
	{#if error}
		<div class="error-box">
			<strong>Execution error</strong><span>{error}</span>
		</div>
	{/if}
</div>
