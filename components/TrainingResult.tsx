'use client'

import { ingredientImageUrl } from '@/lib/utils'
import styles from './TrainingResult.module.css'

const s = styles as Record<string, string>

type ResultStatus = 'perfect' | 'close' | 'wrong'

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

interface TrainingResultProps {
  cocktailName: string
  score: number
  stars?: 0 | 1 | 2 | 3
  tolerance?: number
  ingredients: IngredientResult[]
  serving?: ServingResult[]
  rewards?: { gems?: number; xp?: number; streak?: number }
  onTryAgain?: () => void
  onNext?: () => void
  onBackToLibrary?: () => void
  scoreFormat?: 'percent' | 'letter'
}

const LETTER_GRADES: [number, string][] = [
  [90, 'A'],
  [80, 'B'],
  [70, 'C'],
  [60, 'D'],
  [0, 'F'],
]

function letterGrade(score: number): string {
  for (const [min, letter] of LETTER_GRADES) if (score >= min) return letter
  return 'F'
}

function compareWithTolerance(
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

const STATUS_META: Record<ResultStatus, { icon: string; color: string; userColor: string }> = {
  perfect: { icon: '✓', color: 'var(--color-success)', userColor: 'var(--color-success)' },
  close: { icon: '~', color: 'var(--color-warning)', userColor: 'var(--color-warning)' },
  wrong: { icon: '✕', color: 'var(--color-error)', userColor: 'var(--color-error)' },
}

const GREET: [number, string][] = [
  [90, 'Bartender mode!'],
  [75, 'Nice pour!'],
  [50, 'Solid attempt'],
  [0, 'Try again — you got this'],
]

function greetText(score: number): string {
  for (const [min, text] of GREET) if (score >= min) return text
  return 'Try again'
}

export default function TrainingResult({
  cocktailName,
  score,
  stars,
  tolerance = 5,
  ingredients,
  serving = [],
  rewards,
  onTryAgain,
  onNext,
  onBackToLibrary,
  scoreFormat = 'percent',
}: TrainingResultProps) {
  const starCount = stars != null ? stars : score >= 90 ? 3 : score >= 75 ? 2 : score >= 50 ? 1 : 0
  const greet = greetText(score)

  const servingOk = serving.every((sv) => sv.value.toLowerCase() === sv.correct.toLowerCase())
  const servingSummary = serving.map((sv) => `${sv.label}: ${sv.value || '—'}`).join(' · ')

  return (
    <div className={s.root}>
      {/* ── HERO ── */}
      <div className={s.hero}>
        <div className={s.sparkles} aria-hidden="true">
          <span className={s.sparkle} style={{ top: '12%', left: '8%' }}>
            ✦
          </span>
          <span className={s.sparkle} style={{ top: '20%', right: '10%', fontSize: '22px' }}>
            ★
          </span>
          <span className={s.sparkle} style={{ top: '45%', left: '4%', fontSize: '12px' }}>
            ✦
          </span>
        </div>

        <p className={s.greet}>{greet.toUpperCase()}</p>

        {scoreFormat === 'percent' ? (
          <div className={s.scoreWrap}>
            <span className={s.scoreNum}>{Math.round(score)}</span>
            <span className={s.scorePct}>%</span>
          </div>
        ) : (
          <div className={s.scoreWrap}>
            <span className={s.scoreNum}>{letterGrade(score)}</span>
          </div>
        )}

        <div className={s.stars} aria-label={`${starCount} of 3 stars`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < starCount ? s.starOn : s.starOff}>
              ★
            </span>
          ))}
        </div>

        {rewards && (
          <div className={s.rewards}>
            {rewards.gems != null && (
              <span
                className={s.rewardPill}
                style={{ '--pillColor': 'var(--color-success)' } as React.CSSProperties}
              >
                +{rewards.gems} 💎
              </span>
            )}
            {rewards.streak != null && (
              <span
                className={s.rewardPill}
                style={{ '--pillColor': 'var(--color-primary)' } as React.CSSProperties}
              >
                🔥 {rewards.streak} streak
              </span>
            )}
            {rewards.xp != null && (
              <span
                className={s.rewardPill}
                style={{ '--pillColor': 'var(--color-secondary)' } as React.CSSProperties}
              >
                +{rewards.xp} XP
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── BREAKDOWN ── */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>YOUR POUR vs THE RECIPE</span>
          <span className={s.sectionRule} />
        </div>

        <div className={s.rows}>
          {ingredients.map((ing) => {
            const status =
              ing.status ?? compareWithTolerance(ing.userValue, ing.correctValue, tolerance)
            const meta = STATUS_META[status]

            return (
              <div key={ing.id} className={s.row}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ingredientImageUrl(ing.id)} alt="" className={s.rowIcon} />

                <div className={s.rowBody}>
                  <span className={s.rowName}>{ing.name}</span>
                  <div className={s.rowPills}>
                    <span
                      className={s.pillYou}
                      style={{ '--pillYouColor': meta.userColor } as React.CSSProperties}
                    >
                      YOU: {ing.userValue} {ing.unit}
                    </span>
                    <span className={s.pillOk}>
                      OK: {ing.correctValue} {ing.unit}
                    </span>
                  </div>
                </div>

                <span
                  className={s.statusCircle}
                  style={{ '--statusColor': meta.color } as React.CSSProperties}
                >
                  {meta.icon}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── SERVING SUMMARY ── */}
      {serving.length > 0 && (
        <div
          className={s.servingCard}
          style={
            {
              '--servingBorder': servingOk ? 'var(--color-success)' : 'var(--color-error)',
            } as React.CSSProperties
          }
        >
          <span
            className={s.servingStatus}
            style={
              {
                '--statusColor': servingOk ? 'var(--color-success)' : 'var(--color-error)',
              } as React.CSSProperties
            }
          >
            {servingOk ? '✓' : '✕'}
          </span>
          <span className={s.servingText}>{servingSummary}</span>
        </div>
      )}

      {/* ── ACTIONS ── */}
      <div className={s.actions}>
        {onNext && (
          <button type="button" className={s.nextBtn} onClick={onNext}>
            🎯 Next Cocktail
          </button>
        )}
        <div className={s.actionsRow}>
          {onTryAgain && (
            <button type="button" className={s.ghostBtn} onClick={onTryAgain}>
              ↺ Try Again
            </button>
          )}
          {onBackToLibrary && (
            <button type="button" className={s.ghostBtn} onClick={onBackToLibrary}>
              ← Library
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
