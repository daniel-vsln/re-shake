export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(v: string): string {
  if (!v.trim()) return 'Email is required.'
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address.'
  return ''
}

export function validatePassword(v: string): string {
  if (!v) return 'Password is required.'
  if (v.length < 8) return 'Password must be at least 8 characters.'
  return ''
}

export function validateConfirm(password: string, confirm: string): string {
  if (!confirm) return 'Please repeat your password.'
  if (confirm !== password) return 'Passwords do not match.'
  return ''
}
