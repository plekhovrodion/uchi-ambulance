"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useReducedMotion } from "framer-motion"
import type { MouseEvent, ReactNode } from "react"

import { pressScaleClass } from "@/lib/press-scale"
import { cn } from "@/lib/utils"

const TRANSITION_MS = 480

export function SearchEntryLink({
  href = "/search/loading",
  className,
  children,
}: {
  href?: string
  className?: string
  children: ReactNode
}) {
  const router = useRouter()
  const reduced = Boolean(useReducedMotion())

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()

    if (reduced) {
      router.push(href)
      return
    }

    window.dispatchEvent(new Event("uchi-search-enter"))
    window.setTimeout(() => {
      router.push(href)
    }, TRANSITION_MS)
  }

  return (
    <Link href={href} onClick={handleClick} className={cn(pressScaleClass, className)}>
      {children}
    </Link>
  )
}
