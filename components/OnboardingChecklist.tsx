'use client'

import styles from './OnboardingChecklist.module.css'

const s = styles as Record<string, string>

export interface OnboardingStep {
  id: string
  label: string
  sub?: string
  icon?: string
  color?: string
}

interface OnboardingChecklistProps {
  title?: string
  steps: OnboardingStep[]
  currentStep?: number
  completedSteps?: (string | number)[]
  onStepClick?: (id: string) => void
  showCount?: boolean
}

export default function OnboardingChecklist({
  title = 'Getting started',
  steps,
  currentStep = 0,
  completedSteps,
  onStepClick,
  showCount = true,
}: OnboardingChecklistProps) {
  const isDone = (i: number, id: string) => {
    if (Array.isArray(completedSteps)) {
      return completedSteps.includes(id) || completedSteps.includes(i)
    }
    return i < currentStep
  }

  const doneCount = steps.filter((step, i) => isDone(i, step.id)).length

  return (
    <div className={s.root}>
      <div className={s.header}>
        <span className={s.title}>{title}</span>
        <span className={s.rule} />
        {showCount && (
          <span className={s.count}>
            {doneCount} / {steps.length}
          </span>
        )}
      </div>

      <ol className={s.list}>
        {steps.map((step, i) => {
          const done = isDone(i, step.id)
          const active = !done && i === currentStep
          const locked = !done && !active
          const cls = [
            s.step,
            done ? s.stepDone : '',
            active ? s.stepActive : '',
            locked ? s.stepLocked : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <li
              key={step.id}
              className={cls}
              onClick={() => !locked && onStepClick?.(step.id)}
              role="button"
              tabIndex={locked ? -1 : 0}
              aria-disabled={locked || undefined}
            >
              <span
                className={s.icon}
                style={step.color ? ({ '--iconBg': step.color } as React.CSSProperties) : undefined}
                aria-hidden="true"
              >
                {done ? '✓' : step.icon}
                <span className={s.numberBadge}>{i + 1}</span>
              </span>
              <div className={s.body}>
                <div className={s.label}>{step.label}</div>
                {step.sub && <div className={s.sub}>{step.sub}</div>}
              </div>
              <span className={s.chevron}>{done ? '✓' : active ? '›' : '·'}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
