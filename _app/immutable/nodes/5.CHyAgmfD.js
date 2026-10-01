import{$ as e,E as t,H as n,I as r,S as i,T as a,U as o,V as s,W as c,Y as l,Z as u,b as d,c as f,f as p,g as m,k as h,l as g,lt as _,nt as v,rt as y,u as b,v as x,y as S}from"../chunks/DMk5LJc6.js";import"../chunks/xihTtKlq.js";import{t as C}from"../chunks/D3IWj61p.js";import{n as w,t as T}from"../chunks/CZiqLibq.js";var E=[{id:`two-pointers`,title:`Two pointers`,category:`Arrays`,summary:`Move coordinated indexes to shrink a search space without revisiting discarded pairs.`,when:`Sorted arrays, pair-sum problems, partitions, and inward scans.`,code:`const sumPair = (values: number[], target: number) => {
  let left = 0, right = values.length - 1;
  while (left < right) {
    const sum = values[left] + values[right];
    if (sum === target) return [left, right];
    if (sum < target) left++; else right--;
  }
  return null;
};`,mistakes:[`Apply the pattern without first proving its invariant for two pointers.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`sliding-window`,title:`Sliding window`,category:`Arrays`,summary:`Maintain a contiguous range while expanding and shrinking around a constraint.`,when:`Subarrays or substrings with a running condition, count, or sum.`,code:`const values = [2, 1, 5, 1, 3, 2];
const windowSize = 3;
let windowSum = values.slice(0, windowSize).reduce((sum, value) => sum + value, 0);
let best = windowSum;
for (let right = windowSize; right < values.length; right++) {
  windowSum += values[right] - values[right - windowSize];
  best = Math.max(best, windowSum);
}
console.log(best);`,mistakes:[`Apply the pattern without first proving its invariant for sliding window.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`prefix-sum`,title:`Prefix sum`,category:`Arrays`,summary:`Precompute cumulative totals so range queries become constant-time.`,when:`Repeated range sums, cumulative metrics, and interval queries.`,code:`const values = [3, 1, 4, 1, 5];
const prefix = [0];
for (const value of values) prefix.push(prefix.at(-1)! + value);
const rangeSum = (left: number, right: number) => prefix[right + 1] - prefix[left];
console.log(rangeSum(1, 3));`,mistakes:[`Apply the pattern without first proving its invariant for prefix sum.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`fast-slow-pointers`,title:`Fast/slow pointers`,category:`Arrays`,summary:`Move two pointers at different speeds to detect cycles or locate a midpoint.`,when:`Linked-list cycles, middle nodes, and repeated-state detection.`,code:`const values = [1, 2, 3, 4, 5];
let slow = 0;
let fast = 0;
while (fast + 1 < values.length) {
  slow += 1;
  fast += 2;
}
console.log({ middleIndex: slow, middleValue: values[slow] });`,mistakes:[`Apply the pattern without first proving its invariant for fast/slow pointers.`,`Track the state change explicitly before optimizing implementation details.`]}],D=[{id:`frequency-map`,title:`Frequency map`,category:`Hashing`,summary:`Store counts or first-seen positions for near-constant average lookup.`,when:`Anagrams, duplicate detection, counting, and complement lookup.`,code:`const values = ['js', 'ts', 'js'];
const counts = new Map<string, number>();
for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
console.log(Object.fromEntries(counts));`,mistakes:[`Apply the pattern without first proving its invariant for frequency map.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`group-by-key`,title:`Group by key`,category:`Hashing`,summary:`Build an index from a property so later work can operate per group.`,when:`Categorization, aggregation, and one-to-many relationships.`,code:`type Item = { key: string; name: string };
const items: Item[] = [{ key: 'web', name: 'Fetch' }, { key: 'web', name: 'Forms' }];
const groups = new Map<string, Item[]>();
for (const item of items) {
  const group = groups.get(item.key) ?? [];
  group.push(item);
  groups.set(item.key, group);
}
console.log([...groups]);`,mistakes:[`Apply the pattern without first proving its invariant for group by key.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`complement-lookup`,title:`Complement lookup`,category:`Hashing`,summary:`Store earlier values so the required counterpart can be found immediately.`,when:`Two-sum style problems and pair relationships.`,code:`const twoSum = (values: number[], target: number) => {
  const seen = new Map<number, number>();
  for (let i = 0; i < values.length; i++) {
    const need = target - values[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(values[i], i);
  }
  return null;
};
console.log(twoSum([2, 7, 11, 15], 9));`,mistakes:[`Apply the pattern without first proving its invariant for complement lookup.`,`Track the state change explicitly before optimizing implementation details.`]}],O=[{id:`monotonic-stack`,title:`Monotonic stack`,category:`Stacks`,summary:`Keep stack values ordered so the next greater or smaller element is resolved once.`,when:`Next greater element, histogram, stock span, and boundary queries.`,code:`const values = [2, 1, 4, 3];
const stack: number[] = [];
const nextGreater = new Array(values.length).fill(-1);
for (let i = 0; i < values.length; i++) {
  while (stack.length && values[stack.at(-1)!] < values[i]) nextGreater[stack.pop()!] = values[i];
  stack.push(i);
}
console.log(nextGreater);`,mistakes:[`Apply the pattern without first proving its invariant.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`monotonic-queue`,title:`Monotonic queue`,category:`Stacks / queues`,summary:`Maintain candidates in monotonic order while a sliding window moves.`,when:`Sliding-window maximum and minimum queries.`,code:`const values = [1, 3, -1, -3, 5, 3];
const windowSize = 3;
const deque: number[] = [];
const maxima: number[] = [];
for (let right = 0; right < values.length; right++) {
  while (deque.length && deque[0] <= right - windowSize) deque.shift();
  while (deque.length && values[deque.at(-1)!] <= values[right]) deque.pop();
  deque.push(right);
  if (right >= windowSize - 1) maxima.push(values[deque[0]]);
}
console.log(maxima);`,mistakes:[`Remove expired indexes before reading the front.`,`Preserve monotonic order after every insertion.`]},{id:`interval-merge`,title:`Merge intervals`,category:`Intervals`,summary:`Sort ranges by start and merge overlapping intervals into canonical ranges.`,when:`Schedules, reservations, ranges, and overlap problems.`,code:`const intervals = [[1, 3], [2, 6], [8, 10], [9, 12]];
const merged: number[][] = [];
for (const interval of intervals.sort((a, b) => a[0] - b[0])) {
  const last = merged.at(-1);
  if (!last || interval[0] > last[1]) merged.push([...interval]);
  else last[1] = Math.max(last[1], interval[1]);
}
console.log(merged);`,mistakes:[`Sort by the boundary required by the merge invariant.`,`Distinguish touching intervals from overlapping intervals when the problem requires it.`]}],k=[{id:`bfs`,title:`Breadth-first search`,category:`Graphs`,summary:`Explore level by level with a queue and visited set.`,when:`Unweighted shortest paths, level order, and minimum-edge distance.`,code:`const graph: Record<string, string[]> = { A: ['B', 'C'], B: ['D'], C: ['D'], D: [] };
const queue = ['A'];
const seen = new Set(['A']);
const order: string[] = [];
while (queue.length) {
  const node = queue.shift()!;
  order.push(node);
  for (const next of graph[node]) if (!seen.has(next)) { seen.add(next); queue.push(next); }
}
console.log(order);`,mistakes:[`Apply the pattern without first proving its invariant for breadth-first search.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`dfs`,title:`Depth-first search`,category:`Graphs`,summary:`Explore deeply before backtracking with recursion or an explicit stack.`,when:`Connectivity, components, traversal, and cycle-related work.`,code:`const graph: Record<string, string[]> = { A: ['B', 'C'], B: ['D'], C: [], D: [] };
const seen = new Set<string>();
const dfs = (node: string) => {
  if (seen.has(node)) return;
  seen.add(node);
  for (const next of graph[node]) dfs(next);
};
dfs('A');
console.log([...seen]);`,mistakes:[`Apply the pattern without first proving its invariant for depth-first search.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`union-find`,title:`Union find`,category:`Graphs`,summary:`Track connected components with near-constant amortized union and find operations.`,when:`Dynamic connectivity and Kruskal-style minimum spanning trees.`,code:`const parent = [0, 1, 2, 3];
const find = (x: number): number => parent[x] === x ? x : (parent[x] = find(parent[x]));
const union = (a: number, b: number) => { a = find(a); b = find(b); if (a !== b) parent[b] = a; };
union(0, 1);
console.log({ parent, connected: find(0) === find(1) });`,mistakes:[`Apply the pattern without first proving its invariant for union find.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`topological-sort`,title:`Topological sort`,category:`Graphs`,summary:`Order a directed acyclic graph so every prerequisite appears before its dependents.`,when:`Build systems, course prerequisites, dependency resolution, and scheduling.`,code:`const indegree = [0, 1, 1, 2];
const graph = [[1, 2], [3], [3], []];
const queue = indegree.flatMap((degree, node) => degree === 0 ? [node] : []);
const order: number[] = [];
while (queue.length) {
  const node = queue.shift()!;
  order.push(node);
  for (const next of graph[node]) if (--indegree[next] === 0) queue.push(next);
}
console.log(order);`,mistakes:[`Apply the pattern without first proving its invariant for topological sort.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`dijkstra`,title:`Dijkstra`,category:`Graphs`,summary:`Repeatedly finalize the nearest node and relax non-negative weighted edges.`,when:`Shortest paths with non-negative edge weights.`,code:`const dist = { A: 0, B: Infinity, C: Infinity };
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
console.log(dist);`,mistakes:[`Apply the pattern without first proving its invariant for dijkstra.`,`Track the state change explicitly before optimizing implementation details.`]}],A=[{id:`divide-and-conquer`,title:`Divide and conquer`,category:`Algorithms`,summary:`Split a problem into smaller independent pieces, solve them, then combine results.`,when:`Merge sort, recursive tree work, and range problems.`,code:`const merge = (left: number[], right: number[]) => {
  const result: number[] = [];
  while (left.length && right.length) result.push(left[0] <= right[0] ? left.shift()! : right.shift()!);
  return [...result, ...left, ...right];
};
const divideAndConquer = (values: number[]): number[] => {
  if (values.length <= 1) return values;
  const mid = values.length >> 1;
  return merge(divideAndConquer(values.slice(0, mid)), divideAndConquer(values.slice(mid)));
};
console.log(divideAndConquer([5, 2, 9, 1]));`,mistakes:[`Apply the pattern without first proving its invariant for divide and conquer.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`memoization`,title:`Memoization`,category:`Dynamic programming`,summary:`Cache overlapping recursive states so each distinct state is solved once.`,when:`Recursive problems with repeated subproblems and bounded state.`,code:`const memo = new Map<number, number>();
const fib = (n: number): number => {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fib(n - 1) + fib(n - 2);
  memo.set(n, result);
  return result;
};
console.log(fib(10));`,mistakes:[`Apply the pattern without first proving its invariant for memoization.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`tabulation`,title:`Tabulation`,category:`Dynamic programming`,summary:`Build a table from base cases toward the final state without recursion.`,when:`Bottom-up dynamic programming and predictable memory access.`,code:`const n = 6;
const dp = new Array(n + 1).fill(0);
dp[0] = 0;
dp[1] = 1;
for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
console.log(dp[n]);`,mistakes:[`Apply the pattern without first proving its invariant for tabulation.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`greedy-choice`,title:`Greedy choice`,category:`Greedy`,summary:`Make the locally best choice while proving it preserves an optimal solution.`,when:`Interval scheduling, activity selection, and some optimization problems.`,code:`const intervals = [[1, 3], [2, 4], [5, 7]];
intervals.sort((a, b) => a[1] - b[1]);
const chosen: number[][] = [];
let end = -Infinity;
for (const interval of intervals) {
  if (interval[0] >= end) { chosen.push(interval); end = interval[1]; }
}
console.log(chosen);`,mistakes:[`Apply the pattern without first proving its invariant for greedy choice.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`state-compression`,title:`State compression`,category:`Dynamic programming`,summary:`Reduce a DP state to only the previous information needed for the next transition.`,when:`Knapsack-like DP and iterative recurrences with small dependency width.`,code:`const values = [1, 2, 3, 4];
let previous = 0;
let current = 1;
for (const value of values) [previous, current] = [current, previous + current + value];
console.log(current);`,mistakes:[`Apply the pattern without first proving its invariant for state compression.`,`Track the state change explicitly before optimizing implementation details.`]}],j=[{id:`binary-search-answer`,title:`Binary search on answer`,category:`Searching`,summary:`Binary-search a monotonic feasibility condition instead of the data itself.`,when:`Minimum capacity, maximum distance, scheduling, and optimization bounds.`,code:`const capacities = [3, 4, 6, 8, 10];
const canFit = (capacity: number) => capacity >= 6;
let low = 0, high = capacities.length - 1;
while (low < high) {
  const mid = Math.floor((low + high) / 2);
  if (canFit(capacities[mid])) high = mid; else low = mid + 1;
}
console.log(capacities[low]);`,mistakes:[`Apply the pattern without first proving its invariant for binary search on answer.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`backtracking`,title:`Backtracking`,category:`Search`,summary:`Build a candidate incrementally, undo the choice, and explore the next branch.`,when:`Permutations, combinations, subsets, constraint satisfaction, and puzzles.`,code:`const answers: number[][] = [];
const search = (path: number[]) => {
  if (path.length === 2) { answers.push([...path]); return; }
  for (const choice of [1, 2, 3]) if (!path.includes(choice)) {
    path.push(choice); search(path); path.pop();
  }
};
search([]);
console.log(answers);`,mistakes:[`Apply the pattern without first proving its invariant for backtracking.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`trie`,title:`Trie`,category:`Strings`,summary:`Store prefixes in a character tree so prefix queries avoid scanning unrelated words.`,when:`Autocomplete, dictionary lookup, and prefix matching.`,code:`class Node {
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
console.log(root.children.get('c')?.children.has('a'));`,mistakes:[`Apply the pattern without first proving its invariant for trie.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`heap-top-k`,title:`Heap / top K`,category:`Heaps`,summary:`Keep only the best K candidates; a heap avoids sorting the entire stream when inputs are large or arriving incrementally.`,when:`Top-K and Kth-element problems, especially when a full sort is more work than maintaining K candidates.`,code:`const topK = (values: number[], k: number) => {
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
console.log(topK([9, 2, 7, 4], 2));`,mistakes:[`Apply the pattern without first proving its invariant for heap / top k.`,`Track the state change explicitly before optimizing implementation details.`]},{id:`bitmask-state`,title:`Bitmask state`,category:`Bit manipulation`,summary:`Encode a small set of boolean choices inside integer bits.`,when:`Subset enumeration, permissions, visited-state compression, and combinatorics.`,code:`const mask = 0;
const bit = 2;
const next = mask | (1 << bit);
const has = (value: number, position: number) => (value & (1 << position)) !== 0;
console.log({ mask: next, containsBit: has(next, bit) });`,mistakes:[`Apply the pattern without first proving its invariant for bitmask state.`,`Track the state change explicitly before optimizing implementation details.`]}],M=[...E,...D,...O,...k,...A,...j],N=i(`<button type="button"> </button>`),P=i(`<li> </li>`),F=i(`<article class="glass pattern-card"><div class="card-meta"><span> </span></div> <h3> </h3> <p> </p> <div class="pattern-section"><strong>When to use</strong> <p> </p></div> <div class="pattern-section"><strong>Example</strong> <div class="snippet-code"><pre><code> </code></pre> <button class="icon-button copy-button" type="button"><!></button></div></div> <div class="pattern-section"><strong>Common mistakes</strong> <ul></ul></div></article>`),I=i(`<div class="glass empty-library">No patterns match this search.</div>`),L=i(`<!> <main class="page-shell page-library"><!> <section class="library-hero glass"><span class="eyebrow">PROBLEM-SOLVING PATTERNS</span> <h2>Recognize the structure before writing code.</h2> <p>Use the pattern catalog to identify invariants, data structures, and trade-offs before
			choosing an implementation.</p></section> <section class="library-toolbar glass"><div class="search-control"><span class="search-icon"><!></span> <input aria-label="Search patterns" placeholder="Search patterns"/></div> <div class="chip-row"></div></section> <section class="pattern-grid"></section> <!></main>`,1);function R(i,a){y(a,!0);let E=u(``),D=u(``),O=e(()=>[`All`,...new Set(M.map(e=>e.category))]),k=u(`All`),A=e(()=>M.filter(e=>{let t=h(E).trim().toLowerCase();return(!t||`${e.title} ${e.category} ${e.summary}`.toLowerCase().includes(t))&&(h(k)===`All`||e.category===h(k))}));async function j(e,t){try{await navigator.clipboard.writeText(t),l(D,e,!0),window.setTimeout(()=>{h(D)===e&&l(D,``)},1200)}catch{l(D,``)}}var R=L(),z=n(R);w(z,{active:`patterns`});var B=c(z,2),V=s(B);T(V,{title:`Patterns`,subtitle:`Twenty-five reusable problem-solving models for interviews and production code.`});var H=c(V,4),U=s(H),W=s(U),G=s(W);C(G,{name:`search`,size:16}),_(W);var K=c(W,2);g(K),_(U);var q=c(U,2);m(q,20,()=>h(O),e=>e,(e,n)=>{var i=N();let a;var s=o(i,!0);r(()=>{a=p(i,1,``,null,a,{active:h(k)===n}),S(s,n)}),t(`click`,i,()=>l(k,n,!0)),d(e,i)}),_(q),_(H);var J=c(H,2);m(J,21,()=>h(A),e=>e.id,(n,i)=>{var a=F(),l=s(a),u=s(l),f=o(u,!0);_(l);var p=c(l,2),g=o(p,!0),v=c(p,2),y=o(v,!0),x=c(v,2),w=c(s(x),2),T=o(w,!0);_(x);var E=c(x,2),O=c(s(E),2),k=s(O),A=s(k),M=o(A,!0);_(k);var N=c(k,2),I=s(N);{let t=e(()=>h(D)===h(i).id?`check`:`copy`);C(I,{get name(){return h(t)},size:16})}_(N),_(O),_(E);var L=c(E,2),R=c(s(L),2);m(R,20,()=>h(i).mistakes,e=>e,(e,t)=>{var n=P(),i=o(n,!0);r(()=>S(i,t)),d(e,n)}),_(R),_(L),_(a),r(()=>{S(f,h(i).category),S(g,h(i).title),S(y,h(i).summary),S(T,h(i).when),S(M,h(i).code),b(N,`aria-label`,h(D)===h(i).id?`Code copied`:`Copy code`),b(N,`title`,h(D)===h(i).id?`Code copied`:`Copy code`)}),t(`click`,N,()=>j(h(i).id,h(i).code)),d(n,a)}),_(J);var Y=c(J,2),X=e=>{var t=I();d(e,t)};x(Y,e=>{h(A).length||e(X)}),_(B),f(K,()=>h(E),e=>l(E,e)),d(i,R),v()}a([`click`]);export{R as component};