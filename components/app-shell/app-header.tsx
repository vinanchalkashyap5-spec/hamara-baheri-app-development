'use client'

import { useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { SearchForm } from '@/components/app-shell/search-form'
import { Button } from '@/components/ui/button'

export function AppHeader() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex h-full items-center gap-3 px-3 sm:px-4">
        {mobileSearchOpen ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close search"
              className="sm:hidden"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <SearchForm autoFocus onSubmitted={() => setMobileSearchOpen(false)} />
          </>
        ) : (
          <>
            <BrandLogo />
            <div className="hidden flex-1 justify-center sm:flex">
              <SearchForm />
            </div>
            <div className="ml-auto flex items-center sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="size-5" />
              </Button>
            </div>
            <div className="hidden w-[140px] sm:block" aria-hidden="true" />
          </>
        )}
      </div>
    </header>
  )
}
