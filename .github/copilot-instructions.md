# Copilot Instructions

This is a personal portfolio website built with [Docusaurus](https://docusaurus.io/).

## Tech Stack

- **Framework**: Docusaurus 3.x
- **Language**: TypeScript
- **UI**: React 19.x
- **Testing**: Vitest with React Testing Library
- **Linting**: ESLint, Prettier, textlint (for Japanese content)

## Development Commands

```shell
# Install dependencies
npm install

# Start development server
npm run start

# Fix code styles
npm run fix

# Lint code
npm run lint

# Run tests
npm run test

# Build production
npm run build

# Run E2E tests (requires build)
npm run test:e2e
```

## Code Style

- Use TypeScript for all source files
- Use functional components with React hooks
- Follow Prettier configuration (single quotes, trailing commas, 2-space indentation)
- Use path aliases (`@/` prefix) for imports from `src/` directory
- Components should be placed in `src/components/`
- Test files should be co-located with their source files using `.spec.tsx` or `.spec.ts` suffix

## Testing Conventions

- Use Vitest for unit tests
- Use React Testing Library for component tests
- Test files should follow the pattern `ComponentName.spec.tsx`
- Use snapshot tests for component rendering verification
- Use `vi.mock()` for mocking dependencies
- Test descriptions should be in Japanese

## Content Guidelines

- Content is primarily in Japanese
- Use textlint for Japanese text linting (JTF style guide)
- MDX files are used for content pages
