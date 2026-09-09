"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Search,
  Video,
  BookOpen,
  ClipboardCheck,
  Gamepad2,
} from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Поиск репетитора",
    description:
      "Подберём свободного специалиста. Поиск займёт не больше 1 минуты.",
  },
  {
    icon: Video,
    title: "Видеосвязь с педагогом",
    description:
      "Как только найдём — сразу подключишься к видеозвонку.",
  },
  {
    icon: BookOpen,
    title: "Решение твоего задания",
    description:
      "Вместе разберёте задачу: педагог объяснит логику, а не просто даст ответ.",
  },
]

export default function SearchIntroPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-xl flex-col items-center"
    >
      <Badge
        variant="secondary"
        className="gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary"
      >
        Шаг 1 из 2
      </Badge>

      <h1 className="mt-8 text-center text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
        Сейчас будет поиск репетитора
      </h1>

      <p className="mt-4 max-w-lg text-center text-lg leading-relaxed text-muted-foreground">
        Дальше всё просто — держи задание под рукой.
      </p>

      <ol className="mt-10 w-full">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </div>
              {index < steps.length - 1 ? (
                <div className="my-1 w-px flex-1 bg-border" />
              ) : null}
            </div>
            <div className={index < steps.length - 1 ? "pb-6" : "pb-0"}>
              <p className="font-semibold">
                {index + 1}. {step.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex w-full gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
        <ClipboardCheck className="mt-0.5 size-5 shrink-0 text-amber-500" />
        <div>
          <p className="font-semibold">Подготовь задание</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Фото, скриншот или учебник — чтобы сразу показать педагогу на видео.
          </p>
        </div>
      </div>

      <Link
        href="/search/loading"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-10 h-14 w-full gap-2 rounded-full px-8 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
        )}
      >
        <Search className="size-5" />
        Искать репетитора
      </Link>

      <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Gamepad2 className="size-4 text-accent" />
        Пока ищем — можно поиграть
      </p>
    </motion.div>
  )
}
