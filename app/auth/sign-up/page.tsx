'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import styles from '../auth.module.css'

const s = styles as Record<string, string>

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/auth/verify')
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h1 className={s.heading}>Create account</h1>
      <p className={s.sub}>Start training your cocktail craft</p>

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
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="confirm">
          Confirm password
        </label>
        <input
          id="confirm"
          type="password"
          className={`${s.input} ${confirm && confirm !== password ? s.inputError : ''}`}
          placeholder="Repeat password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <button type="submit" className={s.submitBtn} disabled={loading}>
        {loading ? 'Creating account…' : 'Create account'}
      </button>

      <p className={s.footer}>
        Already have an account?{' '}
        <Link href="/auth/sign-in" className={s.link}>
          Sign in
        </Link>
      </p>
    </form>
  )
}
