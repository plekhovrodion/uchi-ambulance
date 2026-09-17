"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function SearchTransitionOverlay() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [opaque, setOpaque] = useState(false)

  useEffect(() => {
    const enter = () => {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setOpaque(true))
      })
    }

    window.addEventListener("uchi-search-enter", enter)
    return () => window.removeEventListener("uchi-search-enter", enter)
  }, [])

  useEffect(() => {
    if (!pathname.startsWith("/search") || !mounted) return

    setOpaque(false)
    const hide = window.setTimeout(() => setMounted(false), 500)
    return () => window.clearTimeout(hide)
  }, [pathname, mounted])

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[300] bg-white transition-opacity duration-500 ease-out"
      style={{ opacity: opaque ? 1 : 0 }}
    />
  )
}
