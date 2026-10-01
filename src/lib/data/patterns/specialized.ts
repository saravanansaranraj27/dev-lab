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
		id: 'binary-search-answer',
		title: 'Binary search on answer',
		category: 'Searching',
		summary: 'Binary-search a monotonic feasibility condition instead of the data itself.',
		when: 'Minimum capacity, maximum distance, scheduling, and optimization bounds.',
		code: `const capacities = [3, 4, 6, 8, 10];
const canFit = (capacity: number) => capacity >= 6;
let low = 0, high = capacities.length - 1;
while (low < high) {
  const mid = Math.floor((low + high) / 2);
  if (canFit(capacities[mid])) high = mid; else low = mid + 1;
}
console.log(capacities[low]);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for binary search on answer.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'backtracking',
		title: 'Backtracking',
		category: 'Search',
		summary: 'Build a candidate incrementally, undo the choice, and explore the next branch.',
		when: 'Permutations, combinations, subsets, constraint satisfaction, and puzzles.',
		code: `const answers: number[][] = [];
const search = (path: number[]) => {
  if (path.length === 2) { answers.push([...path]); return; }
  for (const choice of [1, 2, 3]) if (!path.includes(choice)) {
    path.push(choice); search(path); path.pop();
  }
};
search([]);
console.log(answers);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for backtracking.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'trie',
		title: 'Trie',
		category: 'Strings',
		summary: 'Store prefixes in a character tree so prefix queries avoid scanning unrelated words.',
		when: 'Autocomplete, dictionary lookup, and prefix matching.',
		code: `class Node {
  children = new Map<string, Node>();
  end = false;
}
const insert = (root: Node, word: string) => {
  let node = root;
  for (const char of word) {
    node.children.set(char, node.children.get(char) ?? new Node());
    node = node.children.get(char)!;
  }
  node.end = true;
};
const root = new Node();
insert(root, 'cat');
insert(root, 'car');
console.log(root.children.get('c')?.children.has('a'));`,
		mistakes: [
			'Apply the pattern without first proving its invariant for trie.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'heap-top-k',
		title: 'Heap / top K',
		category: 'Heaps',
		summary:
			'Keep only the best K candidates; a heap avoids sorting the entire stream when inputs are large or arriving incrementally.',
		when: 'Top-K and Kth-element problems, especially when a full sort is more work than maintaining K candidates.',
		code: `const topK = (values: number[], k: number) => {
  const heap: number[] = [];
  const push = (value: number) => {
    heap.push(value);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent] <= heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
  };
  const replaceMin = (value: number) => {
    heap[0] = value;
    let i = 0;
    while (true) {
      const left = i * 2 + 1;
      const right = left + 1;
      let smallest = i;
      if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
      if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  };
  for (const value of values) {
    if (heap.length < k) push(value);
    else if (value > heap[0]) replaceMin(value);
  }
  return [...heap].sort((a, b) => b - a);
};
console.log(topK([9, 2, 7, 4], 2));`,
		mistakes: [
			'Apply the pattern without first proving its invariant for heap / top k.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'bitmask-state',
		title: 'Bitmask state',
		category: 'Bit manipulation',
		summary: 'Encode a small set of boolean choices inside integer bits.',
		when: 'Subset enumeration, permissions, visited-state compression, and combinatorics.',
		code: `const mask = 0;
const bit = 2;
const next = mask | (1 << bit);
const has = (value: number, position: number) => (value & (1 << position)) !== 0;
console.log({ mask: next, containsBit: has(next, bit) });`,
		mistakes: [
			'Apply the pattern without first proving its invariant for bitmask state.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	}
];
