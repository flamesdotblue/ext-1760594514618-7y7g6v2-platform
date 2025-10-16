import React from 'react'

export default function ScorePanel({ score, level, length, running, gameOver }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Badge label="Score" value={score} accent="emerald" />
      <Badge label="Level" value={level} accent="sky" />
      <Badge label="Length" value={length} accent="violet" />
      <Status running={running} gameOver={gameOver} />
    </div>
  )
}

function Badge({ label, value, accent = 'emerald' }) {
  const color = {
    emerald: 'from-emerald-500/70 to-emerald-400/40 text-emerald-200 border-emerald-600',
    sky: 'from-sky-500/70 to-sky-400/40 text-sky-200 border-sky-600',
    violet: 'from-violet-500/70 to-violet-400/40 text-violet-200 border-violet-600',
  }[accent]

  return (
    <div className={`px-4 py-2 rounded-xl border bg-gradient-to-br ${color} shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]`}> 
      <div className="text-xs opacity-90">{label}</div>
      <div className="text-lg font-semibold leading-none">{value}</div>
    </div>
  )
}

function Status({ running, gameOver }) {
  let text = 'Ready'
  let dot = 'bg-neutral-500'
  if (running) {
    text = 'Running'
    dot = 'bg-emerald-500'
  } else if (gameOver) {
    text = 'Game Over'
    dot = 'bg-rose-500'
  } else {
    text = 'Paused'
    dot = 'bg-amber-500'
  }

  return (
    <div className="flex items-center gap-2 text-neutral-300">
      <span className={`inline-block w-2.5 h-2.5 rounded-full ${dot}`} />
      <span className="text-sm">{text}</span>
    </div>
  )
}
