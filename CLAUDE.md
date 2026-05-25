# re:shake — Project Guide for Claude Code

Cocktail recipe trainer built with Next.js 15 + TypeScript + CSS Modules.
Users learn recipes by going through a 3-step training flow: pick ingredients →
set measurements → choose serving style. Results are scored and shown in a
detailed breakdown.

---

## Stack

| Layer      | Choice                                                  |
| ---------- | ------------------------------------------------------- |
| Framework  | Next.js 15.5 (App Router, SSG/SSR)                      |
| Language   | TypeScript (strict)                                     |
| Styling    | CSS Modules + CSS Custom Properties                     |
| Font       | Space Grotesk via `next/font/google`                    |
| Linting    | ESLint (`eslint-config-next`) + Prettier                |
| Hooks      | Husky v9 + lint-staged (runs on pre-commit)             |
| Data       | Static mock in `lib/mock-cocktails.ts` (no backend yet) |
| Deployment | —                                                       |

---

## Project Structure

```
re-shake/
├── app/                        # Next.js App Router
│   ├── design-tokens.css       # All CSS custom properties (single source of truth)
│   ├── globals.css             # Reset + body styles, imports design-tokens.css
│   ├── layout.tsx              # Root layout — Space Grotesk font injection
│   ├── page.tsx                # Home / landing page
│   ├── library/
│   │   ├── page.tsx            # /library — cocktail grid + filters
│   │   └── [id]/
│   │       ├── page.tsx        # /library/[id] — server shell + generateStaticParams
│   │       └── CocktailDetailClient.tsx  # interactive detail view
│   └── train/
│       └── [id]/
│           ├── page.tsx        # /train/[id] — server shell
│           └── TrainingFlowClient.tsx    # full 3-step training flow + scoring
│
├── components/
│   ├── ui/                     # Atoms (presentational, reusable anywhere)
│   │   ├── Badge.tsx           # category / difficulty / status badges
│   │   ├── Button.tsx          # 4 variants × 3 sizes, loading state
│   │   ├── IngredientChip.tsx  # selectable chip with color swatch + category
│   │   ├── Input.tsx           # text / number / search / textarea + UnitInput export
│   │   ├── ProgressBar.tsx     # continuous / segmented / stepped variants
│   │   ├── Tag.tsx             # selectable / removable / addable modes
│   │   └── index.ts            # barrel export
│   │
│   ├── Step1Ingredients.tsx    # pool-and-tray ingredient picker with search
│   ├── Step2Measurements.tsx   # per-ingredient stepper + UnitInput rows
│   ├── Step3Serving.tsx        # glass tiles + method tiles + garnish chips
│   ├── TrainingLayout.tsx      # sticky header (progress + lives + timer) + footer nav
│   ├── TrainingResult.tsx      # score hero + ingredient breakdown + serving check
│   ├── AddCocktailForm.tsx     # full controlled form (create/edit cocktail)
│   ├── CocktailCard.tsx        # library card + skeleton export
│   ├── CollectionCard.tsx      # collection thumbnail (2×2 grid)
│   ├── EmptyState.tsx          # illustration + CTA for empty screens
│   ├── ImagePicker.tsx         # URL input or emoji picker
│   ├── IngredientEditor.tsx    # editable ingredient rows (for AddCocktailForm)
│   ├── OnboardingChecklist.tsx # step-by-step onboarding progress
│   ├── StatTile.tsx            # KPI tile with optional colored value
│   ├── ToolCard.tsx            # utility/tool card with emoji or image
│   └── index.ts                # barrel export (all molecules + organisms)
│
├── lib/
│   ├── mock-cocktails.ts       # COCKTAILS array + getCocktail() + CATEGORIES
│   └── utils.ts                # shared utilities (score, format, etc.)
│
├── types/
│   └── index.ts                # shared TypeScript interfaces
│
└── design/                     # original Claude Design HTML/JSX prototypes (reference only)
```

---

## Key Patterns

### CSS Modules access

Every component that needs dynamic class names uses the cast pattern:

```tsx
import styles from './Foo.module.css'
const s = styles as Record<string, string>

// Then use bracket notation safely:
const cls = [s.root, s[variant], s[size]].filter(Boolean).join(' ')
```

### CSS Custom Properties in inline styles

When a CSS variable needs to be set per-instance, cast the style object:

```tsx
<div style={{ '--chip-swatch': color } as React.CSSProperties} />
```

### `'use client'` strategy

- **Server components** (no interactivity): `Badge`, `ProgressBar`, `StatTile`, page shells (`app/**/page.tsx`)
- **Client components** (everything with onClick/useState): everything else
- Dynamic pages follow the **server shell + client child** pattern:
  ```
  app/library/[id]/page.tsx        ← server (generateStaticParams, data fetch)
  app/library/[id]/CocktailDetailClient.tsx  ← 'use client' (router, state)
  ```

### Component `'use client'` rule of thumb

If a component imports Button, Tag, Input, or IngredientChip → it needs `'use client'`.

---

## Design System

**Theme:** "Playful Game" variant — deep violet bg, pink primary, yellow secondary, violet accent.

All tokens live in `app/design-tokens.css`. Key groups:

| Group      | Example vars                                                        |
| ---------- | ------------------------------------------------------------------- |
| Colors     | `--color-primary` `--color-secondary` `--color-accent` `--color-bg` |
| Text       | `--text-primary` `--text-secondary` `--text-muted`                  |
| Borders    | `--color-border` (= `--border-default`)                             |
| Semantic   | `--color-success` `--color-error` `--color-warning`                 |
| Typography | `--text-xs` → `--text-4xl` (mapped aliases in globals.css)          |
| Spacing    | `--space-1` (4px) → `--space-16` (64px)                             |
| Radius     | `--radius-xs` (6px) → `--radius-full` (9999px)                      |
| Shadows    | `--shadow-pop-sm/md/lg` — the signature 3D offset (no blur)         |
| Motion     | `--motion-fast` `--motion-normal` `--motion-slow`                   |
| Z-index    | `--z-sticky` `--z-modal` `--z-toast` etc.                           |

**Signature shadow style:**

```css
box-shadow: 0 6px 0 var(--color-shadow); /* 3D pop, offset-only, no blur */
```

**Font:** Space Grotesk (300–700) injected via CSS variable `--font-space-grotesk` in `layout.tsx`. Weight 800 is **not** available.

---

## Data Layer

Currently: static mock data in `lib/mock-cocktails.ts`.

### Cocktail shape

```ts
interface Cocktail {
  id: string // url slug (e.g. 'negroni')
  name: string
  category: string // 'Classics' | 'Contemporary' | 'Sours' | ...
  difficulty: 'easy' | 'medium' | 'hard'
  prepTime: string // '3 min'
  abv: number // percent
  image: string // emoji or URL
  glass: string // id matching GLASS_OPTIONS in TrainingFlowClient
  method: string // id matching METHOD_OPTIONS
  garnish: string
  notes?: string
  ingredients: { id; name; amount; unit; emoji?; color? }[]
  tags?: string[]
}
```

### Adding a cocktail

1. Add entry to `COCKTAILS` array in `lib/mock-cocktails.ts`
2. Ensure all ingredient IDs exist in `ALL_INGREDIENTS` in `TrainingFlowClient.tsx`
3. No other changes needed — `generateStaticParams` auto-picks up new IDs

---

## Pages

| Route           | File                        | Notes                                               |
| --------------- | --------------------------- | --------------------------------------------------- |
| `/`             | `app/page.tsx`              | Static landing, `Link` to /library                  |
| `/library`      | `app/library/page.tsx`      | `'use client'`, filter state local                  |
| `/library/[id]` | `app/library/[id]/page.tsx` | Server shell; client in `CocktailDetailClient.tsx`  |
| `/train/[id]`   | `app/train/[id]/page.tsx`   | Server shell; all logic in `TrainingFlowClient.tsx` |

### Training flow scoring (in `TrainingFlowClient.tsx`)

- **40%** ingredient selection accuracy (correct picks − false positive penalty)
- **60%** measurement accuracy (exact = 1pt, within ±5ml = 0.5pt, otherwise 0)
- Serving (glass/method) shown in result breakdown but doesn't affect score yet

---

## Dev Commands

```bash
npm run dev          # start dev server on :3000
npm run build        # production build (runs tsc + Next.js)
npm run lint         # ESLint
npm run format       # Prettier --write on all files
npx tsc --noEmit     # type-check only
```

Git remote uses SSH alias:

```bash
git push git@github-personal:daniel-vsln/re-shake.git main
```

Pre-commit hook runs ESLint + Prettier via lint-staged automatically.

---

## Component API Quick Reference

### Button

```tsx
<Button
  variant="primary|secondary|ghost|danger"
  size="sm|md|lg"
  loading
  fullWidth
  leftIcon="←"
  onClick={fn}
>
  Label
</Button>
```

### Badge

```tsx
<Badge tone="category|difficulty|status" value="spirit|easy|correct" compact />
```

### Tag

```tsx
<Tag selectable selected onToggle={fn} icon="🍋">Label</Tag>
<Tag removable onRemove={fn}>Label</Tag>
```

### Input / UnitInput

```tsx
<Input type="text|number|search" value placeholder onChange onClear error />
<UnitInput value unit step min max error onChange />
```

### ProgressBar

```tsx
<ProgressBar variant="continuous" percent={75} />
<ProgressBar variant="stepped" steps={['A','B','C']} currentStep={1} />
```

### CocktailCard

```tsx
<CocktailCard
  id
  name
  category
  difficulty
  glassType
  ingredientCount
  masteryPercent
  emoji
  stars
  isFavorite
  onFavoriteToggle={fn}
  onClick={fn}
/>
```

### TrainingResult

```tsx
<TrainingResult
  cocktailName
  score
  tolerance={5}
  ingredients={[{ id, name, unit, userValue, correctValue, emoji, color }]}
  serving={[{ label, value, correct }]}
  rewards={{ gems, xp, streak }}
  onTryAgain
  onNext
  onBackToLibrary
/>
```

---

## Known Gotchas

- `Badge` `value` prop expects specific string literals (`'spirit'`, `'easy'`, `'correct'`…). When passing from `Cocktail.category` (a plain string), cast with `as never` or extend the union type.
- `CocktailCard` `category` prop is similarly typed — use `as never` for mock data that doesn't match the exact union.
- Space Grotesk max weight is 700. Don't use `800` in `next/font` config.
- CSS Module classes that need bracket access (e.g., `s[variant]`) require the `Record<string, string>` cast — TypeScript won't allow it otherwise.
- `app/design-tokens.css` uses `--color-border` but the raw token is `--border-default`. An alias `--color-border: var(--border-default)` is defined in `globals.css`.
- The `design/` folder contains original HTML/JSX prototypes. Do not import from there — it's reference only.
