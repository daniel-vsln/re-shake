'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { validatePassword, validateConfirm } from '@/lib/auth-validate'
import styles from '../auth.module.css'

const s = styles as Record<string, string>

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [confirmErr, setConfirmErr] = useState('')
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const pErr = validatePassword(password)
    const cErr = validateConfirm(password, confirm)
    setPasswordErr(pErr)
    setConfirmErr(cErr)
    if (pErr || cErr) return

    setApiError('')
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setApiError(error.message)
      setLoading(false)
    } else {
      router.push('/library')
      router.refresh()
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <h1 className={s.heading}>New password</h1>
      <p className={s.sub}>Choose a strong password for your account.</p>

      {apiError && <p className={s.error}>{apiError}</p>}

      <div className={s.field}>
        <label className={s.label} htmlFor="password">
          New password
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
        {loading ? 'Saving…' : 'Set new password'}
      </button>
    </form>
  )
}
