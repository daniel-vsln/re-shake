'use client'

import { useState } from 'react'
import IngredientChip from '@/components/ui/IngredientChip'
import Input from '@/components/ui/Input'
import styles from './Step1Ingredients.module.css'

const s = styles as Record<string, string>

export interface IngredientDef {
  id: string
  name: string
  category?: string
  emoji?: string
  color?: string
}

interface Step1IngredientsProps {
  availableIngredients: IngredientDef[]
  selectedIngredients: string[]
  onToggle: (id: string) => void
  expectedCount?: number
  cocktailName?: string
  blindMode?: boolean
}

export default function Step1Ingredients({
  availableIngredients,
  selectedIngredients,
  onToggle,
  expectedCount,
  cocktailName,
  blindMode = false,
}: Step1IngredientsProps) {
  const [query, setQuery] = useState('')

  const selectedSet = new Set(selectedIngredients)
  const selectedDefs = selectedIngredients
    .map((id) => availableIngredients.find((i) => i.id === id))
    .filter((i): i is IngredientDef => !!i)

  const q = query.trim().toLowerCase()
  const visiblePool = availableIngredients.filter(
    (i) => !selectedSet.has(i.id) && (!q || i.name.toLowerCase().includes(q))
  )

  const hint = blindMode
    ? `Pick the ingredients you think belong${expectedCount ? ` (target: ${expectedCount})` : ''}.`
    : cocktailName
      ? `Build the recipe for ${cocktailName}.`
      : `Pick the ingredients.`

  return (
    <div className={s.root}>
      <div className={s.hintRow}>
        <span className={s.hint}>{hint}</span>
        {expectedCount != null && (
          <span className={s.hintCount}>
            {selectedIngredients.length} / {expectedCount}
          </span>
        )}
      </div>

      <div className={s.tray} aria-label="Your picks">
        {selectedDefs.length === 0 ? (
          <span className={s.trayEmpty}>Tap chips below to add them here</span>
        ) : (
          selectedDefs.map((i) => (
            <span key={i.id} className={s.trayItem}>
              <IngredientChip
                name={i.name}
                emoji={i.emoji}
                color={i.color}
                category={i.category}
                isSelected
                onClick={() => onToggle(i.id)}
              />
            </span>
          ))
        )}
      </div>

      <div className={s.poolHeader}>
        <span className={s.poolLabel}>
          Tap to add · {visiblePool.length} option{visiblePool.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className={s.search}>
        <Input
          type="search"
          placeholder="Search ingredients…"
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
        />
      </div>

      <div className={s.pool}>
        {visiblePool.length === 0 ? (
          <div className={s.poolEmpty}>
            {q ? `No ingredients match "${query}"` : 'Nothing left to add'}
          </div>
        ) : (
          visiblePool.map((i) => (
            <IngredientChip
              key={i.id}
              name={i.name}
              emoji={i.emoji}
              color={i.color}
              category={i.category}
              onClick={() => onToggle(i.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
