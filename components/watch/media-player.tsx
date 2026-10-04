'use client'

import { useState } from 'react'
import { Headphones, MonitorPlay } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MediaPlayer({ id, title, thumbnail }: { id: string; title: string; thumbnail: string }) {
  const [audioOnly, setAudioOnly] = useState(false)

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-none bg-black sm:rounded-2xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
        {audioOnly && (
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-14 flex items-center justify-center overflow-hidden bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbnail} alt="" className="absolute inset-0 size-full scale-110 object-cover opacity-30 blur-2xl" />
            <div className="relative flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail}
                alt=""
                className="size-32 animate-[spin_12s_linear_infinite] rounded-full object-cover shadow-2xl ring-4 ring-foreground/10 sm:size-44"
              />
              <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Headphones className="size-4" aria-hidden="true" />
                Audio mode
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-end px-4 sm:px-0">
        <div role="group" aria-label="Playback mode" className="inline-flex rounded-full bg-secondary p-1 text-sm">
          <ModeButton active={!audioOnly} onClick={() => setAudioOnly(false)}>
            <MonitorPlay className="size-4" aria-hidden="true" />
            Video
          </ModeButton>
          <ModeButton active={audioOnly} onClick={() => setAudioOnly(true)}>
            <Headphones className="size-4" aria-hidden="true" />
            Audio
          </ModeButton>
        </div>
      </div>
    </div>
  )
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors',
        active ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
