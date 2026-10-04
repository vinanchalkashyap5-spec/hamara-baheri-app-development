import Link from 'next/link'
import type { Video } from '@/lib/youtube'
import { decodeEntities, formatDuration, formatViews, timeAgo } from '@/lib/format'
import { cn } from '@/lib/utils'

export function VideoCard({
  video,
  layout = 'grid',
}: {
  video: Video
  layout?: 'grid' | 'row' | 'list'
}) {
  const duration = formatDuration(video.duration)
  const title = decodeEntities(video.title)
  const meta = [formatViews(video.viewCount), timeAgo(video.publishedAt)].filter(Boolean).join(' · ')

  const isList = layout === 'list'

  return (
    <article className={cn('group', layout === 'row' && 'w-64 shrink-0 sm:w-72', isList && 'flex gap-3')}>
      <Link
        href={`/watch/${video.id}`}
        className={cn(
          'relative block overflow-hidden rounded-xl bg-muted',
          isList ? 'aspect-video w-40 shrink-0 sm:w-60' : 'aspect-video w-full',
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {video.isLive ? (
          <span className="absolute right-2 bottom-2 rounded bg-brand px-1.5 py-0.5 text-xs font-semibold text-brand-foreground">
            LIVE
          </span>
        ) : duration ? (
          <span className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-xs font-medium text-white">
            {duration}
          </span>
        ) : null}
        <span className="sr-only">{title}</span>
      </Link>

      <div className={cn('min-w-0', !isList && 'mt-3')}>
        <h3 className={cn('line-clamp-2 font-medium leading-snug', isList ? 'text-sm' : 'text-[15px]')}>
          <Link href={`/watch/${video.id}`} className="hover:text-foreground/90">
            {title}
          </Link>
        </h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">{video.channelTitle}</p>
        {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
      </div>
    </article>
  )
}
