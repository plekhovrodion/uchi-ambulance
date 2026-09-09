"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Wallet, Focus } from "lucide-react"

const points = [
  {
    icon: CalendarClock,
    title: "Не ждать неделю",
    description:
      "Обычный репетитор запишет на четверг. Мы подключаем живого педагога примерно за 5 минут.",
  },
  {
    icon: Wallet,
    title: "Платишь только за застрявшее",
    description:
      "Не покупаешь 8 часов в неделю, если нужна одна тема. Разобрал — и пошёл дальше.",
  },
  {
    icon: Focus,
    title: "Не весь учебник",
    description:
      "Конкретная задача ОГЭ, прототип ЕГЭ или домашка, которая не сходится. Без курса на год.",
  },
]

export function CompareSection() {
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
            Не замена репетитору — скорая помощь
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Репетитор нужен на длинную дистанцию. Мы — когда застрял прямо
            сейчас.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/60 backdrop-blur">
                <CardHeader>
                  <div className="mb-2 w-fit rounded-xl bg-accent/15 p-3 text-accent">
                    <item.icon className="size-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
