import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChipBar } from '@/components/chip-bar'
import { ApiKeyNotice, EmptyNotice, ErrorNotice } from '@/components/notices'
import { NextPageLink } from '@/components/pager'
import { VideoGrid } from '@/components/video/video-collections'
import { getCollection, MUSIC_CATEGORIES } from '@/lib/catalog'
import { safe } from '@/lib/safe'
import { searchVideos } from '@/lib/youtube'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export function generateStaticParams() {
  return MUSIC_CATEGORIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getCollection(slug)
  return { title: c?.title ?? 'Category', description: c?.description }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page } = await searchParams
  const collection = getCollection(slug)
  if (!collection) notFound()

  const res = await safe(
    searchVideos({
      query: collection.query,
      musicOnly: collection.musicOnly,
      order: collection.order,
      pageToken: page,
    }),
  )

  return (
    <div className="px-4 pb-10 sm:px-6">
      <ChipBar activeHref={`/category/${slug}`} />
      <header className="mt-2 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Music category</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-balance">{collection.title}</h1>
        <p className="mt-1 text-muted-foreground">{collection.description}</p>
      </header>
      {!res.ok ? (
        res.missingKey ? <ApiKeyNotice /> : <ErrorNotice message={res.message} />
      ) : res.data.videos.length === 0 ? (
        <EmptyNotice message="Nothing here yet." />
      ) : (
        <>
          <VideoGrid videos={res.data.videos} />
          <NextPageLink basePath={`/category/${slug}`} params={{}} nextPageToken={res.data.nextPageToken} />
        </>
      )}
    </div>
  )
}
