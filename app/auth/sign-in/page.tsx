'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import styles from '../auth.module.css'

const s = styles as Record<string, string>

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/library')
      router.refresh()
    }
  }

  const handleGoogle = async () => {
    setOauthLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h1 className={s.heading}>Welcome back</h1>

      {error && <p className={s.error}>{error}</p>}

      <div className={s.field}>
        <label className={s.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={s.input}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={s.input}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Link href="/auth/forgot-password" className={s.forgotLink}>
          Forgot password?
        </Link>
      </div>

      <button type="submit" className={s.submitBtn} disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <div className={s.divider}>or</div>

      <button type="button" className={s.oauthBtn} onClick={handleGoogle} disabled={oauthLoading}>
        <GoogleIcon />
        {oauthLoading ? 'Redirecting…' : 'Continue with Google'}
      </button>

      <p className={s.footer}>
        No account?{' '}
        <Link href="/auth/sign-up" className={s.link}>
          Sign up
        </Link>
      </p>
    </form>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  )
}
