"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CircleHelp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TUTOR_HOUR_PRICE = 2000
const OUR_SESSION_PRICE = 490

type Goal = "oge" | "ege" | "topic"

const GOALS: { id: Goal; label: string }[] = [
  { id: "oge", label: "ОГЭ" },
  { id: "ege", label: "ЕГЭ" },
  { id: "topic", label: "Сложная тема" },
]

const TIERS: Record<
  Goal,
  { labels: string[]; hours: number[]; titles: string[]; hints: string[] }
> = {
  ege: {
    labels: ["70+", "80+", "90+"],
    hours: [16, 24, 32],
    titles: ["Для 70+ баллов", "Для 80+ баллов", "Для 90+ баллов"],
    hints: [
      "База и типовые задания второй части",
      "Прототипы и сложные темы",
      "Нестандартные и олимпиадные задания",
    ],
  },
  oge: {
    labels: ["сдать", "4+", "5"],
    hours: [8, 12, 16],
    titles: ["Чтобы сдать ОГЭ", "Для оценки 4+", "Для оценки 5"],
    hints: [
      "Закрыть пробелы перед экзаменом",
      "Уверенно решать вторую часть",
      "Сложные задания повышенного уровня",
    ],
  },
  topic: {
    labels: ["редко", "каждую неделю", "часто"],
    hours: [4, 8, 12],
    titles: ["Пара сложных тем", "Каждую неделю застреваю", "Тема совсем не идёт"],
    hints: [
      "Точечный разбор, без абонемента",
      "Регулярная поддержка по домашке",
      "Когда учебник и видео не помогают",
    ],
  },
}

function formatRub(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value)
}

function timesWord(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return "раз"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "раза"
  return "раз"
}

export function SavingsSection() {
  const [goal, setGoal] = useState<Goal>("ege")
  const [tier, setTier] = useState(1)

  const config = TIERS[goal]
  const hours = config.hours[tier]
  const tutorPrice = hours * TUTOR_HOUR_PRICE
  const ourPrice = hours * OUR_SESSION_PRICE
  const ratio = Math.max(2, Math.round(tutorPrice / ourPrice))

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
            Сравни стоимость: репетитор или мы
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Репетитор берёт за весь месяц. Мы — только за разборы, когда
            реально застрял.
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Card className="border-border/50 bg-card/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Выбери цель и узнай стоимость
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Что готовишь</FieldLabel>
                    <ToggleGroup
                      value={[goal]}
                      onValueChange={(next) => {
                        if (next[0]) setGoal(next[0] as Goal)
                      }}
                      variant="outline"
                      size="lg"
                      spacing={0}
                      className="w-full rounded-xl border border-border/50 bg-muted/40 p-1"
                    >
                      {GOALS.map((item) => (
                        <ToggleGroupItem
                          key={item.id}
                          value={item.id}
                          className="flex-1 rounded-lg px-3 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/80"
                        >
                          {item.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </Field>

                  <Field>
                    <FieldLabel>
                      {goal === "ege"
                        ? "Цель по баллам"
                        : goal === "oge"
                          ? "Какая оценка нужна"
                          : "Как часто застреваешь"}
                    </FieldLabel>
                    <Slider
                      min={0}
                      max={2}
                      step={1}
                      value={[tier]}
                      onValueChange={(next) => {
                        const value = Array.isArray(next) ? next[0] : next
                        setTier(value)
                      }}
                      aria-label="Интенсивность подготовки"
                    />
                    <div className="flex justify-between">
                      {config.labels.map((label, index) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setTier(index)}
                          className={cn(
                            "text-sm font-medium transition-colors",
                            tier === index
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="rounded-2xl bg-primary px-5 py-4 text-primary-foreground">
                    <p className="text-lg font-semibold">{config.titles[tier]}</p>
                    <p className="mt-1 flex items-start gap-2 text-sm text-primary-foreground/80">
                      <span>
                        {config.hints[tier]}. Нужно готовиться ≈ {hours}{" "}
                        {hours === 1 ? "час" : hours < 5 ? "часа" : "часов"} в
                        месяц.
                      </span>
                      <Tooltip>
                        <TooltipTrigger
                          className="mt-0.5 inline-flex shrink-0 rounded-full text-primary-foreground/80 outline-none hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
                          aria-label="Как считаем часы"
                        >
                          <CircleHelp className="size-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Считаем часы, которые обычно уходят на репетитора. С
                          нами платишь только за разборы, когда застрял — не за
                          весь абонемент.
                        </TooltipContent>
                      </Tooltip>
                    </p>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <Card className="relative z-10 w-[92%] border-border/50 bg-muted">
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">
                  Репетитор
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  ≈ {formatRub(tutorPrice)} ₽/мес
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {hours} ч × {formatRub(TUTOR_HOUR_PRICE)} ₽
                </p>
              </CardContent>
            </Card>

            <div className="relative z-20 -mt-4 ml-auto w-[92%]">
              <Badge className="absolute -top-3 right-6 z-30 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground shadow-lg">
                в {ratio} {timesWord(ratio)} дешевле, чем с репетитором
              </Badge>
              <Card className="border-transparent bg-chart-4 text-background">
                <CardHeader>
                  <CardTitle className="text-lg text-background/80">
                    Учи.ру
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {formatRub(ourPrice)} ₽/мес
                  </p>
                  <p className="mt-2 text-sm text-background/70">
                    {hours} разборов × {formatRub(OUR_SESSION_PRICE)} ₽
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ориентир: {formatRub(TUTOR_HOUR_PRICE)} ₽/час у репетитора и{" "}
          {formatRub(OUR_SESSION_PRICE)} ₽ за точечный разбор. Не абонемент на
          год — платишь, когда застрял.
        </p>
      </div>
    </section>
  )
}
