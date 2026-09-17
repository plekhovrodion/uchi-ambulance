"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { SearchStageShell } from "@/components/search-stage-shell"
import { SearchTutorField } from "@/components/search-tutor-field"
import { pressScaleClass } from "@/lib/press-scale"
import { SEARCH_TUTORS } from "@/lib/tutors"
import { cn } from "@/lib/utils"

const SEARCH_DURATION = 60

const AVATAR_BACKGROUNDS = [
  "#e6e2ff",
  "#ffffa3",
  "#ffc5c3",
  "#eef9c7",
] as const

function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

export default function SearchLoadingPage() {
  const router = useRouter()
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
        <div className="flex w-full max-w-[600px] flex-col items-center gap-6 text-center">
          <div className="flex items-start">
            {SEARCH_TUTORS.slice(0, 4).map((tutor, index) => (
              <div
                key={tutor.photo}
                className={cn(
                  "relative size-16 overflow-hidden rounded-full border-2 border-white md:size-20",
                  index < 3 && "-mr-4"
                )}
                style={{
                  zIndex: index + 1,
                  backgroundColor:
                    AVATAR_BACKGROUNDS[index % AVATAR_BACKGROUNDS.length],
                }}
              >
                <Image
                  src={tutor.photo}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <h1 className="font-heading text-[40px] leading-none md:text-[48px]">
              Поиск репетитора
            </h1>
            <p className="max-w-[600px] font-sans text-[16px] leading-normal md:text-[18px]">
              Подключится и объяснит сложную тему или поможет сделать домашку
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPaused(false)}
            className={cn(
              "inline-flex h-14 items-center gap-2 rounded-lg bg-landing-pink py-4 pr-6 pl-4 font-sans text-[16px] leading-normal font-bold text-white",
              pressScaleClass
            )}
          >
            <Image
              src="/search/play.svg"
              alt=""
              width={24}
              height={24}
              className="size-6 brightness-0 invert"
            />
            Начать поиск
          </button>
        </div>
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

      {stopModalOpen ? (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-landing-ink/40 backdrop-blur-[16px] md:items-center">
          <div className="flex w-full flex-col gap-6 rounded-t-3xl bg-white p-6 md:w-[460px] md:rounded-3xl">
            <p className="font-sans text-[24px] leading-[1.4] font-bold text-landing-ink">
              Вы уверены, что хотите отменить поиск?
            </p>
            <div className="flex flex-col gap-2 md:flex-row md:gap-2">
              <button
                type="button"
                onClick={() => setStopModalOpen(false)}
                className={cn(
                  "flex h-14 flex-1 items-center justify-center rounded-lg bg-[#f5f5f8] px-6 font-sans text-[16px] font-bold text-landing-ink",
                  pressScaleClass
                )}
              >
                Продолжить поиск
              </button>
              <button
                type="button"
                onClick={confirmStop}
                className={cn(
                  "flex h-14 flex-1 items-center justify-center rounded-lg bg-landing-purple px-6 font-sans text-[16px] font-bold text-white",
                  pressScaleClass
                )}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </SearchStageShell>
  )
}
