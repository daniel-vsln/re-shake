import { notFound } from 'next/navigation'
import { getCocktail, COCKTAILS } from '@/lib/mock-cocktails'
import TrainingFlowClient from './TrainingFlowClient'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return COCKTAILS.map((c) => ({ id: c.id }))
}

export default async function TrainPage({ params }: Props) {
  const { id } = await params
  const cocktail = getCocktail(id)
  if (!cocktail) notFound()

  return <TrainingFlowClient cocktail={cocktail} />
}
