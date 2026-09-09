"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Zap, Clock, Sparkles, Gamepad2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <Badge
            variant="secondary"
            className="mb-6 gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-2 text-sm font-medium text-primary"
          >
            <Zap className="size-4" />
            Экстренная
          </Badge>

          <h1 className="max-w-3xl text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Помощь репетитора
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Для ОГЭ, ЕГЭ и сложных тем. Живой педагог в кармане — без поиска,
            без записей, без обязательств.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 px-4 py-2 text-base font-semibold text-primary"
            >
              ОГЭ
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 px-4 py-2 text-base font-semibold text-primary"
            >
              ЕГЭ
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 px-4 py-2 text-base font-semibold text-primary"
            >
              Сложные темы
            </Badge>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-accent/30 px-4 py-2 text-base font-semibold text-accent"
            >
              <Sparkles className="size-4" />
              Первое занятие — 0₽
            </Badge>
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-primary/30 px-4 py-2 text-base font-semibold text-primary"
            >
              <Clock className="size-4" />~ 5 мин
            </Badge>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Link
              href="/search"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/80 hover:shadow-primary/30"
              )}
            >
              <Zap className="size-5" />
              Попробовать бесплатно
            </Link>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gamepad2 className="size-4 text-accent" />
              Пока ищем педагога — строишь башню из тетрадок
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
