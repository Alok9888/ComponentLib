# Atelier UI

**A reusable React component library with an interactive component playground.** Atelier focuses on typed, composable components, accessibility, responsive theming, and focused interaction tests. The demo lets you select each component, adjust its controls, inspect a usage example, and review API highlights.

## Run the demo

```bash
npm install
npm run dev
```

## Components

| Component | What it includes |
| --- | --- |
| `Button` | Primary, secondary, ghost, danger, and three sizes |
| `Input` | Label, hint, required state, and accessible validation |
| `Modal` | Dialog semantics, Escape and backdrop dismissal |
| `Dropdown` | Labeled native select with typed options |
| `Tabs` | Tab semantics, arrow keys, Home/End navigation |
| `Toast` | Status/error announcements and dismiss action |
| `DataTable` | Typed columns, sorting, pagination, empty state |
| `Accordion` | Expand/collapse state and region relationships |
| `Form` + `FormField` | Controlled values and custom validation |
| `DatePicker` | Labeled native date input with min/max support |

## Use the library

```tsx
import { Button, Input, DataTable } from '@your-scope/atelier-ui';
import '@your-scope/atelier-ui/styles.css';

<Input label="Email" type="email" required />
<Button onClick={() => console.log('Saved')}>Save changes</Button>
```

Import only what you use to keep bundles lean. React and React DOM are peer dependencies. The package currently uses the placeholder npm scope `@your-scope`; set your own npm scope in `package.json` before publishing.

## Theming

The components use CSS custom properties declared in `src/styles/index.scss`. Set `data-theme="dark"` on an ancestor to activate dark mode, or override values such as `--ui-accent`, `--ui-bg`, and `--ui-radius` in your own stylesheet. Layout starts mobile-first and adapts for tablet and desktop.

## Stories, tests, and builds

```bash
npm run storybook       # component examples and controls
npm test -- --coverage  # component interaction tests
npm run lint
npm run build           # demo app
npm run build:lib       # distributable library
```

The test suite contains focused behavior tests across the public components and component navigation. Current component source coverage is reported by Vitest; CI runs lint, coverage-enabled tests, app build, and package build on pushes and pull requests. Run `npm test -- --coverage` locally to see the current report.

## Performance

The library build externalizes React and emits tree-shakeable ES modules. The current production library build is 8.60 kB JavaScript (2.84 kB gzip) plus 11.19 kB CSS (3.10 kB gzip). Lighthouse has not been measured because the demo is not deployed yet. GitHub Actions workflows cover quality checks and GitHub Pages deployment. To publish the demo, push this project to GitHub and set the repository's Pages source to **GitHub Actions**; the deployment workflow will publish `demo-dist` on pushes to `main` or `master`.

## Accessibility

Native controls provide built-in keyboard and screen-reader support. Tabs support arrow keys and Home/End. Dialogs expose `role="dialog"`, `aria-modal`, and Escape dismissal; tables use semantic headers and buttons for sort controls; validation messages are connected with `aria-describedby`.

## Publish

1. Change `@your-scope/atelier-ui` to a package name you own.
2. Set the version and run `npm run build:lib`.
3. Authenticate with npm, then run `npm publish --access public`.

MIT licensed.
