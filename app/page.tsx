import { Suspense } from 'react'
import { ChipBar } from '@/components/chip-bar'
import { CategoryTiles } from '@/components/home/category-tiles'
import { CollectionRow, FeaturedHero, TrendingSection } from '@/components/home/home-sections'
import { ApiKeyNotice } from '@/components/notices'
import { GridSkeleton, HeroSkeleton, RowSkeleton } from '@/components/skeletons'
import { SectionHeading } from '@/components/video/video-collections'
import { CURATED_PLAYLISTS } from '@/lib/catalog'
import { hasApiKey } from '@/lib/youtube'

export default function HomePage() {
  const keyReady = hasApiKey()

  return (
    <div className="px-4 pb-10 sm:px-6">
      <ChipBar activeHref="/" />

      <div className="mt-2 flex flex-col gap-12">
        {!keyReady && <ApiKeyNotice />}

        <Suspense fallback={<HeroSkeleton />}>
          <FeaturedHero />
        </Suspense>

        <Suspense fallback={<GridSkeleton />}>
          <TrendingSection
            title="Trending in India"
            description="What everyone is watching right now"
            href="/trending"
          />
        </Suspense>

        <section>
          <SectionHeading title="Music categories" description="Latest hits and timeless classics" href="/categories" />
          <CategoryTiles />
        </section>

        <Suspense fallback={<GridSkeleton count={4} />}>
          <TrendingSection
            title="Trending music"
            description="Top songs on YouTube today"
            categoryId="10"
            href="/trending?c=10"
            count={8}
          />
        </Suspense>

        {CURATED_PLAYLISTS.map((collection) => (
          <Suspense key={collection.title} fallback={<RowSkeleton />}>
            <CollectionRow collection={collection} />
          </Suspense>
        ))}
      </div>
    </div>
  )
}
