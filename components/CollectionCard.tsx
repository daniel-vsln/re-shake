'use client'

import styles from './CollectionCard.module.css'

const s = styles as Record<string, string>

interface CollectionCardProps {
  id: string
  name: string
  type: 'official' | 'user'
  cocktailCount: number
  coverImages?: string[]
  onPlay?: (id: string) => void
  onClick?: (id: string) => void
}

function bgFor(src: string): React.CSSProperties {
  if (src.includes('gradient(')) return { background: src }
  return { backgroundImage: `url(${src})` }
}

export default function CollectionCard({
  id,
  name,
  type,
  cocktailCount,
  coverImages = [],
  onPlay,
  onClick,
}: CollectionCardProps) {
  const visible = coverImages.slice(0, 4)
  const overflow = Math.max(0, cocktailCount - visible.length)

  const layoutClass = visible.length === 1 ? s.cell1of1 : visible.length === 2 ? s.cell1of2 : ''

  return (
    <article
      className={s.root}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(id)}
    >
      <div className={s.collage}>
        <span className={`${s.typePill} ${type === 'official' ? s.typePillOfficial : ''}`}>
          {type === 'official' ? '👑 Official' : '📁 My set'}
        </span>

        {visible.length === 0 && <div className={`${s.cell} ${s.cell1of1}`} />}

        {visible.map((src, i) => (
          <div
            key={i}
            className={`${s.cell} ${visible.length <= 2 ? layoutClass : ''}`}
            style={bgFor(src)}
          >
            {i === visible.length - 1 && overflow > 0 && (
              <div className={s.moreOverlay}>+{overflow}</div>
            )}
          </div>
        ))}

        <button
          type="button"
          className={s.playBtn}
          aria-label={`Train ${name}`}
          onClick={(e) => {
            e.stopPropagation()
            onPlay?.(id)
          }}
        >
          ▶
        </button>
      </div>

      <div className={s.body}>
        <h3 className={s.name}>{name}</h3>
        <div className={s.count}>
          <span>{cocktailCount} cocktails</span>
          <span className={s.countDot} />
          <span>{type === 'official' ? 'Curated' : 'Custom'}</span>
        </div>
      </div>
    </article>
  )
}
