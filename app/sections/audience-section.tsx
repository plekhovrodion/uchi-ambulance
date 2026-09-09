"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Target, Puzzle } from "lucide-react"

const audiences = [
  {
    icon: GraduationCap,
    title: "ОГЭ",
    description:
      "Вторая часть, теория, которой нет в учебнике, и задания, на которых спотыкаешься перед пробником.",
  },
  {
    icon: Target,
    title: "ЕГЭ",
    description:
      "Прототипы, сложные темы и ночь перед работой. Разберём конкретный тип задания, а не весь учебник.",
  },
  {
    icon: Puzzle,
    title: "Сложные темы",
    description:
      "Дискриминант, органика, времена — всё, где видео уже пересмотрены, а логика так и не сложилась.",
  },
]

export function AudienceSection() {
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
            Для ОГЭ, ЕГЭ и сложных тем
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Не абонемент на год. Живой педагог, когда застрял на задании — хоть
            в девятом, хоть в выпускном.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/60 backdrop-blur transition-colors hover:bg-card">
                <CardHeader>
                  <div className="mb-2 w-fit rounded-xl bg-primary/10 p-3 text-primary">
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
