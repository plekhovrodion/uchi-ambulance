"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Image
            src="/logo.svg"
            alt="Учи.ру"
            width={142}
            height={22}
            className="h-7 w-auto"
          />
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Политика конфиденциальности
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Условия использования
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Поддержка
            </a>
          </nav>
        </div>
        <Separator className="my-6 bg-border/50" />
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Экстренная помощь репетитора. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
