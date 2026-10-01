# DevLab VS Code Setup

> A ready-to-use Visual Studio Code workspace for the DevLab application — with recommended extensions, format-on-save, and ESLint auto-fix already configured.

![VS Code](https://img.shields.io/badge/Editor-VS%20Code-007acc?logo=visualstudiocode&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-5-ff3e00?logo=svelte&logoColor=white)
![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-1a2b34?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4b32c3?logo=eslint&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?logo=node.js&logoColor=white)

DevLab ships a `.vscode/` folder with recommended extensions, format-on-save, and ESLint auto-fix. Opening the project folder in VS Code applies the same Prettier and ESLint rules as `npm run lint`, with no manual setup.

## Contents

- [Editor configuration](#editor-configuration)
- [Features](#features)
- [Quick start](#quick-start)
- [Using VS Code](#using-vs-code)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Formatting and validation](#formatting-and-validation)
- [Production check](#production-check)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Editor configuration

The workspace contains **2 configuration files** in `.vscode/`.

### Recommended extensions

Declared in `.vscode/extensions.json`. VS Code prompts to install these the first time the project is opened.

| Extension ID             | Purpose                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `svelte.svelte-vscode`   | Svelte language support: syntax highlighting, IntelliSense, and diagnostics for `.svelte` files |
| `esbenp.prettier-vscode` | Prettier integration, matching the formatting check in `npm run lint`                           |
| `dbaeumer.vscode-eslint` | ESLint integration, matching the lint check in `npm run lint`                                   |

### Editor settings

Declared in `.vscode/settings.json`:

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit"
	},
	"svelte.plugin.svelte.format.enable": true
}
```

| Setting                              | Effect                                                                        |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `editor.defaultFormatter`            | Prettier formats every file type in the project, including `.svelte`          |
| `editor.formatOnSave`                | Every save runs Prettier, keeping files aligned with `npx prettier --check .` |
| `editor.codeActionsOnSave`           | ESLint's auto-fixable rules are applied explicitly on save                    |
| `svelte.plugin.svelte.format.enable` | Lets the Svelte extension work alongside Prettier for `.svelte` files         |

### Prettier rules

Defined in `prettier.config.js` and applied by both VS Code and `npm run lint`:

- Tabs for indentation
- Single quotes
- No trailing commas
- Print width of 100
- `prettier-plugin-svelte` for `.svelte` files

## Features

| Area                | Capabilities                                                         |
| ------------------- | -------------------------------------------------------------------- |
| Extensions          | Recommends the Svelte, Prettier, and ESLint extensions on first open |
| Format on save      | Formats the current file with Prettier on every save                 |
| ESLint auto-fix     | Applies auto-fixable ESLint rules on save                            |
| Svelte formatting   | Formats `.svelte` files through `prettier-plugin-svelte`             |
| Lint parity         | Matches the formatting and lint checks in `npm run lint`             |
| Integrated terminal | Runs the dev server, checks, tests, and build from inside VS Code    |

## Quick start

### Requirements

- [Visual Studio Code](https://code.visualstudio.com/)
- Node.js 20.19 or newer (or 22.12 or newer), as required by Vite 8 and enforced by `.npmrc` (`engine-strict=true`)
- npm
- A local copy of the project (see the root [`README.md`](../README.md#quick-start))

### Open the project

```powershell
code .
```

Accept the prompt to install the recommended extensions.

### Install dependencies

Run from the integrated terminal:

```bash
npm install
```

### Verify Node.js

```bash
node --version
```

## Using VS Code

1. Open the project folder in VS Code and install the recommended extensions when prompted
2. Run `npm run dev` from the integrated terminal to start the development server
3. Edit any file. Format-on-save and the ESLint auto-fix action run automatically on `Ctrl + S`
4. Run `npm run check` and `npm run test` from the integrated terminal before committing
5. Run `npm run build` and `npm run preview` to confirm the production build before deploying

## Project structure

```text
dev-lab/
├── .vscode/
│   ├── extensions.json      # Recommended extensions (Svelte, Prettier, ESLint)
│   └── settings.json        # Format-on-save, ESLint auto-fix, Svelte formatting
│
├── docs/
│   └── VSCODE.md            # This document
├── prettier.config.js       # Prettier formatting rules
├── .prettierignore          # Files excluded from Prettier
├── eslint.config.js         # ESLint configuration
└── package.json             # Dependencies and npm scripts
```

## Technology

- [Visual Studio Code](https://code.visualstudio.com/) — editor
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) (`svelte.svelte-vscode`) — Svelte language support
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (`esbenp.prettier-vscode`) — formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (`dbaeumer.vscode-eslint`) — linting

## Development commands

### Development server

```powershell
npm run dev
npm run dev -- --open
```

The application runs at:

```text
http://localhost:5173/dev-lab/
```

### Validation

```powershell
npm run check
npm run check:watch
npm run lint
npm run test
```

See [`TESTING.md`](TESTING.md) for what each suite verifies.

## Formatting and validation

### Formatting in VS Code

With format-on-save enabled (already configured), pressing:

```text
Ctrl + S
```

formats the currently opened file. You do not need to open every file and save it.

To format the entire project at once:

```powershell
npm run format
```

### Formatting checks

Check formatting without modifying files:

```powershell
npx prettier --check .
```

List files that would be changed by Prettier:

```powershell
npx prettier --list-different .
```

### Project validation

Check Svelte and TypeScript:

```powershell
npm run check
```

Run Prettier and ESLint checks:

```powershell
npm run lint
```

Run the complete test suite:

```powershell
npm run test
```

## Production check

Build the application:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

## Deployment

### GitHub Pages

After creating the production build, deploy the `build` directory:

```powershell
npm run build
npx gh-pages -d build --nojekyll
```

## Troubleshooting

### VS Code does not prompt for extensions

Open the Extensions view, search for `@recommended`, and install the three workspace recommendations:

- `svelte.svelte-vscode`
- `esbenp.prettier-vscode`
- `dbaeumer.vscode-eslint`

### Files do not format on save

Confirm that `esbenp.prettier-vscode` is installed and that you opened the project root folder, so VS Code loads `.vscode/settings.json`. Then format manually to check:

```powershell
npm run format
```

### ESLint fixes are not applied on save

Confirm that `dbaeumer.vscode-eslint` is installed, then run ESLint from the terminal:

```powershell
npm run lint
```

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

## Complete command reference

```powershell
code .
npm install
node --version
npm run dev
npm run dev -- --open
npm run check
npm run check:watch
npm run lint
npm run format
npm run test
npm run build
npm run preview
npx prettier --check .
npx prettier --list-different .
npx gh-pages -d build --nojekyll
```

## Contributing

Keep format-on-save enabled, and verify changes before opening a pull request:

```powershell
npm run check
npm run test
npm run lint
npm run build
```

## License

This project is licensed under the MIT License.
