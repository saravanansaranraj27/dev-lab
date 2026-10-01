<script lang="ts">
	let { name, size = 18 }: { name: string; size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#if name === 'home'}<path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" />
	{:else if name === 'learn'}<path
			d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"
		/><path d="M4 5.5V22" /><path d="M8 7h8M8 11h8" />
	{:else if name === 'playground'}<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
	{:else if name === 'visualizer'}<path d="M4 19V9M10 19V5M16 19v-8M22 19V3" />
	{:else if name === 'api'}<path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" />
	{:else if name === 'tools'}<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
	{:else if name === 'snippet'}<path d="M7 3h10l4 4v14H7z" /><path
			d="M17 3v5h4M10 13l-2 2 2 2M14 13l2 2-2 2"
		/>
	{:else if name === 'pattern'}<path d="M5 5h14v14H5z" /><path
			d="M9 9h6v6H9zM5 12h4M15 12h4M12 5v4M12 15v4"
		/>
	{:else if name === 'lab'}<path
			d="M9 3h6M10 3v6l-5.5 9.2A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.8L14 9V3"
		/><path d="M7.2 15h9.6" />
	{:else if name === 'settings'}<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /><path
			d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0V19a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 2.8 12a1.7 1.7 0 0 0 1.2-2.9l-.1-.1A2 2 0 1 1 6.7 6.2l.1.1A1.7 1.7 0 0 0 9.7 5V4.8a2 2 0 1 1 4 0V5a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.6 12a1.7 1.7 0 0 0-1.2 3Z"
		/>
	{:else if name === 'search'}<circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" />
	{:else if name === 'sun'}<circle cx="12" cy="12" r="4" /><path
			d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
		/>
	{:else if name === 'moon'}<path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
	{:else if name === 'menu'}<path d="M4 6h16M4 12h16M4 18h16" />
	{:else if name === 'close'}<path d="m6 6 12 12M18 6 6 18" />
	{:else if name === 'check'}<path d="m5 12 4 4L19 6" />
	{:else if name === 'copy'}<rect x="8" y="8" width="11" height="11" rx="2" /><path
			d="M5 16H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
		/>
	{:else if name === 'arrow'}<path d="M5 12h14M13 6l6 6-6 6" />
	{:else if name === 'chevron-down'}<path d="m6 9 6 6 6-6" />
	{:else if name === 'play'}<path d="m8 5 11 7-11 7z" />
	{:else if name === 'pause'}<path d="M8 5v14M16 5v14" />
	{:else if name === 'refresh'}<path
			d="M20 11a8 8 0 0 0-14.9-4L3 10m0 0V4m0 6h6M4 13a8 8 0 0 0 14.9 4L21 14m0 0v6m0-6h-6"
		/>
	{:else}<circle cx="12" cy="12" r="8" />
	{/if}
</svg>
