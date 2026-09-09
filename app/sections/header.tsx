"use client"

import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Учи.ру"
            width={142}
            height={22}
            priority
            className="h-7 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/search" className="transition-colors hover:text-foreground">
            Найти репетитора
          </Link>
        </nav>
      </div>
    </header>
  )
}
