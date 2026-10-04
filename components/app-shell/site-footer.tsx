import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-6 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
        <p>
          Designed &amp; Developed by{' '}
          <Link href="/about" className="font-semibold text-foreground underline-offset-4 hover:underline">
            Kamal Kashyap (Gaurikheda)
          </Link>
        </p>
        <p className="text-xs">
          {'Hamara Baheri · Powered by YouTube Data API v3'}
        </p>
      </div>
    </footer>
  )
}
