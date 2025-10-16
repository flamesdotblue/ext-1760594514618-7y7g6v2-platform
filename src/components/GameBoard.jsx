import React, { useMemo, useRef, useState, useEffect } from 'react'

export default function GameBoard({ boardSize, snake, food, gameOver }) {
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect()
      setContainerSize(Math.min(rect.width, rect.height))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cellPct = useMemo(() => 100 / boardSize, [boardSize])

  return (
    <div className="mt-4">
      <div
        ref={containerRef}
        className="relative w-full aspect-square rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900"
        style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)' }}
      >
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
          <defs>
            <pattern id="grid" width={`${100 / boardSize}%`} height={`${100 / boardSize}%`} patternUnits="objectBoundingBox">
              <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" className="text-neutral-800" />
        </svg>

        {/* Food */}
        <div
          className="absolute rounded-md"
          style={{
            left: `${food.x * cellPct}%`,
            top: `${food.y * cellPct}%`,
            width: `${cellPct}%`,
            height: `${cellPct}%`,
            padding: `${Math.max(1, containerSize * 0.002)}px`,
          }}
        >
          <div className="w-full h-full rounded-md bg-emerald-500 shadow-[0_0_20px_4px_rgba(16,185,129,0.6)]" />
        </div>

        {/* Snake */}
        {snake.map((seg, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: `${seg.x * cellPct}%`,
              top: `${seg.y * cellPct}%`,
              width: `${cellPct}%`,
              height: `${cellPct}%`,
              padding: `${Math.max(1, containerSize * 0.002)}px`,
            }}
          >
            <div
              className={`w-full h-full rounded-md ${idx === 0 ? 'bg-sky-400' : 'bg-sky-600'} shadow-[0_0_14px_2px_rgba(56,189,248,0.5)]`}
              style={{ outline: '1px solid rgba(255,255,255,0.06)' }}
            />
          </div>
        ))}

        {gameOver && (
          <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center">
            <div className="px-6 py-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
              <div className="text-lg font-semibold">Game Over</div>
              <div className="text-neutral-400 text-sm mt-1">Press R to restart</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
