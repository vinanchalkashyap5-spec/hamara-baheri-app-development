'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export function useIsActive() {
  const pathname = usePathname()
  const params = useSearchParams()

  return (href: string) => {
    const [path, query] = href.split('?')
    if (path !== pathname) return false
    const expected = new URLSearchParams(query).get('c')
    return (params.get('c') ?? null) === expected
  }
}
