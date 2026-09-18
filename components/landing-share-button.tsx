"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function getShareData() {
  return {
    title: "Экспресс-репетитор Учи.ру",
    text: "За 20–30 минут репетитор объяснит решение конкретной задачи. Первое занятие бесплатно.",
    url: typeof window !== "undefined" ? window.location.href : "",
  }
}

function shareTelegram(text: string, url: string) {
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  )
}

function shareWhatsApp(text: string, url: string) {
  window.open(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + url)}`,
    "_blank",
    "noopener,noreferrer"
  )
}

function shareEmail(subject: string, body: string) {
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

async function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard unavailable")
  }
  await navigator.clipboard.writeText(text)
}

type ShareMenuProps = {
  open: boolean
  onClose: () => void
}

function ShareMenu({ open, onClose }: ShareMenuProps) {
  useEffect(() => {
    if (!open) return
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handle)
    return () => document.removeEventListener("keydown", handle)
  }, [open, onClose])

  if (!open) return null

  const { title, text, url } = getShareData()
  const fullText = `${text}\n${url}`

  return (
    <div className="fixed inset-0 z-[200]" onClick={onClose}>
      <div
        className="absolute left-1/2 top-[calc(100%+8px)] z-10 w-[260px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#1e1a3d] p-2 shadow-xl md:left-auto md:right-0 md:translate-x-0"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={() => shareTelegram(text, url)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/10"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-[#24a1de]/15 text-[#24a1de]">
            <svg viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M21.7 4.44l-3.55 17.14c-.26 1.17-1.03 1.45-2.08.9L12.36 19.1l-2.28 2.27c-.25.26-.47.48-.96.48l.34-4.72 8.35-7.74c.36-.33-.08-.52-.56-.19l-10.3 6.78-4.43-1.39c-1.18-.37-1.2-1.18.24-1.75L20.4 3.48c.98-.37 1.84.24 1.52 1.73z" />
            </svg>
          </span>
          Telegram
        </button>
        <button
          onClick={() => shareWhatsApp(text, url)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/10"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-[#25d366]/15 text-[#25d366]">
            <svg viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M17.5 11.6c-.1-1.4-.8-2.6-1.9-3.4-.7-.5-1.5-.8-2.4-.8-2.3 0-4.1 1.8-4.1 4.1 0 .7.2 1.4.5 2l-.3 1.4 1.4-.3c.6.4 1.3.5 2 .5 2.2 0 4.1-1.8 4.1-4.1 0-.4 0-.7-.1-1.1l.8-.7zM12.2 18c-1.3 0-2.5-.4-3.5-1.1l-2.5.5.5-2.5c-.8-1.1-1.2-2.4-1.2-3.8 0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5h-.3z" />
            </svg>
          </span>
          WhatsApp
        </button>
        <button
          onClick={() => shareEmail(title, fullText)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/10"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white">
            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.5]">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </span>
          Email
        </button>
        <button
          onClick={async () => {
            await copyToClipboard(fullText)
            setCopied(true)
            onClose()
            setTimeout(() => setCopied(false), 1500)
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/10"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white">
            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.5]">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 012-2h10" />
            </svg>
          </span>
          Скопировать
        </button>
      </div>
    </div>
  )
}

type LandingShareButtonProps = {
  className?: string
}

export function LandingShareButton({ className }: LandingShareButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const data = getShareData()

    if (typeof navigator !== "undefined" && "share" in navigator && navigator.canShare?.({ url: data.url })) {
      try {
        await navigator.share({ title: data.title, text: data.text, url: data.url })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }
      }
    }

    setMenuOpen(true)
  }

  return (
    <div className={cn("relative inline-flex", className)}>
      <Button
        type="button"
        size="icon-lg"
        variant="secondary"
        aria-label="Поделиться"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={handleShare}
        className={cn(
          "rounded-xl bg-white/10 text-white backdrop-blur-sm transition",
          "hover:bg-white/20 active:scale-[0.98]",
          "focus-visible:ring-2 focus-visible:ring-white/30"
        )}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.5]">
            <path d="M5 12l5 5L20 7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.5]">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" />
            <line x1="15.5" y1="6.5" x2="8.5" y2="10.5" />
          </svg>
        )}
      </Button>
      <ShareMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
