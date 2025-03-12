# MaiMBot-WebUI Development Guide

## Commands
- `pnpm dev` - Run development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fixes

## Code Style
- **Vue Components**: Use Vue 3 Composition API with `<script setup>` syntax
- **TypeScript**: Strict typing required, no implicit any
- **Imports**: Use ES modules, prefer absolute imports
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Components**: Single-file components (SFCs)
- **UI Framework**: Element Plus with auto-import
- **CSS**: TailwindCSS for styling
- **Formatting**: Follow eslint rules (@antfu/eslint-config)
- **Error Handling**: Use try/catch and propagate errors appropriately

## Architecture
- Vite as build tool
- TypeScript with strict type checking
- Vue 3.5.x frontend framework