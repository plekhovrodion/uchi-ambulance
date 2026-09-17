"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"

function backHref(pathname: string) {
  if (pathname === "/search/loading") return "/"
  return "/"
}

export function SearchBackButton() {
  const pathname = usePathname()
  const href = backHref(pathname)

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
