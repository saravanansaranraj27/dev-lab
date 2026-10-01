export type Pattern = {
	id: string;
	title: string;
	category: string;
	summary: string;
	when: string;
	code: string;
	mistakes: string[];
};

export const patterns: Pattern[] = [
	{
		id: 'two-pointers',
		title: 'Two pointers',
		category: 'Arrays',
		summary:
			'Move coordinated indexes to shrink a search space without revisiting discarded pairs.',
		when: 'Sorted arrays, pair-sum problems, partitions, and inward scans.',
		code: `const sumPair = (values: number[], target: number) => {
  let left = 0, right = values.length - 1;
  while (left < right) {
    const sum = values[left] + values[right];
    if (sum === target) return [left, right];
    if (sum < target) left++; else right--;
  }
  return null;
};`,
		mistakes: [
			'Apply the pattern without first proving its invariant for two pointers.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'sliding-window',
		title: 'Sliding window',
		category: 'Arrays',
		summary: 'Maintain a contiguous range while expanding and shrinking around a constraint.',
		when: 'Subarrays or substrings with a running condition, count, or sum.',
		code: `const values = [2, 1, 5, 1, 3, 2];
const windowSize = 3;
let windowSum = values.slice(0, windowSize).reduce((sum, value) => sum + value, 0);
let best = windowSum;
for (let right = windowSize; right < values.length; right++) {
  windowSum += values[right] - values[right - windowSize];
  best = Math.max(best, windowSum);
}
console.log(best);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for sliding window.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'prefix-sum',
		title: 'Prefix sum',
		category: 'Arrays',
		summary: 'Precompute cumulative totals so range queries become constant-time.',
		when: 'Repeated range sums, cumulative metrics, and interval queries.',
		code: `const values = [3, 1, 4, 1, 5];
const prefix = [0];
for (const value of values) prefix.push(prefix.at(-1)! + value);
const rangeSum = (left: number, right: number) => prefix[right + 1] - prefix[left];
console.log(rangeSum(1, 3));`,
		mistakes: [
			'Apply the pattern without first proving its invariant for prefix sum.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'fast-slow-pointers',
		title: 'Fast/slow pointers',
		category: 'Arrays',
		summary: 'Move two pointers at different speeds to detect cycles or locate a midpoint.',
		when: 'Linked-list cycles, middle nodes, and repeated-state detection.',
		code: `const values = [1, 2, 3, 4, 5];
let slow = 0;
let fast = 0;
while (fast + 1 < values.length) {
  slow += 1;
  fast += 2;
}
console.log({ middleIndex: slow, middleValue: values[slow] });`,
		mistakes: [
			'Apply the pattern without first proving its invariant for fast/slow pointers.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	}
];
