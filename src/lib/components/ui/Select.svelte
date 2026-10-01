<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	type SelectOption = { value: string; label: string; disabled?: boolean };
	type SelectItem = string | SelectOption;

	let {
		value = $bindable(''),
		options = [],
		label = '',
		ariaLabel = '',
		id = undefined,
		onchange = undefined
	}: {
		value?: string;
		options?: readonly SelectItem[];
		label?: string;
		ariaLabel?: string;
		id?: string;
		onchange?: (value: string) => void;
	} = $props();

	const items = $derived(
		options.map((option) =>
			typeof option === 'string' ? { value: option, label: option } : option
		)
	);

	let open = $state(false);
	let highlightedIndex = $state(0);
	let control = $state<HTMLDivElement | null>(null);

	const selectedIndex = $derived(
		Math.max(
			0,
			items.findIndex((item) => item.value === value)
		)
	);
	const selected = $derived(items[selectedIndex] ?? items[0]);
	const listboxId = $derived(id ? `${id}-options` : undefined);

	function enabledIndex(start: number, direction: 1 | -1) {
		if (!items.length) return -1;
		let index = start;
		for (let count = 0; count < items.length; count += 1) {
			if (!items[index]?.disabled) return index;
			index = (index + direction + items.length) % items.length;
		}
		return -1;
	}

	function selectIndex(index: number) {
		const option = items[index];
		if (!option || option.disabled) return;
		value = option.value;
		onchange?.(option.value);
		highlightedIndex = index;
		open = false;
	}

	function openMenu() {
		if (!items.length) return;
		open = true;
		highlightedIndex = enabledIndex(selectedIndex, 1);
	}

	function toggleMenu() {
		if (open) open = false;
		else openMenu();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!items.length) return;

		if (!open) {
			if (
				event.key === 'ArrowDown' ||
				event.key === 'ArrowUp' ||
				event.key === 'Enter' ||
				event.key === ' '
			) {
				event.preventDefault();
				openMenu();
			}
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				highlightedIndex = enabledIndex((highlightedIndex + 1) % items.length, 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				highlightedIndex = enabledIndex((highlightedIndex - 1 + items.length) % items.length, -1);
				break;
			case 'Home':
				event.preventDefault();
				highlightedIndex = enabledIndex(0, 1);
				break;
			case 'End':
				event.preventDefault();
				highlightedIndex = enabledIndex(items.length - 1, -1);
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				selectIndex(highlightedIndex);
				break;
			case 'Escape':
				event.preventDefault();
				open = false;
				break;
			case 'Tab':
				open = false;
				break;
		}
	}

	function handleWindowClick(event: MouseEvent) {
		if (!open || !control) return;
		if (event.target instanceof Node && !control.contains(event.target)) open = false;
	}

	onMount(() => {
		const handleResize = () => {
			if (open) open = false;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<svelte:window onclick={handleWindowClick} />

<div class="dev-select" bind:this={control}>
	{#if label}<span class="dev-select-label">{label}</span>{/if}
	<div class="dev-select-control">
		<button
			{id}
			class="dev-select-trigger"
			type="button"
			aria-label={ariaLabel || label}
			aria-haspopup="listbox"
			aria-expanded={open}
			aria-controls={listboxId}
			onclick={toggleMenu}
			onkeydown={handleKeydown}
		>
			<span class="dev-select-value">{selected?.label ?? 'Select an option'}</span>
			<Icon name="chevron-down" size={17} />
		</button>

		{#if open}
			<div
				class="dev-select-menu"
				role="listbox"
				id={listboxId}
				aria-label={ariaLabel || label || 'Options'}
			>
				{#each items as option, index (option.value)}
					<button
						class:selected={option.value === value}
						class:highlighted={index === highlightedIndex}
						class:disabled={option.disabled}
						type="button"
						role="option"
						aria-selected={option.value === value}
						aria-disabled={option.disabled || undefined}
						disabled={option.disabled}
						onmouseenter={() => (highlightedIndex = index)}
						onclick={() => selectIndex(index)}
					>
						<span>{option.label}</span>
						{#if option.value === value}<Icon name="check" size={15} />{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
