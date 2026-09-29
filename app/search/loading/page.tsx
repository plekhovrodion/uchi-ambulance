"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { SearchStageShell } from "@/components/search-stage-shell"
import { SearchStartPanel } from "@/components/search-start-panel"
import { SearchTutorField } from "@/components/search-tutor-field"
import { pressScaleClass } from "@/lib/press-scale"
import { cn } from "@/lib/utils"

const SEARCH_DURATION = 180

function StopSearchModal({
  reduced,
  md,
  onContinue,
  onCancel,
}: {
  reduced: boolean
  md: boolean
  onContinue: () => void
  onCancel: () => void
}) {
  return (
    <motion.div
      className="pointer-events-auto absolute inset-0 flex items-end justify-center bg-landing-ink/40 backdrop-blur-[16px] md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.22 }}
    >
      <motion.div
        className="flex w-full flex-col gap-6 rounded-t-3xl bg-white p-6 md:w-[460px] md:rounded-3xl"
        initial={
          reduced
            ? { opacity: 1, y: 0, scale: 1 }
            : md
              ? { opacity: 0, y: 12, scale: 0.96 }
              : { opacity: 0, y: 48, scale: 1 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          reduced
            ? { opacity: 1, y: 0, scale: 1 }
            : md
              ? { opacity: 0, y: 8, scale: 0.98 }
              : { opacity: 0, y: 40, scale: 1 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 34 }
        }
      >
        <p className="font-sans text-[24px] leading-[1.4] font-bold text-landing-ink">
          Вы уверены, что хотите отменить поиск?
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <button
            type="button"
            onClick={onContinue}
            className={cn(
              "flex h-14 flex-1 items-center justify-center rounded-lg bg-[#f5f5f8] px-6 font-sans text-[16px] font-bold text-landing-ink",
              pressScaleClass
            )}
          >
            Продолжить поиск
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "flex h-14 flex-1 items-center justify-center rounded-lg bg-landing-purple px-6 font-sans text-[16px] font-bold text-white",
              pressScaleClass
            )}
          >
            Отменить
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

function useMdUp() {
  const [md, setMd] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const onChange = () => setMd(query.matches)
    onChange()
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return md
}

export default function SearchLoadingPage() {
  const router = useRouter()
  const reduced = Boolean(useReducedMotion())
  const md = useMdUp()
  const [elapsed, setElapsed] = useState(0)
  const [paused, setPaused] = useState(false)
  const [stopModalOpen, setStopModalOpen] = useState(false)

  useEffect(() => {
    if (paused || elapsed >= SEARCH_DURATION) return

    const ticker = setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(ticker)
  }, [paused, elapsed])

  useEffect(() => {
    if (paused || elapsed < SEARCH_DURATION) return
    router.push("/search/busy")
  }, [paused, elapsed, router])

  const confirmStop = () => {
    setStopModalOpen(false)
    setPaused(true)
  }

  if (paused) {
    return (
      <SearchStageShell contentClassName="justify-center pb-16">
        <SearchStartPanel onStart={() => setPaused(false)} />
      </SearchStageShell>
    )
  }

  return (
    <SearchStageShell
      background={
        <>
          <SearchTutorField paused={false} avatarsVisible />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,white_10%,rgba(255,255,255,0.55)_28%,transparent_58%)]"
          />
        </>
      }
      contentClassName="justify-end md:pb-16"
      overlay={
        <AnimatePresence>
          {stopModalOpen ? (
            <StopSearchModal
              key="stop-search"
              reduced={reduced}
              md={md}
              onContinue={() => setStopModalOpen(false)}
              onCancel={confirmStop}
            />
          ) : null}
        </AnimatePresence>
      }
    >
      <div className="flex w-full max-w-[600px] flex-col items-center gap-6 text-center">
        <div className="flex w-full flex-col items-center gap-2">
          <h1 className="font-heading text-[40px] leading-none md:text-[56px]">
            Поиск репетитора {formatElapsed(elapsed)}
          </h1>
          <p className="max-w-[600px] font-sans text-[16px] leading-normal md:text-[18px]">
            Это займёт не больше 5 минут. Подготовьте пока задание и тему,
            которые нужно разобрать
          </p>
        </div>

        <button
          type="button"
          onClick={() => setStopModalOpen(true)}
          className={cn(
            "inline-flex h-14 items-center gap-2 rounded-lg bg-[#f5f5f8] py-4 pr-6 pl-4 font-sans text-[16px] leading-normal font-bold text-landing-ink",
            pressScaleClass
          )}
        >
          <Image
            src="/search/pause.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
          Остановить поиск
        </button>
      </div>

    </SearchStageShell>
  )
}
