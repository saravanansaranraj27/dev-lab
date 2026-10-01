export type Algorithm =
	| 'Bubble sort'
	| 'Selection sort'
	| 'Insertion sort'
	| 'Merge sort'
	| 'Quick sort'
	| 'Heap sort'
	| 'Linear search'
	| 'Binary search'
	| 'Two pointers'
	| 'Sliding window'
	| "Kadane's algorithm"
	| 'Prefix sum'
	| 'Hashing'
	| 'Reverse linked list'
	| 'Floyd cycle detection'
	| 'Merge two sorted lists'
	| 'Binary tree DFS'
	| 'Binary tree BFS'
	| 'BST search'
	| 'Graph BFS'
	| 'Graph DFS'
	| "Dijkstra's algorithm"
	| 'Topological sort'
	| '0/1 knapsack'
	| 'Longest common subsequence';

type AlgorithmInfo = { complexity: string; space: string; description: string; interview: string };

export const algorithms: Algorithm[] = [
	'Bubble sort',
	'Selection sort',
	'Insertion sort',
	'Merge sort',
	'Quick sort',
	'Heap sort',
	'Linear search',
	'Binary search',
	'Two pointers',
	'Sliding window',
	"Kadane's algorithm",
	'Prefix sum',
	'Hashing',
	'Reverse linked list',
	'Floyd cycle detection',
	'Merge two sorted lists',
	'Binary tree DFS',
	'Binary tree BFS',
	'BST search',
	'Graph BFS',
	'Graph DFS',
	"Dijkstra's algorithm",
	'Topological sort',
	'0/1 knapsack',
	'Longest common subsequence'
];

export const algorithmInfo: Record<Algorithm, AlgorithmInfo> = {
	'Bubble sort': {
		complexity: 'O(n²)',
		space: 'O(1)',
		description: 'Compare adjacent values and swap them when they are out of order.',
		interview: 'Know why the sorted suffix grows after each pass.'
	},
	'Selection sort': {
		complexity: 'O(n²)',
		space: 'O(1)',
		description: 'Find the smallest remaining value and place it at the next position.',
		interview: 'Useful for explaining selection versus comparison cost and swaps.'
	},
	'Insertion sort': {
		complexity: 'O(n²)',
		space: 'O(1)',
		description: 'Build a sorted prefix by shifting larger values and inserting the next value.',
		interview: 'Mention its strong behavior on small or nearly sorted inputs.'
	},
	'Merge sort': {
		complexity: 'O(n log n)',
		space: 'O(n)',
		description: 'Split the data, sort each half, then merge the sorted halves.',
		interview: 'Explain divide-and-conquer and the merge step.'
	},
	'Quick sort': {
		complexity: 'O(n log n) average',
		space: 'O(log n) average',
		description: 'Partition around a pivot and recursively sort the partitions.',
		interview: 'Be ready to discuss pivot choice and worst-case behavior.'
	},
	'Heap sort': {
		complexity: 'O(n log n)',
		space: 'O(1)',
		description: 'Build a heap, repeatedly extract the maximum, and restore heap order.',
		interview: 'Explain heapify and why extraction gives sorted order.'
	},
	'Linear search': {
		complexity: 'O(n)',
		space: 'O(1)',
		description: 'Visit each value from left to right until the target is found.',
		interview: 'Contrast it with binary search and its sorted-input requirement.'
	},
	'Binary search': {
		complexity: 'O(log n)',
		space: 'O(1)',
		description: 'Repeatedly halve a sorted search range using the middle value.',
		interview: 'State the sorted-input invariant and boundary conditions.'
	},
	'Two pointers': {
		complexity: 'O(n)',
		space: 'O(1)',
		description: 'Move two indexes inward to reduce a pair-search problem.',
		interview: 'Explain why pointer movement does not revisit discarded pairs.'
	},
	'Sliding window': {
		complexity: 'O(n)',
		space: 'O(1)',
		description: 'Expand and shrink a contiguous window while maintaining its state.',
		interview: 'Identify the condition that causes the left pointer to move.'
	},
	"Kadane's algorithm": {
		complexity: 'O(n)',
		space: 'O(1)',
		description: 'Track the best subarray ending at each position and the best seen overall.',
		interview: 'Know the reset decision between starting fresh and extending the range.'
	},
	'Prefix sum': {
		complexity: 'O(n) build, O(1) range',
		space: 'O(n)',
		description: 'Precompute cumulative totals so range sums become constant-time queries.',
		interview: 'Know how subtracting two prefixes isolates a range.'
	},
	Hashing: {
		complexity: 'O(n) average',
		space: 'O(n)',
		description: 'Store seen values or frequencies in a hash table for fast lookup.',
		interview: 'Explain the trade-off between extra memory and lookup time.'
	},
	'Reverse linked list': {
		complexity: 'O(n)',
		space: 'O(1)',
		description:
			'Reverse next pointers one node at a time using previous, current, and next references.',
		interview: 'Track the three pointers carefully.'
	},
	'Floyd cycle detection': {
		complexity: 'O(n)',
		space: 'O(1)',
		description: 'Move slow one step and fast two steps to detect a cycle.',
		interview: 'Explain why the pointers must meet inside a cycle.'
	},
	'Merge two sorted lists': {
		complexity: 'O(n + m)',
		space: 'O(1)',
		description: 'Repeatedly link the smaller head from two sorted sequences.',
		interview: 'Handle exhausted lists and the remaining tail.'
	},
	'Binary tree DFS': {
		complexity: 'O(n)',
		space: 'O(h)',
		description: 'Traverse a tree depth-first using recursion or an explicit stack.',
		interview: 'Know preorder, inorder, and postorder variants.'
	},
	'Binary tree BFS': {
		complexity: 'O(n)',
		space: 'O(w)',
		description: 'Traverse a tree level by level using a queue.',
		interview: 'Use BFS for level-order traversal and shortest depth in an unweighted tree.'
	},
	'BST search': {
		complexity: 'O(h)',
		space: 'O(1)',
		description: 'Use the BST ordering rule to choose left or right at each node.',
		interview: 'Explain how tree height determines performance.'
	},
	'Graph BFS': {
		complexity: 'O(V + E)',
		space: 'O(V)',
		description: 'Visit graph vertices level by level from a starting vertex.',
		interview: 'Know why a visited set prevents repeated traversal.'
	},
	'Graph DFS': {
		complexity: 'O(V + E)',
		space: 'O(V)',
		description: 'Explore as far as possible before backtracking.',
		interview: 'Understand recursion depth and iterative stack alternatives.'
	},
	"Dijkstra's algorithm": {
		complexity: 'O((V + E) log V)',
		space: 'O(V)',
		description: 'Repeatedly finalize the nearest unvisited vertex and relax its edges.',
		interview: 'It assumes non-negative edge weights.'
	},
	'Topological sort': {
		complexity: 'O(V + E)',
		space: 'O(V)',
		description: 'Order directed acyclic graph vertices so every prerequisite appears first.',
		interview: 'Know both indegree/Kahn and DFS approaches.'
	},
	'0/1 knapsack': {
		complexity: 'O(nW)',
		space: 'O(nW)',
		description: 'Choose or skip each item while tracking the best value for each capacity.',
		interview: 'The 0/1 constraint means each item can be used at most once.'
	},
	'Longest common subsequence': {
		complexity: 'O(nm)',
		space: 'O(nm)',
		description: 'Build a dynamic-programming table for matching or skipping characters.',
		interview: 'Distinguish subsequence from substring.'
	}
};
