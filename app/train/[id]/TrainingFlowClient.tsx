'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import TrainingLayout from '@/components/TrainingLayout'
import Step1Ingredients from '@/components/Step1Ingredients'
import Step2Measurements from '@/components/Step2Measurements'
import Step3Serving from '@/components/Step3Serving'
import TrainingResult from '@/components/TrainingResult'
import type { Cocktail, IngredientDef } from '@/lib/cocktails'
import type { ServingSelections } from '@/components/Step3Serving'

interface Props {
  cocktail: Cocktail
  allIngredients: IngredientDef[]
}

const STEPS = ['Ingredients', 'Measurements', 'Serving']

const GLASS_OPTIONS = [
  { id: 'rocks', label: 'Rocks', icon: '🪨' },
  { id: 'martini', label: 'Martini', icon: '🍸' },
  { id: 'highball', label: 'Highball', icon: '🥤' },
  { id: 'coupe', label: 'Coupe', icon: '🥂' },
  { id: 'margarita', label: 'Margarita', icon: '🍹' },
  { id: 'pint', label: 'Pint', icon: '🍺' },
]

const METHOD_OPTIONS = [
  { id: 'shake', label: 'Shake', icon: '🤝' },
  { id: 'stir', label: 'Stir', icon: '🥄' },
  { id: 'build', label: 'Build', icon: '🏗️' },
  { id: 'blend', label: 'Blend', icon: '🌀' },
]

function computeScore(
  selected: string[],
  cocktail: Cocktail,
  measurements: Record<string, number | string>
): { score: number; ingredientScore: number; measurementScore: number } {
  const correctIds = cocktail.ingredients.map((i) => i.id)
  const correctSet = new Set(correctIds)
  const selectedSet = new Set(selected)

  const rawIngredient =
    correctIds.reduce((acc, id) => acc + (selectedSet.has(id) ? 1 : 0), 0) / correctIds.length
  const falsePositives = selected.filter((id) => !correctSet.has(id)).length
  const ingredientScore = rawIngredient * Math.max(0, 1 - falsePositives * 0.15)

  const measurementScore =
    cocktail.ingredients.reduce((acc, ing) => {
      const diff = Math.abs(Number(measurements[ing.id] ?? 0) - ing.amount)
      if (diff === 0) return acc + 1
      if (diff <= 5) return acc + 0.5
      return acc
    }, 0) / cocktail.ingredients.length

  return {
    score: Math.round((ingredientScore * 0.4 + measurementScore * 0.6) * 100),
    ingredientScore,
    measurementScore,
  }
}

export default function TrainingFlowClient({ cocktail, allIngredients }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<ReturnType<typeof computeScore> | null>(null)

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [measurements, setMeasurements] = useState<Record<string, number | string>>({})
  const [serving, setServing] = useState<ServingSelections>({})

  const canGoNext =
    step === 0
      ? selectedIngredients.length > 0
      : step === 1
        ? selectedIngredients.every(
            (id) => measurements[id] !== undefined && measurements[id] !== ''
          )
        : serving.glass != null && serving.method != null

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }

    const computed = computeScore(selectedIngredients, cocktail, measurements)
    const servingCorrect = serving.glass === cocktail.glass && serving.method === cocktail.method

    setResult(computed)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await supabase.rpc('record_training_result', {
        p_cocktail_id: cocktail.id,
        p_score: computed.score,
        p_ingredient_score: computed.ingredientScore,
        p_measurement_score: computed.measurementScore,
        p_serving_correct: servingCorrect,
        p_selected_ingredients: selectedIngredients,
        p_measurements: measurements,
        p_serving_glass: serving.glass ?? '',
        p_serving_method: serving.method ?? '',
      })
    }
  }

  const handleBack = () => setStep((s) => s - 1)

  if (result) {
    const { score } = result

    const ingredientResults = cocktail.ingredients.map((ing) => ({
      id: ing.id,
      name: ing.name,
      unit: ing.unit,
      userValue: measurements[ing.id] ?? 0,
      correctValue: ing.amount,
      color: ing.color ?? undefined,
    }))

    const servingResults = [
      { label: 'Glass', value: serving.glass ?? '', correct: cocktail.glass },
      { label: 'Method', value: serving.method ?? '', correct: cocktail.method },
    ]

    return (
      <TrainingResult
        cocktailName={cocktail.name}
        score={score}
        tolerance={5}
        ingredients={ingredientResults}
        serving={servingResults}
        onTryAgain={() => {
          setStep(0)
          setResult(null)
          setSelectedIngredients([])
          setMeasurements({})
          setServing({})
        }}
        onNext={() => router.push('/library')}
        onBackToLibrary={() => router.push('/library')}
      />
    )
  }

  const selectedSpecs = selectedIngredients.map((id) => {
    const found = cocktail.ingredients.find((i) => i.id === id)
    const def = allIngredients.find((i) => i.id === id)
    return {
      id,
      name: def?.name ?? id,
      unit: found?.unit ?? def?.unit ?? 'ml',
      color: def?.color ?? undefined,
      step: 5,
      min: 0,
      max: 200,
    }
  })

  const NEXT_LABELS = ['Lock in & continue →', 'Pour it & continue →', '🎯 Submit']

  return (
    <TrainingLayout
      currentStep={step}
      steps={STEPS}
      cocktailName={cocktail.name}
      canGoNext={canGoNext}
      nextLabel={NEXT_LABELS[step]}
      onClose={() => router.push(`/library/${cocktail.id}`)}
      onBack={handleBack}
      onNext={handleNext}
    >
      {step === 0 && (
        <Step1Ingredients
          availableIngredients={allIngredients}
          selectedIngredients={selectedIngredients}
          onToggle={(id) =>
            setSelectedIngredients((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            )
          }
          expectedCount={cocktail.ingredients.length}
          cocktailName={cocktail.name}
        />
      )}

      {step === 1 && (
        <Step2Measurements
          selectedIngredients={selectedSpecs}
          measurements={measurements}
          onMeasurementChange={(id, val) => setMeasurements((prev) => ({ ...prev, [id]: val }))}
          tolerance={5}
          cocktailName={cocktail.name}
          cocktailEmoji={cocktail.image}
        />
      )}

      {step === 2 && (
        <Step3Serving
          glassOptions={GLASS_OPTIONS}
          methodOptions={METHOD_OPTIONS}
          garnishOptions={[]}
          selections={serving}
          onChange={setServing}
        />
      )}
    </TrainingLayout>
  )
}
