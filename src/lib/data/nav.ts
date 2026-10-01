export type NavItem = {
	id: string;
	label: string;
	href: string;
	icon: string;
};

export const navItems: NavItem[] = [
	{ id: 'home', label: 'Overview', href: '/', icon: 'home' },
	{ id: 'learn', label: 'Learn', href: '/learn', icon: 'learn' },
	{ id: 'playground', label: 'Playground', href: '/playground', icon: 'playground' },
	{ id: 'visualizer', label: 'Visualizer', href: '/visualizer', icon: 'visualizer' },
	{ id: 'api', label: 'API Lab', href: '/api', icon: 'api' },
	{ id: 'tools', label: 'Toolbox', href: '/tools', icon: 'tools' },
	{ id: 'snippets', label: 'Snippets', href: '/snippets', icon: 'snippet' },
	{ id: 'patterns', label: 'Patterns', href: '/patterns', icon: 'pattern' },
	{ id: 'settings', label: 'Settings', href: '/settings', icon: 'settings' }
];
