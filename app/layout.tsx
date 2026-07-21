import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import AvatarButton from '@/components/AvatarButton'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 're:shake',
  description: 'Train your cocktail craft — one pour at a time',
  appleWebApp: {
    capable: true,
    title: 're:shake',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a0f2e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <div style={{ position: 'relative' }}>
          {children}
          <AvatarButton />
        </div>
      </body>
    </html>
  )
}
