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
		id: 'fetch-json',
		title: 'Fetch JSON safely',
		language: 'JavaScript',
		category: 'HTTP',
		description: 'Validate status before parsing a JSON response.',
		code: `const response = await fetch('/api/data');
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);
const data = await response.json();`
	},
	{
		id: 'debounce',
		title: 'Debounce an input',
		language: 'JavaScript',
		category: 'Browser',
		description:
			'Delay repeated work until input settles, cancelling the previous timer before scheduling the next callback.',
		code: `let timer;
const schedule = (callback, delay = 250) => {
  clearTimeout(timer);
  timer = setTimeout(callback, delay);
};`
	},
	{
		id: 'throttle',
		title: 'Throttle a callback',
		language: 'JavaScript',
		category: 'Browser',
		description: 'Limit how often a frequently fired event can trigger work.',
		code: `let ready = true;
const throttled = () => {
  if (!ready) return;
  ready = false;
  requestAnimationFrame(() => { ready = true; });
};`
	},
	{
		id: 'safe-json',
		title: 'Parse JSON with a guard',
		language: 'JavaScript',
		category: 'Data',
		description:
			'Turn malformed external JSON into a controlled null result instead of letting parsing errors escape.',
		code: `const parseJson = (value) => {
  try { return JSON.parse(value); } catch { return null; }
};`
	},
	{
		id: 'event-delegation',
		title: 'Event delegation',
		language: 'JavaScript',
		category: 'DOM',
		description:
			'Handle interactions from many child elements through one listener on their stable parent.',
		code: `list.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest('[data-action]') : null;
  if (!target) return;
  handleAction(target.getAttribute('data-action'));
});`
	}
];
