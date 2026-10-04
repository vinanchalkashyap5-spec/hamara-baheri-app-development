import type { Metadata } from 'next'
import { CategoryTiles } from '@/components/home/category-tiles'

export const metadata: Metadata = { title: 'Library' }

export default function CategoriesPage() {
  return (
    <div className="px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">Library</h1>
      <p className="mt-1 mb-6 text-muted-foreground">Browse every music category — from latest releases to golden-era classics.</p>
      <CategoryTiles />
    </div>
  )
}
