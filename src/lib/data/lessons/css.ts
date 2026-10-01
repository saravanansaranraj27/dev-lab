import type { Lesson } from './types';

export const cssLessons: Lesson[] = [
	{
		id: 'css-layout',
		title: 'CSS Layout: Flexbox & Grid',
		area: 'CSS',
		level: 'Beginner',
		time: '24 min',
		desc: 'Choose between one-dimensional Flexbox and two-dimensional Grid to build resilient layouts.',
		topics: ['flex', 'grid', 'gap', 'alignment'],
		concept:
			'Layout systems should express relationships between elements instead of relying on fixed coordinates.',
		example:
			'<div class="layout"><aside>Nav</aside><main>Content</main></div>\n\n<style>\n.layout { display: grid; grid-template-columns: 16rem 1fr; gap: 1rem; }\n</style>',
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'css-responsive',
		title: 'Responsive Design',
		area: 'CSS',
		level: 'Intermediate',
		time: '22 min',
		desc: 'Build layouts that reflow across phones, tablets, laptops, and large displays.',
		topics: ['media queries', 'minmax', 'clamp', 'reflow'],
		concept:
			'Responsive design adapts structure and density to available space rather than targeting a single device width.',
		example:
			'.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}\n\n@media (max-width: 48rem) {\n  .cards { grid-template-columns: 1fr; }\n}',
		runnable: true,
		playgroundMode: 'CSS'
	}
];
