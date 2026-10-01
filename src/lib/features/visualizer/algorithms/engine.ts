import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import type { Algorithm } from './catalog';

export type VisualizerStep = {
	values: number[];
	active: number[];
	label: string;
	comparisons: number;
	swaps: number;
};

export function buildAlgorithmSteps(input: number[], algorithm: Algorithm): VisualizerStep[] {
	const values = [...input];
	const steps: VisualizerStep[] = [
		{ values: [...values], active: [], label: 'Initial input', comparisons: 0, swaps: 0 }
	];
	let comparisons = 0;
	let swaps = 0;
	const push = (active: number[], label: string) =>
		steps.push({ values: [...values], active: [...active], label, comparisons, swaps });
	const compare = (active: number[], label: string) => {
		comparisons += 1;
		push(active, label);
	};
	const swap = (a: number, b: number, label: string) => {
		[values[a], values[b]] = [values[b], values[a]];
		swaps += 1;
		push([a, b], label);
	};

	if (algorithm === 'Bubble sort') {
		for (let end = values.length - 1; end > 0; end -= 1) {
			let changed = false;
			for (let i = 0; i < end; i += 1) {
				compare([i, i + 1], `Compare ${values[i]} and ${values[i + 1]}`);
				if (values[i] > values[i + 1]) {
					swap(i, i + 1, 'Swap adjacent values');
					changed = true;
				}
			}
			push([end], `Pass complete · position ${end} is sorted`);
			if (!changed) break;
		}
	} else if (algorithm === 'Selection sort') {
		for (let start = 0; start < values.length - 1; start += 1) {
			let min = start;
			for (let i = start + 1; i < values.length; i += 1) {
				compare([min, i], `Compare current minimum ${values[min]} with ${values[i]}`);
				if (values[i] < values[min]) {
					min = i;
					push([start, min], `New minimum ${values[min]}`);
				}
			}
			if (min !== start) swap(start, min, `Place minimum ${values[start]}`);
		}
	} else if (algorithm === 'Insertion sort') {
		for (let i = 1; i < values.length; i += 1) {
			const key = values[i];
			let j = i - 1;
			while (j >= 0) {
				compare([j, j + 1], `Compare ${values[j]} with ${key}`);
				if (values[j] <= key) break;
				values[j + 1] = values[j];
				swaps += 1;
				push([j, j + 1], `Shift ${values[j]} right`);
				j -= 1;
			}
			values[j + 1] = key;
			push([j + 1], `Insert ${key} into sorted prefix`);
		}
	} else if (algorithm === 'Merge sort') {
		const merge = (left: number, middle: number, right: number) => {
			const a = values.slice(left, middle + 1);
			const b = values.slice(middle + 1, right + 1);
			let i = 0;
			let j = 0;
			let k = left;
			while (i < a.length && j < b.length) {
				compare([left + i, middle + 1 + j], `Compare ${a[i]} and ${b[j]}`);
				values[k] = a[i] <= b[j] ? a[i++] : b[j++];
				swaps += 1;
				push([k], `Write ${values[k]} during merge`);
				k += 1;
			}
			while (i < a.length) {
				values[k] = a[i++];
				swaps += 1;
				push([k], `Write remaining left value ${values[k]}`);
				k += 1;
			}
			while (j < b.length) {
				values[k] = b[j++];
				swaps += 1;
				push([k], `Write remaining right value ${values[k]}`);
				k += 1;
			}
		};
		const sort = (left: number, right: number) => {
			if (left >= right) return;
			const middle = Math.floor((left + right) / 2);
			push([left, right], `Split range ${left}–${right}`);
			sort(left, middle);
			sort(middle + 1, right);
			merge(left, middle, right);
		};
		sort(0, values.length - 1);
	} else if (algorithm === 'Quick sort') {
		const partition = (left: number, right: number) => {
			const pivot = values[right];
			push([right], `Choose pivot ${pivot}`);
			let store = left;
			for (let i = left; i < right; i += 1) {
				compare([i, right], `Compare ${values[i]} with pivot ${pivot}`);
				if (values[i] < pivot) {
					if (i !== store) swap(i, store, 'Move value into lower partition');
					store += 1;
				}
			}
			if (store !== right) swap(store, right, `Place pivot ${pivot}`);
			return store;
		};
		const sort = (left: number, right: number) => {
			if (left >= right) return;
			const pivot = partition(left, right);
			sort(left, pivot - 1);
			sort(pivot + 1, right);
		};
		sort(0, values.length - 1);
	} else if (algorithm === 'Heap sort') {
		const heapify = (length: number, root: number) => {
			let largest = root;
			const left = root * 2 + 1;
			const right = root * 2 + 2;
			if (left < length) {
				compare([root, left], `Compare heap parent ${values[root]} and child ${values[left]}`);
				if (values[left] > values[largest]) largest = left;
			}
			if (right < length) {
				compare(
					[largest, right],
					`Compare heap candidate ${values[largest]} and child ${values[right]}`
				);
				if (values[right] > values[largest]) largest = right;
			}
			if (largest !== root) {
				swap(root, largest, 'Restore max-heap order');
				heapify(length, largest);
			}
		};
		for (let i = Math.floor(values.length / 2) - 1; i >= 0; i -= 1) heapify(values.length, i);
		for (let end = values.length - 1; end > 0; end -= 1) {
			swap(0, end, `Extract maximum to position ${end}`);
			heapify(end, 0);
		}
	} else if (algorithm === 'Linear search') {
		const target = values[Math.floor(values.length * 0.65)];
		for (let i = 0; i < values.length; i += 1) {
			compare([i], `Check index ${i}: ${values[i]} against target ${target}`);
			if (values[i] === target) {
				push([i], `Target ${target} found`);
				break;
			}
		}
	} else if (algorithm === 'Binary search') {
		values.sort((a, b) => a - b);
		push([], 'Prepare sorted input');
		const target = values[Math.floor(values.length * 0.65)];
		let left = 0;
		let right = values.length - 1;
		while (left <= right) {
			const middle = Math.floor((left + right) / 2);
			compare([left, middle, right], `Compare middle ${values[middle]} with target ${target}`);
			if (values[middle] === target) {
				push([middle], `Found target ${target}`);
				break;
			}
			if (values[middle] < target) left = middle + 1;
			else right = middle - 1;
		}
	} else if (algorithm === 'Two pointers') {
		values.sort((a, b) => a - b);
		push([], 'Prepare sorted input');
		const target = values[0] + values[values.length - 1];
		let left = 0;
		let right = values.length - 1;
		while (left < right) {
			const sum = values[left] + values[right];
			compare([left, right], `Pair sum ${sum} against target ${target}`);
			if (sum === target) {
				push([left, right], 'Pair found');
				break;
			}
			if (sum < target) left += 1;
			else right -= 1;
		}
	} else if (algorithm === 'Sliding window') {
		const width = Math.min(4, values.length);
		let windowSum = 0;
		let bestSum = Number.NEGATIVE_INFINITY;
		let bestStart = 0;
		for (let right = 0; right < values.length; right += 1) {
			windowSum += values[right];
			push([right], `Expand window to index ${right}`);
			if (right >= width) {
				windowSum -= values[right - width];
				push([right - width, right], 'Shrink window from the left');
			}
			if (right >= width - 1 && windowSum > bestSum) {
				bestSum = windowSum;
				bestStart = right - width + 1;
				push(
					Array.from({ length: width }, (_, index) => bestStart + index),
					`Best window sum ${bestSum}`
				);
			}
		}
	} else if (algorithm === "Kadane's algorithm") {
		let current = values[0] ?? 0;
		let best = current;
		push([0], `Start with ${current}`);
		for (let i = 1; i < values.length; i += 1) {
			current = Math.max(values[i], current + values[i]);
			best = Math.max(best, current);
			push([i], `At ${values[i]} · current ${current} · best ${best}`);
		}
	} else if (algorithm === 'Prefix sum') {
		let total = 0;
		for (let i = 0; i < values.length; i += 1) {
			total += values[i];
			values[i] = total;
			push([i], `Prefix at ${i} = ${total}`);
		}
	} else if (algorithm === 'Hashing') {
		const frequency = new SvelteMap<number, number>();
		for (let i = 0; i < values.length; i += 1) {
			const count = (frequency.get(values[i]) ?? 0) + 1;
			frequency.set(values[i], count);
			push([i], `Hash ${values[i]} · frequency ${count}`);
		}
	} else if (algorithm === 'Reverse linked list') {
		const nodes = [...values];
		let previous = -1;
		let current = 0;
		while (current < nodes.length) {
			const next = current + 1;
			push(
				[current],
				`Reverse node ${nodes[current]}: next → ${previous < 0 ? 'null' : nodes[previous]}`
			);
			[values[previous + 1], values[current]] = [values[current], values[previous + 1]];
			swaps += 1;
			previous = current;
			current = next;
		}
		values.reverse();
		push(
			values.map((_, index) => index),
			'Linked list reversed'
		);
	} else if (algorithm === 'Floyd cycle detection') {
		const next = values.map((_, index) => (index + 1) % values.length);
		let slow = 0;
		let fast = 0;
		for (let iteration = 1; iteration <= values.length + 1; iteration += 1) {
			slow = next[slow];
			fast = next[next[fast]];
			compare([slow, fast], `Iteration ${iteration} · slow ${slow}, fast ${fast}`);
			if (slow === fast) {
				push([slow, fast], 'Pointers meet · cycle detected');
				break;
			}
		}
	} else if (algorithm === 'Merge two sorted lists') {
		const left = values.slice(0, Math.ceil(values.length / 2)).sort((a, b) => a - b);
		const right = values.slice(Math.ceil(values.length / 2)).sort((a, b) => a - b);
		let i = 0;
		let j = 0;
		let k = 0;
		push([], 'Split input into two sorted lists');
		while (i < left.length && j < right.length) {
			compare([i, left.length + j], `Compare ${left[i]} and ${right[j]}`);
			values[k] = left[i] <= right[j] ? left[i++] : right[j++];
			swaps += 1;
			push([k], `Append ${values[k]}`);
			k += 1;
		}
		while (i < left.length) {
			values[k] = left[i++];
			swaps += 1;
			push([k], `Append remaining ${values[k]}`);
			k += 1;
		}
		while (j < right.length) {
			values[k] = right[j++];
			swaps += 1;
			push([k], `Append remaining ${values[k]}`);
			k += 1;
		}
	} else if (algorithm === 'Binary tree DFS') {
		const visit = (index: number) => {
			if (index >= values.length) return;
			push([index], `Visit node ${values[index]} preorder`);
			visit(index * 2 + 1);
			visit(index * 2 + 2);
		};
		visit(0);
	} else if (algorithm === 'Binary tree BFS') {
		const queue = [0];
		while (queue.length) {
			const index = queue.shift()!;
			if (index >= values.length) continue;
			push([index], `Dequeue and visit node ${values[index]}`);
			queue.push(index * 2 + 1, index * 2 + 2);
		}
	} else if (algorithm === 'BST search') {
		values.sort((a, b) => a - b);
		push([], 'Prepare ordered BST values');
		const target = values[Math.floor(values.length / 2)];
		let left = 0;
		let right = values.length - 1;
		while (left <= right) {
			const middle = Math.floor((left + right) / 2);
			compare([middle], `Compare node ${values[middle]} with target ${target}`);
			if (values[middle] === target) {
				push([middle], 'Target found in BST');
				break;
			}
			if (values[middle] < target) left = middle + 1;
			else right = middle - 1;
		}
	} else if (algorithm === 'Graph BFS') {
		const adjacency = values.map((_, index) =>
			[
				index + 1 < values.length ? index + 1 : -1,
				index + 2 < values.length ? index + 2 : -1
			].filter((node) => node >= 0)
		);
		const queue = [0];
		const visited = new SvelteSet<number>([0]);
		while (queue.length) {
			const node = queue.shift()!;
			push([node], `Visit vertex ${node + 1} with BFS`);
			for (const neighbor of adjacency[node])
				if (!visited.has(neighbor)) {
					visited.add(neighbor);
					queue.push(neighbor);
				}
		}
	} else if (algorithm === 'Graph DFS') {
		const adjacency = values.map((_, index) =>
			[
				index + 1 < values.length ? index + 1 : -1,
				index + 2 < values.length ? index + 2 : -1
			].filter((node) => node >= 0)
		);
		const visited = new SvelteSet<number>();
		const visit = (node: number) => {
			if (visited.has(node)) return;
			visited.add(node);
			push([node], `Visit vertex ${node + 1} with DFS`);
			for (const neighbor of adjacency[node]) visit(neighbor);
		};
		visit(0);
	} else if (algorithm === "Dijkstra's algorithm") {
		const distances = values.map((value, index) => (index === 0 ? 0 : value));
		const finalized = new SvelteSet<number>();
		distances[0] = 0;
		for (let round = 0; round < values.length; round += 1) {
			let best = -1;
			for (let i = 0; i < distances.length; i += 1)
				if (!finalized.has(i) && (best < 0 || distances[i] < distances[best])) best = i;
			if (best < 0) break;
			finalized.add(best);
			push([best], `Finalize vertex ${best + 1} at distance ${distances[best]}`);
			const neighbors = [best - 1, best + 1].filter((node) => node >= 0 && node < distances.length);
			for (const neighbor of neighbors) {
				const candidate = distances[best] + Math.max(1, values[neighbor] % 9);
				compare([best, neighbor], `Relax edge ${best + 1} → ${neighbor + 1}`);
				if (candidate < distances[neighbor]) {
					distances[neighbor] = candidate;
					values[neighbor] = candidate;
					swaps += 1;
					push([neighbor], `Update distance to ${candidate}`);
				}
			}
		}
	} else if (algorithm === 'Topological sort') {
		const indegree = values.map((_, index) => (index === 0 ? 0 : 1));
		const queue = indegree
			.map((degree, index) => (degree === 0 ? index : -1))
			.filter((index) => index >= 0);
		while (queue.length) {
			const node = queue.shift()!;
			push([node], `Remove vertex ${node + 1} with indegree 0`);
			const next = node + 1;
			if (next < indegree.length) {
				indegree[next] -= 1;
				if (indegree[next] === 0) queue.push(next);
			}
		}
	} else if (algorithm === '0/1 knapsack') {
		const capacity = Math.max(4, Math.floor(values.length / 2));
		const weights = values.map((value) => (value % 4) + 1);
		const itemValues = values.map((value) => (value % 9) + 2);
		const dp = new Array(capacity + 1).fill(0);
		for (let item = 0; item < values.length; item += 1) {
			for (let weight = capacity; weight >= weights[item]; weight -= 1) {
				dp[weight] = Math.max(dp[weight], dp[weight - weights[item]] + itemValues[item]);
			}
			values[item] = dp[capacity];
			swaps += 1;
			push([item], `Process item ${item + 1} · capacity ${capacity} · best ${dp[capacity]}`);
		}
	} else if (algorithm === 'Longest common subsequence') {
		const first = values.map((value) => String.fromCharCode(65 + (value % 6)));
		const second = [...first].reverse();
		const dp = Array.from({ length: first.length + 1 }, () => new Array(second.length + 1).fill(0));
		for (let i = 1; i <= first.length; i += 1) {
			for (let j = 1; j <= second.length; j += 1) {
				compare([i - 1, j - 1], `Compare ${first[i - 1]} with ${second[j - 1]}`);
				dp[i][j] =
					first[i - 1] === second[j - 1]
						? dp[i - 1][j - 1] + 1
						: Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
			values[i - 1] = dp[i][second.length];
			push([i - 1], `LCS row ${i} · length ${dp[i][second.length]}`);
		}
	}

	steps.push({ values: [...values], active: [], label: 'Complete', comparisons, swaps });
	return steps;
}
