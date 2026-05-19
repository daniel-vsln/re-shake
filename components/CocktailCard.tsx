'use client'

import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import styles from './CocktailCard.module.css'

const s = styles as Record<string, string>

type Category =
  | 'spirit'
  | 'mocktail'
  | 'wine'
  | 'beer'
  | 'classic'
  | 'modern'
  | 'tiki'
  | 'afterDinner'
type Difficulty = 'easy' | 'medium' | 'hard'

const CATEGORY_HUE: Record<string, string> = {
  spirit: '#ffd23f',
  mocktail: '#a8e063',
  wine: '#ff5b9e',
  beer: '#ffb74d',
  classic: '#7a5cff',
  modern: '#6ec5e9',
  tiki: '#ff9b3a',
  afterDinner: '#b07a4f',
}

interface CocktailCardProps {
  id: string
  name: string
  category: Category
  difficulty: Difficulty
  glassType: string
  ingredientCount: number
  masteryPercent: number
  isFavorite?: boolean
  onFavoriteToggle?: (next: boolean) => void
  onClick?: (id: string) => void
  hue?: string
  emoji?: string
  stars?: 0 | 1 | 2 | 3
}

export default function CocktailCard({
  id,
  name,
  category,
  difficulty,
  glassType,
  ingredientCount,
  masteryPercent,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
  hue,
  emoji = '🍸',
  stars = 0,
}: CocktailCardProps) {
  const bg = hue ?? CATEGORY_HUE[category] ?? CATEGORY_HUE.spirit

  return (
    <article
      className={s.root}
      style={{ '--cocktail-hue': bg } as React.CSSProperties}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(id)}
    >
      <div className={s.visual}>
        {stars > 0 && (
          <div className={s.stars} aria-label={`${stars} of 3 stars`}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`${s.star} ${i < stars ? s.starOn : ''}`}>
                ★
              </span>
            ))}
          </div>
        )}
        <button
          type="button"
          className={`${s.favBtn} ${isFavorite ? s.favOn : ''}`}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteToggle?.(!isFavorite)
          }}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        <span className={s.emoji} aria-hidden="true">
          {emoji}
        </span>
      </div>

      <div className={s.body}>
        <div className={s.titleRow}>
          <h3 className={s.name}>{name}</h3>
        </div>

        <div className={s.meta}>
          <Badge tone="category" value={category} compact />
          <Badge tone="difficulty" value={difficulty} compact />
        </div>

        <div className={s.metaRow}>
          <span>🥃 {glassType}</span>
          <span className={s.metaDot} />
          <span>{ingredientCount} ingredients</span>
        </div>

        <div className={s.progress}>
          <ProgressBar
            value={masteryPercent}
            color={masteryPercent >= 80 ? 'success' : 'primary'}
            size="sm"
            valueLabel={`${masteryPercent}% mastered`}
            label=""
          />
        </div>
      </div>
    </article>
  )
}

export function CocktailCardSkeleton() {
  return (
    <div className={`${s.root} ${s.skeleton}`} aria-busy="true">
      <div className={s.skVisual} />
      <div className={s.skBody}>
        <div className={`${s.skLine} ${s.skLineTall}`} />
        <div className={`${s.skLine} ${s.skLineShort}`} />
        <div className={`${s.skLine} ${s.skLineMid}`} />
        <div className={`${s.skLine} ${s.skBar}`} />
      </div>
    </div>
  )
}
