import type { ReactNode } from 'react'
import styles from './auth.module.css'

const s = styles as Record<string, string>

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.shell}>
      <div className={s.card}>
        <div className={s.logo}>🍸</div>
        <p className={s.brand}>re:shake</p>
        {children}
      </div>
    </div>
  )
}
