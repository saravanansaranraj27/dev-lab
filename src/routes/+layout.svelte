<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Icon from '$lib/components/ui/Icon.svelte';

	let { children } = $props();
	let showLoader = $state(true);

	onMount(() => {
		const loaderTimer = window.setTimeout(() => {
			showLoader = false;
		}, 800);
		const channel = 'BroadcastChannel' in window ? new BroadcastChannel('devlab-theme') : null;
		const applyStoredTheme = () => {
			const theme = localStorage.getItem('devlab-theme');
			if (theme === 'dark' || theme === 'light') document.documentElement.dataset.theme = theme;
			else document.documentElement.removeAttribute('data-theme');
		};

		const applyStoredAccent = () => {
			const accent = localStorage.getItem('devlab-accent');
			const allowed = [
				'orange',
				'blue',
				'cyan',
				'teal',
				'green',
				'lime',
				'yellow',
				'purple',
				'pink',
				'red'
			];
			if (accent && allowed.includes(accent)) document.documentElement.dataset.accent = accent;
			else document.documentElement.dataset.accent = 'orange';
		};

		const applyWorkspacePreferences = () => {
			document.documentElement.toggleAttribute(
				'data-reduced-motion',
				localStorage.getItem('devlab-reduced-motion') === 'true'
			);
			document.documentElement.toggleAttribute(
				'data-compact',
				localStorage.getItem('devlab-compact') === 'true'
			);
		};

		const handleStorage = (event: StorageEvent) => {
			if (event.key === 'devlab-theme') applyStoredTheme();
			if (event.key === 'devlab-accent') applyStoredAccent();
			if (event.key === 'devlab-reduced-motion' || event.key === 'devlab-compact') {
				applyWorkspacePreferences();
			}
		};

		applyStoredTheme();
		applyStoredAccent();
		applyWorkspacePreferences();
		const handleBroadcast = (event: MessageEvent) => {
			const value = event.data;
			if (value === 'dark' || value === 'light') document.documentElement.dataset.theme = value;
			else if (value === 'system') document.documentElement.removeAttribute('data-theme');
			else if (typeof value === 'object' && value?.type === 'accent') {
				const allowed = [
					'orange',
					'blue',
					'cyan',
					'teal',
					'green',
					'lime',
					'yellow',
					'purple',
					'pink',
					'red'
				];
				if (allowed.includes(value.value)) document.documentElement.dataset.accent = value.value;
			}
		};

		window.addEventListener('storage', handleStorage);
		channel?.addEventListener('message', handleBroadcast);

		return () => {
			window.clearTimeout(loaderTimer);
			window.removeEventListener('storage', handleStorage);
			channel?.removeEventListener('message', handleBroadcast);
			channel?.close();
		};
	});
</script>

<svelte:head>
	<meta name="description" content="DevLab is an interactive developer learning workspace." />
	<meta name="theme-color" content="#ff3e00" />
	<title>DevLab — Learn by building</title>
</svelte:head>

{#if showLoader}
	<div class="app-loader" aria-live="polite" aria-label="Loading">
		<div class="app-loader-mark" aria-hidden="true"><Icon name="lab" size={52} /></div>
		<span>Loading....</span>
	</div>
{/if}

{@render children()}
