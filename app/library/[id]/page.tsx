import { notFound } from 'next/navigation'
import { getCocktail, getAllCocktailIds } from '@/lib/cocktails'
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
  return <CocktailDetailClient cocktail={cocktail} />
}
