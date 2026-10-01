import { onMount } from 'svelte';

export type ThemeMode = 'dark' | 'light' | 'system';
export type AccentColor =
	'orange' | 'blue' | 'cyan' | 'teal' | 'green' | 'lime' | 'yellow' | 'purple' | 'pink' | 'red';

export class SettingsPageState {
	theme = $state<ThemeMode>('dark');
	accent = $state<AccentColor>('orange');
	reduced = $state(false);
	compact = $state(false);
	saved = $state(false);
	private channel: BroadcastChannel | null = null;

	constructor() {
		onMount(() => {
			this.channel = 'BroadcastChannel' in window ? new BroadcastChannel('devlab-theme') : null;
			const stored = localStorage.getItem('devlab-theme');
			const storedAccent = localStorage.getItem('devlab-accent');
			if (stored === 'dark' || stored === 'light' || stored === 'system') {
				this.theme = stored;
				this.applyTheme(stored);
			}
			if (
				[
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
				].includes(storedAccent ?? '')
			) {
				this.accent = storedAccent as AccentColor;
				this.applyAccent(this.accent);
			}
			this.reduced = localStorage.getItem('devlab-reduced-motion') === 'true';
			this.compact = localStorage.getItem('devlab-compact') === 'true';
			this.applyWorkspacePreferences();

			const handleStorage = (event: StorageEvent) => {
				if (!event.newValue) return;
				if (
					event.key === 'devlab-theme' &&
					(event.newValue === 'dark' || event.newValue === 'light' || event.newValue === 'system')
				) {
					this.theme = event.newValue;
					this.applyTheme(event.newValue);
				} else if (
					event.key === 'devlab-accent' &&
					[
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
					].includes(event.newValue)
				) {
					this.accent = event.newValue as AccentColor;
					this.applyAccent(this.accent);
				}
			};
			const handleBroadcast = (event: MessageEvent) => {
				const value = event.data;
				if (typeof value === 'object' && value?.type === 'accent') {
					if (
						[
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
						].includes(value.value)
					) {
						this.accent = value.value;
						this.applyAccent(value.value);
					}
					return;
				}
				if (value !== 'dark' && value !== 'light' && value !== 'system') return;
				this.theme = value;
				this.applyTheme(value);
			};

			window.addEventListener('storage', handleStorage);
			this.channel?.addEventListener('message', handleBroadcast);
			return () => {
				window.removeEventListener('storage', handleStorage);
				this.channel?.removeEventListener('message', handleBroadcast);
				this.channel?.close();
				this.channel = null;
			};
		});
	}

	applyTheme(value: ThemeMode) {
		if (value === 'system') document.documentElement.removeAttribute('data-theme');
		else document.documentElement.dataset.theme = value;
	}

	setAccent(value: string) {
		if (
			![
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
			].includes(value)
		)
			return;
		const next = value as AccentColor;
		this.accent = next;
		localStorage.setItem('devlab-accent', next);
		this.applyAccent(next);
		this.channel?.postMessage({ type: 'accent', value: next });
		this.flash();
	}

	applyAccent(value: AccentColor) {
		document.documentElement.dataset.accent = value;
	}

	setTheme(value: string) {
		if (value !== 'dark' && value !== 'light' && value !== 'system') return;
		const next = value as ThemeMode;
		this.theme = next;
		localStorage.setItem('devlab-theme', next);
		this.applyTheme(next);
		this.channel?.postMessage(next);
		this.flash();
	}

	applyWorkspacePreferences() {
		document.documentElement.toggleAttribute('data-reduced-motion', this.reduced);
		document.documentElement.toggleAttribute('data-compact', this.compact);
	}

	setReduced(value: boolean) {
		this.reduced = value;
		localStorage.setItem('devlab-reduced-motion', String(value));
		this.applyWorkspacePreferences();
		this.flash();
	}

	setCompact(value: boolean) {
		this.compact = value;
		localStorage.setItem('devlab-compact', String(value));
		this.applyWorkspacePreferences();
		this.flash();
	}

	resetPreferences() {
		localStorage.removeItem('devlab-theme');
		localStorage.removeItem('devlab-accent');
		localStorage.removeItem('devlab-reduced-motion');
		localStorage.removeItem('devlab-compact');
		this.theme = 'system';
		this.accent = 'orange';
		this.applyAccent('orange');
		this.channel?.postMessage({ type: 'accent', value: 'orange' });
		this.reduced = false;
		this.compact = false;
		this.applyTheme('system');
		this.applyWorkspacePreferences();
		this.flash();
	}

	private flash() {
		this.saved = true;
		window.setTimeout(() => (this.saved = false), 1200);
	}
}
