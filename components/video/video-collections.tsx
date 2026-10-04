import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Video } from '@/lib/youtube'
import { VideoCard } from './video-card'

export function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}

export function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div className="flex flex-col gap-4">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} layout="list" />
      ))}
    </div>
  )
}

export function SectionHeading({
  title,
  description,
  href,
}: {
  title: string
  description?: string
  href?: string
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-balance">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          See all
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

export function VideoRow({ videos }: { videos: Video[] }) {
  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:-mx-6 sm:px-6">
      {videos.map((v) => (
        <div key={v.id} className="snap-start">
          <VideoCard video={v} layout="row" />
        </div>
      ))}
    </div>
  )
}
