import { patterns as arraysPatterns } from './patterns/arrays';
import { patterns as hashingPatterns } from './patterns/hashing';
import { patterns as stacksPatterns } from './patterns/stacks';
import { patterns as graphsPatterns } from './patterns/graphs';
import { patterns as dpPatterns } from './patterns/dp';
import { patterns as specializedPatterns } from './patterns/specialized';

import type { Pattern } from './patterns/arrays';
export type { Pattern } from './patterns/arrays';
export const patterns: Pattern[] = [
	...arraysPatterns,
	...hashingPatterns,
	...stacksPatterns,
	...graphsPatterns,
	...dpPatterns,
	...specializedPatterns
];
