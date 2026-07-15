import type { TrainingScore, ResultStatus } from '@/types'

// ─────────────────────────────────────────────
// Scoring
// ─────────────────────────────────────────────

/**
 * Compare a user value to the correct value within a tolerance.
 * Works with both numbers (±tolerance) and strings (case-insensitive exact).
 */
export function compareWithTolerance(
  user: number | string,
  correct: number | string,
  tolerance = 5
): ResultStatus {
  const u = parseFloat(String(user))
  const c = parseFloat(String(correct))

  if (Number.isNaN(u) || Number.isNaN(c)) {
    return String(user).toLowerCase() === String(correct).toLowerCase() ? 'perfect' : 'wrong'
  }

  const diff = Math.abs(u - c)
  if (diff === 0) return 'perfect'
  if (diff <= tolerance) return 'close'
  return 'wrong'
}

/**
 * Calculate the full training score from user selections.
 *
 * Weights:
 *  - 40% ingredient accuracy (correct picks, penalty for false positives)
 *  - 60% measurement accuracy (exact = 1pt, within ±tolerance = 0.5pt)
 */
export function calcTrainingScore(
  selectedIds: string[],
  correctIds: string[],
  measurements: Record<string, number | string>,
  correctAmounts: Record<string, number>,
  tolerance = 5
): TrainingScore {
  const correctSet = new Set(correctIds)
  const selectedSet = new Set(selectedIds)

  // Ingredient accuracy
  const truePositives = correctIds.filter((id) => selectedSet.has(id)).length
  const falsePositives = selectedIds.filter((id) => !correctSet.has(id)).length
  const ingredientAccuracy = truePositives / Math.max(correctIds.length, 1)
  const penalty = Math.max(0, 1 - falsePositives * 0.15)

  // Measurement accuracy (only for correct ingredients)
  const correctWithMeasurements = correctIds.filter((id) => correctAmounts[id] != null)
  const measurementAccuracy =
    correctWithMeasurements.length === 0
      ? 1
      : correctWithMeasurements.reduce((acc, id) => {
          const user = Number(measurements[id] ?? 0)
          const target = correctAmounts[id]
          const diff = Math.abs(user - target)
          if (diff === 0) return acc + 1
          if (diff <= tolerance) return acc + 0.5
          return acc
        }, 0) / correctWithMeasurements.length

  const total = Math.round((ingredientAccuracy * penalty * 0.4 + measurementAccuracy * 0.6) * 100)

  const stars: 0 | 1 | 2 | 3 = total >= 90 ? 3 : total >= 75 ? 2 : total >= 50 ? 1 : 0

  return { total, ingredientAccuracy, measurementAccuracy, stars }
}

// ─────────────────────────────────────────────
// Formatting
// ─────────────────────────────────────────────

const LETTER_GRADES: [number, string][] = [
  [90, 'A'],
  [80, 'B'],
  [70, 'C'],
  [60, 'D'],
  [0, 'F'],
]

export function letterGrade(score: number): string {
  for (const [min, letter] of LETTER_GRADES) if (score >= min) return letter
  return 'F'
}

export function pluralise(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`
}

export function formatAbv(abv: number): string {
  return `${abv}% ABV`
}

// ─────────────────────────────────────────────
// DOM / CSS helpers
// ─────────────────────────────────────────────

/** Join class names, filtering out falsy values */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Build a CSS Modules class string from a styles object */
export function mcx(
  s: Record<string, string>,
  ...names: (string | undefined | null | false)[]
): string {
  return names
    .filter(Boolean)
    .map((n) => s[n as string] ?? '')
    .filter(Boolean)
    .join(' ')
}

// ─────────────────────────────────────────────
// Ingredient helpers
// ─────────────────────────────────────────────

/** Derive the static asset path for an ingredient image. */
export function ingredientImageUrl(id: string): string {
  return `/ingredients/${id}.png`
}

/** Derive the static asset path for a cocktail photo. */
export function cocktailImageUrl(id: string): string {
  return `/cocktails/${id}.jpg`
}

// ─────────────────────────────────────────────
// Data helpers
// ─────────────────────────────────────────────

/** Shuffle an array (Fisher-Yates) — useful for randomising ingredient pools */
export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
