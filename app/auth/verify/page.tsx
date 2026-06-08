import Link from 'next/link'
import styles from '../auth.module.css'

const s = styles as Record<string, string>

export default function VerifyPage() {
  return (
    <div className={s.form}>
      <h1 className={s.heading}>Check your email</h1>
      <p className={s.sub}>
        We sent a confirmation link to your email address. Click it to activate your account — it
        expires in 24 hours.
      </p>
      <p className={s.success}>Almost there! Open your inbox to continue.</p>
      <p className={s.footer}>
        Wrong email?{' '}
        <Link href="/auth/sign-up" className={s.link}>
          Start over
        </Link>
        {' · '}
        <Link href="/auth/sign-in" className={s.link}>
          Sign in
        </Link>
      </p>
    </div>
  )
}
