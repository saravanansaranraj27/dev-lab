import type { Lesson } from './types';

export const toolingLessons: Lesson[] = [
	{
		id: 'tooling-git',
		title: 'Git Workflow Fundamentals',
		area: 'Tooling',
		level: 'Beginner',
		time: '24 min',
		desc: 'Understand working trees, commits, branches, merges, rebases, and clean change boundaries.',
		topics: ['commit', 'branch', 'merge', 'rebase'],
		concept:
			'Git records snapshots and relationships between them. Small commits make review, rollback, and collaboration easier.',
		example: 'git status\ngit switch -c feature/example\ngit add src/\ngit commit -m "Add example"',
		runnable: false
	},
	{
		id: 'tooling-testing',
		title: 'Testing Strategy',
		area: 'Tooling',
		level: 'Intermediate',
		time: '24 min',
		desc: 'Choose unit, integration, and end-to-end tests based on the boundary you need confidence in.',
		topics: ['unit', 'integration', 'e2e', 'mocks'],
		concept:
			'Tests should verify behavior at useful boundaries. Prefer deterministic tests that fail for meaningful regressions.',
		example:
			'function add(a, b) {\n  return a + b;\n}\n\nconsole.assert(add(2, 3) === 5);\nconsole.log("test passed");',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'design-patterns',
		title: 'Choosing a Design Pattern',
		area: 'Tooling',
		level: 'Advanced',
		time: '24 min',
		desc: 'Use patterns as communication tools for recurring structure rather than as mandatory abstractions.',
		topics: ['composition', 'strategy', 'adapter', 'trade-offs'],
		concept:
			'A pattern is useful when it clarifies a recurring design problem. If it adds ceremony without reducing complexity, do not force it.',
		example:
			'const formatters = {\n  json: (value) => JSON.stringify(value),\n  text: (value) => String(value)\n};\n\nconsole.log(formatters.json({ enabled: true }));',
		runnable: true,
		playgroundMode: 'JavaScript'
	}
];
