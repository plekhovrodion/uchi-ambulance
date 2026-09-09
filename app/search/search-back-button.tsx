"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function SearchBackButton() {
  const segment = useSelectedLayoutSegment()
  const href = segment ? "/search" : "/"

  return (
    <Link
      href={href}
      className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" />
      Назад
    </Link>
  )
}
