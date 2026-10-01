import type { Lesson } from './types';
import { algorithmsLessons } from './algorithms';
import { cssLessons } from './css';
import { javascriptLessons } from './javascript';
import { securityLessons } from './security';
import { sqlLessons } from './sql';
import { toolingLessons } from './tooling';
import { typescriptLessons } from './typescript';
import { webLessons } from './web';
import { supplementalLessons } from './supplemental';

export const lessons: Lesson[] = [
	...javascriptLessons,
	...typescriptLessons,
	...webLessons,
	...cssLessons,
	...sqlLessons,
	...algorithmsLessons,
	...toolingLessons,
	...securityLessons,
	...supplementalLessons
];
