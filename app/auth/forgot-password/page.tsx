'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { validateEmail } from '@/lib/auth-validate'
import styles from '../auth.module.css'

const s = styles as Record<string, string>

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [apiError, setApiError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const eErr = validateEmail(email)
    setEmailErr(eErr)
    if (eErr) return

    setApiError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/auth/reset-password`,
    })
    if (error) {
      setApiError(error.message)
      setLoading(false)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className={s.form}>
        <h1 className={s.heading}>Check your email</h1>
        <p className={s.sub}>
          We sent a password reset link to <strong>{email}</strong>. It expires in 1&nbsp;hour.
        </p>
        <p className={s.footer}>
          <Link href="/auth/sign-in" className={s.link}>
            Back to sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <h1 className={s.heading}>Reset password</h1>
      <p className={s.sub}>Enter your email and we&apos;ll send a reset link.</p>

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

      <button type="submit" className={s.submitBtn} disabled={loading}>
        {loading ? 'Sending…' : 'Send reset link'}
      </button>

      <p className={s.footer}>
        <Link href="/auth/sign-in" className={s.link}>
          Back to sign in
        </Link>
      </p>
    </form>
  )
}
