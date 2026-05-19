'use client'

import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
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

const STATUS_META: Record<ResultStatus, { bg: string; icon: string; label: string; text: string }> =
  {
    perfect: { bg: 'var(--color-success)', icon: '✓', label: 'Perfect', text: 'Spot on!' },
    close: { bg: 'var(--color-warning)', icon: '~', label: 'Close', text: 'Within tolerance' },
    wrong: { bg: 'var(--color-error)', icon: '✕', label: 'Off', text: 'Beyond tolerance' },
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

  const greet =
    score >= 90
      ? 'Bartender mode!'
      : score >= 75
        ? 'Nice pour!'
        : score >= 50
          ? 'Solid attempt'
          : 'Try again — you got this'

  return (
    <div className={s.root}>
      {/* HERO */}
      <div className={s.hero}>
        <div className={s.heroBg} aria-hidden="true" />
        <div className={s.heroEyebrow}>
          {greet} · {cocktailName}
        </div>

        {scoreFormat === 'percent' ? (
          <div className={s.heroScore}>
            <span className={s.pct}>{Math.round(score)}</span>
            <span className={s.pctSign}>%</span>
          </div>
        ) : (
          <div className={s.heroGrade}>{letterGrade(score)}</div>
        )}

        <div className={s.heroStars} aria-label={`${starCount} of 3 stars`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`${s.heroStar} ${i < starCount ? s.heroStarOn : ''}`}>
              ★
            </span>
          ))}
        </div>

        {rewards && (
          <div className={s.heroBadges}>
            {rewards.gems != null && (
              <Badge tone="status" value="correct">
                +{rewards.gems} 💎
              </Badge>
            )}
            {rewards.streak != null && (
              <Badge tone="status" value="close">
                🔥 {rewards.streak}
              </Badge>
            )}
            {rewards.xp != null && (
              <Badge tone="category" value="spirit">
                +{rewards.xp} XP
              </Badge>
            )}
          </div>
        )}

        <div className={s.heroSubtitle}>
          {
            ingredients.filter(
              (i) =>
                (i.status ?? compareWithTolerance(i.userValue, i.correctValue, tolerance)) ===
                'perfect'
            ).length
          }{' '}
          / {ingredients.length} ingredients spot on
        </div>
      </div>

      {/* BREAKDOWN */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>Your pour vs the recipe</span>
          <span className={s.sectionRule} />
        </div>

        {ingredients.map((i) => {
          const status = i.status ?? compareWithTolerance(i.userValue, i.correctValue, tolerance)
          const meta = STATUS_META[status]
          const rowCls = [
            s.row,
            status === 'perfect' ? s.rowPerfect : '',
            status === 'close' ? s.rowClose : '',
            status === 'wrong' ? s.rowWrong : '',
          ]
            .filter(Boolean)
            .join(' ')

          const userColor =
            status === 'perfect'
              ? 'var(--color-success)'
              : status === 'wrong'
                ? 'var(--color-error)'
                : 'var(--color-warning)'

          return (
            <div key={i.id} className={rowCls}>
              <span
                className={s.swatch}
                style={{ '--swatch': i.color ?? 'var(--color-surface-3)' } as React.CSSProperties}
                aria-hidden="true"
              >
                {i.emoji}
              </span>
              <div className={s.rowBody}>
                <div className={s.rowName}>{i.name}</div>
                <div className={s.rowSub}>
                  {meta.text} · {meta.label}
                </div>
              </div>
              <div
                className={s.compare}
                style={{ '--userColor': userColor } as React.CSSProperties}
              >
                <span className={s.userVal}>{i.userValue}</span>
                <span className={s.arrow}>vs</span>
                <span className={s.correctVal}>{i.correctValue}</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>{i.unit}</span>
              </div>
              <span
                className={s.statusPill}
                style={{ '--statusBg': meta.bg } as React.CSSProperties}
              >
                {meta.icon}
              </span>
            </div>
          )
        })}
      </section>

      {/* SERVING CHECK */}
      {serving.length > 0 && (
        <section className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Serving check</span>
            <span className={s.sectionRule} />
          </div>
          <div className={s.servingGrid}>
            {serving.map((sv) => {
              const ok = sv.value.toLowerCase() === sv.correct.toLowerCase()
              return (
                <div
                  key={sv.label}
                  className={s.servingCard}
                  style={
                    {
                      '--rowBorder': ok ? 'var(--color-success)' : 'var(--color-error)',
                    } as React.CSSProperties
                  }
                >
                  <span className={s.servingIcon}>{sv.icon ?? (ok ? '✓' : '✕')}</span>
                  <div>
                    <div className={s.servingLabel}>{sv.label}</div>
                    <div className={s.servingValue}>{sv.value || '—'}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ACTIONS */}
      <div className={s.actions}>
        {onNext && (
          <Button variant="primary" size="lg" fullWidth onClick={onNext}>
            🎯 Next cocktail
          </Button>
        )}
        <div className={s.actionsRow}>
          {onTryAgain && (
            <Button variant="ghost" onClick={onTryAgain} leftIcon="↻">
              Try again
            </Button>
          )}
          {onBackToLibrary && (
            <Button variant="ghost" onClick={onBackToLibrary} leftIcon="←">
              Library
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
