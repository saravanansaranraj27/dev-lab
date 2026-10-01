export type Command = {
	name: string;
	description: string;
	href: string;
	key: string;
};

export class TopbarState {
	paletteOpen = $state(false);
	query = $state('');
	commands: Command[] = [
		{ name: 'Overview', description: 'Open your DevLab workspace', href: '/', key: 'G O' },
		{ name: 'Learn', description: 'Browse interactive concepts', href: '/learn', key: 'G L' },
		{
			name: 'Playground',
			description: 'Run JavaScript experiments',
			href: '/playground',
			key: 'G P'
		},
		{ name: 'Visualizer', description: 'Step through algorithms', href: '/visualizer', key: 'G V' },
		{ name: 'API Lab', description: 'Send HTTP requests', href: '/api', key: 'G A' },
		{ name: 'Toolbox', description: 'Format, encode and inspect data', href: '/tools', key: 'G T' },
		{
			name: 'Snippets',
			description: 'Browse reusable code patterns',
			href: '/snippets',
			key: 'G S'
		},
		{
			name: 'Patterns',
			description: 'Study reusable problem-solving patterns',
			href: '/patterns',
			key: 'G R'
		}
	];
	filteredCommands = $derived(
		this.commands.filter((command) => {
			const search = this.query.trim().toLowerCase();
			return (
				!search ||
				command.name.toLowerCase().includes(search) ||
				command.description.toLowerCase().includes(search)
			);
		})
	);

	openPalette() {
		this.paletteOpen = true;
		this.query = '';
	}

	closePalette() {
		this.paletteOpen = false;
		this.query = '';
	}

	mount() {
		const handler = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && this.paletteOpen) this.closePalette();
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}

	handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) this.closePalette();
	}
}
