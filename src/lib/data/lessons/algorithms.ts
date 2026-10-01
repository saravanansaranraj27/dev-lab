import type { Lesson } from './types';

export const algorithmsLessons: Lesson[] = [
	{
		id: 'alg-complexity',
		title: 'Complexity & Big O',
		area: 'Algorithms',
		level: 'Beginner',
		time: '24 min',
		desc: 'Compare how runtime and memory grow as input size increases.',
		topics: ['Big O', 'time', 'space', 'trade-offs'],
		concept:
			'Complexity focuses on growth rate. Ignore constant factors when describing the dominant asymptotic behavior.',
		example:
			'const values = [10, 20, 30, 40];\nfor (let i = 0; i < values.length; i += 1) {\n  console.log(values[i]);\n}',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'alg-hashing',
		title: 'Hashing & Frequency Counting',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '22 min',
		desc: 'Use maps and sets to turn repeated searches into average constant-time lookups.',
		topics: ['Map', 'Set', 'frequency', 'lookup'],
		concept:
			'Hash-based structures trade memory for fast average-case lookup, which is useful for membership and frequency problems.',
		example:
			'const values = ["js", "ts", "js"];\nconst counts = new Map();\nfor (const value of values) {\n  counts.set(value, (counts.get(value) ?? 0) + 1);\n}\n\nconsole.log(counts);',
		runnable: true,
		playgroundMode: 'JavaScript'
	},
	{
		id: 'alg-two-pointers',
		title: 'Two Pointers',
		area: 'Algorithms',
		level: 'Intermediate',
		time: '24 min',
		desc: 'Reduce pair and range problems by moving two indexes according to an invariant.',
		topics: ['left/right', 'sorted arrays', 'invariants'],
		concept:
			'Two pointers work when pointer movement can safely discard a portion of the search space.',
		example:
			'const values = [1, 3, 5, 8, 11];\nconst target = 12;\nlet left = 0;\nlet right = values.length - 1;\nwhile (left < right) {\n  if (values[left] + values[right] === target) break;\n  if (values[left] + values[right] < target) left += 1;\n  else right -= 1;\n}\nconsole.log(left < right ? [left, right] : null);',
		runnable: true,
		playgroundMode: 'JavaScript'
	}
];
