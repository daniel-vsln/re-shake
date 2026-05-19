'use client'

import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  children,
}: ButtonProps) {
  const s = styles as Record<string, string>
  const cls = [
    s.root,
    s[size],
    s[variant],
    fullWidth ? s.fullWidth : '',
    loading ? s.loading : '',
    disabled ? s.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading ? (
        <span className={s.spinner} aria-hidden="true" />
      ) : (
        leftIcon && <span className={s.icon}>{leftIcon}</span>
      )}
      <span className={s.label}>{children}</span>
      {rightIcon && !loading && <span className={s.icon}>{rightIcon}</span>}
    </button>
  )
}
