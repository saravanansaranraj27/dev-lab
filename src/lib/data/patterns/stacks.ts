import type { Pattern } from './arrays';

export const patterns: Pattern[] = [
	{
		id: 'monotonic-stack',
		title: 'Monotonic stack',
		category: 'Stacks',
		summary: 'Keep stack values ordered so the next greater or smaller element is resolved once.',
		when: 'Next greater element, histogram, stock span, and boundary queries.',
		code: `const values = [2, 1, 4, 3];
const stack: number[] = [];
const nextGreater = new Array(values.length).fill(-1);
for (let i = 0; i < values.length; i++) {
  while (stack.length && values[stack.at(-1)!] < values[i]) nextGreater[stack.pop()!] = values[i];
  stack.push(i);
}
console.log(nextGreater);`,
		mistakes: [
			'Apply the pattern without first proving its invariant.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'monotonic-queue',
		title: 'Monotonic queue',
		category: 'Stacks / queues',
		summary: 'Maintain candidates in monotonic order while a sliding window moves.',
		when: 'Sliding-window maximum and minimum queries.',
		code: `const values = [1, 3, -1, -3, 5, 3];
const windowSize = 3;
const deque: number[] = [];
const maxima: number[] = [];
for (let right = 0; right < values.length; right++) {
  while (deque.length && deque[0] <= right - windowSize) deque.shift();
  while (deque.length && values[deque.at(-1)!] <= values[right]) deque.pop();
  deque.push(right);
  if (right >= windowSize - 1) maxima.push(values[deque[0]]);
}
console.log(maxima);`,
		mistakes: [
			'Remove expired indexes before reading the front.',
			'Preserve monotonic order after every insertion.'
		]
	},
	{
		id: 'interval-merge',
		title: 'Merge intervals',
		category: 'Intervals',
		summary: 'Sort ranges by start and merge overlapping intervals into canonical ranges.',
		when: 'Schedules, reservations, ranges, and overlap problems.',
		code: `const intervals = [[1, 3], [2, 6], [8, 10], [9, 12]];
const merged: number[][] = [];
for (const interval of intervals.sort((a, b) => a[0] - b[0])) {
  const last = merged.at(-1);
  if (!last || interval[0] > last[1]) merged.push([...interval]);
  else last[1] = Math.max(last[1], interval[1]);
}
console.log(merged);`,
		mistakes: [
			'Sort by the boundary required by the merge invariant.',
			'Distinguish touching intervals from overlapping intervals when the problem requires it.'
		]
	}
];
