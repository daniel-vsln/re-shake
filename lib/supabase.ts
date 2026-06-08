// ── Browser client (Client Components) ────────────────────
// Singleton — import `supabase` directly in 'use client' files.

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient<Database>(url, anon)

// ── Convenience types ──────────────────────────────────────
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
