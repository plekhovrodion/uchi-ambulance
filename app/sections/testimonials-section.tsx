"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Дима",
    role: "9 класс, ОГЭ",
    quote:
      "Сидел над дискриминантом час. Педагог объяснил за 5 минут — и я понял логику, а не просто списал ответ.",
  },
  {
    name: "Алиса",
    role: "10 класс",
    quote:
      "Не понял задачу по органике. Педагог нарисовал схему реакции и объяснил механизм. Сдал на следующий день.",
  },
  {
    name: "Артём",
    role: "11 класс, ЕГЭ",
    quote:
      "Запутался во временах. Педагог скинул таблицу-подсказку и показал на примерах. Сразу всё встало на места.",
  },
]

export function TestimonialsSection() {
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
            Уже помогли
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/60 backdrop-blur">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <Quote className="size-8 text-primary/60" />
                  <p className="flex-1 text-lg leading-relaxed text-foreground/90">
                    {item.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
