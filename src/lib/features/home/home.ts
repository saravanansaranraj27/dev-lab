import { lessons } from '$lib/data/lessons';

export const labs = [
	{
		href: '/playground',
		icon: 'playground',
		label: 'Code Playground',
		desc: 'Run JavaScript snippets and inspect output instantly.'
	},
	{
		href: '/visualizer',
		icon: 'visualizer',
		label: 'Algorithm Visualizer',
		desc: 'Watch sorting algorithms change state step by step.'
	},
	{
		href: '/api',
		icon: 'api',
		label: 'API Lab',
		desc: 'Compose HTTP requests and inspect real responses.'
	},
	{
		href: '/tools',
		icon: 'tools',
		label: 'Developer Toolbox',
		desc: 'Format JSON, encode URLs, decode Base64 and more.'
	},
	{
		href: '/snippets',
		icon: 'snippet',
		label: 'Snippets',
		desc: 'Keep reusable implementation patterns close at hand.'
	},
	{
		href: '/patterns',
		icon: 'pattern',
		label: 'Patterns',
		desc: 'Study repeatable approaches for common engineering problems.'
	}
];

export { lessons };
