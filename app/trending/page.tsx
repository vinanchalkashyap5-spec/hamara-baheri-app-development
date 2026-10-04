import type { Metadata } from 'next'
import { ChipBar } from '@/components/chip-bar'
import { ApiKeyNotice, EmptyNotice, ErrorNotice } from '@/components/notices'
import { NextPageLink } from '@/components/pager'
import { VideoGrid } from '@/components/video/video-collections'
import { safe } from '@/lib/safe'
import { getTrending } from '@/lib/youtube'

const CATEGORY_NAMES: Record<string, string> = {
  '10': 'Trending Music',
  '20': 'Trending Gaming',
  '23': 'Trending Comedy',
  '25': 'Trending News',
}

export const metadata: Metadata = { title: 'Trending' }

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string; page?: string }>
}) {
  const { c, page } = await searchParams
  const categoryId = c && /^\d+$/.test(c) ? c : undefined
  const res = await safe(getTrending({ categoryId, pageToken: page }))
  const title = (categoryId && CATEGORY_NAMES[categoryId]) || 'Trending in India'

  return (
    <div className="px-4 pb-10 sm:px-6">
      <ChipBar activeHref={categoryId ? `/trending?c=${categoryId}` : '/'} />
      <h1 className="mt-2 mb-6 text-2xl font-bold tracking-tight">{title}</h1>
      {!res.ok ? (
        res.missingKey ? <ApiKeyNotice /> : <ErrorNotice message={res.message} />
      ) : res.data.videos.length === 0 ? (
        <EmptyNotice message="No trending videos in this category right now." />
      ) : (
        <>
          <VideoGrid videos={res.data.videos} />
          <NextPageLink basePath="/trending" params={{ c: categoryId }} nextPageToken={res.data.nextPageToken} />
        </>
      )}
    </div>
  )
}
