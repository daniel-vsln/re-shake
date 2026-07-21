import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1055 100%)',
      }}
    >
      <span style={{ fontSize: 120, lineHeight: 1 }}>🍸</span>
    </div>,
    { ...size }
  )
}
