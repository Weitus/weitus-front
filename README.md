# WEITUŚ Frontend

## Technologies used

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [React Query](https://react-query.tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PNPM](https://pnpm.js.org/)

## Installation

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Run the development server with `pnpm dev`

## PNPM Scripts

- `pnpm dev` - run development server
- `pnpm build` - build production version
- `pnpm preview` - preview production version

## Structure

### Folders structure

- `public` - static files
- `src` - source code
	- `api` - Functions for interacting with the API
	- `assets` - Static assets
	- `components` - Reusable components (with We prefix)
	- `config` - Configuration files
	- `context` - Contexts for global state
	- `pages` - Pages
	- `styles` - Global styles
	- `templates` - Page templates

### Components structure

- `*.tsx` - React component
- `*.module.scss` - Component styles
- `*.types.ts` - Component types (optional)
- `index.ts` - Component export