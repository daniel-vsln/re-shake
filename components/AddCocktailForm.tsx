'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ProgressBar from '@/components/ui/ProgressBar'
import Tag from '@/components/ui/Tag'
import ImagePicker from '@/components/ImagePicker'
import IngredientEditor from '@/components/IngredientEditor'
import type { IngredientRow } from '@/components/IngredientEditor'
import styles from './AddCocktailForm.module.css'

const s = styles as Record<string, string>

export interface CocktailDraft {
  image: string | null
  name: string
  category: string | null
  difficulty: string
  prepTime: string | number
  ingredients: IngredientRow[]
  method: string | null
  glass: string | null
  garnish: string
  notes: string
  abv: string | number
}

interface SelectOption {
  id: string
  label: string
  icon?: string
  sub?: string
}

interface AddCocktailFormProps {
  value: CocktailDraft
  onChange: (next: CocktailDraft) => void
  onClose?: () => void
  onSaveDraft?: () => void
  onSubmit?: (d: CocktailDraft) => void
  categoryOptions?: SelectOption[]
  methodOptions?: SelectOption[]
  glassOptions?: SelectOption[]
  onAddIngredient?: () => void
}

const CATEGORY_DEFAULT: SelectOption[] = [
  { id: 'classic', label: '👑 Classic' },
  { id: 'contemporary', label: '🆕 Contemporary' },
  { id: 'tiki', label: '🌴 Tiki' },
  { id: 'aperitif', label: '☕ Aperitif' },
  { id: 'mocktail', label: '🌿 Mocktail' },
]
const METHOD_DEFAULT: SelectOption[] = [
  { id: 'stir', label: 'Stir', icon: '🥄' },
  { id: 'shake', label: 'Shake', icon: '🤝' },
  { id: 'build', label: 'Build', icon: '🧱' },
]
const GLASS_DEFAULT: SelectOption[] = [
  { id: 'rocks', label: 'Rocks', icon: '🥃' },
  { id: 'coupe', label: 'Coupe', icon: '🍸' },
  { id: 'highball', label: 'Highball', icon: '🥛' },
  { id: 'flute', label: 'Flute', icon: '🥂' },
]

function validateDraft(v: CocktailDraft): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!v.name || v.name.trim().length < 2) errors.name = 'At least 2 characters'
  if (!v.category) errors.category = 'Pick a category'
  if (!v.ingredients || v.ingredients.length < 2) errors.ingredients = 'At least 2 required'
  if (!v.method) errors.method = 'Pick a method'
  if (!v.glass) errors.glass = 'Pick a glass'
  if (v.abv !== '' && v.abv != null && (+v.abv < 0 || +v.abv > 60)) errors.abv = 'Must be ≤ 60'
  if (v.notes && v.notes.length > 500) errors.notes = 'Up to 500 characters'
  return errors
}

function countFilled(v: CocktailDraft): number {
  let c = 0
  if (v.image) c++
  if (v.name) c++
  if (v.category) c++
  if (v.difficulty) c++
  if (v.prepTime !== '' && v.prepTime != null) c++
  if (v.ingredients?.length >= 2) c++
  if (v.method) c++
  if (v.glass) c++
  if (v.garnish) c++
  return c
}

export function emptyDraft(): CocktailDraft {
  return {
    image: null,
    name: '',
    category: null,
    difficulty: '',
    prepTime: '',
    ingredients: [],
    method: null,
    glass: null,
    garnish: '',
    notes: '',
    abv: '',
  }
}

export default function AddCocktailForm({
  value,
  onChange,
  onClose,
  onSaveDraft,
  onSubmit,
  onAddIngredient,
  categoryOptions = CATEGORY_DEFAULT,
  methodOptions = METHOD_DEFAULT,
  glassOptions = GLASS_DEFAULT,
}: AddCocktailFormProps) {
  const set = (patch: Partial<CocktailDraft>) => onChange({ ...value, ...patch })
  const errors = validateDraft(value)
  const isValid = Object.keys(errors).length === 0
  const filled = countFilled(value)
  const total = 9

  return (
    <div className={s.root}>
      {/* HEADER */}
      <header className={s.header}>
        <div className={s.headerTop}>
          <button type="button" className={s.closeBtn} aria-label="Cancel" onClick={onClose}>
            ×
          </button>
          <span className={s.title}>New Cocktail</span>
          <button
            type="button"
            className={`${s.saveQuickBtn} ${isValid ? s.saveQuickActive : s.saveQuickIdle}`}
            disabled={!isValid}
            onClick={isValid ? () => onSubmit?.(value) : undefined}
          >
            Save
          </button>
        </div>
        <div className={s.progressRow}>
          <ProgressBar
            value={filled}
            max={total}
            color={isValid ? 'success' : 'primary'}
            size="sm"
          />
          <span className={s.progressLabel}>
            {filled} / {total} fields
          </span>
        </div>
      </header>

      {/* CONTENT */}
      <div className={s.content}>
        <ImagePicker
          value={value.image}
          onChange={(img) => set({ image: img })}
          placeholder="Add a photo or emoji"
          filledBg="linear-gradient(135deg, #ffd23f, #ff9b3a)"
          aspectRatio="16 / 7"
        />

        <Input
          label="Name"
          required
          placeholder="e.g. Smoky Old Fashioned"
          value={value.name}
          onChange={(v) => set({ name: v })}
          success={!errors.name && !!value.name}
          error={value.name && errors.name ? errors.name : null}
        />

        <div className={s.fieldset}>
          <span className={s.fieldsetLabel}>
            Category <span className={s.fieldsetRequired}>*</span>
            {value.category && (
              <span style={{ marginLeft: 'auto', color: 'var(--color-success)', fontSize: 10 }}>
                ✓ Picked
              </span>
            )}
          </span>
          <div className={s.chipsRow}>
            {categoryOptions.map((c) => (
              <Tag
                key={c.id}
                selectable
                selected={value.category === c.id}
                onToggle={() => set({ category: value.category === c.id ? null : c.id })}
              >
                {c.label}
              </Tag>
            ))}
          </div>
        </div>

        <div className={s.row2}>
          <Input
            label="Difficulty"
            value={value.difficulty}
            onChange={(v) => set({ difficulty: v })}
            placeholder="Easy / Medium / Hard"
            success={!!value.difficulty}
          />
          <Input
            label="Prep time"
            type="number"
            value={value.prepTime}
            onChange={(v) => set({ prepTime: v })}
            placeholder="0"
            suffix="min"
            success={value.prepTime !== '' && value.prepTime != null}
          />
        </div>

        <IngredientEditor
          ingredients={value.ingredients}
          onChange={(list) => set({ ingredients: list })}
          onAdd={onAddIngredient}
          minRequired={2}
          required
        />

        <div className={s.fieldset}>
          <span className={s.fieldsetLabel}>
            Method <span className={s.fieldsetRequired}>*</span>
            {value.method && (
              <span style={{ marginLeft: 'auto', color: 'var(--color-success)', fontSize: 10 }}>
                ✓ {methodOptions.find((o) => o.id === value.method)?.label}
              </span>
            )}
          </span>
          <div className={s.chipsRow}>
            {methodOptions.map((m) => (
              <Tag
                key={m.id}
                selectable
                selected={value.method === m.id}
                icon={m.icon}
                onToggle={() => set({ method: value.method === m.id ? null : m.id })}
              >
                {m.label}
              </Tag>
            ))}
          </div>
        </div>

        <div className={s.fieldset}>
          <span className={s.fieldsetLabel}>
            Glass <span className={s.fieldsetRequired}>*</span>
            {value.glass && (
              <span style={{ marginLeft: 'auto', color: 'var(--color-success)', fontSize: 10 }}>
                ✓ {glassOptions.find((o) => o.id === value.glass)?.label}
              </span>
            )}
          </span>
          <div className={s.chipsRow}>
            {glassOptions.map((g) => (
              <Tag
                key={g.id}
                selectable
                selected={value.glass === g.id}
                icon={g.icon}
                onToggle={() => set({ glass: value.glass === g.id ? null : g.id })}
              >
                {g.label}
              </Tag>
            ))}
          </div>
        </div>

        <Input
          label="Garnish"
          placeholder="Orange peel, cherry, mint…"
          value={value.garnish}
          onChange={(v) => set({ garnish: v })}
          helperText="Optional but recommended"
        />

        <Input
          label="Steps & notes"
          multiline
          placeholder="Muddle, stir, strain… tell your story."
          value={value.notes}
          onChange={(v) => set({ notes: v })}
          helperText={`${(value.notes || '').length} / 500 characters`}
          error={errors.notes}
        />

        <Input
          label="ABV"
          type="number"
          value={value.abv}
          onChange={(v) => set({ abv: v })}
          suffix="%"
          error={errors.abv}
          helperText="Optional · approximate alcohol by volume"
        />
      </div>

      {/* TOOLBAR */}
      <footer className={s.toolbar}>
        <Button variant="ghost" onClick={onSaveDraft}>
          Save draft
        </Button>
        <Button
          variant="primary"
          disabled={!isValid}
          onClick={() => isValid && onSubmit?.(value)}
          leftIcon={isValid ? '✓' : '🔒'}
        >
          {isValid ? 'Save & Train' : 'Fix errors to save'}
        </Button>
      </footer>
    </div>
  )
}
