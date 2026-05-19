'use client'

import styles from './IngredientChip.module.css'

const s = styles as Record<string, string>

const CATEGORY_COLOR: Record<string, string> = {
  spirit: '#ffd23f',
  citrus: '#a8e063',
  bitters: '#ff5b9e',
  sweet: '#ffb74d',
  herb: '#a8e063',
  modifier: '#7a5cff',
  mixer: '#6ec5e9',
}

interface IngredientChipProps {
  name: string
  category?: string
  color?: string
  emoji?: string
  isSelected?: boolean
  isCorrect?: boolean | null
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function IngredientChip({
  name,
  category,
  color,
  emoji,
  isSelected = false,
  isCorrect = null,
  disabled = false,
  size = 'md',
  onClick,
}: IngredientChipProps) {
  const stateCls =
    isCorrect === true ? s.correct : isCorrect === false ? s.wrong : isSelected ? s.selected : ''

  const cls = [s.root, s[size], stateCls, disabled ? s.disabled : ''].filter(Boolean).join(' ')

  const swatchColor =
    color ?? (category ? CATEGORY_COLOR[category] : undefined) ?? 'var(--color-surface-3)'

  const ariaPressed = isCorrect === null ? isSelected : undefined
  const ariaLabel =
    isCorrect === true ? `${name}, correct` : isCorrect === false ? `${name}, incorrect` : name

  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className={s.swatch} style={{ '--chip-swatch': swatchColor } as React.CSSProperties}>
        {emoji}
      </span>
      <span className={s.label}>{name}</span>
      {isCorrect === true && <span className={s.indicator}>✓</span>}
      {isCorrect === false && <span className={s.indicator}>✕</span>}
    </button>
  )
}
