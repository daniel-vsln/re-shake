import styles from './StatTile.module.css'

const s = styles as Record<string, string>

interface StatTileProps {
  value: string | number
  label: string
  icon?: React.ReactNode
  color?: string
  sub?: string
  empty?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function StatTile({
  value,
  label,
  icon,
  color,
  sub,
  empty = false,
  size = 'md',
}: StatTileProps) {
  const cls = [s.root, s[size], empty ? s.empty : ''].filter(Boolean).join(' ')

  return (
    <div className={cls}>
      {icon && (
        <span className={s.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span
        className={s.value}
        style={color ? ({ '--valueColor': color } as React.CSSProperties) : undefined}
      >
        {value}
      </span>
      <span className={s.label}>{label}</span>
      {sub && <span className={s.sub}>{sub}</span>}
    </div>
  )
}
