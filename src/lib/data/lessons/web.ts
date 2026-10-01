import type { Lesson } from './types';

export const webLessons: Lesson[] = [
	{
		id: 'html-semantics',
		title: 'Semantic HTML',
		area: 'HTML',
		level: 'Beginner',
		time: '18 min',
		desc: 'Use headings, landmarks, buttons, links, forms, and lists according to their meaning.',
		topics: ['landmarks', 'headings', 'forms', 'buttons'],
		concept:
			'Semantic elements communicate structure to browsers, assistive technology, search systems, and other developers.',
		example: '<main>\n  <h1>Account settings</h1>\n  <button type="button">Save</button>\n</main>',
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'html-forms',
		title: 'Forms & Validation',
		area: 'HTML',
		level: 'Intermediate',
		time: '20 min',
		desc: 'Build accessible forms with labels, native input types, constraints, and clear submission behavior.',
		topics: ['label', 'required', 'input types', 'validation'],
		concept:
			'Native form controls provide semantics and baseline validation before JavaScript adds custom behavior.',
		example:
			'<form>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Save</button>\n</form>',
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'web-dom',
		title: 'DOM & Browser APIs',
		area: 'Web',
		level: 'Beginner',
		time: '22 min',
		desc: 'Work with the document tree, events, storage, timers, and browser-provided APIs through the DOM and Web APIs.',
		topics: ['DOM', 'events', 'storage', 'timers'],
		concept:
			'The DOM is a live object model of the document. Browser APIs extend JavaScript with capabilities such as storage and events.',
		example:
			'<button id="toggle" type="button">Toggle state</button>\n<script>\n  const button = document.querySelector("#toggle");\n  button?.addEventListener("click", () => {\n    document.body.dataset.active = "true";\n  });\n</script>',
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'http',
		title: 'HTTP Fundamentals',
		area: 'Web',
		level: 'Intermediate',
		time: '24 min',
		desc: 'Explore methods, status codes, headers, bodies, caching, and the request/response model.',
		topics: ['GET', 'POST', 'status codes', 'headers'],
		concept:
			'HTTP communicates intent with methods and reports outcomes with status codes. Headers carry metadata about the request and response.',
		example:
			'const request = {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ enabled: true })\n};\n\nconsole.log(request);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'fetch',
		title: 'Fetch & API Errors',
		area: 'Web',
		level: 'Intermediate',
		time: '24 min',
		desc: 'Make browser requests, check response status, parse JSON, and handle network failures.',
		topics: ['fetch', 'response.ok', 'JSON', 'errors'],
		concept:
			'fetch rejects for network failures, not ordinary HTTP error statuses, so application code should check response.ok or status explicitly.',
		example:
			'async function load() {\n  const response = await fetch("data:application/json,%7B%22ok%22%3Atrue%7D");\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  return response.json();\n}\n\nload().then(console.log);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'json',
		title: 'JSON Data Modeling',
		area: 'Web',
		level: 'Beginner',
		time: '16 min',
		desc: 'Validate, parse, stringify, and model nested JSON without confusing it with JavaScript objects.',
		topics: ['parse', 'stringify', 'arrays', 'objects'],
		concept:
			'JSON is a data interchange format. It has a smaller value model than JavaScript and requires serialization at boundaries.',
		example: '{\n  "enabled": true,\n  "items": [1, 2, 3],\n  "meta": { "version": 1 }\n}',
		runnable: true,
		playgroundMode: 'JSON'
	},
	{
		id: 'accessibility',
		title: 'Accessibility Fundamentals',
		area: 'Web',
		level: 'Intermediate',
		time: '26 min',
		desc: 'Build keyboard-accessible interfaces with semantic HTML, visible focus, labels, and sensible interaction states.',
		topics: ['keyboard', 'focus', 'labels', 'semantics'],
		concept:
			'Accessible interfaces expose the same task through multiple input modes and preserve meaningful semantics.',
		example:
			'<button type="button" aria-label="Copy code">Copy</button>\n<style>button:focus-visible { outline: 2px solid currentColor; }</style>',
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'performance',
		title: 'Web Performance Basics',
		area: 'Web',
		level: 'Advanced',
		time: '26 min',
		desc: 'Reason about loading, rendering, JavaScript cost, network waterfalls, and interaction latency.',
		topics: ['loading', 'rendering', 'bundle size', 'interaction'],
		concept:
			'Performance is about user-visible latency. Measure the slow path before optimizing and protect the critical path.',
		example:
			'const start = performance.now();\nfor (let i = 0; i < 100_000; i += 1) Math.sqrt(i);\nconst duration = performance.now() - start;\nconsole.log(`${duration.toFixed(1)}ms`);',
		runnable: true,
		playgroundMode: 'JavaScript'
	}
];
