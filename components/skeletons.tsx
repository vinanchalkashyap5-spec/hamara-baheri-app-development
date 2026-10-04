export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="aspect-video animate-pulse rounded-xl bg-muted" />
          <div className="mt-3 h-4 w-11/12 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}

export function RowSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="mb-4 h-6 w-48 animate-pulse rounded bg-muted" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-64 shrink-0 sm:w-72">
            <div className="aspect-video animate-pulse rounded-xl bg-muted" />
            <div className="mt-3 h-4 w-10/12 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return <div className="h-56 animate-pulse rounded-3xl bg-muted sm:h-72" aria-hidden="true" />
}
