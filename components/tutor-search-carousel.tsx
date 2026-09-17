"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Pause, Star, X } from "lucide-react"
import { TutorAvatar } from "@/components/tutor-avatar"
import { SEARCH_TUTORS } from "@/lib/tutors"
import { cn } from "@/lib/utils"

const CARD_INTERVAL_MS = 4200

type CardPhase = "checking" | "busy"

export function TutorSearchCarousel({ paused = false }: { paused?: boolean }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<CardPhase>("checking")
  const [prevIndex, setPrevIndex] = useState<number | null>(null)

  useEffect(() => {
    if (paused) return

    const cycle = setInterval(() => {
      setPhase("checking")
      setIndex((current) => {
        setPrevIndex(current)
        return (current + 1) % SEARCH_TUTORS.length
      })
    }, CARD_INTERVAL_MS)

    return () => clearInterval(cycle)
  }, [paused])

  useEffect(() => {
    if (paused) return

    const busyTimer = setTimeout(() => {
      setPhase("busy")
    }, CARD_INTERVAL_MS * 0.72)

    return () => clearTimeout(busyTimer)
  }, [index, paused])

  const tutor = SEARCH_TUTORS[index]
  const prevTutor = prevIndex !== null ? SEARCH_TUTORS[prevIndex] : null

  return (
    <div className="relative flex min-h-[320px] flex-col">
      <p className="mb-3 text-sm font-medium text-muted-foreground">
        Перебираем дежурный пул
      </p>

      <div className="relative flex-1">
        <AnimatePresence mode="popLayout">
          {prevTutor && phase === "busy" ? (
            <motion.div
              key={`prev-${prevTutor.name}`}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0.35, y: -8, scale: 0.96 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-x-0 top-0 z-0"
            >
              <TutorCard tutor={prevTutor} phase="busy" dimmed />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={tutor.name}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10"
          >
            <TutorCard tutor={tutor} phase={phase} paused={paused} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {SEARCH_TUTORS.map((item, i) => (
          <span
            key={item.name}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  )
}

function TutorCard({
  tutor,
  phase,
  dimmed,
  paused,
}: {
  tutor: (typeof SEARCH_TUTORS)[number]
  phase: CardPhase
  dimmed?: boolean
  paused?: boolean
}) {
  const isChecking = phase === "checking" && !dimmed && !paused

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card/90 p-5 backdrop-blur transition-colors",
        isChecking
          ? "border-primary/40 ring-1 ring-primary/20"
          : dimmed
            ? "border-border/40"
            : "border-border/50"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <TutorAvatar tutor={tutor} size="md" dimmed={dimmed} />
          <div>
            <p className="font-semibold">{tutor.name}</p>
            <p className="text-sm text-primary">{tutor.subject}</p>
          </div>
        </div>

        <StatusBadge phase={dimmed ? "busy" : phase} paused={paused} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {tutor.about}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Опыт</dt>
          <dd className="mt-0.5 font-medium">{tutor.experience}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Рейтинг</dt>
          <dd className="mt-0.5 flex items-center gap-1 font-medium">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {tutor.rating}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Классы</dt>
          <dd className="mt-0.5 font-medium leading-snug">{tutor.grades}</dd>
        </div>
      </dl>
    </div>
  )
}

function StatusBadge({
  phase,
  paused,
}: {
  phase: CardPhase
  paused?: boolean
}) {
  if (paused) {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
        <Pause className="size-3" />
        Пауза
      </span>
    )
  }

  if (phase === "checking") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
        <Loader2 className="size-3 animate-spin" />
        Проверяем
      </span>
    )
  }

  return (
    <span className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
      <X className="size-3" />
      Занят
    </span>
  )
}
