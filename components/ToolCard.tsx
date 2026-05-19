'use client'

import styles from './ToolCard.module.css'

const s = styles as Record<string, string>

interface ToolCardProps {
  id: string
  name: string
  category: string
  description?: string
  imageUrl?: string
  onClick?: (id: string) => void
}

export default function ToolCard({
  id,
  name,
  category,
  description,
  imageUrl,
  onClick,
}: ToolCardProps) {
  const isEmoji =
    !!imageUrl && !imageUrl.includes('/') && !imageUrl.includes('.') && imageUrl.length < 8

  const visualStyle = imageUrl && !isEmoji ? { backgroundImage: `url(${imageUrl})` } : undefined

  return (
    <article
      className={s.root}
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(id)}
    >
      <div className={s.image} style={visualStyle}>
        <span className={s.category}>{category}</span>
        {isEmoji && <span className={s.imageFallback}>{imageUrl}</span>}
        {!imageUrl && <span className={s.imageFallback}>🧰</span>}
      </div>
      <div className={s.body}>
        <h3 className={s.name}>{name}</h3>
        {description && <p className={s.description}>{description}</p>}
      </div>
    </article>
  )
}
