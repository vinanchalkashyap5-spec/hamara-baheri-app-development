'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'

export function SearchForm({
  autoFocus,
  onSubmitted,
}: {
  autoFocus?: boolean
  onSubmitted?: () => void
}) {
  const router = useRouter()
  const params = useSearchParams()
  const [value, setValue] = useState(params.get('q') ?? '')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = value.trim()
    if (!q) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
    onSubmitted?.()
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full max-w-xl items-center">
      <label htmlFor="site-search" className="sr-only">
        Search videos and songs
      </label>
      <div className="relative flex-1">
        <input
          id="site-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={autoFocus}
          placeholder="Search songs, videos, artists…"
          autoComplete="off"
          enterKeyHint="search"
          className="h-10 w-full rounded-l-full border border-input bg-card pl-4 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <button
        type="submit"
        aria-label="Search"
        className="flex h-10 w-14 items-center justify-center rounded-r-full border border-l-0 border-input bg-secondary text-foreground transition-colors hover:bg-muted-foreground/20"
      >
        <Search className="size-5" />
      </button>
    </form>
  )
}
