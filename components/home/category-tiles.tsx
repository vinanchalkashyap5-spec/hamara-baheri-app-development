import Link from 'next/link'
import { Disc3 } from 'lucide-react'
import { MUSIC_CATEGORIES } from '@/lib/catalog'
import { cn } from '@/lib/utils'

const TINTS = [
  'from-chart-1/40',
  'from-chart-2/35',
  'from-chart-3/40',
  'from-chart-4/40',
  'from-chart-5/35',
]

export function CategoryTiles({ limit }: { limit?: number }) {
  const items = limit ? MUSIC_CATEGORIES.slice(0, limit) : MUSIC_CATEGORIES
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((c, i) => (
        <li key={c.slug}>
          <Link
            href={`/category/${c.slug}`}
            className={cn(
              'group relative flex h-28 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br to-card p-4 transition-colors hover:border-foreground/20',
              TINTS[i % TINTS.length],
            )}
          >
            <span className="font-semibold leading-tight text-balance">{c.title}</span>
            <span className="line-clamp-1 text-xs text-muted-foreground">{c.description}</span>
            <Disc3
              className="absolute -right-3 -bottom-3 size-16 text-foreground/10 transition-transform duration-500 group-hover:rotate-90"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
