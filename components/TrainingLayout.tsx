'use client'

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
  const progressPct = Math.round(((currentStep + 1) / steps.length) * 100)

  return (
    <div className={s.root}>
      <header className={s.header}>
        <button
          type="button"
          className={s.navBtn}
          aria-label={isFirst ? 'Exit training' : 'Go back'}
          onClick={isFirst ? onClose : onBack}
        >
          {isFirst ? '×' : '←'}
        </button>

        <div className={s.progressBlock}>
          <span className={s.stepLabel}>
            STEP {Math.min(currentStep + 1, steps.length)} OF {steps.length} ·{' '}
            {steps[currentStep]?.toUpperCase() ?? 'DONE'}
            {cocktailName && !blindMode && (
              <span className={s.cocktailInline}> · {cocktailName}</span>
            )}
          </span>
          <ProgressBar variant="continuous" value={progressPct} />
        </div>

        <div className={s.rightSlot}>
          {lives != null && (
            <span className={s.lives}>
              ❤️ <strong>{lives}</strong>
            </span>
          )}
          {timer && <span className={s.timer}>{timer}</span>}
        </div>
      </header>

      <main className={s.content}>{children}</main>

      <footer className={s.footer}>
        <button type="button" className={s.ctaBtn} onClick={onNext} disabled={!canGoNext}>
          {isLast ? '🎯 Submit' : nextLabel}
        </button>
      </footer>
    </div>
  )
}
