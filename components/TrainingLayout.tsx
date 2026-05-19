'use client'

import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import styles from './TrainingLayout.module.css'

const s = styles as Record<string, string>

interface TrainingLayoutProps {
  currentStep: number
  steps?: string[]
  cocktailName?: string
  blindMode?: boolean
  lives?: number
  timer?: string
  onClose?: () => void
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  canGoNext?: boolean
  children: React.ReactNode
}

export default function TrainingLayout({
  currentStep,
  steps = ['Ingredients', 'Measurements', 'Serving'],
  cocktailName,
  blindMode = false,
  lives,
  timer,
  onClose,
  onBack,
  onNext,
  nextLabel = 'Continue →',
  canGoNext = true,
  children,
}: TrainingLayoutProps) {
  const isLast = currentStep >= steps.length - 1
  const isFirst = currentStep <= 0

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div className={s.headerTop}>
          <button type="button" className={s.closeBtn} aria-label="Exit training" onClick={onClose}>
            ×
          </button>

          <div className={s.progressBlock}>
            <div className={s.progressTopRow}>
              <span className={s.stepLabel}>
                Step {Math.min(currentStep + 1, steps.length)} of {steps.length} ·{' '}
                {steps[currentStep] ?? 'Done'}
              </span>
              {lives != null && (
                <span className={s.lives}>
                  {Array.from({ length: lives }).map((_, i) => (
                    <span key={i} className={s.lifeIcon}>
                      ❤️
                    </span>
                  ))}
                </span>
              )}
              {timer && <span className={s.timer}>{timer}</span>}
            </div>
            <ProgressBar variant="stepped" steps={steps} currentStep={currentStep} />
          </div>
        </div>

        <div className={s.title}>
          {!blindMode && cocktailName && <h2 className={s.cocktailName}>{cocktailName}</h2>}
          {blindMode && <span className={s.blindBadge}>👁 Blind mode · ?</span>}
        </div>
      </header>

      <main className={s.content}>{children}</main>

      <footer className={s.footer}>
        <Button variant="ghost" onClick={onBack} disabled={isFirst} leftIcon="←">
          Back
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!canGoNext}>
          {isLast ? '🎯 Submit' : nextLabel}
        </Button>
      </footer>
    </div>
  )
}
