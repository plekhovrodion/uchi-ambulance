"use client"

import Image from "next/image"
import { toast } from "sonner"

import { SearchStageShell } from "@/components/search-stage-shell"
import { SEARCH_TUTORS } from "@/lib/tutors"
import { pressScaleClass } from "@/lib/press-scale"
import { cn } from "@/lib/utils"

export default function SearchMatchPage() {
  const tutor = SEARCH_TUTORS[0]
  const firstName = tutor.name.split(" ")[0]

  const handleStart = () => {
    toast.info("Скоро — видеокабинет", {
      description: "Разбор откроется прямо здесь, в браузере.",
    })
  }

  return (
    <SearchStageShell contentClassName="justify-center pb-16">
      <div className="flex w-full max-w-[480px] flex-col items-center gap-6 text-center">
        <div className="relative size-[128px]">
          <div className="relative size-full overflow-hidden rounded-full bg-[#e6e2ff]">
            <Image
              src={tutor.photo}
              alt={tutor.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <div className="absolute -top-10 left-1/2 h-10 w-[53px] -translate-x-1/2">
            <Image
              src="/search/typing-dots.svg"
              alt=""
              fill
              sizes="53px"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <h1 className="font-heading text-[40px] leading-none md:text-[48px]">
            Репетитор найден
          </h1>
          <p className="font-sans text-[16px] leading-normal md:text-[18px]">
            {firstName} готова разобрать задание
          </p>
        </div>
        <button
          type="button"
          onClick={handleStart}
          className={cn(
            "inline-flex h-14 items-center justify-center rounded-lg bg-landing-pink px-6 font-sans text-[16px] font-bold text-white",
            pressScaleClass
          )}
        >
          Начать занятие
        </button>
      </div>
    </SearchStageShell>
  )
}
