import { createReadClient } from '@/lib/supabase-server'

// ── TYPES ────────────────────────────────────────────────────

export interface CocktailIngredient {
  id: string
  name: string
  amount: number
  unit: string
  color: string | null
  sort_order: number
}

export interface Cocktail {
  id: string
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
  prepTime: string
  abv: number
  image: string // emoji used as hero icon on cards
  glass: string
  method: string
  garnish: string
  notes: string | null
  tags: string[]
  categories: string[] // category IDs, e.g. ['classics', 'sours']
  ingredients: CocktailIngredient[]
}

export interface IngredientDef {
  id: string
  name: string
  category: string
  color: string | null
  unit: string
}

// ── INTERNAL ─────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(raw: any): Cocktail {
  return {
    id: raw.id,
    name: raw.name,
    difficulty: raw.difficulty,
    prepTime: raw.prep_time ?? '',
    abv: Number(raw.abv),
    image: raw.image ?? '',
    glass: raw.glass ?? '',
    method: raw.method ?? '',
    garnish: raw.garnish ?? '',
    notes: raw.notes ?? null,
    tags: raw.tags ?? [],
    categories: (raw.cocktail_categories ?? []).map((c: { category_id: string }) => c.category_id),
    ingredients: (raw.cocktail_ingredients ?? [])
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
      .map(
        (ci: {
          amount: number
          sort_order: number
          ingredients: { id: string; name: string; unit: string; color: string | null }
        }) => ({
          id: ci.ingredients.id,
          name: ci.ingredients.name,
          amount: Number(ci.amount),
          unit: ci.ingredients.unit,
          color: ci.ingredients.color ?? null,
          sort_order: ci.sort_order,
        })
      ),
  }
}

const COCKTAIL_SELECT = `
  id, name, difficulty, prep_time, abv, image, glass, method, garnish, notes, tags,
  cocktail_categories(category_id),
  cocktail_ingredients(
    amount, sort_order,
    ingredients(id, name, unit, color)
  )
` as const

// ── QUERIES ──────────────────────────────────────────────────

export async function getCocktails(): Promise<Cocktail[]> {
  const db = createReadClient()
  const { data, error } = await db
    .from('cocktails')
    .select(COCKTAIL_SELECT)
    .eq('is_public', true)
    .order('name')
  if (error) throw new Error(error.message)
  return (data ?? []).map(normalize)
}

export async function getCocktail(id: string): Promise<Cocktail | null> {
  const db = createReadClient()
  const { data, error } = await db.from('cocktails').select(COCKTAIL_SELECT).eq('id', id).single()
  if (error) return null
  return normalize(data)
}

export async function getAllCocktailIds(): Promise<string[]> {
  const db = createReadClient()
  const { data } = await db.from('cocktails').select('id').eq('is_public', true)
  return (data ?? []).map((r) => r.id)
}

export async function getCategories(): Promise<{ id: string; label: string }[]> {
  const db = createReadClient()
  const { data } = await db.from('categories').select('id, label').order('sort_order')
  return data ?? []
}

export async function getAllIngredients(): Promise<IngredientDef[]> {
  const db = createReadClient()
  const { data } = await db
    .from('ingredients')
    .select('id, name, category, color, unit')
    .order('name')
  return data ?? []
}
