# re:shake — Project Guide for Claude Code

Cocktail recipe trainer built with Next.js 15 + TypeScript + CSS Modules.
Users learn recipes by going through a 3-step training flow: pick ingredients →
set measurements → choose serving style. Results are scored and shown in a
detailed breakdown.

---

## Working Rules

- **Never commit automatically.** Always ask the user before running `git commit`.
  If they decline, ask again at the next logical checkpoint — don't drop it silently.

---

## Stack

| Layer      | Choice                                                       |
| ---------- | ------------------------------------------------------------ |
| Framework  | Next.js 15.5 (App Router, SSG/SSR)                           |
| Language   | TypeScript (strict)                                          |
| Styling    | CSS Modules + CSS Custom Properties                          |
| Font       | Space Grotesk via `next/font/google`                         |
| Linting    | ESLint (`eslint-config-next`) + Prettier                     |
| Hooks      | Husky v9 + lint-staged (runs on pre-commit)                  |
| Auth       | Supabase Auth — Google OAuth + email/password                |
| Database   | Supabase (Postgres) — migrations in `supabase/migrations/`   |
| Data       | Mock data in `lib/mock-cocktails.ts` (real DB not wired yet) |
| Deployment | Vercel (auto-deploy on push to main)                         |

---

## Project Structure

```
re-shake/
├── app/
│   ├── design-tokens.css       # All CSS custom properties (single source of truth)
│   ├── globals.css             # Reset + body styles
│   ├── layout.tsx              # Root layout — Space Grotesk + AvatarButton
│   ├── page.tsx                # Landing — scrollable photo strip + re:shake link
│   ├── auth/
│   │   ├── layout.tsx          # Shared auth card layout
│   │   ├── auth.module.css     # Shared auth styles
│   │   ├── callback/route.ts   # OAuth + password-reset code exchange
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── verify/page.tsx     # "Check your email" after sign-up
│   ├── library/
│   │   ├── page.tsx            # Cocktail grid + filters (AvatarButton in header)
│   │   └── [id]/
│   │       ├── page.tsx        # Server shell + generateStaticParams
│   │       └── CocktailDetailClient.tsx  # Detail view (AvatarButton inline in nav)
│   ├── profile/
│   │   └── page.tsx            # User profile — avatar, stats, sign out
│   └── train/
│       └── [id]/
│           ├── page.tsx        # Server shell
│           └── TrainingFlowClient.tsx  # 3-step training flow + scoring
│
├── components/
│   ├── ui/                     # Atoms
│   │   ├── Badge.tsx
│   │   ├── Button.tsx          # 4 variants × 3 sizes, loading state
│   │   ├── IngredientChip.tsx
│   │   ├── Input.tsx           # text / number / search + UnitInput export
│   │   ├── ProgressBar.tsx     # continuous (value prop) / segmented / stepped
│   │   ├── Tag.tsx
│   │   └── index.ts
│   │
│   ├── AvatarButton.tsx        # Fixed top-right; anon→sign-in, authed→profile
│   ├── AuthButton.tsx          # Google OAuth sign-in button
│   ├── Step1Ingredients.tsx    # Tile grid ingredient picker
│   ├── Step2Measurements.tsx   # Slider cards per ingredient
│   ├── Step3Serving.tsx        # Glass + method tiles
│   ├── TrainingLayout.tsx      # Header (progress bar + nav) + footer CTA
│   ├── TrainingResult.tsx      # Score hero + breakdown + serving check
│   ├── AddCocktailForm.tsx
│   ├── CocktailCard.tsx
│   ├── CollectionCard.tsx
│   ├── EmptyState.tsx
│   ├── ImagePicker.tsx
│   ├── IngredientEditor.tsx
│   ├── OnboardingChecklist.tsx
│   ├── StatTile.tsx
│   ├── ToolCard.tsx
│   └── index.ts
│
├── lib/
│   ├── mock-cocktails.ts       # COCKTAILS array + getCocktail() + CATEGORIES
│   ├── utils.ts                # Shared utilities (score, format, etc.)
│   ├── supabase.ts             # Browser client (lazy singleton via Proxy)
│   ├── supabase-server.ts      # Server client (cookie-based, per-request)
│   └── auth-validate.ts        # validateEmail / validatePassword / validateConfirm
│
├── middleware.ts               # Supabase session refresh on every request
│
├── types/
│   ├── index.ts                # Shared TypeScript interfaces
│   └── supabase.ts             # Auto-generated DB types (supabase gen types)
│
├── supabase/
│   ├── migrations/
│   │   ├── 20260604000001_initial_schema.sql
│   │   ├── 20260604000002_rls.sql
│   │   └── 20260604000003_functions.sql
│   ├── seed.sql                # Reference data for local dev
│   └── README.md               # Migration workflow docs
│
└── public/                     # Static images (hero photos, etc.)
```

---

## Key Patterns

### CSS Modules access

```tsx
import styles from './Foo.module.css'
const s = styles as Record<string, string>
const cls = [s.root, s[variant]].filter(Boolean).join(' ')
```

### CSS Custom Properties in inline styles

```tsx
<div style={{ '--chip-swatch': color } as React.CSSProperties} />
```

### `'use client'` strategy

- **Server components**: `Badge`, `ProgressBar`, `StatTile`, page shells
- **Client components**: everything with onClick/useState/useEffect
- Dynamic pages use the **server shell + client child** pattern

---

## Supabase

### Clients

```ts
// Client Component — import directly
import { supabase } from '@/lib/supabase'
await supabase.auth.getUser()
await supabase.from('cocktails').select('*')

// Server Component / Route Handler / Server Action
import { createServerClient } from '@/lib/supabase-server'
const db = await createServerClient()
const { data } = await db.from('cocktails').select('*')
```

**Never** use `lib/supabase-server.ts` in Client Components.
**Never** expose `SUPABASE_SERVICE_ROLE_KEY` — server-only, bypasses RLS.

### Typed rows

```ts
import type { Tables } from '@/lib/supabase'
type Cocktail = Tables<'cocktails'>
type Ingredient = Tables<'ingredients'>
```

### Migrations workflow

```bash
# new change → never edit existing files
supabase migration new <describe_change>
# edit the new file, then:
supabase db push
supabase gen types typescript --linked > types/supabase.ts
git add supabase/migrations/ types/supabase.ts
git commit -m "db: <describe change>"
```

### Stored procedures

| Function                                      | Called from                              |
| --------------------------------------------- | ---------------------------------------- |
| `handle_new_user()`                           | Trigger — auto-creates profile on signup |
| `clone_cocktail(source_id, new_id, new_name)` | "Create Twist" button                    |
| `record_training_result(...)`                 | After training flow completes            |

---

## Auth

Google OAuth + email/password via Supabase Auth.

### Flow

| Route                   | Purpose                                |
| ----------------------- | -------------------------------------- |
| `/auth/sign-in`         | Email/password + Google OAuth          |
| `/auth/sign-up`         | Registration → `/auth/verify`          |
| `/auth/verify`          | "Check your email" screen              |
| `/auth/forgot-password` | Sends reset link                       |
| `/auth/reset-password`  | New password (from email link)         |
| `/auth/callback`        | Exchanges OAuth/reset code for session |

### AvatarButton visibility

The `AvatarButton` in root layout is **hidden** on:
`/auth/*`, `/profile`, `/library`, `/library/*`, `/train/*`

Pages that need it embed `<AvatarButton inline />` in their own nav:

- Library page header
- Cocktail detail nav row

### Validation

All auth forms use `lib/auth-validate.ts`:

- Validates on `onBlur`, clears on `onChange`, full check before API call
- `validateEmail` — format check
- `validatePassword` — min 8 chars
- `validateConfirm` — match check

---

## Design System

**Theme:** "Playful Game" — deep violet bg, pink primary, yellow secondary.

All tokens live in `app/design-tokens.css`.

| Group      | Example vars                                                        |
| ---------- | ------------------------------------------------------------------- |
| Colors     | `--color-primary` `--color-secondary` `--color-accent` `--color-bg` |
| Text       | `--text-primary` `--text-secondary` `--text-muted`                  |
| Semantic   | `--color-success` `--color-error` `--color-warning`                 |
| Typography | `--text-xs` → `--text-4xl`                                          |
| Spacing    | `--space-1` (4px) → `--space-16` (64px)                             |
| Radius     | `--radius-xs` (6px) → `--radius-full` (9999px)                      |
| Shadows    | `--shadow-pop-sm/md/lg` — 3D offset, no blur                        |
| Motion     | `--motion-fast` `--motion-normal` `--motion-slow`                   |
| Z-index    | `--z-sticky` `--z-modal` `--z-toast`                                |

**Signature shadow:** `box-shadow: 0 6px 0 var(--color-shadow);`
**Font:** Space Grotesk — max weight **700** (not 800).

---

## Pages

| Route           | Notes                                                      |
| --------------- | ---------------------------------------------------------- |
| `/`             | Photo strip landing, `re:shake` link bottom-right          |
| `/library`      | Grid + category/difficulty filters, AvatarButton in header |
| `/library/[id]` | Hero card, ingredients, serving, CTA to train              |
| `/train/[id]`   | 3-step flow; scoring: 40% ingredients + 60% measurements   |
| `/profile`      | Avatar, stats tiles, sign out                              |
| `/auth/*`       | See Auth section                                           |

---

## Data Layer

Mock data still drives the UI (`lib/mock-cocktails.ts`). DB schema is designed and migrations are applied, but Next.js pages have not been wired to Supabase queries yet.

### Adding a cocktail (mock)

1. Add to `COCKTAILS` in `lib/mock-cocktails.ts`
2. Ensure ingredient IDs exist in `ALL_INGREDIENTS` in `TrainingFlowClient.tsx`
3. `generateStaticParams` picks it up automatically

---

## Dev Commands

```bash
npm run dev          # dev server (port from launch.json)
npm run build        # production build
npm run lint         # ESLint
npm run format       # Prettier --write
npx tsc --noEmit     # type-check only

supabase db push                                    # apply migrations
supabase gen types typescript --linked > types/supabase.ts
```

Git remote:

```bash
git push git@github-personal:daniel-vsln/re-shake.git main
```

---

## Known Gotchas

- `Badge` / `CocktailCard` `category` props expect specific string literals — cast with `as never` when passing plain strings from mock data.
- Space Grotesk max weight is **700**. Don't use `800` in `next/font` config.
- CSS Module dynamic classes require `Record<string, string>` cast.
- `--color-border` is an alias for `--border-default` (defined in `globals.css`).
- `supabase` export in `lib/supabase.ts` is a **lazy Proxy** — safe to import in any component, client is only created on first access in the browser. Do not call at module level in server code.
- `ProgressBar` continuous variant uses `value` prop (not `percent`).
- `design/` folder — reference prototypes only, do not import from there.
