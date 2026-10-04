import 'server-only'

const API_BASE = 'https://www.googleapis.com/youtube/v3'
const DEFAULT_REGION = 'IN'

export type Video = {
  id: string
  title: string
  description: string
  channelId: string
  channelTitle: string
  publishedAt: string
  thumbnail: string
  duration?: string
  viewCount?: string
  likeCount?: string
  isLive?: boolean
}

export type VideoPage = {
  videos: Video[]
  nextPageToken?: string
}

export class YouTubeConfigError extends Error {
  constructor() {
    super('GCP_API_KEY is not configured')
    this.name = 'YouTubeConfigError'
  }
}

function getApiKey() {
  return process.env.GCP_API_KEY || process.env.YOUTUBE_API_KEY
}

export function hasApiKey() {
  return Boolean(getApiKey())
}

type Thumbnails = Record<string, { url: string } | undefined>

type ApiVideo = {
  id: string | { videoId?: string }
  snippet?: {
    title: string
    description: string
    channelId: string
    channelTitle: string
    publishedAt: string
    thumbnails: Thumbnails
    liveBroadcastContent?: string
  }
  contentDetails?: { duration?: string }
  statistics?: { viewCount?: string; likeCount?: string }
}

type ApiListResponse = {
  items?: ApiVideo[]
  nextPageToken?: string
}

async function ytFetch(
  endpoint: string,
  params: Record<string, string | undefined>,
  revalidate: number,
): Promise<ApiListResponse> {
  const key = getApiKey()
  if (!key) throw new YouTubeConfigError()

  const url = new URL(`${API_BASE}/${endpoint}`)
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v)
  }
  url.searchParams.set('key', key)

  const res = await fetch(url, { next: { revalidate } })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`YouTube API ${endpoint} failed (${res.status}): ${body.slice(0, 300)}`)
  }
  return res.json()
}

function pickThumb(t: Thumbnails = {}) {
  return (t.maxres ?? t.standard ?? t.high ?? t.medium ?? t.default)?.url ?? ''
}

function toVideo(item: ApiVideo): Video | null {
  const id = typeof item.id === 'string' ? item.id : item.id?.videoId
  if (!id || !item.snippet) return null
  return {
    id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnail: pickThumb(item.snippet.thumbnails),
    duration: item.contentDetails?.duration,
    viewCount: item.statistics?.viewCount,
    likeCount: item.statistics?.likeCount,
    isLive: item.snippet.liveBroadcastContent === 'live',
  }
}

function compact(items: ApiVideo[] = []) {
  return items.map(toVideo).filter((v): v is Video => v !== null)
}

async function hydrateDetails(videos: Video[], revalidate: number): Promise<Video[]> {
  if (videos.length === 0) return videos
  const data = await ytFetch(
    'videos',
    { part: 'contentDetails,statistics', id: videos.map((v) => v.id).join(',') },
    revalidate,
  )
  const details = new Map(
    (data.items ?? []).map((i) => [typeof i.id === 'string' ? i.id : '', i]),
  )
  return videos.map((v) => {
    const d = details.get(v.id)
    return {
      ...v,
      duration: d?.contentDetails?.duration,
      viewCount: d?.statistics?.viewCount,
      likeCount: d?.statistics?.likeCount,
    }
  })
}

export async function getTrending({
  categoryId,
  maxResults = 24,
  pageToken,
}: { categoryId?: string; maxResults?: number; pageToken?: string } = {}): Promise<VideoPage> {
  const data = await ytFetch(
    'videos',
    {
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode: DEFAULT_REGION,
      videoCategoryId: categoryId,
      maxResults: String(maxResults),
      pageToken,
    },
    60 * 30,
  )
  return { videos: compact(data.items), nextPageToken: data.nextPageToken }
}

export async function searchVideos({
  query,
  maxResults = 24,
  pageToken,
  order = 'relevance',
  musicOnly = false,
}: {
  query: string
  maxResults?: number
  pageToken?: string
  order?: 'relevance' | 'date' | 'viewCount'
  musicOnly?: boolean
}): Promise<VideoPage> {
  const revalidate = 60 * 60 * 6
  const data = await ytFetch(
    'search',
    {
      part: 'snippet',
      type: 'video',
      q: query,
      maxResults: String(maxResults),
      pageToken,
      order,
      regionCode: DEFAULT_REGION,
      videoCategoryId: musicOnly ? '10' : undefined,
      safeSearch: 'moderate',
    },
    revalidate,
  )
  const videos = await hydrateDetails(compact(data.items), revalidate)
  return { videos, nextPageToken: data.nextPageToken }
}

export async function getVideo(id: string): Promise<Video | null> {
  const data = await ytFetch(
    'videos',
    { part: 'snippet,contentDetails,statistics', id },
    60 * 30,
  )
  return compact(data.items)[0] ?? null
}
