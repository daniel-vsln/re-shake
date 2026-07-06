import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/library'

  if (code) {
    const redirectResponse = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              redirectResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log(
      `[callback] exchange | user=${data?.user?.email ?? 'none'} | error=${error?.message ?? 'none'}`
    )
    console.log(
      `[callback] cookies-set=${redirectResponse.cookies
        .getAll()
        .map((c) => c.name)
        .join(',')}`
    )
    if (!error) {
      return redirectResponse
    }
    console.log(`[callback] exchange failed, redirecting to sign-in`)
  }

  console.log(`[callback] no code in request, redirecting to sign-in`)
  return NextResponse.redirect(`${origin}/auth/sign-in?error=auth`)
}
