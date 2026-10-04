import Link from 'next/link'

export function NextPageLink({
  basePath,
  params,
  nextPageToken,
}: {
  basePath: string
  params: Record<string, string | undefined>
  nextPageToken?: string
}) {
  if (!nextPageToken) return null
  const search = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) if (v) search.set(k, v)
  search.set('page', nextPageToken)

  return (
    <div className="mt-10 flex justify-center">
      <Link
        href={`${basePath}?${search.toString()}`}
        className="rounded-full border border-border bg-secondary px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted-foreground/25"
      >
        Load more
      </Link>
    </div>
  )
}
