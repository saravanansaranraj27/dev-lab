export type Snippet = {
	id: string;
	title: string;
	language: string;
	category: string;
	description: string;
	code: string;
};

export const snippets: Snippet[] = [
	{
		id: 'css-grid',
		title: 'Responsive grid',
		language: 'CSS',
		category: 'Layout',
		description: 'Let cards wrap naturally without device-specific breakpoints.',
		code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}`
	},
	{
		id: 'flex-center',
		title: 'Flex centering',
		language: 'CSS',
		category: 'Layout',
		description: 'Center content on both axes with a minimal layout rule.',
		code: `.center {
  display: flex;
  align-items: center;
  justify-content: center;
}`
	},
	{
		id: 'fluid-type',
		title: 'Fluid typography',
		language: 'CSS',
		category: 'Typography',
		description: 'Scale headings smoothly between viewport sizes.',
		code: `h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}`
	},
	{
		id: 'focus-visible',
		title: 'Accessible focus',
		language: 'CSS',
		category: 'Accessibility',
		description: 'Show keyboard focus without adding persistent outlines for pointer users.',
		code: `button:focus-visible, a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}`
	},
	{
		id: 'responsive-stack',
		title: 'Responsive stack',
		language: 'CSS',
		category: 'Responsive',
		description: 'Stack a row naturally when the available width becomes constrained.',
		code: `.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 1rem;
}`
	}
];
