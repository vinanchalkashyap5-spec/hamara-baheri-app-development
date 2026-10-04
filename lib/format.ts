export function formatDuration(iso?: string) {
  if (!iso) return ''
  const m = iso.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const days = Number(m[1] ?? 0)
  const h = Number(m[2] ?? 0) + days * 24
  const min = Number(m[3] ?? 0)
  const s = Number(m[4] ?? 0)
  if (h === 0 && min === 0 && s === 0) return ''
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${String(min).padStart(2, '0')}:${ss}` : `${min}:${ss}`
}

const compactNumber = new Intl.NumberFormat('en-IN', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatViews(count?: string) {
  if (!count) return ''
  return `${compactNumber.format(Number(count))} views`
}

export function formatCount(count?: string) {
  if (!count) return ''
  return compactNumber.format(Number(count))
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

export function timeAgo(date: string) {
  const diff = (new Date(date).getTime() - Date.now()) / 1000
  for (const [unit, secs] of UNITS) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit)
  }
  return 'just now'
}

export function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
