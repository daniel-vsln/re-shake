'use client'

import styles from './Tag.module.css'

interface TagProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  selectable?: boolean
  selected?: boolean
  onToggle?: (next: boolean) => void
  removable?: boolean
  onRemove?: () => void
  addable?: boolean
  onAdd?: () => void
  color?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export default function Tag({
  children,
  size = 'md',
  selectable = false,
  selected = false,
  onToggle,
  removable = false,
  onRemove,
  addable = false,
  onAdd,
  color,
  icon,
  disabled = false,
}: TagProps) {
  const s = styles as Record<string, string>
  const cls = [
    s.root,
    s[size],
    selectable ? s.selectable : '',
    selected ? s.selected : '',
    removable ? s.removable : '',
    addable ? s.add : '',
    disabled ? s.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (disabled) return
    if (selectable) onToggle?.(!selected)
  }

  return (
    <span
      className={cls}
      onClick={handleClick}
      role={selectable ? 'button' : undefined}
      aria-pressed={selectable ? selected : undefined}
    >
      {color && <span className={s.dot} style={{ background: color }} />}
      {icon && <span className={s.icon}>{icon}</span>}
      <span>{children}</span>
      {removable && (
        <span
          className={s.action}
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          role="button"
          aria-label="Remove"
        >
          ✕
        </span>
      )}
      {addable && !removable && (
        <span
          className={s.action}
          onClick={(e) => {
            e.stopPropagation()
            onAdd?.()
          }}
          role="button"
          aria-label="Add"
        >
          ＋
        </span>
      )}
    </span>
  )
}
