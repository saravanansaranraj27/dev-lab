# DevLab

> A browser-based developer learning workspace for exploring algorithms, APIs, SQL, and web fundamentals — built with Svelte 5, SvelteKit, TypeScript, and a fully static, client-side architecture.

![Svelte](https://img.shields.io/badge/Svelte-5-ff3e00?logo=svelte&logoColor=white)
![SvelteKit](https://img.shields.io/badge/SvelteKit-2-ff3e00?logo=svelte&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?logo=node.js&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-49%20passing-5fa04e?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-0f766e)

### 🌐 [Live Demo](https://saravanansaranraj27.github.io/dev-lab)

DevLab is a Svelte 5 / SvelteKit application for learning by building. It brings together a 90-lesson library, an in-browser coding playground, a 25-algorithm visualizer, an API request lab, a searchable snippet and pattern reference, and a six-tool toolbox in a single dashboard with a persistent dark/light workspace.

The application is a fully static site with no backend. All content is typed data bundled with the app, and the production build is optimized for GitHub Pages deployment.

## Contents

- [Content library](#content-library)
- [Features](#features)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Testing and verification](#testing-and-verification)
- [Deployment](#deployment)
- [Formatting](#formatting)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Content library

The application contains **9 sidebar workspaces** backed by static, typed content in `src/lib/data/` and `src/lib/features/visualizer/algorithms/`. No external content API is involved.

### Sidebar — 9 workspaces

| Workspace  | Route         | Purpose                                                   |
| ---------- | ------------- | --------------------------------------------------------- |
| Overview   | `/`           | Dashboard with entry points into every workspace          |
| Learn      | `/learn`      | 90-lesson library with search, filters, and notes         |
| Playground | `/playground` | In-browser editor and runner for six language modes       |
| Visualizer | `/visualizer` | Step-through visualizations of 25 algorithms              |
| API Lab    | `/api`        | Request and response console for HTTP APIs                |
| Toolbox    | `/tools`      | Six everyday developer utilities                          |
| Snippets   | `/snippets`   | Searchable reusable code snippets                         |
| Patterns   | `/patterns`   | Reference catalog of algorithmic problem-solving patterns |
| Settings   | `/settings`   | Theme, accent color, and workspace preferences            |

### Learn — 90 lessons across 9 areas

| Area       | Lessons | Area       | Lessons |
| ---------- | :-----: | ---------- | :-----: |
| JavaScript |   10    | SQL        |   10    |
| TypeScript |   10    | Algorithms |   10    |
| HTML       |   10    | Tooling    |   10    |
| CSS        |   10    | Security   |   10    |
| Web        |   10    |            |         |

Split by level: 13 Beginner, 74 Intermediate, and 3 Advanced. Each lesson carries a title, description, topic tags, a worked concept explanation, and an example. Runnable lessons open directly in the Playground in JavaScript, TypeScript, HTML, CSS, JSON, or SQL mode.

### Visualizer — 25 algorithms

| Category            | Algorithms                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| Sorting             | Bubble sort, Selection sort, Insertion sort, Merge sort, Quick sort, Heap sort                      |
| Searching & arrays  | Linear search, Binary search, Two pointers, Sliding window, Kadane's algorithm, Prefix sum, Hashing |
| Linked lists        | Reverse linked list, Floyd cycle detection, Merge two sorted lists                                  |
| Trees               | Binary tree DFS, Binary tree BFS, BST search                                                        |
| Graphs              | Graph BFS, Graph DFS, Dijkstra's algorithm, Topological sort                                        |
| Dynamic programming | 0/1 knapsack, Longest common subsequence                                                            |

Every algorithm carries a time complexity, space complexity, plain-language description, and an interview-style tip, alongside step generation, previous/next stepping, and autoplay controls.

### Patterns — 30 entries across 6 categories

| Category | Entries | Category      | Entries |
| -------- | :-----: | ------------- | :-----: |
| Arrays   |    5    | Graphs        |    6    |
| Hashing  |    4    | Dynamic prog. |    6    |
| Stacks   |    3    | Specialized   |    6    |

### Snippets — 30 entries across 5 languages

| Language   | Entries | Language | Entries |
| ---------- | :-----: | -------- | :-----: |
| JavaScript |    6    | CSS      |    6    |
| TypeScript |    6    | SQL      |    6    |
| Web (HTML) |    6    |          |         |

### Toolbox — 6 utilities

| Tool      | What it does                                            |
| --------- | ------------------------------------------------------- |
| JSON      | Validate and pretty-print JSON                          |
| Base64    | Encode or decode text using Base64                      |
| URL       | Encode or decode URL components                         |
| Timestamp | Convert between dates and Unix timestamps               |
| UUID      | Generate browser-native UUIDs                           |
| Regex     | Test a JavaScript regular expression against input text |

## Features

| Area               | Capabilities                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Learn              | Searches and filters 90 lessons by area, with concept notes, example copy, and a jump into the Playground                       |
| Playground         | Runs JavaScript in a worker, previews HTML and CSS in an isolated iframe, and validates TypeScript and SQL with practice tables |
| Visualizer         | Steps through 25 algorithms with complexity notes, interview tips, and playback controls                                        |
| API Lab            | Sends HTTP requests, shows responses, and copies the request or response in one click                                           |
| Toolbox            | Provides JSON, Base64, URL, Timestamp, UUID, and Regex utilities                                                                |
| Snippets           | Provides 30 reusable snippets across web, CSS, JavaScript, TypeScript, and SQL                                                  |
| Patterns           | Provides 30 algorithmic patterns across arrays, hashing, stacks, graphs, DP, and specialized topics                             |
| Theming            | Offers dark, light, and system themes with 10 accent colors, persisted in `localStorage` and synced across open tabs            |
| Preferences        | Includes reduced-motion and compact-layout options in Settings                                                                  |
| Loading States     | Shows a loader during route transitions                                                                                         |
| Responsive Design  | Uses a shared sidebar, topbar, and page shell across every route                                                                |
| Client-Side Only   | Builds statically with `@sveltejs/adapter-static`; no backend required                                                          |
| GitHub Pages Ready | Uses a `/dev-lab` base path and a `gh-pages` deployment command                                                                 |
| Automated Tests    | Runs 49 checks with Node's built-in test runner                                                                                 |
| Prettier + ESLint  | Provides consistent formatting and linting                                                                                      |

## Quick start

### Requirements

- Node.js 20.19 or newer (or 22.12 or newer), as required by Vite 8 and enforced by `.npmrc` (`engine-strict=true`)
- npm
- Visual Studio Code is recommended (see [`docs/VSCODE.md`](docs/VSCODE.md))

### Create the project

```bash
npx sv create .
cd dev-lab
```

### Clone the repository

```bash
git clone https://github.com/saravanansaranraj27/dev-lab.git
cd dev-lab
```

### Install dependencies

```bash
npm install
```

### Add deployment and adapter packages

```bash
npm install -D @sveltejs/adapter-static
```

### Verify Node.js

```bash
node --version
```

### Verify the installation

```bash
npm run check
npm run test
```

## Using the app

The development server serves the app under the `/dev-lab` base path.

### Start DevLab

```powershell
npm run dev
```

The application runs at:

```text
http://localhost:5173/dev-lab/
```

Start the development server and open the browser automatically:

```powershell
npm run dev -- --open
```

### Workflow

1. Open the Overview dashboard and jump into any workspace from the sidebar
2. Visit **Learn** to search, filter, and work through the 90-lesson library by area
3. Use **Playground** to write and run JavaScript, or validate HTML, CSS, TypeScript, and SQL, directly in the browser
4. Open **Visualizer** to step through sorting, searching, linked-list, tree, graph, and DP algorithms
5. Use **API Lab** to send requests and inspect responses, with one-click copy for both
6. Browse **Snippets** and **Patterns** for reusable reference material, and **Toolbox** for JSON, Base64, URL, Timestamp, UUID, and Regex utilities
7. Adjust theme, accent color, and workspace preferences from **Settings**; choices persist via `localStorage` and sync across open tabs

## Project structure

```text
dev-lab/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/                     # Topbar and Sidebar
│   │   │   └── ui/                         # Icon, Select, ConsoleOutput
│   │   ├── features/                       # Per-route state and logic
│   │   │   ├── api/                        # API Lab request state
│   │   │   ├── home/                       # Overview content
│   │   │   ├── layout/                     # Topbar state
│   │   │   ├── learn/                      # Lesson search, filters, and notes
│   │   │   ├── playground/                 # Editor state, worker, SQL engine, validation
│   │   │   ├── settings/                   # Theme, accent, and preference state
│   │   │   ├── tools/                      # Toolbox state
│   │   │   └── visualizer/
│   │   │       └── algorithms/             # 25-algorithm catalog and step engine
│   │   ├── data/                           # Typed static content
│   │   │   ├── lessons/                    # 90 lessons across 9 areas
│   │   │   ├── patterns/                   # 30 patterns across 6 categories
│   │   │   ├── snippets/                   # 30 snippets across 5 languages
│   │   │   └── nav.ts                      # Sidebar navigation items
│   │   └── styles/
│   │       ├── components/                 # Topbar, Sidebar, and Select styles
│   │       └── pages/                      # Per-page stylesheets
│   ├── routes/
│   │   ├── learn/                          # Learn workspace
│   │   ├── playground/                     # Playground workspace
│   │   ├── visualizer/                     # Visualizer workspace
│   │   ├── api/                            # API Lab workspace
│   │   ├── tools/                          # Toolbox workspace
│   │   ├── snippets/                       # Snippets workspace
│   │   ├── patterns/                       # Patterns workspace
│   │   ├── settings/                       # Settings workspace
│   │   ├── +layout.svelte                  # Shell, theme bootstrap, route loader
│   │   ├── +layout.ts                      # Prerender configuration
│   │   └── +page.svelte                    # Overview
│   ├── app.html                            # HTML shell
│   ├── app.css                             # Global styles
│   └── app.d.ts                            # Ambient type declarations
│
├── tests/
│   ├── unit/                               # Playground validation logic
│   ├── integration/                        # Navigation smoke tests and component contracts
│   ├── quality/                            # Project-wide source and style contracts
│   └── responsive/                         # Responsive layout contracts
│
├── docs/
│   ├── TESTING.md                          # Test suites and verification order
│   └── VSCODE.md                           # VS Code setup and workflow
├── .vscode/                                # Recommended extensions and format-on-save settings
├── static/                                 # Favicon and robots.txt
├── .npmrc                                  # Engine enforcement (engine-strict=true)
├── .gitignore                              # Git exclusions for generated files
├── .prettierignore                         # Prettier exclusions
├── prettier.config.js                      # Prettier formatting configuration
├── eslint.config.js                        # ESLint configuration
├── svelte.config.js                        # SvelteKit static adapter and /dev-lab base path
├── vite.config.ts                          # Vite configuration
├── tsconfig.json                           # TypeScript compiler configuration
├── package.json                            # Project dependencies and npm scripts
├── package-lock.json                       # Locked npm dependency versions
└── README.md                               # Project documentation
```

## Technology

- [Svelte 5](https://svelte.dev/) — runes-based reactivity (`$state`, `$derived`, `$props`)
- [SvelteKit 2](https://kit.svelte.dev/) — routing and static site generation
- [Vite 8](https://vite.dev/) — dev server and build tool
- [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) — fully static, client-side-only build
- [TypeScript 6](https://www.typescriptlang.org/) — typed application code
- [`svelte-check`](https://www.npmjs.com/package/svelte-check) — Svelte and TypeScript validation
- [Node.js test runner](https://nodejs.org/api/test.html) — automated unit, integration, quality, and responsive tests
- [Prettier](https://prettier.io/) — source formatting, with `prettier-plugin-svelte`
- [ESLint](https://eslint.org/) — linting, with `eslint-plugin-svelte`, `typescript-eslint`, and `eslint-config-prettier`
- [`gh-pages`](https://www.npmjs.com/package/gh-pages) — static deployment to GitHub Pages

## Development commands

### Application

```powershell
npm run dev
npm run dev -- --open
npm run build
npm run preview
```

### Validation

```powershell
npm run check
npm run check:watch
npm run lint
npm run test
```

### Formatting

```powershell
npm run format
npx prettier --check .
```

## Testing and verification

The suite contains **5 test files** with **49 checks**. Every check reads source or rendered markup directly, so no browser is required and the suite runs the same in a terminal, in CI, or in VS Code.

| Suite       | Test file                                       | Checks | Coverage                                                                    |
| ----------- | ----------------------------------------------- | :----: | --------------------------------------------------------------------------- |
| Unit        | `tests/unit/playground-validation.test.js`      |   11   | Playground syntax-validation and lesson runnability logic                   |
| Integration | `tests/integration/navigation-smoke.test.js`    |   5    | Sidebar destinations, key UI contracts, and the route loader                |
| Integration | `tests/integration/component-contracts.test.js` |   21   | Interactive controls and accessibility labelling across every feature route |
| Quality     | `tests/quality/project-quality.test.js`         |   7    | Source- and stylesheet-level project conventions                            |
| Responsive  | `tests/responsive/responsive-contracts.test.js` |   5    | Shared responsive shell usage and breakpoint coverage                       |

A successful run currently produces:

```text
# tests 49
# pass 49
# fail 0
```

### Recommended verification order

```powershell
npm run check
npm run test
npm run lint
npm run build
```

These checks do not replace real browser viewport testing. See [`docs/TESTING.md`](docs/TESTING.md) for what each suite verifies.

## Deployment

### Deploy to GitHub Pages

Build the project and deploy the generated `build` directory:

```powershell
npm run build
npx gh-pages -d build --nojekyll
```

The application is served under the `/dev-lab` base path configured in `svelte.config.js`.

### Manual deployment

Create a production build:

```powershell
npm run build
```

The built files are located in the `build/` directory and can be deployed to any static hosting service configured for the `/dev-lab` base path.

### Preview the production build

```powershell
npm run preview
```

## Formatting

The project uses Prettier (with `prettier-plugin-svelte`) and ESLint. The repository includes VS Code settings for format-on-save and ESLint auto-fix; see [`docs/VSCODE.md`](docs/VSCODE.md).

Format the entire project:

```powershell
npm run format
```

Check formatting without modifying files:

```powershell
npx prettier --check .
```

List files that differ from the expected formatting:

```powershell
npx prettier --list-different .
```

## Troubleshooting

### Node.js version error during `npm install`

`.npmrc` enables `engine-strict=true`, so installation fails on unsupported Node.js versions. Check your version:

```powershell
node --version
```

Install Node.js 20.19 or newer (or 22.12 or newer), then run `npm install` again.

### The page is blank or returns 404 in development

The application uses the `/dev-lab` base path. Open:

```text
http://localhost:5173/dev-lab/
```

### Port 5173 is already in use

Stop the other process, or start the server on another port:

```powershell
npm run dev -- --port 5174
```

### `npm run lint` reports formatting errors

Format the project, then run lint again:

```powershell
npm run format
npm run lint
```

### Svelte or TypeScript errors

Run:

```powershell
npm run check
```

### Assets fail to load on GitHub Pages

Deploy with `--nojekyll` so the `_app` directory is served, and make sure the site is served from the `/dev-lab` path:

```powershell
npm run build
npx gh-pages -d build --nojekyll
```

## Complete command reference

```powershell

git clone https://github.com/saravanansaranraj27/dev-lab.git
npm install
node --version
npm run dev
npm run dev -- --open
npm run build
npm run preview
npm run check
npm run check:watch
npm run lint
npm run format
npm run test
npx prettier --check .
npx prettier --list-different .
npx gh-pages -d build --nojekyll
```

## Contributing

Bug reports, improvements, and pull requests are welcome.

Keep changes focused and verify them before opening a pull request:

```powershell
npm run check
npm run test
npm run lint
npm run build
```

Keep new behavior covered by the matching suite under `tests/`, and see [`docs/TESTING.md`](docs/TESTING.md) for details.

## License

This project is licensed under the MIT License.
