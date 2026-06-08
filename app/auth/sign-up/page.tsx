'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { validateEmail, validatePassword, validateConfirm } from '@/lib/auth-validate'
import styles from '../auth.module.css'

const s = styles as Record<string, string>

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [confirmErr, setConfirmErr] = useState('')
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const eErr = validateEmail(email)
    const pErr = validatePassword(password)
    const cErr = validateConfirm(password, confirm)
    setEmailErr(eErr)
    setPasswordErr(pErr)
    setConfirmErr(cErr)
    if (eErr || pErr || cErr) return

    setApiError('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    if (error) {
      setApiError(error.message)
      setLoading(false)
    } else {
      router.push('/auth/verify')
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <h1 className={s.heading}>Create account</h1>
      <p className={s.sub}>Start training your cocktail craft</p>

      {apiError && <p className={s.error}>{apiError}</p>}

      <div className={s.field}>
        <label className={s.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`${s.input} ${emailErr ? s.inputError : ''}`}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (emailErr) setEmailErr('')
          }}
          onBlur={() => setEmailErr(validateEmail(email))}
          autoComplete="email"
        />
        {emailErr && <span className={s.fieldError}>{emailErr}</span>}
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`${s.input} ${passwordErr ? s.inputError : ''}`}
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (passwordErr) setPasswordErr('')
          }}
          onBlur={() => setPasswordErr(validatePassword(password))}
          autoComplete="new-password"
        />
        {passwordErr && <span className={s.fieldError}>{passwordErr}</span>}
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="confirm">
          Confirm password
        </label>
        <input
          id="confirm"
          type="password"
          className={`${s.input} ${confirmErr ? s.inputError : ''}`}
          placeholder="Repeat password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value)
            if (confirmErr) setConfirmErr('')
          }}
          onBlur={() => setConfirmErr(validateConfirm(password, confirm))}
          autoComplete="new-password"
        />
        {confirmErr && <span className={s.fieldError}>{confirmErr}</span>}
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
