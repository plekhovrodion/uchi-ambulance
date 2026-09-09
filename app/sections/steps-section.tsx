"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Search, MonitorPlay } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: Send,
    title: "Отправить запрос",
    description:
      "Выберите предмет, укажите класс и кратко опиши задачу.",
  },
  {
    number: "2",
    icon: Search,
    title: "Поиск репетитора",
    description:
      "Система найдёт свободного педагога из дежурного пула.",
  },
  {
    number: "3",
    icon: MonitorPlay,
    title: "Онлайн разбор задачи",
    description:
      "Покажите задание через экран — педагог задаст наводящие вопросы и объяснит логику решения.",
  },
]

export function StepsSection() {
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
            Как это работает
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <Card className="relative h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur">
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                  {step.number}
                </div>
                <CardContent className="flex flex-col items-start gap-4 p-6 pt-10">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <step.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
