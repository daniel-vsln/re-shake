// ─────────────────────────────────────────────
// re:shake — Shared TypeScript Types
// ─────────────────────────────────────────────

// ── Design system ────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type BadgeTone = 'category' | 'difficulty' | 'status'

export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export type CategoryType =
  | 'spirit'
  | 'mocktail'
  | 'wine'
  | 'beer'
  | 'classic'
  | 'modern'
  | 'tiki'
  | 'afterDinner'

export type ResultStatus = 'perfect' | 'close' | 'wrong'

// ── Cocktail domain ──────────────────────────

export interface Ingredient {
  id: string
  name: string
  amount: number
  unit: string
  emoji?: string
  color?: string
}

export interface Cocktail {
  id: string
  name: string
  category: string
  difficulty: DifficultyLevel
  prepTime: string
  abv: number
  image: string // emoji or URL
  glass: string
  method: string
  garnish: string
  notes?: string
  ingredients: Ingredient[]
  tags?: string[]
}

// ── Training ─────────────────────────────────

export interface IngredientResult {
  id: string
  name: string
  unit: string
  userValue: number | string
  correctValue: number | string
  emoji?: string
  color?: string
  status?: ResultStatus
}

export interface ServingResult {
  label: string
  value: string
  correct: string
  icon?: string
}

export interface TrainingScore {
  total: number // 0–100
  ingredientAccuracy: number // 0–1
  measurementAccuracy: number // 0–1
  stars: 0 | 1 | 2 | 3
}

export interface TrainingRewards {
  gems?: number
  xp?: number
  streak?: number
}

// ── Forms ────────────────────────────────────

export interface CocktailDraft {
  image: string | null
  name: string
  category: string | null
  difficulty: string
  prepTime: string
  ingredients: { id: string; name: string; amount: string; unit: string }[]
  method: string | null
  glass: string | null
  garnish: string
  notes: string
  abv: string
}

// ── Serving options ──────────────────────────

export interface OptionDef {
  id: string
  label: string
  icon?: string
  sub?: string
  disabled?: boolean
}

export interface ServingSelections {
  glass?: string | null
  method?: string | null
  garnishes?: string[]
}

// ── Library ──────────────────────────────────

export interface UserProgress {
  cocktailId: string
  masteryPercent: number
  stars: 0 | 1 | 2 | 3
  lastTrainedAt?: string
  attemptCount: number
}

// ── UI helpers ───────────────────────────────

/** Inline CSS with custom property support */
export type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>
