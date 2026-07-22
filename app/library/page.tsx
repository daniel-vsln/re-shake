import { getCocktails, getCategories } from '@/lib/cocktails'
import { createServerClient } from '@/lib/supabase-server'
import LibraryClient from './LibraryClient'

export default async function LibraryPage() {
  const [cocktails, categories] = await Promise.all([getCocktails(), getCategories()])

  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let progress: Record<string, number> = {}
  let initialFavorites: string[] = []

  if (user) {
    const [{ data: progressData }, { data: favData }] = await Promise.all([
      supabase
        .from('user_cocktail_progress')
        .select('cocktail_id, best_score')
        .eq('user_id', user.id),
      supabase.from('user_favorites').select('cocktail_id').eq('user_id', user.id),
    ])
    if (progressData) {
      progress = Object.fromEntries(progressData.map((r) => [r.cocktail_id, r.best_score ?? 0]))
    }
    if (favData) {
      initialFavorites = favData.map((r) => r.cocktail_id)
    }
  }

  return (
    <LibraryClient
      cocktails={cocktails}
      categories={categories}
      progress={progress}
      initialFavorites={initialFavorites}
      isLoggedIn={!!user}
    />
  )
}
