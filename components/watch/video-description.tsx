'use client'

import { useState } from 'react'

export function VideoDescription({ meta, text }: { meta: string; text: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm">
      <p className="font-semibold">{meta}</p>
      {text && (
        <>
          <p className={expanded ? 'mt-2 whitespace-pre-line break-words' : 'mt-2 line-clamp-3 whitespace-pre-line break-words'}>
            {text}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 font-semibold hover:underline"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </>
      )}
    </div>
  )
}
