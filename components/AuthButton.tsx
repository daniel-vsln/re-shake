'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {
  className?: string
}

export default function AuthButton({ className }: Props) {
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
    // page will redirect — no need to setLoading(false)
  }

  return (
    <button type="button" className={className} onClick={signIn} disabled={loading}>
      {loading ? '…' : 'Sign in with Google'}
    </button>
  )
}
