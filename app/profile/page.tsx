'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import styles from './profile.module.css'

const s = styles as Record<string, string>

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/auth/sign-in')
      } else {
        setUser(data.user)
        setLoading(false)
      }
    })
  }, [router])

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <div className={s.loading}>…</div>
  if (!user) return null

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const name = (user.user_metadata?.full_name ?? '') as string
  const initials = name
    ? name
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : (user.email?.[0] ?? '?').toUpperCase()

  return (
    <div className={s.root}>
      {/* ── HEADER ── */}
      <div className={s.header}>
        <button type="button" className={s.backBtn} onClick={() => router.back()}>
          ←
        </button>
      </div>

      {/* ── IDENTITY ── */}
      <div className={s.identity}>
        <div className={s.avatarWrap}>
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={name} className={s.avatarImg} referrerPolicy="no-referrer" />
          ) : (
            <span className={s.avatarInitials}>{initials}</span>
          )}
        </div>
        <h1 className={s.name}>{name || 'Bartender'}</h1>
        <p className={s.email}>{user.email}</p>
      </div>

      {/* ── STATS ── */}
      <div className={s.stats}>
        <div className={s.statCard}>
          <span className={s.statValue}>—</span>
          <span className={s.statLabel}>Sessions</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statValue}>—</span>
          <span className={s.statLabel}>Best score</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statValue}>—</span>
          <span className={s.statLabel}>Mastered</span>
        </div>
      </div>

      {/* ── ACTIONS ── */}
      <div className={s.actions}>
        <button type="button" className={s.libraryBtn} onClick={() => router.push('/library')}>
          Browse library
        </button>
        <button
          type="button"
          className={s.signOutBtn}
          onClick={handleSignOut}
          disabled={signingOut}
        >
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </div>
  )
}
