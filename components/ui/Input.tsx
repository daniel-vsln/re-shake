'use client'

import styles from './Input.module.css'

const s = styles as Record<string, string>

interface InputProps {
  type?: 'text' | 'number' | 'search'
  label?: string
  required?: boolean
  placeholder?: string
  value?: string | number
  onChange?: (v: string) => void
  helperText?: string
  error?: string | null
  success?: boolean
  disabled?: boolean
  multiline?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  suffix?: string
  onClear?: () => void
  name?: string
  id?: string
}

export default function Input({
  type = 'text',
  label,
  required,
  placeholder,
  value,
  onChange,
  helperText,
  error,
  success,
  disabled,
  multiline,
  leadingIcon,
  trailingIcon,
  suffix,
  onClear,
  name,
  id,
}: InputProps) {
  const fieldId = id ?? (name ? `field-${name}` : undefined)
  const defaultLeading = type === 'search' ? '🔍' : leadingIcon

  const controlCls = [
    s.control,
    type === 'search' ? s.search : '',
    multiline ? s.multiline : '',
    error ? s.error : '',
    success && !error ? s.success : '',
    !error && !success && value ? s.filled : '',
    disabled ? s.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={s.field}>
      {(label || error || success) && (
        <div className={s.labelRow}>
          {label && (
            <label htmlFor={fieldId} className={s.label}>
              {label}
              {required && <span className={s.required}> *</span>}
            </label>
          )}
          {error && <span className={`${s.statusInline} ${s.err}`}>✕ {error}</span>}
          {success && !error && <span className={`${s.statusInline} ${s.ok}`}>✓ Looks good</span>}
        </div>
      )}

      <div className={controlCls}>
        {defaultLeading && <span className={s.leadingIcon}>{defaultLeading}</span>}
        {multiline ? (
          <textarea
            id={fieldId}
            name={name}
            className={s.input}
            placeholder={placeholder}
            value={value ?? ''}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
          />
        ) : (
          <input
            id={fieldId}
            name={name}
            type={type}
            className={s.input}
            placeholder={placeholder}
            value={value ?? ''}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
          />
        )}
        {suffix && <span className={s.suffix}>{suffix}</span>}
        {type === 'search' && value && onClear && (
          <span className={s.clear} onClick={onClear} role="button" aria-label="Clear">
            ✕
          </span>
        )}
        {trailingIcon && <span className={s.trailingIcon}>{trailingIcon}</span>}
      </div>

      {helperText && !error && <div className={s.helper}>{helperText}</div>}
    </div>
  )
}

interface UnitInputProps {
  value: number | string
  onChange?: (v: string) => void
  unit: string
  label?: string
  required?: boolean
  success?: boolean | string
  error?: string | null
  placeholder?: string
  step?: number
  min?: number
  max?: number
}

export function UnitInput({
  value,
  onChange,
  unit,
  label,
  required,
  success,
  error,
  placeholder = '0',
  step = 1,
  min,
  max,
}: UnitInputProps) {
  const cls = [s.unitInput, error ? s.error : '', success && !error ? s.success : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={s.field}>
      {(label || error || success) && (
        <div className={s.labelRow}>
          {label && (
            <span className={s.label}>
              {label}
              {required && <span className={s.required}> *</span>}
            </span>
          )}
          {error && <span className={`${s.statusInline} ${s.err}`}>✕ {error}</span>}
          {success && !error && (
            <span className={`${s.statusInline} ${s.ok}`}>
              ✓ {typeof success === 'string' ? success : 'Match'}
            </span>
          )}
        </div>
      )}
      <div className={cls}>
        <input
          type="number"
          className={s.input}
          placeholder={placeholder}
          value={value ?? ''}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <span className={s.unitDivider} />
        <span className={s.unitLabel}>{unit}</span>
      </div>
    </div>
  )
}
