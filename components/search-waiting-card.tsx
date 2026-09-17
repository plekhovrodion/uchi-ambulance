"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { TutorProfile } from "@/lib/tutors"
import { cn } from "@/lib/utils"

export function SearchWaitingCard({
  tutor,
  paused = false,
  compact = false,
}: {
  tutor: TutorProfile
  paused?: boolean
  compact?: boolean
}) {
  const reduced = Boolean(useReducedMotion())
  const cutout = tutor.photo.startsWith("/search/")

  return (
    <div
      className={cn(
        "relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[24px] bg-accent",
        !compact && "min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]"
      )}
    >
      <SearchBackdrop paused={paused} reduced={reduced} />

      <div className="relative z-10 flex flex-col items-center gap-6 p-8">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/search/spinner.svg"
            alt=""
            width={24}
            height={24}
            className={cn("size-6", !paused && !reduced && "animate-spin")}
          />
          <p
            className={cn(
              "font-heading leading-none text-white",
              compact ? "text-xl sm:text-2xl" : "text-2xl"
            )}
          >
            {paused ? "Поиск приостановлен" : "Ждём ответа"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tutor.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex w-full min-w-0 flex-col items-center gap-6"
          >
            <h2
              className={cn(
                "w-full min-w-0 px-3 text-center font-heading leading-[0.95] text-white",
                compact
                  ? "text-[22px] sm:text-[32px]"
                  : "text-[24px] sm:text-[44px] lg:text-[56px]"
              )}
            >
              {tutor.name}
            </h2>
            <div
              className={cn(
                "flex w-full min-w-0 flex-wrap items-start justify-center gap-x-4 gap-y-1 px-4 text-center leading-[1.5] text-white",
                compact ? "text-xs sm:text-sm" : "text-sm sm:text-lg"
              )}
            >
              <p>Опыт {tutor.experience}</p>
              <p>Рейтинг {tutor.rating}</p>
              <p>{tutor.grades}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[68%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tutor.photo}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={tutor.photo}
              alt={tutor.name}
              fill
              priority
              sizes={compact ? "320px" : "(max-width: 1024px) 100vw, 50vw"}
              className={
                cutout
                  ? "object-contain object-bottom"
                  : "object-cover object-[center_18%]"
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function SearchBackdrop({
  paused,
  reduced,
}: {
  paused: boolean
  reduced: boolean
}) {
  const idle = reduced || paused

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -inset-[18%]"
        animate={
          idle
            ? { x: 0, y: 0, scale: 1, rotate: 0 }
            : {
                x: ["-3%", "5%", "-1%"],
                y: ["2%", "-6%", "3%"],
                scale: [1.02, 1.1, 1.04],
                rotate: [0, 4, -2, 0],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/search/union.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </motion.div>

      {reduced ? null : (
        <>
          <motion.div
            className="absolute top-[18%] -left-16 size-[280px] rounded-full bg-white/30 blur-3xl"
            animate={
              paused
                ? { opacity: 0.28 }
                : {
                    x: [0, 90, 10],
                    y: [0, 50, -30],
                    opacity: [0.22, 0.5, 0.28],
                  }
            }
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-40px] bottom-8 size-[240px] rounded-full bg-[#ffcf24]/35 blur-3xl"
            animate={
              paused
                ? { opacity: 0.2 }
                : {
                    x: [0, -70, 16],
                    y: [0, -60, 24],
                    opacity: [0.18, 0.42, 0.22],
                  }
            }
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full w-1/3 bg-white/20 blur-2xl"
            animate={
              paused
                ? { x: "-40%", opacity: 0 }
                : { x: ["-130%", "240%"], opacity: [0, 0.45, 0] }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  )
}
