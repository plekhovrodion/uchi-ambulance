"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RotateCcw, Sparkles, Trophy } from "lucide-react"

const BOARD_W = 300
const BOARD_H = 356
const BLOCK_H = 26
const DEPTH = 9
const BASE_W = 150
const PERFECT_TOLERANCE = 6
const VISIBLE_ROWS = 9
const BEST_KEY = "uchi-tower-best"
const COINS_KEY = "uchi-tower-coins"

interface Skin {
  front: string
  top: string
  side: string
  ink: string
}

const SKINS: Skin[] = [
  { front: "#ffcf24", top: "#ffe273", side: "#d3a600", ink: "#2b1c00" },
  { front: "#bdf829", top: "#d7fb74", side: "#92cc0d", ink: "#1c2a00" },
  { front: "#ff9ec4", top: "#ffc2db", side: "#d96e9b", ink: "#3c1023" },
  { front: "#6fc7ff", top: "#a5dcff", side: "#3b99d6", ink: "#032740" },
  { front: "#8b7bff", top: "#b2a6ff", side: "#5c4bd6", ink: "#ffffff" },
  { front: "#2f3a8f", top: "#4a57ba", side: "#1d2566", ink: "#ffffff" },
  { front: "#fe5c57", top: "#ff8d89", side: "#d13934", ink: "#ffffff" },
]

const LABELS = [
  "МАТЕМАТИКА",
  "ФИЗИКА",
  "РУССКИЙ",
  "АНГЛИЙСКИЙ",
  "ХИМИЯ",
  "БИОЛОГИЯ",
  "ГЕОМЕТРИЯ",
  "ИСТОРИЯ",
  "ОГЭ 2026",
  "ЕГЭ 2026",
  "ГЕОГРАФИЯ",
]

const skinFor = (n: number) => SKINS[n % SKINS.length]
const labelFor = (n: number) => LABELS[(n * 3) % LABELS.length]

/**
 * Progress lives outside React so it survives remounts and can be hydrated
 * without a server/client mismatch.
 */
function createPersistedNumber(key: string) {
  const listeners = new Set<() => void>()
  let cache: number | null = null

  return {
    getSnapshot() {
      if (cache === null) {
        if (typeof window === "undefined") return 0
        const raw = Number(window.localStorage.getItem(key))
        cache = Number.isFinite(raw) ? raw : 0
      }
      return cache
    },
    set(value: number) {
      cache = value
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, String(value))
      }
      listeners.forEach((listener) => listener())
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

const bestStore = createPersistedNumber(BEST_KEY)
const coinsStore = createPersistedNumber(COINS_KEY)
const serverSnapshot = () => 0

interface Block {
  id: number
  x: number
  w: number
  n: number
}

interface Scrap {
  id: number
  x: number
  y: number
  w: number
  n: number
  dir: number
}

interface Flash {
  id: number
  text: string
}

function Notebook({ w, n }: { w: number; n: number }) {
  const skin = skinFor(n)
  const label = labelFor(n)

  return (
    <div
      className="relative"
      style={{ width: w + DEPTH, height: BLOCK_H + DEPTH }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: skin.top,
          clipPath: `polygon(0px ${DEPTH}px, ${DEPTH}px 0px, ${w + DEPTH}px 0px, ${w}px ${DEPTH}px)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: skin.side,
          clipPath: `polygon(${w}px ${DEPTH}px, ${w + DEPTH}px 0px, ${w + DEPTH}px ${BLOCK_H}px, ${w}px ${BLOCK_H + DEPTH}px)`,
        }}
      />
      <div
        className="absolute flex items-center gap-1 overflow-hidden px-1"
        style={{
          left: 0,
          top: DEPTH,
          width: w,
          height: BLOCK_H,
          background: skin.front,
        }}
      >
        <span
          className="flex shrink-0 items-center gap-[3px] rounded-full bg-[#181433] px-[4px] py-[2px]"
          aria-hidden
        >
          <span className="block size-[4px] rounded-full bg-[#fe5c57]" />
          <span className="block h-[4px] w-[7px] rounded-[1px] bg-white/80" />
        </span>
        <span
          className="truncate font-semibold whitespace-nowrap"
          style={{ color: skin.ink, fontSize: 8, letterSpacing: 0.6 }}
        >
          {label}
        </span>
      </div>
      <div
        className="absolute bg-black/15"
        style={{ left: 0, top: DEPTH + BLOCK_H - 2, width: w, height: 2 }}
      />
    </div>
  )
}

export function NotebookTower() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 0, x: (BOARD_W - BASE_W) / 2, w: BASE_W, n: 0 },
  ])
  const [scraps, setScraps] = useState<Scrap[]>([])
  const [flashes, setFlashes] = useState<Flash[]>([])
  const [over, setOver] = useState(false)
  const [streak, setStreak] = useState(0)

  const coins = useSyncExternalStore(
    coinsStore.subscribe,
    coinsStore.getSnapshot,
    serverSnapshot
  )
  const best = useSyncExternalStore(
    bestStore.subscribe,
    bestStore.getSnapshot,
    serverSnapshot
  )

  const mx = useMotionValue((BOARD_W - BASE_W) / 2)
  const xRef = useRef((BOARD_W - BASE_W) / 2)
  const dirRef = useRef(1)

  const top = blocks[blocks.length - 1]
  const score = blocks.length - 1
  const topWidth = top.w

  useEffect(() => {
    if (over) return
    let raf = 0
    let prev = performance.now()
    const speed = Math.min(90 + score * 8, 265)
    const max = BOARD_W - topWidth

    const loop = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05)
      prev = now
      let next = xRef.current + dirRef.current * speed * dt
      if (next <= 0) {
        next = 0
        dirRef.current = 1
      } else if (next >= max) {
        next = max
        dirRef.current = -1
      }
      xRef.current = next
      mx.set(next)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [over, score, topWidth, mx])

  const addFlash = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setFlashes((prev) => [...prev, { id, text }])
    window.setTimeout(
      () => setFlashes((prev) => prev.filter((f) => f.id !== id)),
      900
    )
  }, [])

  const addScrap = useCallback((scrap: Scrap) => {
    setScraps((prev) => [...prev, scrap])
    window.setTimeout(
      () => setScraps((prev) => prev.filter((s) => s.id !== scrap.id)),
      1000
    )
  }, [])

  const saveRun = useCallback((finalScore: number) => {
    bestStore.set(Math.max(bestStore.getSnapshot(), finalScore))
  }, [])

  const drop = useCallback(() => {
    if (over) return

    const cursor = xRef.current
    const delta = cursor - top.x
    const overlap = top.w - Math.abs(delta)
    const nextIndex = blocks.length

    if (overlap <= 6) {
      addScrap({
        id: Date.now(),
        x: cursor,
        y: nextIndex * BLOCK_H,
        w: top.w,
        n: nextIndex,
        dir: delta > 0 ? 1 : -1,
      })
      setOver(true)
      setStreak(0)
      saveRun(score)
      return
    }

    const perfect = Math.abs(delta) <= PERFECT_TOLERANCE

    if (perfect) {
      setStreak((prev) => prev + 1)
      addFlash("Точно! +3 Чудо")
    } else {
      setStreak(0)
      addScrap({
        id: Date.now(),
        x: delta > 0 ? top.x + top.w : cursor,
        y: nextIndex * BLOCK_H - BLOCK_H,
        w: Math.abs(delta),
        n: nextIndex,
        dir: delta > 0 ? 1 : -1,
      })
    }

    const newW = perfect ? top.w : overlap
    const newX = perfect ? top.x : delta > 0 ? cursor : top.x

    setBlocks((prev) => [
      ...prev,
      { id: nextIndex, x: newX, w: newW, n: nextIndex },
    ])
    coinsStore.set(coinsStore.getSnapshot() + (perfect ? 3 : 1))

    const fromLeft = nextIndex % 2 === 0
    const startX = fromLeft ? 0 : BOARD_W - newW
    xRef.current = startX
    mx.set(startX)
    dirRef.current = fromLeft ? 1 : -1
  }, [over, top, blocks.length, score, addFlash, addScrap, saveRun, mx])

  const restart = useCallback(() => {
    const startX = (BOARD_W - BASE_W) / 2
    setBlocks([{ id: 0, x: startX, w: BASE_W, n: 0 }])
    setScraps([])
    setFlashes([])
    setStreak(0)
    setOver(false)
    xRef.current = startX
    mx.set(startX)
    dirRef.current = 1
  }, [mx])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.code !== "Enter") return
      event.preventDefault()
      if (over) restart()
      else drop()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [drop, restart, over])

  const cameraY = Math.max(0, (blocks.length - VISIBLE_ROWS) * BLOCK_H)

  return (
    <div className="flex flex-col rounded-2xl border border-border/50 bg-card/80 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="leading-tight font-semibold">Башня тетрадок</h3>
          <p className="text-xs text-muted-foreground">
            Ставь тетрадки ровно, пока ищем педагога
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3" />
            {coins}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
            <Trophy className="size-3 text-[#ffcf24]" />
            {best}
          </span>
        </div>
      </div>

      <div
        className="relative mx-auto w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#2a2168] to-[#16123a] ring-1 ring-white/10 ring-inset"
        style={{ maxWidth: BOARD_W + DEPTH, height: BOARD_H }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div className="mb-1 h-3 w-[85%] rounded-[100%] bg-black/40 blur-md" />
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-4"
          animate={{
            y: cameraY,
            rotate: over ? 1.5 : 0,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{ originY: 1, originX: 0.5 }}
        >
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              className="absolute"
              initial={index === 0 ? false : { scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.16 }}
              style={{ left: block.x, bottom: index * BLOCK_H }}
            >
              <Notebook w={block.w} n={block.n} />
            </motion.div>
          ))}

          {!over && (
            <motion.div
              className="absolute"
              style={{ x: mx, bottom: blocks.length * BLOCK_H + 8 }}
            >
              <Notebook w={topWidth} n={blocks.length} />
            </motion.div>
          )}

          <AnimatePresence>
            {scraps.map((scrap) => (
              <motion.div
                key={scrap.id}
                className="absolute"
                initial={{ y: 0, rotate: 0, opacity: 1 }}
                animate={{ y: 220, rotate: scrap.dir * 70, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeIn" }}
                style={{ left: scrap.x, bottom: scrap.y }}
              >
                <Notebook w={Math.max(scrap.w, 12)} n={scrap.n} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-3 flex flex-col items-center gap-1">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white/90">
            Этажей: {score}
          </span>
          <AnimatePresence>
            {flashes.map((flash) => (
              <motion.span
                key={flash.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: -6 }}
                exit={{ opacity: 0, y: -16 }}
                className="text-xs font-bold text-[#bdf829]"
              >
                {flash.text}
              </motion.span>
            ))}
          </AnimatePresence>
          {streak >= 2 && (
            <span className="text-[10px] font-semibold tracking-wide text-[#ffcf24]">
              {streak} подряд ровно
            </span>
          )}
        </div>

        {!over && (
          <button
            type="button"
            onPointerDown={drop}
            aria-label="Поставить тетрадку"
            className="absolute inset-0 z-10 cursor-pointer touch-none select-none"
          />
        )}

        {!over && score === 0 && (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs font-medium text-white/70"
          >
            Тапни, чтобы поставить тетрадку
          </motion.p>
        )}

        <AnimatePresence>
          {over && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#120f26]/85 px-6 text-center backdrop-blur-sm"
            >
              <p className="text-lg font-bold">Башня рассыпалась</p>
              <p className="text-sm text-muted-foreground">
                {score} {score === 1 ? "этаж" : score < 5 ? "этажа" : "этажей"}{" "}
                — рекорд {best}
              </p>
              <Button
                onClick={restart}
                className="mt-1 h-11 gap-2 rounded-full px-6 font-semibold"
              >
                <RotateCcw className="size-4" />
                Ещё раз
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
