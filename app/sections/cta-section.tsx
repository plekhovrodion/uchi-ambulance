"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 p-10 text-center md:p-16"
        >
          <div className="absolute inset-0 -z-10 bg-card/40 backdrop-blur" />
          <h2 className="text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
            Получи объяснение сейчас
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Первое занятие бесплатно. Никаких обязательств и долгих регистраций.
          </p>
          <Link
            href="/search"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-14 gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/80"
            )}
          >
            <Zap className="size-5" />
            Попробовать бесплатно
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
