'use client'

import styles from './ImagePicker.module.css'

const s = styles as Record<string, string>

interface ImagePickerProps {
  value?: string | null
  onChange?: (v: string | null) => void
  placeholder?: string
  hint?: string
  aspectRatio?: string
  filledBg?: string
  removable?: boolean
}

export default function ImagePicker({
  value,
  onChange,
  placeholder = 'Add a photo or emoji',
  hint = 'Square image, JPG or PNG',
  aspectRatio,
  filledBg,
  removable = true,
}: ImagePickerProps) {
  const empty = !value
  const isUrl =
    !empty &&
    (value!.startsWith('http') ||
      value!.startsWith('/') ||
      value!.includes('://') ||
      value!.includes('.'))

  const cls = [s.root, empty ? s.empty : s.filled].filter(Boolean).join(' ')

  const style: React.CSSProperties = {
    ...(aspectRatio ? ({ '--aspect': aspectRatio } as React.CSSProperties) : {}),
    ...(filledBg ? ({ '--filledBg': filledBg } as React.CSSProperties) : {}),
  }

  const handlePick = () => {
    onChange?.(value ? null : '🥃')
  }

  return (
    <button
      type="button"
      className={cls}
      style={style}
      onClick={handlePick}
      aria-label={empty ? placeholder : 'Change image'}
    >
      {empty && (
        <>
          <span className={s.icon} aria-hidden="true">
            📷
          </span>
          <span className={s.label}>{placeholder}</span>
          <span className={s.hint}>{hint}</span>
        </>
      )}

      {!empty && isUrl && <img className={s.img} src={value!} alt="" />}
      {!empty && !isUrl && (
        <span className={s.preview} aria-hidden="true">
          {value}
        </span>
      )}

      {!empty && <span className={s.label}>Tap to change</span>}
      {!empty && removable && (
        <span
          className={s.removeBtn}
          onClick={(e) => {
            e.stopPropagation()
            onChange?.(null)
          }}
          role="button"
          aria-label="Remove image"
        >
          ✕
        </span>
      )}
    </button>
  )
}
