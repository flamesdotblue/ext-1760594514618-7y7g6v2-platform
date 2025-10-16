import React, { useEffect } from 'react'
import Header from './components/Header'
import ScorePanel from './components/ScorePanel'
import GameBoard from './components/GameBoard'
import ControlPanel from './components/ControlPanel'
import useSnakeGame from './components/useSnakeGame'

export default function App() {
  const {
    boardSize,
    snake,
    food,
    direction,
    setDirection,
    start,
    pause,
    reset,
    running,
    gameOver,
    score,
    level,
    speed,
    setSpeed,
  } = useSnakeGame({ boardSize: 20 })

  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault()
      }
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setDirection('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          setDirection('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setDirection('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          setDirection('right')
          break
        case ' ':
          if (running) pause()
          else start()
          break
        case 'r':
        case 'R':
          reset()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [pause, reset, running, setDirection, start])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Header />

      <main className="container mx-auto max-w-5xl flex-1 px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4 lg:p-6 shadow-lg">
            <ScorePanel score={score} level={level} length={snake.length} running={running} gameOver={gameOver} />
            <GameBoard boardSize={boardSize} snake={snake} food={food} gameOver={gameOver} />
          </div>

          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4 lg:p-6 shadow-lg">
            <ControlPanel
              running={running}
              gameOver={gameOver}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onArrow={(dir) => setDirection(dir)}
              speed={speed}
              setSpeed={setSpeed}
              direction={direction}
            />
            <div className="mt-6 text-sm text-neutral-400 space-y-2">
              <p>How to play:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use arrow keys or WASD to move.</li>
                <li>Press Space to pause/resume, R to restart.</li>
                <li>Eat the glowing food to grow and score points. Avoid walls and yourself.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-neutral-500 text-sm">Built with React + Tailwind</footer>
    </div>
  )
}
