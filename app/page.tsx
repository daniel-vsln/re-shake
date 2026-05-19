import Link from 'next/link'
import styles from './page.module.css'

const s = styles as Record<string, string>

export default function Home() {
  return (
    <main className={s.root}>
      <div className={s.hero}>
        <div className={s.logoWrap}>
          <span className={s.logoEmoji} aria-hidden="true">
            🍸
          </span>
        </div>
        <h1 className={s.title}>re:shake</h1>
        <p className={s.subtitle}>Train your cocktail craft — one pour at a time</p>

        <div className={s.actions}>
          <Link href="/library" className={s.primaryBtn}>
            Browse Library →
          </Link>
          <Link href="/library" className={s.ghostBtn}>
            Quick train
          </Link>
        </div>
      </div>

      <div className={s.stats}>
        <div className={s.statItem}>
          <span className={s.statValue}>5</span>
          <span className={s.statLabel}>Recipes</span>
        </div>
        <div className={s.statItem}>
          <span className={s.statValue}>3</span>
          <span className={s.statLabel}>Categories</span>
        </div>
        <div className={s.statItem}>
          <span className={s.statValue}>0</span>
          <span className={s.statLabel}>Trained</span>
        </div>
      </div>
    </main>
  )
}
