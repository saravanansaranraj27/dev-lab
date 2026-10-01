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
		id: 'frequency-map',
		title: 'Frequency map',
		category: 'Hashing',
		summary: 'Store counts or first-seen positions for near-constant average lookup.',
		when: 'Anagrams, duplicate detection, counting, and complement lookup.',
		code: `const values = ['js', 'ts', 'js'];
const counts = new Map<string, number>();
for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
console.log(Object.fromEntries(counts));`,
		mistakes: [
			'Apply the pattern without first proving its invariant for frequency map.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'group-by-key',
		title: 'Group by key',
		category: 'Hashing',
		summary: 'Build an index from a property so later work can operate per group.',
		when: 'Categorization, aggregation, and one-to-many relationships.',
		code: `type Item = { key: string; name: string };
const items: Item[] = [{ key: 'web', name: 'Fetch' }, { key: 'web', name: 'Forms' }];
const groups = new Map<string, Item[]>();
for (const item of items) {
  const group = groups.get(item.key) ?? [];
  group.push(item);
  groups.set(item.key, group);
}
console.log([...groups]);`,
		mistakes: [
			'Apply the pattern without first proving its invariant for group by key.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	},
	{
		id: 'complement-lookup',
		title: 'Complement lookup',
		category: 'Hashing',
		summary: 'Store earlier values so the required counterpart can be found immediately.',
		when: 'Two-sum style problems and pair relationships.',
		code: `const twoSum = (values: number[], target: number) => {
  const seen = new Map<number, number>();
  for (let i = 0; i < values.length; i++) {
    const need = target - values[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(values[i], i);
  }
  return null;
};
console.log(twoSum([2, 7, 11, 15], 9));`,
		mistakes: [
			'Apply the pattern without first proving its invariant for complement lookup.',
			'Track the state change explicitly before optimizing implementation details.'
		]
	}
];
