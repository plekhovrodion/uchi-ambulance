"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, VideoOff, Timer } from "lucide-react"

const fits = [
  {
    icon: BookOpen,
    title: "Не можешь решить задачу",
    description: "Застрял на примере и не понимаешь, с какой стороны подойти.",
  },
  {
    icon: VideoOff,
    title: "Видео не объясняют",
    description: "Пересмотрел ролики, но так и не уловил логику решения.",
  },
  {
    icon: Timer,
    title: "Дедлайн уже завтра",
    description: "Нужен живой человек, который разберёт прямо сейчас.",
  },
]

export function FitSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl leading-[0.95] tracking-tight sm:text-4xl">
            Тебе к нам, если...
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fits.map((fit, index) => (
            <motion.div
              key={fit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/60 backdrop-blur transition-colors hover:bg-card">
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <fit.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{fit.title}</h3>
                  <p className="text-muted-foreground">{fit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
