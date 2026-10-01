export type Snippet = {
	id: string;
	title: string;
	language: string;
	category: string;
	description: string;
	code: string;
};

export const snippets: Snippet[] = [
	{
		id: 'group-by-key',
		title: 'Group items by key',
		language: 'TypeScript',
		category: 'Data',
		description: 'Build an index in one pass so later lookups can jump directly to each category.',
		code: `type Item = { category: string; name: string };
const items: Item[] = [{ category: 'fruit', name: 'Apple' }, { category: 'veg', name: 'Carrot' }];
const grouped = items.reduce<Record<string, Item[]>>((result, item) => {
  (result[item.category] ??= []).push(item);
  return result;
}, {});`
	},
	{
		id: 'type-guard',
		title: 'Narrow with a type guard',
		language: 'TypeScript',
		category: 'Types',
		description: 'Move runtime checks into reusable type predicates.',
		code: `const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;`
	},
	{
		id: 'exhaustive-switch',
		title: 'Exhaustive switch',
		language: 'TypeScript',
		category: 'Types',
		description: 'Make union changes fail at compile time when a branch is missing.',
		code: `const assertNever = (value: never): never => { throw new Error(\`Unexpected value: \${value}\`); };
switch (kind) { case 'a': return 1; case 'b': return 2; default: return assertNever(kind); }`
	},
	{
		id: 'result-type',
		title: 'Result type',
		language: 'TypeScript',
		category: 'Error handling',
		description: 'Model success and failure explicitly so callers must handle both outcomes.',
		code: `type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
const result: Result<string> = Math.random() > 0.5
  ? { ok: true, value: 'ready' }
  : { ok: false, error: new Error('Not ready') };
console.log(result);`
	},
	{
		id: 'utility-types',
		title: 'Utility types',
		language: 'TypeScript',
		category: 'Types',
		description:
			'Derive smaller API shapes from a shared model instead of repeating property definitions.',
		code: `type User = { id: string; name: string; email: string };
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
type UserPreview = Pick<User, 'id' | 'name'>;`
	}
];
