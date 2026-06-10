'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import { ingredientImageUrl } from '@/lib/utils'
import styles from './Step1Ingredients.module.css'

const s = styles as Record<string, string>

export interface IngredientDef {
  id: string
  name: string
  category?: string
  color?: string | null
}

interface Step1IngredientsProps {
  availableIngredients: IngredientDef[]
  selectedIngredients: string[]
  onToggle: (id: string) => void
  expectedCount?: number
  cocktailName?: string
  blindMode?: boolean
}

const TRAY_VISIBLE = 3

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
  const poolItems = availableIngredients.filter(
    (i) => !selectedSet.has(i.id) && (!q || i.name.toLowerCase().includes(q))
  )

  const trayVisible = selectedDefs.slice(0, TRAY_VISIBLE)
  const trayOverflow = selectedDefs.length - TRAY_VISIBLE

  return (
    <div className={s.root}>
      {/* ── BLIND MODE BANNER ── */}
      {blindMode && (
        <div className={s.blindBanner}>
          <span className={s.blindIcon}>?</span>
          <div className={s.blindBody}>
            <span className={s.blindEyebrow}>BLIND MODE</span>
            <p className={s.blindTitle}>What&rsquo;s in this drink?</p>
            {expectedCount && (
              <span className={s.blindHint}>Hint: {expectedCount} ingredients</span>
            )}
          </div>
        </div>
      )}

      {/* ── TRAY ── */}
      <div>
        <div className={s.trayHeader}>
          <span className={s.trayLabel}>YOUR PICKS</span>
          {expectedCount != null && (
            <span className={s.trayCount}>
              {selectedIngredients.length} / {expectedCount}
            </span>
          )}
        </div>

        <div className={s.tray}>
          {selectedDefs.length === 0 ? (
            <span className={s.trayEmpty}>Tap chips below to add them here</span>
          ) : (
            <>
              {trayVisible.map((ing) => (
                <button
                  key={ing.id}
                  type="button"
                  className={s.trayChip}
                  style={
                    { '--chip-bg': ing.color ?? 'var(--color-surface-3)' } as React.CSSProperties
                  }
                  onClick={() => onToggle(ing.id)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ingredientImageUrl(ing.id)} alt="" className={s.trayChipImg} />
                  <span className={s.trayChipName}>{ing.name}</span>
                  <span className={s.trayChipX} aria-hidden="true">
                    ×
                  </span>
                </button>
              ))}
              {trayOverflow > 0 && <span className={s.trayMore}>+{trayOverflow} more</span>}
            </>
          )}
        </div>
      </div>

      {/* ── POOL ── */}
      <div>
        <div className={s.poolHeader}>
          <span className={s.poolLabel}>TAP TO ADD · {poolItems.length} OPTIONS</span>
        </div>

        {availableIngredients.length > 8 && (
          <div className={s.search}>
            <Input
              type="search"
              placeholder="Search ingredients…"
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
            />
          </div>
        )}

        {poolItems.length === 0 ? (
          <div className={s.poolEmpty}>
            {q ? `No ingredients match "${query}"` : 'Nothing left to add'}
          </div>
        ) : (
          <div className={s.grid}>
            {poolItems.map((ing) => (
              <button
                key={ing.id}
                type="button"
                className={s.tile}
                onClick={() => onToggle(ing.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ingredientImageUrl(ing.id)} alt="" className={s.tileIcon} />
                <span className={s.tileName}>{ing.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
