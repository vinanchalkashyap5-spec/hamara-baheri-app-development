export type Collection = {
  slug: string
  title: string
  description: string
  query: string
  musicOnly?: boolean
  order?: 'relevance' | 'date' | 'viewCount'
}

export const MUSIC_CATEGORIES: Collection[] = [
  {
    slug: 'bollywood-latest',
    title: 'Bollywood Latest',
    description: 'Fresh Hindi film songs from this season',
    query: 'new bollywood songs 2026',
    musicOnly: true,
  },
  {
    slug: 'old-classics',
    title: 'Old Hindi Classics',
    description: 'Lata, Rafi, Kishore and the golden era',
    query: 'old hindi classic songs lata rafi kishore',
    musicOnly: true,
    order: 'viewCount',
  },
  {
    slug: 'bhojpuri',
    title: 'Bhojpuri Hits',
    description: 'Chart-topping Bhojpuri tracks',
    query: 'bhojpuri new song',
    musicOnly: true,
  },
  {
    slug: 'bhakti',
    title: 'Bhajan & Bhakti',
    description: 'Devotional songs and aartis',
    query: 'bhajan bhakti songs hindi',
    musicOnly: true,
  },
  {
    slug: 'punjabi',
    title: 'Punjabi Beats',
    description: 'High-energy Punjabi tracks',
    query: 'latest punjabi songs',
    musicOnly: true,
  },
  {
    slug: 'ghazal-sufi',
    title: 'Ghazal & Sufi',
    description: 'Soulful ghazals and qawwalis',
    query: 'ghazal sufi qawwali',
    musicOnly: true,
  },
  {
    slug: 'lofi',
    title: 'Lo-fi & Chill',
    description: 'Slowed, reverb and relaxing mixes',
    query: 'hindi lofi slowed reverb',
    musicOnly: true,
  },
  {
    slug: 'romantic',
    title: 'Romantic',
    description: 'Love songs for every mood',
    query: 'romantic hindi songs',
    musicOnly: true,
  },
]

export const CURATED_PLAYLISTS: Collection[] = [
  {
    slug: 'old-classics',
    title: 'Sadabahar Gaane',
    description: 'Evergreen songs that never fade',
    query: 'sadabahar purane gaane',
    musicOnly: true,
    order: 'viewCount',
  },
  {
    slug: 'bollywood-latest',
    title: 'Fresh This Week',
    description: 'Newest releases',
    query: 'new hindi song official video',
    musicOnly: true,
    order: 'date',
  },
  {
    slug: 'bhakti',
    title: 'Subah Ki Bhakti',
    description: 'Start the day with devotion',
    query: 'morning bhajan',
    musicOnly: true,
  },
]

export function getCollection(slug: string) {
  return MUSIC_CATEGORIES.find((c) => c.slug === slug)
}

export const BROWSE_CHIPS = [
  { label: 'All', href: '/' },
  { label: 'Music', href: '/trending?c=10' },
  ...MUSIC_CATEGORIES.slice(0, 6).map((c) => ({ label: c.title, href: `/category/${c.slug}` })),
  { label: 'Gaming', href: '/trending?c=20' },
  { label: 'Comedy', href: '/trending?c=23' },
  { label: 'News', href: '/trending?c=25' },
]
