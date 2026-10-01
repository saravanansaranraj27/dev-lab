import type { Lesson } from './types';

export const typescriptLessons: Lesson[] = [
	{
		id: 'typescript-basics',
		title: 'TypeScript Fundamentals',
		area: 'TypeScript',
		level: 'Beginner',
		time: '20 min',
		desc: 'Annotate values, function parameters, return types, and arrays without fighting inference.',
		topics: ['annotations', 'inference', 'unions'],
		concept:
			'TypeScript adds a static type system over JavaScript. Prefer inference where the type is already obvious.',
		example:
			'const count: number = 3;\nconst tags: string[] = ["web", "api"];\n\nfunction double(value: number): number {\n  return value * 2;\n}\n\nconsole.log(double(count));',
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'typescript-shapes',
		title: 'Object Shapes & Interfaces',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '18 min',
		desc: 'Model objects with interfaces, type aliases, optional properties, and readonly fields.',
		topics: ['interfaces', 'type aliases', 'readonly'],
		concept:
			'Types describe contracts between parts of a program and make invalid states easier to catch before runtime.',
		example:
			'interface Account {\n  readonly id: string;\n  label: string;\n  enabled?: boolean;\n}\n\nconst account: Account = { id: "item_001", label: "demo" };\nconsole.log(account);',
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'typescript-generics',
		title: 'Generics',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '22 min',
		desc: 'Preserve relationships between input and output types with generic functions and constraints.',
		topics: ['generics', 'constraints', 'type parameters'],
		concept:
			'Generics let one implementation work across many types while preserving useful relationships between them.',
		example:
			'function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\n\nconsole.log(first(["a", "b"]));\nconsole.log(first([1, 2]));',
		runnable: true,
		playgroundMode: 'TypeScript'
	},
	{
		id: 'typescript-narrowing',
		title: 'Narrowing & Type Guards',
		area: 'TypeScript',
		level: 'Intermediate',
		time: '20 min',
		desc: 'Turn broad unions into safe concrete values with typeof, in, discriminants, and custom guards.',
		topics: ['unions', 'narrowing', 'guards'],
		concept:
			'Narrowing uses runtime evidence to reduce a static union to the branch-safe type you actually have.',
		example:
			'function sizeOf(value: string | string[]) {\n  if (typeof value === "string") return value.length;\n  return value.length;\n}\n\nconsole.log(sizeOf("dev"));',
		runnable: true,
		playgroundMode: 'TypeScript'
	}
];
