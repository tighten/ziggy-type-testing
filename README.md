**Test environment for [Ziggy](https://github.com/tighten/ziggy) types**

This repo contains files that can be used to test and experiment with Ziggy's TypeScript type definitions.

**Usage**

Open this project in VS Code or any other IDE/editor with integrated TypeScript intellisense/linting.

**Files**

| File | Analogue in `tighen/ziggy` repo | Analogue in a real app | Description |
| --- | --- | --- | --- |
| `index.js` | | Any app code using `route()` | Initially used for testing autocompletion, probably no longer necessary. |
| `index.ts` | | Any app code using `route()` | Used for testing autocompletion and type checking. TypeScript will lint/check this file, so it's basically this repo's tests—it should contain extensive examples of real usage of Ziggy to verify that specific cases don't (or do) produce type errors or provide the expected autocomplete options. |
| `route.d.ts` | `src/js/index.d.ts` | | Type definitions for Ziggy. This file should be an exact copy of Ziggy's `index.d.ts`, and can be used to tweak and experiment with different types. The effects of changes to this file can be tested using `index.ts`, and changes to it that we want to keep should be PRed back to Ziggy. |
| `route.js` | `src/js/index.js` | Ziggy itself | A fake `route()` function so the other files can import something. |
| `Router.js` | `src/js/Router.js` | | A fake `Router` to test method autocompletion with, may no longer be necessary. |
| `ziggy.d.ts` | | Ziggy-generated `ziggy.d.ts` file | A list of routes to use for autocompletion. |
| `ziggy.js` | | Ziggy-generated route file | A fake Ziggy config for testing/reference, this may not actually be in use or necessary. |
