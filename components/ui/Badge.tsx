import styles from './Badge.module.css'

type CategoryValue =
  | 'spirit'
  | 'mocktail'
  | 'wine'
  | 'beer'
  | 'classic'
  | 'modern'
  | 'tiki'
  | 'afterDinner'
type DifficultyValue = 'easy' | 'medium' | 'hard'
type StatusValue = 'correct' | 'close' | 'wrong' | 'locked'

interface BadgeProps {
  tone: 'category' | 'difficulty' | 'status'
  value: CategoryValue | DifficultyValue | StatusValue
  icon?: React.ReactNode
  compact?: boolean
  children?: React.ReactNode
}

const DIFFICULTY_DOTS: Record<string, number> = { easy: 1, medium: 2, hard: 3 }

const DEFAULT_LABELS: Record<string, string> = {
  spirit: 'Spirit',
  mocktail: 'Mocktail',
  wine: 'Wine',
  beer: 'Beer',
  classic: 'Classic',
  modern: 'Modern',
  tiki: 'Tiki',
  afterDinner: 'After-dinner',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  correct: 'Perfect',
  close: 'Close',
  wrong: 'Off',
  locked: 'Locked',
}

export default function Badge({ tone, value, icon, compact = false, children }: BadgeProps) {
  const s = styles as Record<string, string>
  const cls = [s.root, s[value], compact ? s.compact : ''].filter(Boolean).join(' ')
  const label = children ?? DEFAULT_LABELS[value] ?? value

  return (
    <span className={cls}>
      {tone === 'difficulty' && (
        <span className={s.dots} aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`${s.dot} ${i < (DIFFICULTY_DOTS[value] ?? 0) ? s.dotOn : ''}`}
            />
          ))}
        </span>
      )}
      {icon && <span className={s.icon}>{icon}</span>}
      <span>{label}</span>
    </span>
  )
}
