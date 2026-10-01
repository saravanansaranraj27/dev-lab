import { snippets as javascriptSnippets } from './snippets/javascript';
import { snippets as typescriptSnippets } from './snippets/typescript';
import { snippets as webSnippets } from './snippets/web';
import { snippets as cssSnippets } from './snippets/css';
import { snippets as sqlSnippets } from './snippets/sql';

import type { Snippet } from './snippets/javascript';
export type { Snippet } from './snippets/javascript';
export const snippets: Snippet[] = [
	...javascriptSnippets,
	...typescriptSnippets,
	...webSnippets,
	...cssSnippets,
	...sqlSnippets
];
