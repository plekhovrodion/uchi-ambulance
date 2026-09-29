"use client"

import { SearchBusyIcon } from "@/components/search-busy-icon"
import { SearchStageShell } from "@/components/search-stage-shell"

export default function SearchBusyPage() {
  return (
    <SearchStageShell contentClassName="justify-center pb-16">
      <div className="flex w-full max-w-[480px] flex-col items-center gap-6 text-center">
        <SearchBusyIcon />
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="font-heading text-[40px] leading-none md:text-[48px]">
            Сейчас все репетиторы заняты
          </h1>
          <p className="font-sans text-[16px] leading-normal md:text-[18px]">
            Попробуйте позже — как только кто-то освободится, вы сможете
            подключиться
          </p>
        </div>
      </div>
    </SearchStageShell>
  )
}
