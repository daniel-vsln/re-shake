import { notFound } from 'next/navigation'
import { getCocktail, getAllCocktailIds } from '@/lib/cocktails'
import { createServerClient } from '@/lib/supabase-server'
import CocktailDetailClient from './CocktailDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = await getAllCocktailIds()
  return ids.map((id) => ({ id }))
}

export default async function CocktailDetailPage({ params }: Props) {
  const { id } = await params
  const cocktail = await getCocktail(id)
  if (!cocktail) notFound()

  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let initialFavorite = false
  if (user) {
    const { data } = await supabase
      .from('user_favorites')
      .select('cocktail_id')
      .eq('user_id', user.id)
      .eq('cocktail_id', id)
      .maybeSingle()
    initialFavorite = !!data
  }

  return (
    <CocktailDetailClient
      cocktail={cocktail}
      initialFavorite={initialFavorite}
      isLoggedIn={!!user}
    />
  )
}
