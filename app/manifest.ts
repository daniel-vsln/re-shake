import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 're:shake',
    short_name: 're:shake',
    description: 'Train your cocktail craft — one pour at a time',
    start_url: '/library',
    display: 'standalone',
    background_color: '#1a0f2e',
    theme_color: '#1a0f2e',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
