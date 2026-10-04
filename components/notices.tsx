import { AlertTriangle, KeyRound } from 'lucide-react'

export function ApiKeyNotice() {
  return (
    <div
      role="status"
      className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-5 sm:flex-row sm:items-start"
    >
      <KeyRound className="size-6 shrink-0 text-accent" aria-hidden="true" />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold text-foreground">Connect your YouTube Data API key</p>
        <p className="mt-1 text-muted-foreground">
          Add <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">GCP_API_KEY</code>{' '}
          in the Vars section of project settings (top right). Get a free key from Google Cloud Console
          by enabling &quot;YouTube Data API v3&quot; and creating an API key.
        </p>
      </div>
    </div>
  )
}

export function ErrorNotice({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-sm"
    >
      <AlertTriangle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
      <div>
        <p className="font-semibold">Couldn&apos;t load videos</p>
        <p className="mt-1 break-words text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

export function EmptyNotice({ message }: { message: string }) {
  return <p className="py-16 text-center text-muted-foreground">{message}</p>
}
