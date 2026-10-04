import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Hamara Baheri',
    short_name: 'Hamara Baheri',
    description:
      'Stream trending YouTube videos, latest and classic songs, music categories and curated playlists. Designed & Developed by Kamal Kashyap (Gaurikheda).',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#1c1817',
    theme_color: '#1c1817',
    categories: ['music', 'entertainment'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
