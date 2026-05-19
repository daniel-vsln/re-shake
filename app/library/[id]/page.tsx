import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCocktail, COCKTAILS } from '@/lib/mock-cocktails'
import CocktailDetailClient from './CocktailDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return COCKTAILS.map((c) => ({ id: c.id }))
}

export default async function CocktailDetailPage({ params }: Props) {
  const { id } = await params
  const cocktail = getCocktail(id)
  if (!cocktail) notFound()

  return <CocktailDetailClient cocktail={cocktail} />
}
