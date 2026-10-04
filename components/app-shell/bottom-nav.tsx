'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PRIMARY_NAV } from './nav-items'
import { useIsActive } from './use-is-active'

export function BottomNav() {
  const isActive = useIsActive()

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {PRIMARY_NAV.map(({ label, href, icon: Icon }) => {
          const active = isActive(href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-16 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground',
                  active && 'text-foreground',
                )}
              >
                <Icon className={cn('size-5', active && 'text-brand')} aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
