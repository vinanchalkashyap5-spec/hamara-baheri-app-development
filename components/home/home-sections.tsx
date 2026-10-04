import Link from 'next/link'
import { Play, Radio } from 'lucide-react'
import type { Collection } from '@/lib/catalog'
import { decodeEntities, formatViews } from '@/lib/format'
import { safe } from '@/lib/safe'
import { getTrending, searchVideos } from '@/lib/youtube'
import { ErrorNotice } from '@/components/notices'
import { SectionHeading, VideoGrid, VideoRow } from '@/components/video/video-collections'

export async function FeaturedHero() {
  const res = await safe(getTrending({ categoryId: '10', maxResults: 1 }))
  if (!res.ok || res.data.videos.length === 0) return null
  const video = res.data.videos[0]

  return (
    <section aria-label="Featured" className="relative overflow-hidden rounded-3xl border border-border bg-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={video.thumbnail} alt="" className="absolute inset-0 size-full object-cover opacity-40 blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="relative grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_minmax(0,420px)]">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <Radio className="size-4" aria-hidden="true" />
            #1 Trending in Music
          </p>
          <h1 className="mt-3 line-clamp-2 text-2xl font-bold tracking-tight text-balance sm:text-4xl">
            {decodeEntities(video.title)}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {video.channelTitle}
            {video.viewCount && ` · ${formatViews(video.viewCount)}`}
          </p>
          <Link
            href={`/watch/${video.id}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Play className="size-4 fill-current" aria-hidden="true" />
            Play now
          </Link>
        </div>
        <Link
          href={`/watch/${video.id}`}
          className="hidden aspect-video overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border md:block"
          tabIndex={-1}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.thumbnail} alt="" className="size-full object-cover" />
        </Link>
      </div>
    </section>
  )
}

export async function TrendingSection({
  title,
  description,
  categoryId,
  href,
  count = 8,
}: {
  title: string
  description?: string
  categoryId?: string
  href: string
  count?: number
}) {
  const res = await safe(getTrending({ categoryId, maxResults: count }))
  if (!res.ok) return res.missingKey ? null : <ErrorNotice message={res.message} />

  return (
    <section>
      <SectionHeading title={title} description={description} href={href} />
      <VideoGrid videos={res.data.videos} />
    </section>
  )
}

export async function CollectionRow({ collection }: { collection: Collection }) {
  const res = await safe(
    searchVideos({
      query: collection.query,
      musicOnly: collection.musicOnly,
      order: collection.order,
      maxResults: 12,
    }),
  )
  if (!res.ok) return res.missingKey ? null : <ErrorNotice message={res.message} />

  return (
    <section>
      <SectionHeading
        title={collection.title}
        description={collection.description}
        href={`/category/${collection.slug}`}
      />
      <VideoRow videos={res.data.videos} />
    </section>
  )
}
