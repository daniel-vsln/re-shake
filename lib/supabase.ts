import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

type SupabaseClient = ReturnType<typeof createBrowserClient<Database>>

// Lazy singleton — only created on first access in the browser.
// Module-level initialization would throw during SSG prerendering
// when env vars aren't available yet.
let _client: SupabaseClient | undefined

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anon)
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    _client = createBrowserClient<Database>(url, anon)
  }
  return _client
}

// Proxy so all existing `supabase.auth.*` / `supabase.from()` call sites
// keep working without any changes.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop: string | symbol) {
    return getSupabase()[prop as keyof SupabaseClient]
  },
})

// ── Convenience types ──────────────────────────────────────
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
