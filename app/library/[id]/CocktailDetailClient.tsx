'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import AvatarButton from '@/components/AvatarButton'
import type { Cocktail } from '@/lib/cocktails'
import { ingredientImageUrl } from '@/lib/utils'
import styles from './page.module.css'

const s = styles as Record<string, string>

interface Props {
  cocktail: Cocktail
}

const CATEGORY_GRADIENT: Record<string, string> = {
  Classics: 'linear-gradient(145deg, #ffd23f 0%, #ff9b3a 100%)',
  Contemporary: 'linear-gradient(145deg, #7a5cff 0%, #ff5b9e 100%)',
  Sours: 'linear-gradient(145deg, #a8e063 0%, #3cb371 100%)',
  Tropical: 'linear-gradient(145deg, #6ec5e9 0%, #3a8fbf 100%)',
}
const DEFAULT_GRADIENT = 'linear-gradient(145deg, #ffd23f 0%, #ff9b3a 100%)'

const DIFF_LABEL: Record<string, string> = {
  easy: '● Easy',
  medium: '●● Medium',
  hard: '●●● Hard',
}

function navigateBack(back: () => void) {
  if (typeof document === 'undefined' || !('startViewTransition' in document)) {
    back()
    return
  }
  document.documentElement.dataset.nav = 'back'
  document.startViewTransition(back)
}

export default function CocktailDetailClient({ cocktail }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const gradient = CATEGORY_GRADIENT[cocktail.categories[0]] ?? DEFAULT_GRADIENT
  const starCount = cocktail.difficulty === 'easy' ? 1 : cocktail.difficulty === 'medium' ? 2 : 3

  return (
    <div className={s.root}>
      {/* ── NAV ── */}
      <div className={s.nav}>
        <button
          type="button"
          className={s.navBtn}
          onClick={() => navigateBack(() => startTransition(() => router.back()))}
        >
          ←
        </button>
        <div className={s.navActions}>
          <button type="button" className={s.navBtn} aria-label="Favourite">
            ♡
          </button>
          <button type="button" className={s.navBtn} aria-label="Share">
            ↗
          </button>
          <AvatarButton inline />
        </div>
      </div>

      {/* ── HERO CARD ── */}
      <div className={s.heroCard} style={{ background: gradient }}>
        <div className={s.heroTop}>
          <div className={s.heroBadges}>
            <span className={s.heroBadge}>
              {cocktail.categories[0] === 'classics' ? '👑' : '✦'}{' '}
              {(cocktail.categories[0] ?? '').toUpperCase()}
            </span>
            <span className={s.heroBadge}>{DIFF_LABEL[cocktail.difficulty]}</span>
          </div>
          <div className={s.heroStars} aria-label={`${starCount} of 3 stars`}>
            {[1, 2, 3].map((i) => (
              <span key={i} className={i <= starCount ? s.starOn : s.starOff}>
                ★
              </span>
            ))}
          </div>
        </div>

        <div className={s.heroBottom}>
          <h1 className={s.heroName}>{cocktail.name}</h1>
          <div className={s.heroEmoji} aria-hidden="true">
            {cocktail.image}
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className={s.stats}>
        <div className={s.statItem}>
          <span className={s.statIcon}>⏱</span>
          <div>
            <span className={s.statValue}>{cocktail.prepTime}</span>
          </div>
        </div>
        <div className={s.statDivider} />
        <div className={s.statItem}>
          <span className={s.statIcon}>🧪</span>
          <div>
            <span className={s.statValue}>{cocktail.ingredients.length} items</span>
          </div>
        </div>
        <div className={s.statDivider} />
        <div className={s.statItem}>
          <span className={s.statIcon}>🔥</span>
          <div>
            <span className={s.statValue}>{cocktail.abv}% ABV</span>
          </div>
        </div>
      </div>

      {/* ── INGREDIENTS ── */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>INGREDIENTS</span>
          <span className={s.sectionRule} />
          <span className={s.sectionCount}>{cocktail.ingredients.length} items</span>
        </div>
        <div className={s.ingredientList}>
          {cocktail.ingredients.map((ing) => (
            <div key={ing.id} className={s.ingredientRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ingredientImageUrl(ing.id)} alt={ing.name} className={s.ingIcon} />
              <span className={s.ingName}>{ing.name}</span>
              <span className={s.ingPill}>
                <span className={s.ingAmount}>{ing.amount}</span>
                <span className={s.ingUnit}> {ing.unit}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVING ── */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>SERVING</span>
          <span className={s.sectionRule} />
        </div>
        <div className={s.servingGrid}>
          {[
            { key: 'method', label: 'METHOD', value: cocktail.method, icon: '🥄' },
            { key: 'glass', label: 'GLASS', value: cocktail.glass, icon: '🥃' },
            { key: 'garnish', label: 'GARNISH', value: cocktail.garnish, icon: '🍊' },
          ].map((item) => (
            <div key={item.key} className={s.servingCard}>
              <span className={s.servingCardIcon}>{item.icon}</span>
              <div>
                <div className={s.servingCardLabel}>{item.label}</div>
                <div className={s.servingCardValue}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTES ── */}
      {cocktail.notes && (
        <section className={s.section}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>NOTES</span>
            <span className={s.sectionRule} />
          </div>
          <p className={s.notes}>{cocktail.notes}</p>
        </section>
      )}

      {/* ── CTA ── */}
      <div className={s.cta}>
        <button
          type="button"
          className={s.ctaPrimary}
          onClick={() => router.push(`/train/${cocktail.id}`)}
        >
          🎯 Start Training
        </button>
        <div className={s.ctaRow}>
          <button type="button" className={s.ctaGhost}>
            + Collection
          </button>
          <button type="button" className={s.ctaGhost}>
            ✨ Create Twist
          </button>
        </div>
      </div>
    </div>
  )
}
