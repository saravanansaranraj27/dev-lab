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
		id: 'bfs',
		title: 'Breadth-first search',
		category: 'Graphs',
		summary: 'Explore level by level with a queue and visited set.',
		when: 'Unweighted shortest paths, level order, and minimum-edge distance.',
		code: `const graph: Record<string, string[]> = { A: ['B', 'C'], B: ['D'], C: ['D'], D: [] };
const queue = ['A'];
const seen = new Set(['A']);
const order: string[] = [];
while (queue.length) {
  const node = queue.shift()!;
  order.push(node);
  for (const next of graph[node]) if (!seen.has(next)) { seen.add(next); queue.push(next); }
}
console.log(order);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for breadth-first search.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'dfs',
		title: 'Depth-first search',
		category: 'Graphs',
		summary: 'Explore deeply before backtracking with recursion or an explicit stack.',
		when: 'Connectivity, components, traversal, and cycle-related work.',
		code: `const graph: Record<string, string[]> = { A: ['B', 'C'], B: ['D'], C: [], D: [] };
const seen = new Set<string>();
const dfs = (node: string) => {
  if (seen.has(node)) return;
  seen.add(node);
  for (const next of graph[node]) dfs(next);
};
dfs('A');
console.log([...seen]);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for depth-first search.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'union-find',
		title: 'Union find',
		category: 'Graphs',
		summary: 'Track connected components with near-constant amortized union and find operations.',
		when: 'Dynamic connectivity and Kruskal-style minimum spanning trees.',
		code: `const parent = [0, 1, 2, 3];
const find = (x: number): number => parent[x] === x ? x : (parent[x] = find(parent[x]));
const union = (a: number, b: number) => { a = find(a); b = find(b); if (a !== b) parent[b] = a; };
union(0, 1);
console.log({ parent, connected: find(0) === find(1) });`,
		mistakes: [
			'Apply the pattern without first proving its invariant for union find.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'topological-sort',
		title: 'Topological sort',
		category: 'Graphs',
		summary: 'Order a directed acyclic graph so every prerequisite appears before its dependents.',
		when: 'Build systems, course prerequisites, dependency resolution, and scheduling.',
		code: `const indegree = [0, 1, 1, 2];
const graph = [[1, 2], [3], [3], []];
const queue = indegree.flatMap((degree, node) => degree === 0 ? [node] : []);
const order: number[] = [];
while (queue.length) {
  const node = queue.shift()!;
  order.push(node);
  for (const next of graph[node]) if (--indegree[next] === 0) queue.push(next);
}
console.log(order);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for topological sort.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'dijkstra',
		title: 'Dijkstra',
		category: 'Graphs',
		summary: 'Repeatedly finalize the nearest node and relax non-negative weighted edges.',
		when: 'Shortest paths with non-negative edge weights.',
		code: `const dist = { A: 0, B: Infinity, C: Infinity };
const edges = { A: [['B', 4], ['C', 2]], B: [['C', 1]], C: [['B', 1]] };
const queue = [['A', 0]];
while (queue.length) {
  queue.sort((a, b) => a[1] - b[1]);
  const [node, distance] = queue.shift()!;
  if (distance !== dist[node]) continue;
  for (const [next, weight] of edges[node]) {
    const candidate = distance + weight;
    if (candidate < dist[next]) { dist[next] = candidate; queue.push([next, candidate]); }
  }
}
console.log(dist);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for dijkstra.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	}
];
