# vue3-trivia

This template should help get you started developing with Vue 3 in Vite.

## Idea
Create an quiz app using Trivia API.

## General requirements
- Use [Trivia Api](https://opentdb.com/api_config.php) 
- One question visible on the screen at once
- Ability to go back to any question and change given answer - if quiz is not finished
- Showing progress of the quiz
- After submitting there should be a summary with the chart (for example correct to incorrect answers ratio, few last quizzes results, time spent on each question or any other statistic)
- Application should be responsive and work on desktop, tablet and mobile devices
- Nice loooking UI

### Additional features
If you want, you may also include additional features that come to your mind - that will be beneficial.

### Can I use helper libraries / packages?
You can use any package or library you want

### Which framework/library should I use?
- Vue3 with CompositionApi
- TypeScript
- Store manegement solution: Vuex / Pinia
- Router

### What about tests?
It would be good to show you know how to write them. You don't have to aim for 100% code coverage.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
