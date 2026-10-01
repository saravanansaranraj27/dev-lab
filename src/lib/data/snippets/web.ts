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
		id: 'abort-fetch',
		title: 'Abort a request',
		language: 'Web',
		category: 'HTTP',
		description: 'Cancel a request that is no longer needed, such as a stale search or navigation.',
		code: `const controller = new AbortController();
const request = fetch('/api/data', { signal: controller.signal });
controller.abort();

try {
  await request;
} catch (error) {
  if (error.name !== 'AbortError') throw error;
}`
	},
	{
		id: 'url-search-params',
		title: 'Build query parameters',
		language: 'Web',
		category: 'HTTP',
		description: 'Encode query values without manual string concatenation.',
		code: `const params = new URLSearchParams({ query, page: String(page) });
const url = \`/search?\${params}\`;`
	},
	{
		id: 'local-storage',
		title: 'Safe local storage',
		language: 'Web',
		category: 'Browser',
		description: 'Persist small non-sensitive preferences with JSON serialization.',
		code: `localStorage.setItem('settings', JSON.stringify(settings));
const saved = JSON.parse(localStorage.getItem('settings') ?? 'null');`
	},
	{
		id: 'custom-event',
		title: 'Custom event',
		language: 'Web',
		category: 'Browser',
		description: 'Decouple small browser components with typed custom events.',
		code: `const event = new CustomEvent('devlab:refresh', { detail: { source: 'toolbar' } });
window.dispatchEvent(event);`
	},
	{
		id: 'intersection-observer',
		title: 'Intersection observer',
		language: 'Web',
		category: 'Browser',
		description: 'React to visibility changes without continuously polling scroll position.',
		code: `const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) loadMore();
});
observer.observe(target);`
	}
];
