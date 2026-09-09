"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Первое пробное занятие",
    price: "Бесплатно",
    oldPrice: "-200₽",
    description: "Оцените сервис без обязательств.",
    cta: "Попробовать",
    href: "/search",
    primary: true,
  },
  {
    name: "1 занятие",
    price: "XX ₽",
    description: "Одна конкретная задача или тема.",
    cta: "Купить",
    href: "#",
    primary: false,
  },
  {
    name: "20 занятий",
    price: "XXX ₽",
    description: "Выгодный пакет для постоянной поддержки.",
    cta: "Купить",
    href: "#",
    primary: false,
  },
]

export function PricingSection() {
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
            Сколько стоит?
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`flex h-full flex-col border-border/50 ${
                  plan.primary
                    ? "relative overflow-visible bg-primary/5 ring-1 ring-primary/30"
                    : "bg-card/60 backdrop-blur"
                }`}
              >
                {plan.primary && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Попробовать бесплатно
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-muted-foreground">
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.oldPrice}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-muted-foreground">{plan.description}</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-primary" />
                      Живой педагог онлайн
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-primary" />
                      Разбор с объяснением
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link
                    href={plan.href}
                    className={cn(
                      buttonVariants({
                        variant: plan.primary ? "default" : "outline",
                      }),
                      "w-full rounded-full",
                      plan.primary
                        ? "bg-primary text-primary-foreground hover:bg-primary/80"
                        : "border-primary/30 hover:bg-primary/10"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
