'use client'

import Button from '@/components/ui/Button'
import styles from './EmptyState.module.css'

const s = styles as Record<string, string>

interface EmptyStateAction {
  label: string
  onClick?: () => void
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
}

interface EmptyStateProps {
  title: string
  body?: string
  illustration?: React.ReactNode
  icon?: React.ReactNode
  illustrationBg?: string
  primaryAction?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  align?: 'center' | 'start'
  children?: React.ReactNode
}

export default function EmptyState({
  title,
  body,
  illustration,
  icon = '🍸',
  illustrationBg,
  primaryAction,
  secondaryAction,
  align = 'center',
  children,
}: EmptyStateProps) {
  const rootCls = [s.root, align === 'start' ? s.alignStart : ''].filter(Boolean).join(' ')

  return (
    <div className={rootCls}>
      <div className={s.illustration}>
        {illustration ?? (
          <>
            <div
              className={s.illustrationTile}
              style={
                illustrationBg ? ({ '--illBg': illustrationBg } as React.CSSProperties) : undefined
              }
            >
              {icon}
            </div>
            <span className={`${s.sparkle} ${s.sparkleTR}`}>✨</span>
            <span className={`${s.sparkle} ${s.sparkleBL}`}>💫</span>
          </>
        )}
      </div>

      <h2 className={s.title}>{title}</h2>
      {body && <p className={s.body}>{body}</p>}

      {(primaryAction || secondaryAction) && (
        <div className={s.actions}>
          {primaryAction && (
            <Button
              variant={primaryAction.variant ?? 'primary'}
              leftIcon={primaryAction.icon}
              onClick={primaryAction.onClick}
              fullWidth
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant={secondaryAction.variant ?? 'ghost'}
              leftIcon={secondaryAction.icon}
              onClick={secondaryAction.onClick}
              fullWidth
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}

      {children && <div className={s.extras}>{children}</div>}
    </div>
  )
}
