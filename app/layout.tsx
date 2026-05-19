import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 're:shake',
  description: 'Interactive cocktail recipe trainer to keep your mixology skills sharp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
