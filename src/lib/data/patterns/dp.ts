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
		id: 'divide-and-conquer',
		title: 'Divide and conquer',
		category: 'Algorithms',
		summary: 'Split a problem into smaller independent pieces, solve them, then combine results.',
		when: 'Merge sort, recursive tree work, and range problems.',
		code: `const merge = (left: number[], right: number[]) => {
  const result: number[] = [];
  while (left.length && right.length) result.push(left[0] <= right[0] ? left.shift()! : right.shift()!);
  return [...result, ...left, ...right];
};
const divideAndConquer = (values: number[]): number[] => {
  if (values.length <= 1) return values;
  const mid = values.length >> 1;
  return merge(divideAndConquer(values.slice(0, mid)), divideAndConquer(values.slice(mid)));
};
console.log(divideAndConquer([5, 2, 9, 1]));`,
		mistakes: [
			'Apply the pattern without first proving its invariant for divide and conquer.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'memoization',
		title: 'Memoization',
		category: 'Dynamic programming',
		summary: 'Cache overlapping recursive states so each distinct state is solved once.',
		when: 'Recursive problems with repeated subproblems and bounded state.',
		code: `const memo = new Map<number, number>();
const fib = (n: number): number => {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fib(n - 1) + fib(n - 2);
  memo.set(n, result);
  return result;
};
console.log(fib(10));`,
		mistakes: [
			'Apply the pattern without first proving its invariant for memoization.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'tabulation',
		title: 'Tabulation',
		category: 'Dynamic programming',
		summary: 'Build a table from base cases toward the final state without recursion.',
		when: 'Bottom-up dynamic programming and predictable memory access.',
		code: `const n = 6;
const dp = new Array(n + 1).fill(0);
dp[0] = 0;
dp[1] = 1;
for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
console.log(dp[n]);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for tabulation.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'greedy-choice',
		title: 'Greedy choice',
		category: 'Greedy',
		summary: 'Make the locally best choice while proving it preserves an optimal solution.',
		when: 'Interval scheduling, activity selection, and some optimization problems.',
		code: `const intervals = [[1, 3], [2, 4], [5, 7]];
intervals.sort((a, b) => a[1] - b[1]);
const chosen: number[][] = [];
let end = -Infinity;
for (const interval of intervals) {
  if (interval[0] >= end) { chosen.push(interval); end = interval[1]; }
}
console.log(chosen);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for greedy choice.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'state-compression',
		title: 'State compression',
		category: 'Dynamic programming',
		summary: 'Reduce a DP state to only the previous information needed for the next transition.',
		when: 'Knapsack-like DP and iterative recurrences with small dependency width.',
		code: `const values = [1, 2, 3, 4];
let previous = 0;
let current = 1;
for (const value of values) [previous, current] = [current, previous + current + value];
console.log(current);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for state compression.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	}
];
