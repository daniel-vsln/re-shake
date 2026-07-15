'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import styles from './profile.module.css'

const s = styles as Record<string, string>

interface ProgressRow {
  cocktail_id: string
  best_score: number
  stars: number
  attempts_count: number
  last_trained_at: string
  cocktails: { name: string; image: string } | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [progress, setProgress] = useState<ProgressRow[]>([])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace('/auth/sign-in')
        return
      }
      setUser(data.user)

      const [{ count }, { data: rows }] = await Promise.all([
        supabase
          .from('training_sessions')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', data.user.id),
        supabase
          .from('user_cocktail_progress')
          .select(
            'cocktail_id, best_score, stars, attempts_count, last_trained_at, cocktails(name, image)'
          )
          .eq('user_id', data.user.id)
          .order('last_trained_at', { ascending: false }),
      ])

      setSessions(count ?? 0)
      setProgress((rows as ProgressRow[]) ?? [])
      setLoading(false)
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

  const learned = progress.filter((r) => r.stars >= 1).length
  const mastered = progress.filter((r) => r.stars === 3).length

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
          <span className={s.statValue}>{sessions}</span>
          <span className={s.statLabel}>Sessions</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statValue}>{learned}</span>
          <span className={s.statLabel}>Learned</span>
        </div>
        <div className={s.statCard}>
          <span className={s.statValue}>{mastered}</span>
          <span className={s.statLabel}>Mastered</span>
        </div>
      </div>

      {/* ── HISTORY ── */}
      {progress.length > 0 && (
        <section className={s.history}>
          <h2 className={s.historyTitle}>Trained cocktails</h2>
          <div className={s.historyList}>
            {progress.map((row) => (
              <button
                key={row.cocktail_id}
                type="button"
                className={s.historyRow}
                onClick={() => router.push(`/library/${row.cocktail_id}`)}
              >
                <span className={s.historyEmoji}>{row.cocktails?.image ?? '🍹'}</span>
                <div className={s.historyInfo}>
                  <span className={s.historyName}>{row.cocktails?.name ?? row.cocktail_id}</span>
                  <span className={s.historyMeta}>
                    {formatDate(row.last_trained_at)} · {row.attempts_count} attempt
                    {row.attempts_count !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className={s.historyRight}>
                  <span className={s.historyScore}>{row.best_score}%</span>
                  <span className={s.historyStars}>
                    {[1, 2, 3].map((i) => (
                      <span key={i} className={i <= row.stars ? s.starOn : s.starOff}>
                        ★
                      </span>
                    ))}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

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
