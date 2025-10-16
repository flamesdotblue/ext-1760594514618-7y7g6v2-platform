import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

function randomFood(boardSize, snake) {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`))
  const free = []
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const key = `${x},${y}`
      if (!occupied.has(key)) free.push({ x, y })
    }
  }
  if (!free.length) return { x: 0, y: 0 }
  return free[Math.floor(Math.random() * free.length)]
}

export default function useSnakeGame({ boardSize = 20 } = {}) {
  const [snake, setSnake] = useState(() => [
    { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) },
    { x: Math.floor(boardSize / 2) - 1, y: Math.floor(boardSize / 2) },
  ])
  const [direction, _setDirection] = useState('right')
  const dirRef = useRef(direction)
  const [food, setFood] = useState(() => randomFood(boardSize, snake))
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(160) // ms per tick

  const level = useMemo(() => {
    if (speed <= 90) return 5
    if (speed <= 110) return 4
    if (speed <= 130) return 3
    if (speed <= 150) return 2
    return 1
  }, [speed])

  const setDirection = useCallback((next) => {
    const cur = dirRef.current
    if (next === cur) return
    if ((cur === 'up' && next === 'down') || (cur === 'down' && next === 'up')) return
    if ((cur === 'left' && next === 'right') || (cur === 'right' && next === 'left')) return
    _setDirection(next)
    dirRef.current = next
  }, [])

  const reset = useCallback(() => {
    const initSnake = [
      { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) },
      { x: Math.floor(boardSize / 2) - 1, y: Math.floor(boardSize / 2) },
    ]
    setSnake(initSnake)
    _setDirection('right')
    dirRef.current = 'right'
    setFood(randomFood(boardSize, initSnake))
    setScore(0)
    setGameOver(false)
    setRunning(false)
    setSpeed(160)
  }, [boardSize])

  const start = useCallback(() => {
    if (!gameOver) setRunning(true)
  }, [gameOver])

  const pause = useCallback(() => setRunning(false), [])

  useEffect(() => {
    if (!running || gameOver) return
    const tick = () => {
      setSnake((prev) => {
        const head = prev[0]
        const dir = DIRS[dirRef.current]
        const nextHead = { x: head.x + dir.x, y: head.y + dir.y }

        // Wall collision
        if (nextHead.x < 0 || nextHead.y < 0 || nextHead.x >= boardSize || nextHead.y >= boardSize) {
          setGameOver(true)
          setRunning(false)
          return prev
        }
        // Self collision
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].x === nextHead.x && prev[i].y === nextHead.y) {
            setGameOver(true)
            setRunning(false)
            return prev
          }
        }

        const newSnake = [nextHead, ...prev]
        const ate = nextHead.x === food.x && nextHead.y === food.y
        if (ate) {
          setScore((s) => s + 10)
          // Increase difficulty gradually
          setSpeed((ms) => Math.max(70, Math.round(ms - 3)))
          setFood(randomFood(boardSize, newSnake))
          return newSnake
        } else {
          newSnake.pop()
          return newSnake
        }
      })
    }

    const id = setInterval(tick, speed)
    return () => clearInterval(id)
  }, [boardSize, food, gameOver, running, speed])

  // Ensure food is valid if snake changes drastically (like reset)
  useEffect(() => {
    setFood((f) => {
      const occupied = snake.some((s) => s.x === f.x && s.y === f.y)
      return occupied ? randomFood(boardSize, snake) : f
    })
  }, [boardSize, snake])

  return {
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
  }
}
