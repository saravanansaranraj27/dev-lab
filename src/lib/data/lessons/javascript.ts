import type { Lesson } from './types';

export const javascriptLessons: Lesson[] = [
	{
		id: 'variables',
		title: 'Variables & Values',
		area: 'JavaScript',
		level: 'Beginner',
		time: '12 min',
		desc: 'Understand bindings, primitive values, reassignment, and the difference between const and let.',
		topics: ['const vs let', 'primitives', 'assignment'],
		concept:
			'A variable is a named binding to a value. Prefer const unless the binding itself must change.',
		example:
			'const price = 42;\nlet quantity = 2;\nconst total = price * quantity;\n\nconsole.log(total);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'control-flow',
		title: 'Control Flow',
		area: 'JavaScript',
		level: 'Beginner',
		time: '15 min',
		desc: 'Choose between branches and repeat work with conditions and loops.',
		topics: ['if', 'switch', 'for', 'while'],
		concept:
			'Control flow makes execution conditional or repetitive. Keep conditions explicit and avoid deeply nested branches.',
		example:
			'const values = [3, 7, 2, 9];\nlet total = 0;\n\nfor (const value of values) {\n  if (value > 5) total += value;\n}\n\nconsole.log(total);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'functions',
		title: 'Functions & Scope',
		area: 'JavaScript',
		level: 'Beginner',
		time: '18 min',
		desc: 'Build reusable behavior with parameters, return values, lexical scope, and closures.',
		topics: ['parameters', 'return', 'scope', 'closures'],
		concept:
			'Functions create boundaries around behavior. A closure keeps access to variables from its surrounding lexical scope.',
		example:
			'function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst next = makeCounter();\nconsole.log(next(), next());',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'arrays',
		title: 'Array Transformations',
		area: 'JavaScript',
		level: 'Beginner',
		time: '20 min',
		desc: 'Transform collections with map, filter, find, some, every, and reduce.',
		topics: ['map', 'filter', 'reduce', 'find'],
		concept:
			'Array methods express a data transformation directly and reduce manual index bookkeeping.',
		example:
			'const values = [2, 4, 7, 9];\nconst result = values\n  .filter((value) => value % 2 === 1)\n  .map((value) => value * 2);\n\nconsole.log(result);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'objects',
		title: 'Objects & Destructuring',
		area: 'JavaScript',
		level: 'Beginner',
		time: '16 min',
		desc: 'Model related data with objects and access values cleanly with destructuring and spread.',
		topics: ['objects', 'destructuring', 'spread'],
		concept:
			'Objects group related state. Destructuring makes the fields a function uses explicit.',
		example:
			'const settings = { theme: "dark", compact: true };\nconst { theme, compact } = settings;\nconst next = { ...settings, compact: !compact };\n\nconsole.log(theme, next);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'modules',
		title: 'Modules & Imports',
		area: 'JavaScript',
		level: 'Intermediate',
		time: '18 min',
		desc: 'Split code into focused modules and understand named versus default exports.',
		topics: ['export', 'import', 'module boundaries'],
		concept: 'A module should expose a small public surface and keep implementation details local.',
		example:
			'export function clamp(value, min, max) {\n  return Math.min(max, Math.max(min, value));\n}\n\nimport { clamp } from "./math.js";\nconsole.log(clamp(12, 0, 10));',
		runnable: false
	},
	{
		id: 'errors',
		title: 'Errors & Debugging',
		area: 'JavaScript',
		level: 'Intermediate',
		time: '20 min',
		desc: 'Read stack traces, throw useful errors, and debug the first incorrect assumption.',
		topics: ['throw', 'try/catch', 'stack traces'],
		concept:
			'Good debugging isolates the earliest incorrect state rather than patching the final symptom.',
		example:
			'function parseCount(input) {\n  const value = Number(input);\n  if (!Number.isInteger(value)) throw new Error("Expected an integer");\n  return value;\n}\n\ntry {\n  console.log(parseCount("x"));\n} catch (error) {\n  console.error(error.message);\n}',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'async',
		title: 'Promises & async/await',
		area: 'JavaScript',
		level: 'Intermediate',
		time: '24 min',
		desc: 'Coordinate asynchronous work, failures, and parallel tasks with promises and async functions.',
		topics: ['Promise', 'await', 'Promise.all', 'errors'],
		concept:
			'await pauses the current async function until a promise settles; Promise.all coordinates independent work in parallel.',
		example:
			'async function load() {\n  const values = await Promise.all([\n    Promise.resolve(2),\n    Promise.resolve(4)\n  ]);\n  return values.reduce((sum, value) => sum + value, 0);\n}\n\nload().then(console.log);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'event-loop',
		title: 'Event Loop & Tasks',
		area: 'JavaScript',
		level: 'Advanced',
		time: '22 min',
		desc: 'Understand call stacks, microtasks, timers, and why asynchronous callbacks run later.',
		topics: ['call stack', 'microtasks', 'tasks'],
		concept:
			'JavaScript runs one synchronous stack at a time. Promise callbacks are microtasks and run before the next timer task.',
		example:
			'console.log("sync");\nqueueMicrotask(() => console.log("microtask"));\nsetTimeout(() => console.log("timer"), 0);\nconsole.log("done");',
		runnable: true,
		playgroundMode: 'JavaScript'
	}
];
