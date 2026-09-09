"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { NotifyContactForm } from "@/components/notify-contact-form"
import { cn } from "@/lib/utils"
import { Clock, ArrowLeft } from "lucide-react"

export default function SearchBusyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-md flex-col items-center"
    >
      <div className="mb-6 rounded-full bg-amber-500/10 p-4 text-amber-500">
        <Clock className="size-8" />
      </div>
      <h1 className="text-center text-2xl font-bold">
        Сейчас все специалисты заняты
      </h1>
      <p className="mt-3 text-center text-muted-foreground">
        Оставь контакты — пришлём уведомление на телефон, когда освободится
        педагог.
      </p>

      <NotifyContactForm className="mt-8" />

      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mt-3 h-11 w-full gap-2 rounded-full text-muted-foreground"
        )}
      >
        <ArrowLeft className="size-4" />
        Попробовать позже
      </Link>
    </motion.div>
  )
}
