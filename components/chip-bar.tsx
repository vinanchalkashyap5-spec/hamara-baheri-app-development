import Link from 'next/link'
import { BROWSE_CHIPS } from '@/lib/catalog'
import { cn } from '@/lib/utils'

export function ChipBar({ activeHref }: { activeHref: string }) {
  return (
    <nav aria-label="Browse" className="sticky top-14 z-30 -mx-4 bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <ul className="flex gap-2 overflow-x-auto scrollbar-none">
        {BROWSE_CHIPS.map((chip) => {
          const active = chip.href === activeHref
          return (
            <li key={chip.href} className="shrink-0">
              <Link
                href={chip.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted-foreground/25',
                )}
              >
                {chip.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
