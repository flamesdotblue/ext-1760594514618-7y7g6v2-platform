import React from 'react'
import { Play } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/90 border-b border-neutral-900">
      <div className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 flex items-center justify-center shadow-lg">
            <Play size={18} className="text-neutral-950" />
          </div>
          <div>
            <div className="text-lg font-semibold">A Game of Snakes</div>
            <div className="text-xs text-neutral-400 -mt-0.5">Classic arcade fun</div>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-neutral-300 hover:text-white transition"
          onClick={(e) => e.preventDefault()}
        >
          New Game is on the right
        </a>
      </div>
    </header>
  )
}
