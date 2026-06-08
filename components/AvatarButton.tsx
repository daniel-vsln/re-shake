'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import styles from './AvatarButton.module.css'

const s = styles as Record<string, string>

// Routes where the floating (absolute) instance is hidden.
// Pages with their own header embed <AvatarButton inline /> instead.
const HIDDEN_ROUTES = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify',
  '/profile',
]

interface Props {
  /** Render as an inline flow element inside an existing nav row. */
  inline?: boolean
}

export default function AvatarButton({ inline = false }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setReady(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Floating instance: hide on auth pages and pages that embed inline
  if (!inline) {
    const isHidden =
      HIDDEN_ROUTES.includes(pathname) ||
      pathname === '/library' ||
      pathname.startsWith('/library/') ||
      pathname.startsWith('/train/')
    if (isHidden) return null
    if (!ready) return <div className={s.placeholder} />
  }

  const handleClick = () => {
    router.push(user ? '/profile' : '/auth/sign-in')
  }

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined
  const name = (user?.user_metadata?.full_name ?? user?.email ?? '') as string
  const initials = name
    ? name
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <button
      type="button"
      className={inline ? s.btnInline : s.btn}
      onClick={handleClick}
      aria-label={user ? 'Go to profile' : 'Sign in'}
    >
      {user ? (
        avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className={s.avatar} referrerPolicy="no-referrer" />
        ) : (
          <span className={s.initials}>{initials}</span>
        )
      ) : (
        <PersonIcon />
      )}
    </button>
  )
}

function PersonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}
