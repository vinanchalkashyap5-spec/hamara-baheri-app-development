import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import { AppHeader } from '@/components/app-shell/app-header'
import { SideNav } from '@/components/app-shell/side-nav'
import { BottomNav } from '@/components/app-shell/bottom-nav'
import { SiteFooter } from '@/components/app-shell/site-footer'
import { ServiceWorkerRegister } from '@/components/service-worker-register'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: {
    default: 'Hamara Baheri — Stream Videos & Music',
    template: '%s · Hamara Baheri',
  },
  description:
    'Hamara Baheri streams trending YouTube videos, latest and classic songs, music categories and curated playlists. Designed & Developed by Kamal Kashyap (Gaurikheda).',
  applicationName: 'Hamara Baheri',
  authors: [{ name: 'Kamal Kashyap (Gaurikheda)' }],
  creator: 'Kamal Kashyap (Gaurikheda)',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  appleWebApp: { capable: true, title: 'Hamara Baheri', statusBarStyle: 'black-translucent' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1c1817',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div className="fixed inset-x-0 top-0 z-40 h-14 border-b border-border bg-background" />}>
          <AppHeader />
        </Suspense>
        <div className="flex pt-14">
          <Suspense fallback={null}>
            <SideNav />
          </Suspense>
          <div className="flex min-h-[calc(100dvh-3.5rem)] min-w-0 flex-1 flex-col pb-16 lg:pb-0">
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </div>
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
        <ServiceWorkerRegister />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
