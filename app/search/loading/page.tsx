"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { NotebookTower } from "@/components/notebook-tower"
import { TutorSearchMap } from "@/components/tutor-search-map"

const SEARCH_DURATION = 60

export default function SearchLoadingPage() {
  const router = useRouter()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const ticker = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 1, SEARCH_DURATION))
    }, 1000)

    const timeout = setTimeout(() => {
      router.push("/search/busy")
    }, SEARCH_DURATION * 1000)

    return () => {
      clearInterval(ticker)
      clearTimeout(timeout)
    }
  }, [router])

  const progress = (elapsed / SEARCH_DURATION) * 100
  const left = SEARCH_DURATION - elapsed

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-3xl"
    >
      <div className="rounded-2xl border border-border/50 bg-card/80 p-5 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-sm font-medium">Идёт поиск...</span>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full border border-primary/20 px-3 py-1 text-xs font-medium text-primary"
          >
            Шаг 2 из 2
          </Badge>
        </div>

        <h1 className="mt-2 text-2xl font-bold">Ищем свободного педагога</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Не закрывай экран — пока ищем, можно построить башню из тетрадок.
        </p>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {left > 0 ? `осталось ~${left} с` : "почти готово"}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TutorSearchMap />
        <NotebookTower />
      </div>
    </motion.div>
  )
}
