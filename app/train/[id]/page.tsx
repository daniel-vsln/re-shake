import { notFound } from 'next/navigation'
import { getCocktail, getAllCocktailIds, getAllIngredients } from '@/lib/cocktails'
import TrainingFlowClient from './TrainingFlowClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = await getAllCocktailIds()
  return ids.map((id) => ({ id }))
}

export default async function TrainPage({ params }: Props) {
  const { id } = await params
  const [cocktail, allIngredients] = await Promise.all([getCocktail(id), getAllIngredients()])
  if (!cocktail) notFound()
  return <TrainingFlowClient cocktail={cocktail} allIngredients={allIngredients} />
}
