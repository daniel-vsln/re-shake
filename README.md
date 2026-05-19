# re-shake

Interactive cocktail recipe trainer to keep your mixology skills sharp.

## About

re-shake helps bartenders and cocktail enthusiasts practice and memorize recipes through interactive flashcard-style training sessions. Build muscle memory for classic and modern cocktails without reaching for a recipe book.

## Tech Stack

- **Next.js 15** — React framework with App Router
- **TypeScript** — type safety
- **Tailwind CSS** — utility-first styling
- **ESLint** — code quality (eslint-config-next)
- **Prettier** — code formatting
- **Husky + lint-staged** — pre-commit hooks

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start development server       |
| `npm run build`  | Build for production           |
| `npm run lint`   | Run ESLint                     |
| `npm run format` | Format all files with Prettier |

## Code Quality

Pre-commit hooks run automatically via Husky:

- ESLint fixes on staged `.js`, `.jsx`, `.ts`, `.tsx` files
- Prettier formats all staged files
