import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        <span style={{ fontSize: 300, lineHeight: 1 }}>🍸</span>
        <span
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: '#ff5b9e',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginTop: -16,
          }}
        >
          re:shake
        </span>
      </div>
    </div>,
    { ...size }
  )
}
