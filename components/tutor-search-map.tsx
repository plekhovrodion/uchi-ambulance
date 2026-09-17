"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { GraduationCap, MapPin, Radar } from "lucide-react"
import { subjectMatchesPin, TUTOR_PINS } from "@/lib/tutors"

const BUILDINGS = [
  { x: 14, y: 18, w: 26, h: 16 },
  { x: 46, y: 14, w: 18, h: 22 },
  { x: 70, y: 22, w: 30, h: 14 },
  { x: 106, y: 12, w: 20, h: 20 },
  { x: 146, y: 18, w: 34, h: 16 },
  { x: 196, y: 14, w: 22, h: 22 },
  { x: 232, y: 20, w: 28, h: 14 },
  { x: 276, y: 16, w: 26, h: 20 },
  { x: 18, y: 92, w: 30, h: 18 },
  { x: 58, y: 96, w: 20, h: 14 },
  { x: 92, y: 90, w: 26, h: 22 },
  { x: 154, y: 94, w: 32, h: 16 },
  { x: 200, y: 88, w: 18, h: 24 },
  { x: 240, y: 96, w: 30, h: 14 },
  { x: 282, y: 90, w: 22, h: 20 },
  { x: 22, y: 158, w: 24, h: 18 },
  { x: 62, y: 162, w: 32, h: 14 },
  { x: 112, y: 156, w: 20, h: 22 },
  { x: 168, y: 160, w: 28, h: 16 },
  { x: 214, y: 154, w: 24, h: 22 },
  { x: 258, y: 162, w: 34, h: 14 },
]

function buildStatuses(subject?: string) {
  const base = [
    "Сканируем район…",
    "Смотрим, кто свободен",
    "Проверяем расписание",
    "Сверяем специализацию",
    "Готовим онлайн-кабинет",
  ]

  if (!subject) return base

  return [
    `Ищем педагога по ${subject}…`,
    ...base.slice(1),
  ]
}

export function TutorSearchMap({
  highlightSubject,
}: {
  highlightSubject?: string
}) {
  const pins = useMemo(() => {
    if (!highlightSubject) return TUTOR_PINS
    const matched = TUTOR_PINS.filter((pin) =>
      subjectMatchesPin(highlightSubject, pin.subject)
    )
    return matched.length > 0 ? matched : TUTOR_PINS
  }, [highlightSubject])

  const statuses = useMemo(
    () => buildStatuses(highlightSubject),
    [highlightSubject]
  )

  const [revealed, setRevealed] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)
  const [checking, setChecking] = useState(0)

  useEffect(() => {
    setRevealed(0)
    setChecking(0)
  }, [highlightSubject])

  useEffect(() => {
    const reveal = setInterval(() => {
      setRevealed((prev) => (prev >= pins.length ? prev : prev + 1))
    }, 1300)
    const status = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length)
    }, 2400)
    const check = setInterval(() => {
      setChecking((prev) => (prev + 1) % Math.max(pins.length, 1))
    }, 1500)

    return () => {
      clearInterval(reveal)
      clearInterval(status)
      clearInterval(check)
    }
  }, [pins.length, statuses.length])

  const visible = pins.slice(0, revealed)
  const activeCheck = revealed > 0 ? checking % revealed : -1
  const matchedCount = highlightSubject
    ? pins.filter((pin) => subjectMatchesPin(highlightSubject, pin.subject)).length
    : revealed

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h3 className="leading-tight font-semibold">
            {highlightSubject
              ? `Ищем педагога по ${highlightSubject}`
              : "Ищем педагога рядом"}
          </h3>
          <p className="text-xs text-muted-foreground">
            Дежурный пул специалистов
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
          <Radar className="size-3" />
          {highlightSubject ? matchedCount : revealed} рядом
        </span>
      </div>

      <div className="relative aspect-[8/5] w-full overflow-hidden rounded-xl bg-[#171238] ring-1 ring-white/10 ring-inset">
        <svg
          viewBox="0 0 320 200"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <rect width="320" height="200" fill="#171238" />

          <path
            d="M0 6 C60 24 92 0 140 18 C190 38 236 8 320 26 L320 0 L0 0 Z"
            fill="#1f1a4a"
          />
          <path
            d="M-10 128 C40 118 70 146 116 140 C170 133 206 158 260 148 C290 142 306 150 330 146 L330 168 C300 172 286 164 258 168 C204 178 168 154 114 160 C68 166 38 138 -10 148 Z"
            fill="#22336b"
            opacity="0.75"
          />

          <rect x="176" y="42" width="76" height="44" rx="10" fill="#1d3a2c" />
          <rect x="30" y="112" width="58" height="34" rx="10" fill="#1d3a2c" />

          <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
            {[24, 48, 72, 96, 120, 144, 168, 192].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="320" y2={y} />
            ))}
            {[32, 64, 96, 128, 160, 192, 224, 256, 288].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" />
            ))}
          </g>

          <g fill="#2c2560">
            {BUILDINGS.map((b) => (
              <rect
                key={`${b.x}-${b.y}`}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="3"
              />
            ))}
          </g>

          <g stroke="#3a3378" strokeLinecap="round" fill="none">
            <line x1="0" y1="60" x2="320" y2="60" strokeWidth="9" />
            <line x1="0" y1="142" x2="320" y2="142" strokeWidth="7" />
            <line x1="128" y1="0" x2="128" y2="200" strokeWidth="9" />
            <line x1="248" y1="0" x2="248" y2="200" strokeWidth="6" />
            <path d="M0 196 L104 96 L320 96" strokeWidth="5" />
          </g>

          <g
            stroke="#ada4ff"
            strokeOpacity="0.35"
            strokeDasharray="6 8"
            strokeLinecap="round"
            fill="none"
          >
            <line x1="0" y1="60" x2="320" y2="60" strokeWidth="1" />
            <line x1="128" y1="0" x2="128" y2="200" strokeWidth="1" />
          </g>
        </svg>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(102,86,247,0) 0deg, rgba(102,86,247,0.45) 34deg, rgba(189,248,41,0.18) 52deg, rgba(102,86,247,0) 72deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />

        {[0, 1, 2].map((ring) => (
          <motion.span
            key={ring}
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60"
            animate={{ scale: [0.4, 4.5], opacity: [0.55, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: ring,
              ease: "easeOut",
            }}
          />
        ))}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {visible.map((pin) => (
            <motion.path
              key={pin.name}
              d={`M50 50 L${pin.x} ${pin.y}`}
              fill="none"
              stroke="#ada4ff"
              strokeWidth="1"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 shadow-primary/40 ring-white/70">
            <MapPin className="size-4" />
          </div>
        </div>

        <AnimatePresence>
          {visible.map((pin, index) => {
            const isChecking = index === activeCheck
            const isMatch =
              !highlightSubject ||
              subjectMatchesPin(highlightSubject, pin.subject)

            return (
              <motion.div
                key={pin.name}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                initial={{ opacity: 0, scale: 0.2, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    {isChecking && (
                      <motion.span
                        className="absolute -inset-1.5 rounded-full border border-[#bdf829]"
                        animate={{
                          opacity: [0.9, 0.2, 0.9],
                          scale: [1, 1.15, 1],
                        }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    )}
                    <div
                      className={`flex size-7 items-center justify-center rounded-full text-white shadow-md ring-2 transition-colors ${
                        isChecking && isMatch
                          ? "bg-[#bdf829] text-[#1c2a00] ring-[#bdf829]/40"
                          : isMatch
                            ? "bg-accent ring-white/40"
                            : "bg-muted-foreground/60 ring-white/20"
                      }`}
                    >
                      <GraduationCap className="size-3.5" />
                    </div>
                  </div>
                  <span className="mt-1 rounded-full bg-black/55 px-1.5 py-[1px] text-[9px] font-medium whitespace-nowrap text-white/90">
                    {pin.subject}
                  </span>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-[#120f26] to-transparent px-3 pt-8 pb-2.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={statusIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-xs font-medium text-white/90"
            >
              {statuses[statusIndex]}
            </motion.span>
          </AnimatePresence>
          {activeCheck >= 0 && visible[activeCheck] ? (
            <span className="truncate text-[11px] text-muted-foreground">
              {visible[activeCheck].name}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
