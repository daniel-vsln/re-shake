'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import type { Cocktail } from '@/lib/mock-cocktails'
import styles from './page.module.css'

const s = styles as Record<string, string>

interface Props {
  cocktail: Cocktail
}

const DIFF_DOTS: Record<string, string> = {
  easy: '●○○',
  medium: '●●○',
  hard: '●●●',
}

export default function CocktailDetailClient({ cocktail }: Props) {
  const router = useRouter()

  return (
    <div className={s.root}>
      <div className={s.backRow}>
        <Button variant="ghost" size="sm" leftIcon="←" onClick={() => router.push('/library')}>
          Library
        </Button>
      </div>

      {/* Hero */}
      <div className={s.hero}>
        <span className={s.heroEmoji} aria-hidden="true">
          {cocktail.image}
        </span>
        <div>
          <h1 className={s.name}>{cocktail.name}</h1>
          <div className={s.metaRow}>
            <Badge tone="category" value={cocktail.category as never} />
            <Badge tone="difficulty" value={cocktail.difficulty} />
            <span className={s.metaChip}>{cocktail.prepTime}</span>
            <span className={s.metaChip}>{cocktail.abv}% ABV</span>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Ingredients</h2>
        <div className={s.ingredientList}>
          {cocktail.ingredients.map((ing) => (
            <div key={ing.id} className={s.ingredientRow}>
              <span
                className={s.swatch}
                style={{ background: ing.color ?? 'var(--color-surface-3)' }}
              >
                {ing.emoji}
              </span>
              <span className={s.ingName}>{ing.name}</span>
              <span className={s.ingAmount}>
                {ing.amount} {ing.unit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Serving */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Serving</h2>
        <div className={s.servingGrid}>
          <div className={s.servingItem}>
            <span className={s.servingLabel}>Glass</span>
            <span className={s.servingValue}>{cocktail.glass}</span>
          </div>
          <div className={s.servingItem}>
            <span className={s.servingLabel}>Method</span>
            <span className={s.servingValue}>{cocktail.method}</span>
          </div>
          <div className={s.servingItem}>
            <span className={s.servingLabel}>Garnish</span>
            <span className={s.servingValue}>{cocktail.garnish}</span>
          </div>
        </div>
      </section>

      {cocktail.notes && (
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Notes</h2>
          <p className={s.notes}>{cocktail.notes}</p>
        </section>
      )}

      {/* CTA */}
      <div className={s.cta}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => router.push(`/train/${cocktail.id}`)}
        >
          🎯 Train this recipe
        </Button>
      </div>
    </div>
  )
}
