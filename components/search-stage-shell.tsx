import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { pressScaleClass } from "@/lib/press-scale"
import { cn } from "@/lib/utils"

export function SearchStageShell({
  children,
  background,
  contentClassName,
  overlay,
}: {
  children: ReactNode
  background?: ReactNode
  contentClassName?: string
  overlay?: ReactNode
}) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-white text-landing-ink">
      <Link
        href="/"
        aria-label="Назад"
        className={cn(
          "absolute top-4 left-4 z-30 flex size-14 items-center justify-center rounded-lg bg-[#f5f5f8]",
          pressScaleClass
        )}
      >
        <Image
          src="/search/back.svg"
          alt=""
          width={24}
          height={24}
          className="size-6"
        />
      </Link>

      {background}

      <div className="absolute top-8 right-0 left-0 z-20 flex justify-center px-5">
        <Image
          src="/logo.svg"
          alt="Учи.ру"
          width={134}
          height={20}
          priority
          className="h-5 w-[134px]"
        />
      </div>

      <div
        className={cn(
          "relative z-20 flex min-h-dvh flex-col items-center px-5 pt-20 pb-10 md:px-4",
          contentClassName
        )}
      >
        {children}
      </div>

      <div className="pointer-events-none fixed inset-0 z-50">{overlay}</div>
    </main>
  )
}
