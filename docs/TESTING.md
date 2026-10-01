# DevLab Testing

> A professional verification pipeline for the DevLab application — built with Node's built-in test runner, svelte-check, Prettier, and ESLint.

![Tests](https://img.shields.io/badge/Tests-49%20passing-5fa04e?logo=node.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?logo=node.js&logoColor=white)
![svelte-check](https://img.shields.io/badge/svelte--check-4-ff3e00?logo=svelte&logoColor=white)
![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-1a2b34?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4b32c3?logo=eslint&logoColor=white)

DevLab is verified with Node's built-in test runner across four dedicated suites (unit, integration, quality, and responsive) totaling 49 checks. Prettier formatting, ESLint linting, and `svelte-check` type and template validation complete the pipeline.

None of these suites require a browser. Every check reads the source or rendered markup directly, so the full pipeline runs the same in a terminal, in CI, or in VS Code.

## Contents

- [Test coverage](#test-coverage)
- [Features](#features)
- [Quick start](#quick-start)
- [Using the test suite](#using-the-test-suite)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Test execution](#test-execution)
- [Test reporting](#test-reporting)
- [Formatting](#formatting)
- [Build verification](#build-verification)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Test coverage

The suite contains **5 test files** with **49 individual checks**.

### Unit — 1 test file

| Test file                                  | Checks | Coverage                                        |
| ------------------------------------------ | :----: | ----------------------------------------------- |
| `tests/unit/playground-validation.test.js` |   11   | Playground syntax-validation logic in isolation |

Exercises `src/lib/features/playground/validation.ts` directly, compiled in memory with TypeScript's transpiler and run in a `vm` sandbox:

- Balanced-syntax scanning accepts valid braces and ignores braces inside quoted strings
- Unbalanced or unexpected closing delimiters are flagged with `severity: 'error'`
- HTML tag balance is validated, including detection of mismatched tags
- CSS brace balance is validated the same way
- Lesson runnability is determined correctly: valid JSON examples pass, invalid JSON fails, and browser-dependent JavaScript (such as `document.querySelector`) is excluded from the Playground
- A lesson with no declared mode defaults to `JavaScript`

### Integration — 2 test files

| Test file                                       | Checks | Coverage                                                                |
| ----------------------------------------------- | :----: | ----------------------------------------------------------------------- |
| `tests/integration/navigation-smoke.test.js`    |   5    | Sidebar navigation, key UI contracts, and the route loader              |
| `tests/integration/component-contracts.test.js` |   21   | Interactive controls and accessibility labelling across every workspace |

**Navigation smoke** reads the layout and key routes to confirm:

- The sidebar declares all nine destinations (`home`, `learn`, `playground`, `visualizer`, `api`, `tools`, `snippets`, `patterns`, `settings`)
- The API Lab response-copy button carries an accessible, state-aware `aria-label`
- Settings renders its four expected sections (Content, UI and state, Browser execution, Feedback)
- The route loader keeps its 800ms delay and "Loading" contract
- The Topbar does not reintroduce a top-right theme or settings button

**Component contracts** read every workspace to confirm each ships a working, accessible UI:

- Every route renders both `<Topbar>` and `<Sidebar>`, and every `<button>` has an explicit `onclick`
- Learn exposes search, area filters, concept notes, example copy, and "Try this in Playground"
- Playground exposes Reset, Run, and code-copy actions
- Visualizer exposes array generation, previous/next stepping, and play controls
- API Lab exposes request, reset, copy-request, and copy-response actions
- Toolbox exposes all six tools (JSON, Base64, URL, Timestamp, UUID, Regex) plus process, generate, and copy controls
- Settings exposes every theme and accent choice
- Every route's inputs, textareas, and selects are either bound (`bind:value` / `bind:checked`) or wired to a handler

### Quality — 1 test file

| Test file                               | Checks | Coverage                                         |
| --------------------------------------- | :----: | ------------------------------------------------ |
| `tests/quality/project-quality.test.js` |   7    | Source- and stylesheet-level project conventions |

Scans every `.svelte`, `.ts`, `.js`, `.css`, `.scss`, `.html`, and `.json` source file (excluding `node_modules`, `.svelte-kit`, `.git`, and `tests`) to confirm:

- No file contains an `!important` CSS declaration
- Headings, eyebrows, and section labels consistently use the `--heading` / `--primary` color tokens
- The Overview page's "LEARN → TRY → BUILD" element uses its dedicated `.learn-try-build` class
- The API Lab "Copy response" button has exactly one authoritative CSS rule, sized to a 44px touch target
- The sidebar navigation keeps its intended `font-weight: 600`
- The four Settings diagrams keep a fixed 170×170px size under the 480px breakpoint
- All primary sidebar routes exist on disk

### Responsive — 1 test file

| Test file                                       | Checks | Coverage                                                     |
| ----------------------------------------------- | :----: | ------------------------------------------------------------ |
| `tests/responsive/responsive-contracts.test.js` |   5    | Responsive shell usage and breakpoint coverage across routes |

Checks route markup and every stylesheet under `src/lib/styles/` together:

- Every primary page uses the shared Topbar/Sidebar/page-shell layout
- The combined stylesheet set defines both `max-width` and `min-width` media queries
- Sidebar and Topbar each carry their own dedicated `max-width` responsive rules
- Settings retains its fixed 170×170px artwork under 480px
- No responsive stylesheet relies on `!important`

## Features

| Area               | Capabilities                                                                  |
| ------------------ | ----------------------------------------------------------------------------- |
| Unit tests         | Verify Playground validation logic in isolation                               |
| Integration tests  | Verify navigation, route loader behavior, and every workspace's controls      |
| Quality tests      | Enforce source and stylesheet conventions across the project                  |
| Responsive tests   | Verify responsive shell usage and breakpoint coverage                         |
| Browser-free       | Runs without a browser, so it behaves the same locally, in CI, and in VS Code |
| Type validation    | `svelte-check` validates Svelte templates and TypeScript                      |
| Linting            | ESLint with Svelte and TypeScript rules                                       |
| Formatting         | Prettier with `prettier-plugin-svelte`                                        |
| Build verification | Confirms the static production build still succeeds                           |

## Quick start

### Requirements

- Node.js 20.19 or newer (or 22.12 or newer), as required by Vite 8 and enforced by `.npmrc` (`engine-strict=true`)
- npm
- A local install of the project (see the root [`README.md`](../README.md#quick-start))

### Install dependencies

```bash
npm install
```

### Verify Node.js

```bash
node --version
```

### Verify the installation

```bash
npm run test
```

## Using the test suite

No development server is required. Run the checks from the project root.

1. Run `npm run check` first to catch Svelte and TypeScript errors before executing any tests
2. Run `npm run test` to execute the unit, integration, quality, and responsive suites together
3. Run `npm run lint` to confirm Prettier formatting and ESLint rules both pass
4. Run `npm run build` to confirm the production build still succeeds
5. Follow the [recommended verification order](#recommended-verification-order) before opening a pull request

A successful test run currently produces:

```text
# tests 49
# pass 49
# fail 0
```

## Project structure

```text
dev-lab/
├── tests/                                    # Automated test suite
│   ├── unit/
│   │   └── playground-validation.test.js     # 11 checks
│   ├── integration/
│   │   ├── navigation-smoke.test.js          # 5 checks
│   │   └── component-contracts.test.js       # 21 checks
│   ├── quality/
│   │   └── project-quality.test.js           # 7 checks
│   └── responsive/
│       └── responsive-contracts.test.js      # 5 checks
│
├── docs/
│   └── TESTING.md                            # This document
├── eslint.config.js                          # ESLint configuration
├── prettier.config.js                        # Prettier configuration
├── tsconfig.json                             # TypeScript compiler configuration
├── .npmrc                                    # Engine enforcement (engine-strict=true)
└── package.json                              # Dependencies and npm scripts
```

## Technology

- [Node.js test runner](https://nodejs.org/api/test.html) (`node --test`) — unit, integration, quality, and responsive suites
- [`svelte-check`](https://www.npmjs.com/package/svelte-check) — Svelte and TypeScript template and type validation
- [Prettier](https://prettier.io/) (with `prettier-plugin-svelte`) — formatting
- [ESLint](https://eslint.org/) (with `eslint-plugin-svelte`, `typescript-eslint`, and `eslint-config-prettier`) — linting
- [Vite](https://vite.dev/) — production build used for build verification

## Development commands

### Verification

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
npx prettier --list-different .
```

### Build

```powershell
npm run build
npm run preview
```

## Test execution

### Run the complete suite

```powershell
npm run test
```

### Run a specific test file

```powershell
node --test tests/unit/playground-validation.test.js
```

### Run tests matching a name

```powershell
node --test --test-name-pattern="Settings" tests/integration/*.test.js
```

## Test reporting

Results are printed to the terminal by Node's test runner, ending with a summary of tests, passes, and failures. Each failed check reports its assertion and location, and the command exits with a non-zero status, so the suite works directly in CI.

The suites cover functionality and component contracts. Responsive behavior is additionally reviewed through responsive layout contracts and source-level checks. These checks do not replace real browser viewport testing.

## Formatting

The project uses Prettier (with `prettier-plugin-svelte`) and ESLint.

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

Run Prettier and ESLint checks together:

```powershell
npm run lint
```

## Build verification

Create the production build:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

### Recommended verification order

```powershell
npm run check
npm run test
npm run lint
npm run build
```

## Troubleshooting

### Node.js version error during `npm install`

`.npmrc` enables `engine-strict=true`, so installation fails on unsupported Node.js versions. Check your version:

```powershell
node --version
```

Install Node.js 20.19 or newer (or 22.12 or newer), then run `npm install` again.

### A quality or responsive check fails

These checks enforce source conventions such as no `!important`, a single "Copy response" rule, and the fixed 170×170px Settings artwork. Read the assertion message, fix the source it points to, and run the suite again:

```powershell
npm run test
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

### Run a single failing file

```powershell
node --test tests/quality/project-quality.test.js
```

## Complete command reference

```powershell
npm install
node --version
npm run check
npm run check:watch
npm run lint
npm run format
npm run test
npm run build
npm run preview
npx prettier --check .
npx prettier --list-different .
node --test tests/unit/playground-validation.test.js
node --test --test-name-pattern="Settings" tests/integration/*.test.js
```

## Contributing

Run the recommended verification order before opening a pull request, and keep any new behavior covered by the matching suite under `tests/`:

```powershell
npm run check
npm run test
npm run lint
npm run build
```

## License

This project is licensed under the MIT License.
