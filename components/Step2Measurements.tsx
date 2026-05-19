'use client'

import { UnitInput } from '@/components/ui/Input'
import styles from './Step2Measurements.module.css'

const s = styles as Record<string, string>

export interface MeasurementSpec {
  id: string
  name: string
  unit: string
  emoji?: string
  color?: string
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
}

export default function Step2Measurements({
  selectedIngredients,
  measurements,
  onMeasurementChange,
  tolerance,
  toleranceLabel = 'ml',
}: Step2MeasurementsProps) {
  const filledCount = selectedIngredients.filter(
    (i) => measurements[i.id] !== undefined && measurements[i.id] !== ''
  ).length
  const allFilled = filledCount === selectedIngredients.length

  const adjust = (ingredient: MeasurementSpec, delta: number) => {
    const cur = Number(measurements[ingredient.id] ?? 0)
    const step = ingredient.step ?? 1
    let next = cur + delta * step
    if (ingredient.min != null) next = Math.max(ingredient.min, next)
    if (ingredient.max != null) next = Math.min(ingredient.max, next)
    onMeasurementChange(ingredient.id, next)
  }

  return (
    <div className={s.root}>
      <div className={s.bannerRow}>
        <span className={s.bannerCopy}>How much of each? Drag, type, or tap ±.</span>
        {tolerance != null && (
          <span className={s.tolerance}>
            ⚖️ ±{tolerance} {toleranceLabel}
          </span>
        )}
      </div>

      <div className={s.rows}>
        {selectedIngredients.map((i) => {
          const val = measurements[i.id]
          const isEmpty = val === undefined || val === ''
          const hasError = !isEmpty && i.max != null && Number(val) > i.max
          const rowCls = [
            s.row,
            !isEmpty && !hasError ? s.rowFilled : '',
            hasError ? s.rowError : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div key={i.id} className={rowCls}>
              <span
                className={s.swatch}
                style={{ '--swatch': i.color ?? 'var(--color-surface-3)' } as React.CSSProperties}
                aria-hidden="true"
              >
                {i.emoji}
              </span>

              <div className={s.meta}>
                <div className={s.name}>{i.name}</div>
                <div className={s.unitHint}>{i.hint ?? `Measure in ${i.unit}`}</div>
              </div>

              <div className={s.stepper}>
                <button
                  type="button"
                  className={s.stepBtn}
                  aria-label={`Decrease ${i.name}`}
                  onClick={() => adjust(i, -1)}
                  disabled={Number(val ?? 0) <= (i.min ?? 0)}
                >
                  −
                </button>
                <button
                  type="button"
                  className={s.stepBtn}
                  aria-label={`Increase ${i.name}`}
                  onClick={() => adjust(i, +1)}
                >
                  +
                </button>
              </div>

              <div className={s.valuePill}>
                <UnitInput
                  value={val ?? ''}
                  unit={i.unit}
                  step={i.step ?? 1}
                  min={i.min}
                  max={i.max}
                  error={hasError ? `Max ${i.max}` : null}
                  onChange={(v) => onMeasurementChange(i.id, v)}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className={`${s.summary} ${allFilled ? '' : s.summaryWarn}`}>
        <span className={s.summaryIcon}>{allFilled ? '✓' : '⚠️'}</span>
        <span>
          {allFilled
            ? `All ${filledCount} measurements set — ready to continue.`
            : `${filledCount} of ${selectedIngredients.length} measurements set.`}
        </span>
      </div>
    </div>
  )
}
