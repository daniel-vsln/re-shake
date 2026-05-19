'use client'

import styles from './IngredientEditor.module.css'

const s = styles as Record<string, string>

export interface IngredientRow {
  id: string
  name: string
  amount: string
  emoji?: string
  color?: string
}

interface IngredientEditorProps {
  ingredients?: IngredientRow[]
  onChange?: (next: IngredientRow[]) => void
  onAdd?: () => void
  minRequired?: number
  required?: boolean
  label?: string
}

export default function IngredientEditor({
  ingredients = [],
  onChange,
  onAdd,
  minRequired,
  required = false,
  label = 'Ingredients',
}: IngredientEditorProps) {
  const remove = (id: string) => onChange?.(ingredients.filter((i) => i.id !== id))
  const isInvalid = minRequired != null && ingredients.length < minRequired

  return (
    <div className={s.root}>
      <div className={s.header}>
        <span className={s.title}>
          {label}
          {required && <span className={s.required}> *</span>}
        </span>
        {isInvalid ? (
          <span className={`${s.status} ${s.statusErr}`}>✕ At least {minRequired} required</span>
        ) : ingredients.length > 0 ? (
          <span className={`${s.status} ${s.statusOk}`}>✓ {ingredients.length} added</span>
        ) : null}
      </div>

      {ingredients.length === 0 && isInvalid ? (
        <div className={s.errorBox}>
          <span className={s.errorIcon}>⚠️</span>
          <span>No ingredients yet. Add at least {minRequired} to save.</span>
        </div>
      ) : ingredients.length === 0 ? (
        <div
          className={s.errorBox}
          style={{
            background: 'var(--color-surface-1)',
            color: 'var(--text-tertiary)',
            borderColor: 'var(--border-default)',
            borderStyle: 'dashed',
          }}
        >
          <span className={s.errorIcon}>📝</span>
          <span>No ingredients yet.</span>
        </div>
      ) : (
        <ul className={s.list}>
          {ingredients.map((i) => (
            <li key={i.id} className={s.row}>
              <span className={s.handle} aria-hidden="true">
                ⋮⋮
              </span>
              <span
                className={s.swatch}
                style={{ '--swatch': i.color ?? 'var(--color-surface-3)' } as React.CSSProperties}
                aria-hidden="true"
              >
                {i.emoji}
              </span>
              <span className={s.name} title={i.name}>
                {i.name}
              </span>
              <span className={s.amount}>{i.amount}</span>
              <button
                type="button"
                className={s.removeBtn}
                aria-label={`Remove ${i.name}`}
                onClick={() => remove(i.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {onAdd && (
        <button type="button" className={s.addBtn} onClick={onAdd}>
          ＋ Add ingredient
        </button>
      )}
    </div>
  )
}
