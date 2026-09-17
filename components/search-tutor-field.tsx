"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { TutorProfile } from "@/lib/tutors"
import { SEARCH_TUTORS } from "@/lib/tutors"
import { cn } from "@/lib/utils"

const FIRST_CYCLE_MS = 400
const ASK_MS = 5200
const DECLINE_TYPING_MS = 1100
const DECLINE_MS = 2200
const CYCLE_MS = ASK_MS + DECLINE_MS
const TICK_MS = 80

const DECLINE_REPLIES = [
  "Не смогу взять",
  "Сейчас занят",
  "Не успею",
  "На другом уроке",
]

const AVATAR_BACKGROUNDS = [
  "#ffffa3",
  "#ffc5c3",
  "#d5ecff",
  "#e6e2ff",
  "#eef9c7",
  "#ffe8c8",
  "#f5d4ff",
  "#d8f5e8",
] as const

const PERIPHERAL_SLOTS_MOBILE = [
  "left-[35.4%] top-[13.6%]",
  "left-[23.8%] top-[35.7%]",
  "left-[69.8%] top-[35.7%]",
  "right-[28.6%] top-[17.9%]",
] as const

const PERIPHERAL_SLOTS_DESKTOP = [
  "left-[26%] top-[11%] lg:left-[28%] lg:top-[12%]",
  "left-[63%] top-[13%] lg:left-[64%] lg:top-[13%]",
  "left-[73%] top-[51%] lg:left-[74%] lg:top-[52%]",
] as const

type CenterPhase = "asking" | "declined"

function avatarBackground(photo: string) {
  const match = photo.match(/tutor-(\d)\.png/)
  const index = match ? Number(match[1]) - 1 : 0
  return AVATAR_BACKGROUNDS[index % AVATAR_BACKGROUNDS.length]
}

function centerPhaseForAge(age: number): CenterPhase {
  return age < ASK_MS ? "asking" : "declined"
}

export function SearchTutorField({
  paused = false,
  avatarsVisible = true,
}: {
  paused?: boolean
  avatarsVisible?: boolean
}) {
  const reduced = Boolean(useReducedMotion())
  const clockRef = useRef(0)
  const [clock, setClock] = useState(0)

  useEffect(() => {
    if (paused) return

    const tick = window.setInterval(() => {
      clockRef.current += TICK_MS
      setClock(clockRef.current)
    }, TICK_MS)

    return () => window.clearInterval(tick)
  }, [paused])

  const cycleIndex = useMemo(() => {
    if (clock < FIRST_CYCLE_MS) return 0
    return Math.floor((clock - FIRST_CYCLE_MS) / CYCLE_MS)
  }, [clock])

  const cycleAge = useMemo(() => {
    if (clock < FIRST_CYCLE_MS) return 0
    return (clock - FIRST_CYCLE_MS) % CYCLE_MS
  }, [clock])

  const centerPhase = centerPhaseForAge(cycleAge)
  const centerTutor = SEARCH_TUTORS[cycleIndex % SEARCH_TUTORS.length]
  const declineReply = DECLINE_REPLIES[cycleIndex % DECLINE_REPLIES.length]

  const peripheralTutorsMobile = useMemo(
    () =>
      PERIPHERAL_SLOTS_MOBILE.map((slot, index) => ({
        slot,
        tutor: SEARCH_TUTORS[(cycleIndex + index + 1) % SEARCH_TUTORS.length],
      })),
    [cycleIndex]
  )

  const peripheralTutorsDesktop = useMemo(
    () =>
      PERIPHERAL_SLOTS_DESKTOP.map((slot, index) => ({
        slot,
        tutor: SEARCH_TUTORS[(cycleIndex + index + 1) % SEARCH_TUTORS.length],
      })),
    [cycleIndex]
  )

  const sceneClassName =
    "absolute left-1/2 top-0 w-[min(155vw,560px)] -translate-x-1/2 md:top-1/2 md:w-auto md:-translate-y-[calc(50%+60px)]"

  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 md:inset-0"
        aria-hidden
      >
        <div className={sceneClassName}>
          <RotatingRadar paused={paused} reduced={reduced} />
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-[15] md:inset-0"
        aria-hidden
        animate={{ opacity: avatarsVisible ? 1 : 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className={sceneClassName}>
          <div className="relative aspect-square w-full md:aspect-auto">
            <div className="absolute inset-0 md:relative md:size-[min(108vmin,920px)]">
              {peripheralTutorsMobile.map(({ slot, tutor }, index) => (
                <PeripheralAvatar
                  key={`mobile-${slot}-${index}`}
                  tutor={tutor}
                  className={cn(slot, "md:hidden")}
                  sizeClass="size-12"
                />
              ))}

              {peripheralTutorsDesktop.map(({ slot, tutor }, index) => (
                <PeripheralAvatar
                  key={`desktop-${slot}-${index}`}
                  tutor={tutor}
                  className={cn(slot, "hidden md:block")}
                  sizeClass="size-[78px]"
                />
              ))}

              <AnimatePresence mode="wait">
                <CenterTutorPin
                  key={cycleIndex}
                  tutor={centerTutor}
                  phase={centerPhase}
                  declineAge={Math.max(0, cycleAge - ASK_MS)}
                  reply={declineReply}
                  paused={paused}
                  reduced={reduced}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

function RotatingRadar({
  paused,
  reduced,
}: {
  paused: boolean
  reduced: boolean
}) {
  return (
    <div
      className={cn(
        "search-radar",
        paused && "search-radar--paused",
        reduced && "search-radar--reduced"
      )}
    >
      <div className="search-radar__reticle" aria-hidden />
      <div className="search-radar__pulses" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="search-radar__scanner" />
      <ul className="search-radar__blips">
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>
  )
}

function AvatarCircle({
  tutor,
  sizeClass,
  className,
}: {
  tutor: TutorProfile
  sizeClass: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full",
        sizeClass,
        className
      )}
      style={{ backgroundColor: avatarBackground(tutor.photo) }}
    >
      <Image
        src={tutor.photo}
        alt=""
        fill
        sizes="(max-width: 767px) 48px, 144px"
        className="object-cover object-center"
      />
    </div>
  )
}

function PeripheralAvatar({
  tutor,
  className,
  sizeClass,
}: {
  tutor: TutorProfile
  className: string
  sizeClass: string
}) {
  return (
    <div className={cn("absolute -translate-x-1/2 -translate-y-1/2", className)}>
      <AvatarCircle tutor={tutor} sizeClass={sizeClass} />
    </div>
  )
}

function CenterTutorPin({
  tutor,
  phase,
  declineAge,
  reply,
  paused,
  reduced,
}: {
  tutor: TutorProfile
  phase: CenterPhase
  declineAge: number
  reply: string
  paused: boolean
  reduced: boolean
}) {
  const isAsking = phase === "asking"
  const isDeclined = phase === "declined"
  const showTyping =
    isDeclined && !reduced && declineAge < DECLINE_TYPING_MS
  const showReplyText = isDeclined && (reduced || declineAge >= DECLINE_TYPING_MS)

  const bubblePositionClassName =
    "absolute bottom-[calc(100%+12px)] left-1/2 z-20 max-w-[calc(100vw-2rem)] -translate-x-1/2"

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
      initial={{ opacity: 1, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, y: -12 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="relative shrink-0 size-20 md:size-36">
        <AnimatePresence mode="wait">
          {isDeclined ? (
            <motion.div
              key="decline-bubble"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={bubblePositionClassName}
            >
              <AnimatePresence mode="wait">
                {showTyping ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DeclineTypingBubble reduced={reduced} />
                  </motion.div>
                ) : showReplyText ? (
                  <motion.div
                    key="reply-text"
                    initial={{ opacity: 0, y: reduced ? 0 : -6, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  >
                    <DeclineTextBubble reply={reply} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AvatarCircle tutor={tutor} sizeClass="size-full" />

        <AnimatePresence mode="wait">
          {isAsking ? (
            <motion.span
              key="asking"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
              className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full bg-white p-0.5 shadow-[0_4px_16px_rgba(15,23,42,0.12)] md:size-7"
            >
              <Image
                src="/search/status-spinner.svg"
                alt=""
                width={24}
                height={24}
                className={cn(
                  "size-5 md:size-6",
                  !paused && !reduced && "animate-spin"
                )}
              />
            </motion.span>
          ) : isDeclined ? (
            <motion.span
              key="declined"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 520, damping: 22 }}
              className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full bg-white p-0.5 shadow-[0_4px_16px_rgba(15,23,42,0.12)] md:size-7"
            >
              <Image
                src="/search/close.svg"
                alt=""
                width={24}
                height={24}
                className="size-5 md:size-6"
              />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function DeclineBubbleShell({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
      {children}
      <span className="absolute top-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-white" />
    </span>
  )
}

function DeclineTypingBubble({ reduced }: { reduced: boolean }) {
  return (
    <DeclineBubbleShell>
      <span className="flex h-5 min-w-[53px] items-center justify-center gap-1.5">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="size-[7px] rounded-full bg-primary"
            animate={reduced ? { y: 0 } : { y: [0, -5, 0] }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: 0.55,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.12,
                  }
            }
          />
        ))}
      </span>
    </DeclineBubbleShell>
  )
}

function DeclineTextBubble({ reply }: { reply: string }) {
  return (
    <DeclineBubbleShell>
      <span className="text-base leading-normal whitespace-nowrap text-secondary">
        {reply}
      </span>
    </DeclineBubbleShell>
  )
}
