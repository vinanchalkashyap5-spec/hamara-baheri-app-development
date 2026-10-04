import Link from 'next/link'
import { Play } from 'lucide-react'

export function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
      aria-label="Hamara Baheri home"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
        <Play className="size-4 fill-current" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-balance">
        Hamara<span className="text-brand"> Baheri</span>
      </span>
    </Link>
  )
}
