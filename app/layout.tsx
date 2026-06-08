import type { Metadata } from 'next'
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        {children}
        <AvatarButton />
      </body>
    </html>
  )
}
