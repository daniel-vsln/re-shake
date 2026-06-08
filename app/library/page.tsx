'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CocktailCard from '@/components/CocktailCard'
import AvatarButton from '@/components/AvatarButton'
import { COCKTAILS, CATEGORIES } from '@/lib/mock-cocktails'
import styles from './page.module.css'

const s = styles as Record<string, string>

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 }

export default function LibraryPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filtered = COCKTAILS.filter((c) => {
    if (activeCategory && c.category !== activeCategory) return false
    if (activeDifficulty && c.difficulty !== activeDifficulty) return false
    return true
  })

  const toggleFav = (id: string, next: boolean) => {
    setFavorites((prev) => {
      const s = new Set(prev)
      next ? s.add(id) : s.delete(id)
      return s
    })
  }

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div>
          <h1 className={s.title}>Library</h1>
          <p className={s.subtitle}>{COCKTAILS.length} recipes · tap to train</p>
        </div>
        <AvatarButton inline />
      </header>

      <div className={s.filters}>
        <div className={s.filterGroup}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${s.chip} ${activeCategory === cat ? s.chipActive : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={s.filterGroup}>
          {(['easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              type="button"
              className={`${s.chip} ${activeDifficulty === d ? s.chipActive : ''}`}
              onClick={() => setActiveDifficulty(activeDifficulty === d ? null : d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={s.empty}>No cocktails match the current filters.</div>
      ) : (
        <div className={s.grid}>
          {filtered
            .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty])
            .map((c) => (
              <CocktailCard
                key={c.id}
                id={c.id}
                name={c.name}
                category={c.category as never}
                difficulty={c.difficulty}
                glassType={c.glass}
                ingredientCount={c.ingredients.length}
                masteryPercent={0}
                emoji={c.image}
                isFavorite={favorites.has(c.id)}
                onFavoriteToggle={(next) => toggleFav(c.id, next)}
                onClick={(id) => router.push(`/library/${id}`)}
              />
            ))}
        </div>
      )}
    </div>
  )
}
