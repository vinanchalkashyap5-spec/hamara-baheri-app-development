import type { Metadata } from 'next'
import { Code2, Headphones, MapPin, Search, TrendingUp } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Hamara Baheri — designed & developed by Kamal Kashyap (Gaurikheda).',
}

const FEATURES = [
  { icon: TrendingUp, title: 'Trending & curated', text: 'Live trending charts for India plus hand-picked playlists.' },
  { icon: Search, title: 'Search everything', text: 'Find any song, video or artist on YouTube instantly.' },
  { icon: Headphones, title: 'Audio mode', text: 'Switch any video to a music-first listening view.' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <BrandLogo />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        Your home for every video and song.
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Hamara Baheri streams the latest hits and timeless classics from YouTube in a clean, fast
        interface — built for Baheri and everyone who loves music.
      </p>

      <section
        aria-labelledby="credits"
        className="relative mt-10 overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/25 via-card to-card p-8"
      >
        <Code2 className="absolute -top-4 -right-4 size-32 text-brand/10" aria-hidden="true" />
        <p id="credits" className="text-xs font-semibold uppercase tracking-widest text-accent">
          Designed &amp; Developed by
        </p>
        <p className="mt-2 text-3xl font-bold tracking-tight">Kamal Kashyap</p>
        <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          Gaurikheda
        </p>
      </section>

      <section aria-label="Features" className="mt-10 grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-5">
            <f.icon className="size-5 text-brand" aria-hidden="true" />
            <h2 className="mt-3 font-semibold">{f.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Video content is provided by YouTube via the official YouTube Data API v3 and IFrame Player.
        All videos remain the property of their respective owners.
      </p>
    </div>
  )
}
