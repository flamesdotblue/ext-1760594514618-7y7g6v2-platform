import React from 'react'
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from 'lucide-react'

export default function ControlPanel({ running, gameOver, onStart, onPause, onReset, onArrow, speed, setSpeed, direction }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={running ? onPause : onStart}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
            running ? 'bg-amber-500/10 border-amber-600 text-amber-300 hover:bg-amber-500/20' : 'bg-emerald-500/10 border-emerald-600 text-emerald-300 hover:bg-emerald-500/20'
          } ${gameOver ? 'opacity-50 pointer-events-none' : ''}`}
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 hover:border-neutral-600 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition"
        >
          <RotateCcw size={18} />
          Restart
        </button>
        <div className="ml-auto flex items-center gap-2 text-neutral-300">
          <Zap size={18} className="text-yellow-400" />
          <span className="text-sm">Speed</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-neutral-900 border border-neutral-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
          >
            <option value={180}>Casual</option>
            <option value={160}>Normal</option>
            <option value={130}>Fast</option>
            <option value={100}>Turbo</option>
            <option value={80}>Insane</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-3 gap-2 w-56 mx-auto select-none">
          <div />
          <ArrowButton label="Up" icon={<ArrowUp size={18} />} onClick={() => onArrow('up')} active={direction === 'up'} />
          <div />
          <ArrowButton label="Left" icon={<ArrowLeft size={18} />} onClick={() => onArrow('left')} active={direction === 'left'} />
          <div />
          <ArrowButton label="Right" icon={<ArrowRight size={18} />} onClick={() => onArrow('right')} active={direction === 'right'} />
          <div />
          <ArrowButton label="Down" icon={<ArrowDown size={18} />} onClick={() => onArrow('down')} active={direction === 'down'} />
          <div />
        </div>
        <div className="text-center text-xs text-neutral-400 mt-2">Touch controls</div>
      </div>
    </div>
  )
}

function ArrowButton({ label, icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition text-sm ${
        active ? 'border-sky-400 text-sky-300 bg-sky-500/10' : 'border-neutral-700 text-neutral-200 bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-600'
      }`}
      aria-label={label}
    >
      {icon}
    </button>
  )
}
