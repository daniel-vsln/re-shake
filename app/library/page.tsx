import { getCocktails, getCategories } from '@/lib/cocktails'
import LibraryClient from './LibraryClient'

export default async function LibraryPage() {
  const [cocktails, categories] = await Promise.all([getCocktails(), getCategories()])
  return <LibraryClient cocktails={cocktails} categories={categories} />
}
