'use client'

import { ingredientImageUrl } from '@/lib/utils'
import styles from './Step2Measurements.module.css'

const s = styles as Record<string, string>

export interface MeasurementSpec {
  id: string
  name: string
  unit: string
  color?: string | null
  hint?: string
  step?: number
  min?: number
  max?: number
}

interface Step2MeasurementsProps {
  selectedIngredients: MeasurementSpec[]
  measurements: Record<string, number | string>
  onMeasurementChange: (id: string, value: number | string) => void
  tolerance?: number
  toleranceLabel?: string
  cocktailName?: string
  cocktailEmoji?: string
}

export default function Step2Measurements({
  selectedIngredients,
  measurements,
  onMeasurementChange,
  tolerance,
  toleranceLabel = 'ml',
  cocktailName,
  cocktailEmoji = '🍸',
}: Step2MeasurementsProps) {
  return (
    <div className={s.root}>
      {/* ── CONTEXT BANNER ── */}
      {cocktailName && (
        <div className={s.banner}>
          <span className={s.bannerEmoji}>{cocktailEmoji}</span>
          <div className={s.bannerBody}>
            <span className={s.bannerEyebrow}>HOW MUCH OF EACH?</span>
            <span className={s.bannerTitle}>{cocktailName}</span>
          </div>
          {tolerance != null && (
            <span className={s.tolerancePill}>
              ±{tolerance} {toleranceLabel}
            </span>
          )}
        </div>
      )}

      {/* ── INGREDIENT SLIDER CARDS ── */}
      <div className={s.rows}>
        {selectedIngredients.map((ing) => {
          const val = measurements[ing.id]
          const numVal = Number(val ?? 0)
          const min = ing.min ?? 0
          const max = ing.max ?? 100
          const pct = Math.max(0, Math.min(100, ((numVal - min) / (max - min)) * 100))
          const isFilled = numVal > 0

          return (
            <div key={ing.id} className={`${s.card} ${isFilled ? s.cardFilled : ''}`}>
              <div className={s.cardTop}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ingredientImageUrl(ing.id)} alt="" className={s.icon} />

                <div className={s.meta}>
                  <span className={s.name}>{ing.name}</span>
                  <span className={s.hint}>{ing.hint ?? ing.unit}</span>
                </div>

                <span className={`${s.valuePill} ${isFilled ? s.valuePillFilled : ''}`}>
                  <span className={s.valueNum}>{isFilled ? numVal : '—'}</span>
                  {isFilled && <span className={s.valueUnit}> {ing.unit}</span>}
                </span>
              </div>

              <div className={s.sliderWrap}>
                <input
                  type="range"
                  className={s.slider}
                  min={min}
                  max={max}
                  step={ing.step ?? 1}
                  value={numVal}
                  onChange={(e) => onMeasurementChange(ing.id, parseFloat(e.target.value))}
                  style={{ '--pct': `${pct}%` } as React.CSSProperties}
                  aria-label={`${ing.name} amount`}
                />
                <div className={s.sliderLabels}>
                  <span>
                    {min} {ing.unit}
                  </span>
                  <span>
                    {max} {ing.unit}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
