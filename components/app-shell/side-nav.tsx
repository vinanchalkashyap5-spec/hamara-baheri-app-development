'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MUSIC_CATEGORIES } from '@/lib/catalog'
import { cn } from '@/lib/utils'
import { PRIMARY_NAV } from './nav-items'
import { useIsActive } from './use-is-active'

export function SideNav() {
  const isActive = useIsActive()
  const pathname = usePathname()

  if (pathname.startsWith('/watch')) return null

  return (
    <aside
      aria-label="Primary"
      className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border px-3 py-4 lg:block"
    >
      <nav>
        <ul className="flex flex-col gap-1">
          {PRIMARY_NAV.map(({ label, href, icon: Icon }) => {
            const active = isActive(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-4 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary',
                    active && 'bg-secondary font-medium',
                  )}
                >
                  <Icon className={cn('size-5', active && 'text-brand')} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <h2 className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Music categories
        </h2>
        <ul className="flex flex-col gap-1">
          {MUSIC_CATEGORIES.map((c) => {
            const href = `/category/${c.slug}`
            return (
              <li key={c.slug}>
                <Link
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={cn(
                    'block truncate rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                    pathname === href && 'bg-secondary text-foreground',
                  )}
                >
                  {c.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <p className="mt-8 px-3 text-xs leading-relaxed text-muted-foreground">
        Designed &amp; Developed by{' '}
        <span className="font-medium text-foreground">Kamal Kashyap (Gaurikheda)</span>
      </p>
    </aside>
  )
}
