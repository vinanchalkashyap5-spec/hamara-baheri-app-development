import type { Metadata } from 'next'
import Link from 'next/link'
import { ApiKeyNotice, EmptyNotice, ErrorNotice } from '@/components/notices'
import { NextPageLink } from '@/components/pager'
import { VideoList } from '@/components/video/video-collections'
import { safe } from '@/lib/safe'
import { searchVideos } from '@/lib/youtube'
import { cn } from '@/lib/utils'

type Params = { q?: string; type?: string; sort?: string; page?: string }

export async function generateMetadata({ searchParams }: { searchParams: Promise<Params> }): Promise<Metadata> {
  const { q } = await searchParams
  return { title: q ? `${q} — Search` : 'Search' }
}

const FILTERS = [
  { label: 'All', type: undefined },
  { label: 'Songs', type: 'music' },
] as const

const SORTS = [
  { label: 'Relevance', sort: undefined },
  { label: 'Latest', sort: 'date' },
  { label: 'Most viewed', sort: 'viewCount' },
] as const

export default async function SearchPage({ searchParams }: { searchParams: Promise<Params> }) {
  const { q = '', type, sort, page } = await searchParams
  const query = q.trim().slice(0, 200)

  if (!query) {
    return (
      <div className="px-4 py-10 sm:px-6">
        <EmptyNotice message="Search for any song, video or artist using the search bar above." />
      </div>
    )
  }

  const order = sort === 'date' || sort === 'viewCount' ? sort : undefined
  const res = await safe(
    searchVideos({ query, musicOnly: type === 'music', order, pageToken: page }),
  )

  function href(next: Partial<Params>) {
    const p = new URLSearchParams({ q: query })
    const t = 'type' in next ? next.type : type
    const s = 'sort' in next ? next.sort : sort
    if (t) p.set('type', t)
    if (s) p.set('sort', s)
    return `/search?${p.toString()}`
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <h1 className="text-xl font-semibold">
        Results for <span className="text-brand">&ldquo;{query}&rdquo;</span>
      </h1>

      <div className="mt-4 mb-6 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <FilterChip key={f.label} href={href({ type: f.type })} active={type === f.type || (!type && !f.type)}>
            {f.label}
          </FilterChip>
        ))}
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        {SORTS.map((s) => (
          <FilterChip key={s.label} href={href({ sort: s.sort })} active={sort === s.sort || (!sort && !s.sort)}>
            {s.label}
          </FilterChip>
        ))}
      </div>

      {!res.ok ? (
        res.missingKey ? <ApiKeyNotice /> : <ErrorNotice message={res.message} />
      ) : res.data.videos.length === 0 ? (
        <EmptyNotice message="No results found. Try different keywords." />
      ) : (
        <>
          <VideoList videos={res.data.videos} />
          <NextPageLink basePath="/search" params={{ q: query, type, sort }} nextPageToken={res.data.nextPageToken} />
        </>
      )}
    </div>
  )
}

function FilterChip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-foreground text-background' : 'bg-secondary hover:bg-muted-foreground/25',
      )}
    >
      {children}
    </Link>
  )
}
