import type { Lesson } from './types';

export const supplementalLessons: Lesson[] = [
	{
		id: 'supplemental-1',
		title: 'Promises and chaining',
		area: 'JavaScript',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Handle dependent asynchronous work with predictable sequencing.',
		topics: ['promises and chaining', 'javascript'],
		concept: 'Handle dependent asynchronous work with predictable sequencing.',
		example: `const load = (value) => Promise.resolve(value).then((next) => next * 2);
load(21).then(console.log);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-2',
		title: 'Union narrowing',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Turn a union into a safe concrete branch.',
		topics: ['union narrowing', 'typescript'],
		concept: 'Turn a union into a safe concrete branch.',
		example: `function label(value: string | number) {
  return typeof value === 'string' ? value.toUpperCase() : value.toFixed(0);
}
console.log(label('dev'));`,
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'supplemental-3',
		title: 'Generic constraints',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Restrict generic inputs to the operations they require.',
		topics: ['generic constraints', 'typescript'],
		concept: 'Restrict generic inputs to the operations they require.',
		example: `function lengthOf<T extends { length: number }>(value: T) {
  return value.length;
}
console.log(lengthOf('dev'));`,
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'supplemental-4',
		title: 'Mapped types',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Transform the keys of an existing object type.',
		topics: ['mapped types', 'typescript'],
		concept: 'Transform the keys of an existing object type.',
		example: `type Flags<T> = { [K in keyof T]: boolean };
type Options = { compact: string; dark: string };
const flags: Flags<Options> = { compact: true, dark: false };
console.log(flags);`,
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'supplemental-5',
		title: 'Utility types',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Reuse built-in transformations for common type tasks.',
		topics: ['utility types', 'typescript'],
		concept: 'Reuse built-in transformations for common type tasks.',
		example: `type User = { id: string; name: string; email: string };
type Preview = Pick<User, 'id' | 'name'>;
type Patch = Partial<User>;
const preview: Preview = { id: 'u1', name: 'Ada' };
console.log(preview);`,
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'supplemental-6',
		title: 'Function overloads',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Describe multiple call signatures for one implementation.',
		topics: ['function overloads', 'typescript'],
		concept: 'Describe multiple call signatures for one implementation.',
		example: `function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date) {
  return value instanceof Date ? value.toISOString() : String(value);
}
console.log(format(42));`,
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'supplemental-7',
		title: 'Type predicates',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Teach the compiler about a runtime check.',
		topics: ['type predicates', 'typescript'],
		concept: 'Teach the compiler about a runtime check.',
		example: `const isString = (value: unknown): value is string => typeof value === 'string';
const value: unknown = 'ready';
if (isString(value)) console.log(value.toUpperCase());`,
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'supplemental-8',
		title: 'Semantic sections',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Use structural elements to communicate page meaning.',
		topics: ['semantic sections', 'html'],
		concept: 'Use structural elements to communicate page meaning.',
		example: `<main>
  <section aria-labelledby="profile-title">
    <h2 id="profile-title">Profile</h2>
  </section>
</main>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-9',
		title: 'Accessible labels',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Give controls an accessible name.',
		topics: ['accessible labels', 'html'],
		concept: 'Give controls an accessible name.',
		example: `<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-10',
		title: 'Form controls',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Pair inputs with labels and useful constraints.',
		topics: ['form controls', 'html'],
		concept: 'Pair inputs with labels and useful constraints.',
		example: `<label for="age">Age</label>
<input id="age" name="age" type="number" min="13" required>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-11',
		title: 'Button versus link',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Choose controls based on the action they perform.',
		topics: ['button versus link', 'html'],
		concept: 'Choose controls based on the action they perform.',
		example: `<a href="/account">View account</a>
<button type="button" onclick="console.log('Save changes')">Save changes</button>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-12',
		title: 'Responsive images',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Serve images that adapt to viewport and density.',
		topics: ['responsive images', 'html'],
		concept: 'Serve images that adapt to viewport and density.',
		example: `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3C/svg%3E" srcset="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3C/svg%3E" 400w, data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3C/svg%3E" 800w" sizes="(max-width: 48rem) 100vw, 50vw" alt="Mountain trail">`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-13',
		title: 'Data attributes',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Attach small pieces of DOM state to elements.',
		topics: ['data attributes', 'html'],
		concept: 'Attach small pieces of DOM state to elements.',
		example: `<button type="button" data-action="archive">Archive</button>
<script>
  const button = document.querySelector('[data-action=archive]');
  console.log(button?.dataset.action);
</script>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-14',
		title: 'Dialog element',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Build native modal interactions with semantic markup.',
		topics: ['dialog element', 'html'],
		concept: 'Build native modal interactions with semantic markup.',
		example: `<button type="button" onclick="document.querySelector('#confirm-dialog').showModal()">Delete</button>
<dialog id="confirm-dialog">
  <p>Delete this item?</p>
  <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
</dialog>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-15',
		title: 'Details disclosure',
		area: 'HTML',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Create expandable content without custom state.',
		topics: ['details disclosure', 'html'],
		concept: 'Create expandable content without custom state.',
		example: `<details>
  <summary>Show advanced options</summary>
  <p>Additional settings appear here.</p>
</details>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-16',
		title: 'HTTP methods',
		area: 'Web',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Match request methods to their intended semantics.',
		topics: ['http methods', 'web'],
		concept: 'Match request methods to their intended semantics.',
		example: `const request = { method: 'POST', body: JSON.stringify({ enabled: true }) };
console.log(request);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-17',
		title: 'HTTP status codes',
		area: 'Web',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Interpret response classes before handling a result.',
		topics: ['http status codes', 'web'],
		concept: 'Interpret response classes before handling a result.',
		example: `const status = 404;
if (status >= 400) console.log('Request failed');`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-18',
		title: 'Cookies',
		area: 'Web',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Understand browser cookie storage and request behavior.',
		topics: ['cookies', 'web'],
		concept: 'Understand browser cookie storage and request behavior.',
		example: `<button type="button" onclick="document.cookie = 'theme=dark; Path=/; SameSite=Lax'; console.log(document.cookie)">Set theme cookie</button>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-19',
		title: 'CORS',
		area: 'Web',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Reason about cross-origin browser requests.',
		topics: ['cors', 'web'],
		concept: 'Reason about cross-origin browser requests.',
		example: `const request = new Request('https://api.example.com/data', { mode: 'cors' });
console.log(request.mode, request.url);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-20',
		title: 'Cascade layers',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Control precedence explicitly with named layers.',
		topics: ['cascade layers', 'css'],
		concept: 'Control precedence explicitly with named layers.',
		example: `@layer reset, components;

@layer components {
  .card { padding: 1rem; }
}

@layer reset {
  .card { margin: 0; }
}`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-21',
		title: 'Container queries',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Style components from their own available space.',
		topics: ['container queries', 'css'],
		concept: 'Style components from their own available space.',
		example: `.card {
  container-type: inline-size;
}
@container (min-width: 30rem) {
  .card { display: grid; grid-template-columns: 1fr 1fr; }
}`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-22',
		title: 'CSS variables',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Share theme values and reusable design tokens.',
		topics: ['css variables', 'css'],
		concept: 'Share theme values and reusable design tokens.',
		example: `:root { --space: 1rem; --surface: #fff; }
.card { padding: var(--space); background: var(--surface); }`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-23',
		title: 'Grid areas',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Name layout regions for readable page structure.',
		topics: ['grid areas', 'css'],
		concept: 'Name layout regions for readable page structure.',
		example: `.layout {
  display: grid;
  grid-template-areas: 'header header' 'nav main';
  grid-template-columns: 12rem 1fr;
}
header { grid-area: header; }
nav { grid-area: nav; }
main { grid-area: main; }`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-24',
		title: 'Flex alignment',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Control main and cross-axis alignment.',
		topics: ['flex alignment', 'css'],
		concept: 'Control main and cross-axis alignment.',
		example: `.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-25',
		title: 'Positioning',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Choose static, relative, absolute, fixed, or sticky behavior.',
		topics: ['positioning', 'css'],
		concept: 'Choose static, relative, absolute, fixed, or sticky behavior.',
		example: `.card { position: relative; }
.badge { position: absolute; inset: 0.5rem 0.5rem auto auto; }`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-26',
		title: 'Transitions',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Animate state changes without scripting.',
		topics: ['transitions', 'css'],
		concept: 'Animate state changes without scripting.',
		example: `.button { transition: transform 160ms ease, opacity 160ms ease; }
.button:hover { transform: translateY(-1px); opacity: 0.9; }`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-27',
		title: 'Focus states',
		area: 'CSS',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Make keyboard focus visible and consistent.',
		topics: ['focus states', 'css'],
		concept: 'Make keyboard focus visible and consistent.',
		example: `.button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }`,
		runnable: true,
		playgroundMode: 'CSS'
	},
	{
		id: 'supplemental-28',
		title: 'WHERE filtering',
		area: 'SQL',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Filter rows before they enter later query stages.',
		topics: ['where filtering', 'sql'],
		concept: 'Filter rows before they enter later query stages.',
		example: `SELECT id, total
FROM orders
WHERE total >= 100;`,
		runnable: true,
		playgroundMode: 'SQL'
	},
	{
		id: 'supplemental-29',
		title: 'ORDER BY',
		area: 'SQL',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Sort result sets by one or more expressions.',
		topics: ['order by', 'sql'],
		concept: 'Sort result sets by one or more expressions.',
		example: `SELECT id, total
FROM orders
ORDER BY total DESC;`,
		runnable: true,
		playgroundMode: 'SQL'
	},
	{
		id: 'supplemental-30',
		title: 'GROUP BY',
		area: 'SQL',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Aggregate rows into meaningful groups.',
		topics: ['group by', 'sql'],
		concept: 'Aggregate rows into meaningful groups.',
		example: `SELECT department_id
FROM users
GROUP BY department_id;`,
		runnable: true,
		playgroundMode: 'SQL'
	},
	{
		id: 'supplemental-31',
		title: 'HAVING',
		area: 'SQL',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Filter grouped results after aggregation.',
		topics: ['having', 'sql'],
		concept: 'Filter grouped results after aggregation.',
		example: `SELECT department_id, COUNT(*) AS user_count
FROM users
GROUP BY department_id
HAVING COUNT(*) >= 2;`,
		runnable: false
	},
	{
		id: 'supplemental-32',
		title: 'CASE expressions',
		area: 'SQL',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Encode conditional values directly in a query.',
		topics: ['case expressions', 'sql'],
		concept: 'Encode conditional values directly in a query.',
		example: `SELECT name, CASE WHEN price >= 100 THEN 'premium' ELSE 'standard' END AS tier
FROM products;`,
		runnable: false
	},
	{
		id: 'supplemental-33',
		title: 'Subqueries',
		area: 'SQL',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Use a query result as input to another query.',
		topics: ['subqueries', 'sql'],
		concept: 'Use a query result as input to another query.',
		example: `SELECT id, username
FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total >= 100);`,
		runnable: false
	},
	{
		id: 'supplemental-34',
		title: 'Transactions',
		area: 'SQL',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Group related writes into an atomic unit.',
		topics: ['transactions', 'sql'],
		concept: 'Group related writes into an atomic unit.',
		example: `BEGIN TRANSACTION;
UPDATE orders SET total = total + 10 WHERE id = 1;
COMMIT;`,
		runnable: false
	},
	{
		id: 'supplemental-35',
		title: 'Binary search',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Halve a sorted search space after each comparison.',
		topics: ['binary search', 'algorithms'],
		concept: 'Halve a sorted search space after each comparison.',
		example: `const values = [3, 8, 12, 19, 24];
let low = 0, high = values.length - 1;
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (values[mid] === 19) break;
  if (values[mid] < 19) low = mid + 1; else high = mid - 1;
}
console.log(low <= high ? { index: low, value: values[low] } : null);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-36',
		title: 'Breadth-first search',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Explore graph layers to find shortest unweighted paths.',
		topics: ['breadth-first search', 'algorithms'],
		concept: 'Explore graph layers to find shortest unweighted paths.',
		example: `const graph = { A: ['B', 'C'], B: ['D'], C: ['D'], D: [] };
const queue = ['A'];
const seen = new Set(['A']);
const order = [];
while (queue.length) {
  const node = queue.shift();
  order.push(node);
  for (const next of graph[node]) if (!seen.has(next)) { seen.add(next); queue.push(next); }
}
console.log(order);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-37',
		title: 'Depth-first search',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Explore branches deeply while tracking visited state.',
		topics: ['depth-first search', 'algorithms'],
		concept: 'Explore branches deeply while tracking visited state.',
		example: `const graph = { A: ['B', 'C'], B: ['D'], C: [], D: [] };
const seen = new Set();
const visit = (node) => {
  if (seen.has(node)) return;
  seen.add(node);
  for (const next of graph[node]) visit(next);
};
visit('A');
console.log([...seen]);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-38',
		title: 'Merge sort',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Sort by recursively merging ordered halves.',
		topics: ['merge sort', 'algorithms'],
		concept: 'Sort by recursively merging ordered halves.',
		example: `const mergeSort = (values) => {
  if (values.length < 2) return values;
  const mid = Math.floor(values.length / 2);
  const left = mergeSort(values.slice(0, mid));
  const right = mergeSort(values.slice(mid));
  const result = [];
  while (left.length && right.length) result.push(left[0] <= right[0] ? left.shift() : right.shift());
  return [...result, ...left, ...right];
};
console.log(mergeSort([5, 2, 9, 1]));`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-39',
		title: 'Quick sort',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Partition around a pivot and recurse on both sides.',
		topics: ['quick sort', 'algorithms'],
		concept: 'Partition around a pivot and recurse on both sides.',
		example: `const quickSort = (values) => {
  if (values.length < 2) return values;
  const pivot = values[values.length - 1];
  const left = values.filter((value) => value < pivot);
  const right = values.filter((value) => value > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};
console.log(quickSort([5, 2, 9, 1]));`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-40',
		title: 'Topological sort',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Order directed acyclic graph dependencies.',
		topics: ['topological sort', 'algorithms'],
		concept: 'Order directed acyclic graph dependencies.',
		example: `const graph = { A: ['B'], B: ['C'], C: [] };
const indegree = { A: 0, B: 1, C: 1 };
const order = [];
const queue = Object.keys(indegree).filter((node) => indegree[node] === 0);
while (queue.length) {
  const node = queue.shift();
  order.push(node);
  for (const next of graph[node]) {
    indegree[next] -= 1;
    if (indegree[next] === 0) queue.push(next);
  }
}
console.log(order);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-41',
		title: 'Union-find',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Track connectivity with disjoint-set operations.',
		topics: ['union-find', 'algorithms'],
		concept: 'Track connectivity with disjoint-set operations.',
		example: `const parent = [0, 1, 2];
const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));
const union = (a, b) => { a = find(a); b = find(b); if (a !== b) parent[b] = a; };
union(0, 1);
console.log(parent);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-42',
		title: 'Package scripts',
		area: 'Tooling',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Turn repeatable commands into named project tasks.',
		topics: ['package scripts', 'tooling'],
		concept: 'Turn repeatable commands into named project tasks.',
		example: `{
  "scripts": {
    "check": "npm run lint && npm run format",
    "dev": "vite dev"
  }
}`,
		runnable: false
	},
	{
		id: 'supplemental-43',
		title: 'Environment variables',
		area: 'Tooling',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Separate runtime configuration from source code.',
		topics: ['environment variables', 'tooling'],
		concept: 'Separate runtime configuration from source code.',
		example: `const config = { apiBase: 'https://example.test/api' };
console.log(config.apiBase);`,
		runnable: false
	},
	{
		id: 'supplemental-44',
		title: 'Linting',
		area: 'Tooling',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Catch style and correctness issues before review.',
		topics: ['linting', 'tooling'],
		concept: 'Catch style and correctness issues before review.',
		example: `{
  "scripts": {
    "lint": "eslint ."
  }
}`,
		runnable: false
	},
	{
		id: 'supplemental-45',
		title: 'Formatting',
		area: 'Tooling',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Keep source formatting consistent automatically.',
		topics: ['formatting', 'tooling'],
		concept: 'Keep source formatting consistent automatically.',
		example: `{
  "scripts": {
    "format": "prettier --write ."
  }
}`,
		runnable: false
	},
	{
		id: 'supplemental-46',
		title: 'Git branching',
		area: 'Tooling',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Isolate work while keeping the main line stable.',
		topics: ['git branching', 'tooling'],
		concept: 'Isolate work while keeping the main line stable.',
		example: `git switch -c feature/search
git add src/
git commit -m "Add search"`,
		runnable: false
	},
	{
		id: 'supplemental-47',
		title: 'Git rebase',
		area: 'Tooling',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Replay local commits onto a newer base.',
		topics: ['git rebase', 'tooling'],
		concept: 'Replay local commits onto a newer base.',
		example: `git switch feature/search
git fetch origin
git rebase origin/main`,
		runnable: false
	},
	{
		id: 'supplemental-48',
		title: 'Build artifacts',
		area: 'Tooling',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Understand what a production build actually emits.',
		topics: ['build artifacts', 'tooling'],
		concept: 'Understand what a production build actually emits.',
		example: `npm run build
ls dist/`,
		runnable: false
	},
	{
		id: 'supplemental-49',
		title: 'Input validation',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Reject malformed values at trust boundaries.',
		topics: ['input validation', 'security'],
		concept: 'Reject malformed values at trust boundaries.',
		example: `const input = 'developer';
const value = input.trim();
if (!value || value.length > 200) throw new Error('Invalid input');
console.log(value);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-50',
		title: 'Output encoding',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Render untrusted content without changing its meaning.',
		topics: ['output encoding', 'security'],
		concept: 'Render untrusted content without changing its meaning.',
		example: `<p id="output"></p>
<script>
  const element = document.querySelector('#output');
  const untrustedInput = '<img src=x onerror=alert(1)>';
  if (element) element.textContent = untrustedInput;
</script>`,
		runnable: true,
		playgroundMode: 'HTML'
	},
	{
		id: 'supplemental-51',
		title: 'Authentication versus authorization',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Separate identity checks from permission checks.',
		topics: ['authentication versus authorization', 'security'],
		concept: 'Separate identity checks from permission checks.',
		example: `const credentials = { username: 'dev', password: 'demo' };
const authenticate = (value) => value.password === 'demo' ? { id: value.username, role: 'editor' } : null;
const canEdit = (user) => user?.role === 'editor';
const user = authenticate(credentials);
if (!user) throw new Error('Not authenticated');
if (!canEdit(user)) throw new Error('Forbidden');
console.log('Authorized:', user.id);`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-52',
		title: 'CSRF protection',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Prevent unwanted state-changing requests from another origin.',
		topics: ['csrf protection', 'security'],
		concept: 'Prevent unwanted state-changing requests from another origin.',
		example: `const expectedToken = 'csrf-demo-token';
const submittedToken = 'csrf-demo-token';
if (submittedToken !== expectedToken) throw new Error('CSRF validation failed');
console.log('CSRF token accepted');`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-53',
		title: 'Content security policy',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Restrict the sources a browser may execute or load.',
		topics: ['content security policy', 'security'],
		concept: 'Restrict the sources a browser may execute or load.',
		example: `Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'`,
		runnable: false
	},
	{
		id: 'supplemental-54',
		title: 'Secret handling',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Keep credentials out of source and client bundles.',
		topics: ['secret handling', 'security'],
		concept: 'Keep credentials out of source and client bundles.',
		example: `const secret = 'server-only';
console.log('Keep secrets out of client code:', Boolean(secret));`,
		runnable: false
	},
	{
		id: 'supplemental-55',
		title: 'Dependency risk',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Evaluate third-party packages as part of the attack surface.',
		topics: ['dependency risk', 'security'],
		concept: 'Evaluate third-party packages as part of the attack surface.',
		example: `npm audit --omit=dev
npm outdated`,
		runnable: false
	},
	{
		id: 'supplemental-56',
		title: 'Rate limiting',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Reduce abuse by controlling request frequency.',
		topics: ['rate limiting', 'security'],
		concept: 'Reduce abuse by controlling request frequency.',
		example: `const now = Date.now();
const attempts = new Map([['user-1', [now - 1_000, now - 2_000]]]);
const recent = attempts.get('user-1') ?? [];
const windowed = recent.filter((time) => now - time < 60_000);
const allowed = windowed.length < 10;
console.log({ allowed, recentAttempts: windowed.length });`,
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'supplemental-57',
		title: 'Security headers',
		area: 'Security',
		level: 'Intermediate',
		time: '8 min',
		desc: 'Use browser-enforced headers to reduce common risks.',
		topics: ['security headers', 'security'],
		concept: 'Use browser-enforced headers to reduce common risks.',
		example: `Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin`,
		runnable: false
	}
];
