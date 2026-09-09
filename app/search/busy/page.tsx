"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Clock, Bell, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function SearchBusyPage() {
  const handleLeaveRequest = () => {
    toast.success("Заявка принята", {
      description: "Мы сообщим, когда освободится педагог.",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-md flex-col items-center rounded-2xl border border-border/50 bg-card/80 p-8 text-center backdrop-blur"
    >
      <div className="mb-6 rounded-full bg-amber-500/10 p-4 text-amber-500">
        <Clock className="size-8" />
      </div>
      <h1 className="text-2xl font-bold">Сейчас все специалисты заняты</h1>
      <p className="mt-3 text-muted-foreground">
        Оставьте заявку — мы пришлём уведомление, когда освободится окно. Или
        попробуйте позже.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        <Button
          size="lg"
          onClick={handleLeaveRequest}
          className="h-12 w-full gap-2 rounded-full text-base font-semibold"
        >
          <Bell className="size-5" />
          Мы сообщим когда освободится педагог
        </Button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-11 w-full gap-2 rounded-full text-muted-foreground"
          )}
        >
          <ArrowLeft className="size-4" />
          Попробовать позже
        </Link>
      </div>
    </motion.div>
  )
}
