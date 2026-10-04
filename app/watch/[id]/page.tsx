import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ThumbsUp } from 'lucide-react'
import { ApiKeyNotice, ErrorNotice } from '@/components/notices'
import { VideoList } from '@/components/video/video-collections'
import { MediaPlayer } from '@/components/watch/media-player'
import { VideoDescription } from '@/components/watch/video-description'
import { decodeEntities, formatCount, formatViews, timeAgo } from '@/lib/format'
import { safe } from '@/lib/safe'
import { getVideo, searchVideos, type Video } from '@/lib/youtube'

type Props = { params: Promise<{ id: string }> }

const VIDEO_ID = /^[\w-]{6,20}$/

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  if (!VIDEO_ID.test(id)) return { title: 'Watch' }
  const res = await safe(getVideo(id))
  const video = res.ok ? res.data : null
  return {
    title: video ? decodeEntities(video.title) : 'Watch',
    description: video?.description.slice(0, 160),
    openGraph: video ? { images: [video.thumbnail] } : undefined,
  }
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params
  if (!VIDEO_ID.test(id)) notFound()

  const res = await safe(getVideo(id))
  if (!res.ok) {
    return (
      <div className="px-4 py-6 sm:px-6">
        {res.missingKey ? <ApiKeyNotice /> : <ErrorNotice message={res.message} />}
      </div>
    )
  }
  const video = res.data
  if (!video) notFound()

  const title = decodeEntities(video.title)
  const meta = [formatViews(video.viewCount), timeAgo(video.publishedAt)].filter(Boolean).join(' · ')

  return (
    <div className="mx-auto grid max-w-[1600px] gap-6 pb-10 sm:px-6 sm:pt-6 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="min-w-0">
        <MediaPlayer id={video.id} title={title} thumbnail={video.thumbnail} />

        <div className="px-4 sm:px-0">
          <h1 className="mt-3 text-xl font-bold leading-snug text-balance">{title}</h1>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="flex size-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground"
                aria-hidden="true"
              >
                {video.channelTitle.charAt(0).toUpperCase()}
              </span>
              <p className="font-semibold">{video.channelTitle}</p>
            </div>
            {video.likeCount && (
              <span className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
                <ThumbsUp className="size-4" aria-hidden="true" />
                {formatCount(video.likeCount)}
                <span className="sr-only">likes</span>
              </span>
            )}
          </div>
          <VideoDescription meta={meta} text={video.description} />
        </div>
      </div>

      <aside className="px-4 sm:px-0" aria-label="Up next">
        <h2 className="mb-4 font-semibold">Up next</h2>
        <Suspense fallback={<RelatedSkeleton />}>
          <RelatedVideos video={video} />
        </Suspense>
      </aside>
    </div>
  )
}

async function RelatedVideos({ video }: { video: Video }) {
  const query = decodeEntities(video.title)
    .replace(/[|()[\]{}#@:"'-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .join(' ')
  const res = await safe(searchVideos({ query: query || video.channelTitle, maxResults: 15 }))
  if (!res.ok) return <ErrorNotice message={res.message} />
  return <VideoList videos={res.data.videos.filter((v) => v.id !== video.id)} />
}

function RelatedSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="aspect-video w-40 shrink-0 animate-pulse rounded-xl bg-muted" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3.5 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
