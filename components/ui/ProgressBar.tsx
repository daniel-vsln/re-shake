import styles from './ProgressBar.module.css'

const s = styles as Record<string, string>

interface ProgressBarProps {
  variant?: 'continuous' | 'segmented' | 'stepped'
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'accent'
  label?: string
  showValue?: boolean
  valueLabel?: string
  segments?: number
  active?: number
  steps?: string[]
  currentStep?: number
}

export default function ProgressBar({
  variant = 'continuous',
  value = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  label,
  showValue = false,
  valueLabel,
  segments,
  active = 0,
  steps,
  currentStep = 0,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  const fillCls = [
    s.fill,
    color === 'success' ? s.fillSuccess : '',
    color === 'warning' ? s.fillWarning : '',
    color === 'accent' ? s.fillAccent : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`${s.root} ${s[size] ?? ''}`}>
      {(label || showValue || valueLabel) && (
        <div className={s.header}>
          {label && <span className={s.label}>{label}</span>}
          {(showValue || valueLabel) && (
            <span className={s.value}>{valueLabel ?? `${Math.round(value)} / ${max}`}</span>
          )}
        </div>
      )}

      {variant === 'continuous' && (
        <div
          className={s.track}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={fillCls} style={{ width: `${pct}%` }} />
        </div>
      )}

      {variant === 'segmented' && (
        <div className={s.segmented}>
          {Array.from({ length: segments ?? max }, (_, i) => (
            <span key={i} className={`${s.segment} ${i < active ? s.segmentOn : ''}`} />
          ))}
        </div>
      )}

      {variant === 'stepped' && steps && (
        <div className={s.stepper}>
          {steps.map((step, i) => {
            const done = i < currentStep
            const isActive = i === currentStep
            const stepCls = [s.step, done ? s.stepDone : '', isActive ? s.stepActive : '']
              .filter(Boolean)
              .join(' ')
            return (
              <>
                <div key={step} className={stepCls}>
                  <span className={s.bullet}>{done ? '✓' : i + 1}</span>
                  <span className={s.stepName}>{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className={`${s.connector} ${done ? s.connectorDone : ''}`} />
                )}
              </>
            )
          })}
        </div>
      )}
    </div>
  )
}
