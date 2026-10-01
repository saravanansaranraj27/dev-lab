<script lang="ts">
	import { navItems } from '$lib/data/nav';
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
	import Icon from '$lib/components/ui/Icon.svelte';

	let { active = 'home' } = $props<{ active?: string }>();
	const route = (path: string) => resolve(path as RouteId);
</script>

<div class="sidebar-component">
	<aside class="sidebar glass" aria-label="Primary navigation">
		<a class="brand" href={resolve('/')} aria-label="DevLab overview">
			<span class="brand-mark"><Icon name="lab" size={23} /></span>
			<span class="brand-copy"><strong>DevLab</strong><small>Developer learning lab</small></span>
		</a>

		<div class="section-label">WORKSPACE</div>
		<nav class="nav-list">
			{#each navItems as item (item.id)}
				<a
					class:active={active === item.id}
					href={route(item.href)}
					aria-current={active === item.id ? 'page' : undefined}
				>
					<span class="nav-icon"><Icon name={item.icon} size={17} /></span>
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>
	</aside>

	<a class="mobile-brand" href={resolve('/')} aria-label="DevLab overview">
		<span class="brand-mark"><Icon name="lab" size={23} /></span>
		<span class="brand-copy"><strong>DevLab</strong><small>Developer learning lab</small></span>
	</a>

	<nav class="mobile-nav glass" aria-label="Mobile navigation">
		{#each navItems as item (item.id)}
			<a
				class:active={active === item.id}
				href={route(item.href)}
				aria-current={active === item.id ? 'page' : undefined}
			>
				<Icon name={item.icon} size={17} />
				<small>{item.label}</small>
			</a>
		{/each}
	</nav>
</div>
