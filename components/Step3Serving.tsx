'use client'

import Tag from '@/components/ui/Tag'
import styles from './Step3Serving.module.css'

const s = styles as Record<string, string>

export interface OptionDef {
  id: string
  label: string
  icon?: string
  sub?: string
  disabled?: boolean
}

export interface ServingSelections {
  glass?: string | null
  method?: string | null
  garnishes?: string[]
}

interface Step3ServingProps {
  glassOptions: OptionDef[]
  methodOptions: OptionDef[]
  garnishOptions: OptionDef[]
  selections: ServingSelections
  onChange: (next: ServingSelections) => void
}

interface TileProps {
  opt: OptionDef
  selected: boolean
  onClick: () => void
}

function Tile({ opt, selected, onClick }: TileProps) {
  const cls = [s.option, selected ? s.optionSelected : '', opt.disabled ? s.optionDisabled : '']
    .filter(Boolean)
    .join(' ')
  return (
    <button
      type="button"
      className={cls}
      disabled={opt.disabled}
      aria-pressed={selected}
      onClick={onClick}
    >
      {opt.icon && <span className={s.optionIcon}>{opt.icon}</span>}
      <span className={s.optionLabel}>{opt.label}</span>
      {opt.sub && <span className={s.optionSub}>{opt.sub}</span>}
    </button>
  )
}

export default function Step3Serving({
  glassOptions,
  methodOptions,
  garnishOptions,
  selections,
  onChange,
}: Step3ServingProps) {
  const { glass = null, method = null, garnishes = [] } = selections

  const setGlass = (id: string) => onChange({ ...selections, glass: id })
  const setMethod = (id: string) => onChange({ ...selections, method: id })
  const toggleGarnish = (id: string) => {
    const next = garnishes.includes(id) ? garnishes.filter((g) => g !== id) : [...garnishes, id]
    onChange({ ...selections, garnishes: next })
  }

  return (
    <div className={s.root}>
      <section className={s.section} aria-label="Glass type">
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>Glass</span>
          <span className={s.sectionRule} />
          <span className={s.sectionCount}>{glass ? '✓' : 'pick 1'}</span>
        </div>
        <div className={s.grid}>
          {glassOptions.map((o) => (
            <Tile key={o.id} opt={o} selected={glass === o.id} onClick={() => setGlass(o.id)} />
          ))}
        </div>
      </section>

      <section className={s.section} aria-label="Preparation method">
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>Method</span>
          <span className={s.sectionRule} />
          <span className={s.sectionCount}>{method ? '✓' : 'pick 1'}</span>
        </div>
        <div className={s.grid}>
          {methodOptions.map((o) => (
            <Tile key={o.id} opt={o} selected={method === o.id} onClick={() => setMethod(o.id)} />
          ))}
        </div>
      </section>

      <section className={s.section} aria-label="Garnish">
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>Garnish</span>
          <span className={s.sectionRule} />
          <span className={s.sectionCount}>{garnishes.length} picked</span>
        </div>
        <div className={s.chipRow}>
          {garnishOptions.map((g) => (
            <Tag
              key={g.id}
              selectable
              selected={garnishes.includes(g.id)}
              onToggle={() => toggleGarnish(g.id)}
              icon={g.icon}
            >
              {g.label}
            </Tag>
          ))}
        </div>
      </section>
    </div>
  )
}
