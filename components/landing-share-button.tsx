"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ShareOption = {
  id: string
  label: string
  bg: string
  text: string
  href: (text: string, url: string) => string
  icon: React.FC<{ className?: string }>
}

const VkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={cn("fill-current", className)}>
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.714-1.033-1.033-1.49-1.171-1.744-1.171-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.994 4 8.604c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.847 2.49 2.271 4.675 2.857 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.716-.576.716z" />
  </svg>
)

const MaxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={cn("fill-current", className)}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.3h-1.85c-.35 0-.46-.28-1.08-.96-.55-.55-.79-.62-.93-.62-.19 0-.24.05-.24.31v.88c0 .23-.07.36-.66.36-.98 0-2.07-.59-2.83-1.7-1.18-1.68-1.51-2.67-1.51-2.88 0-.13.05-.26.31-.26h.93c.23 0 .32.11.41.36.45 1.32 1.21 2.48 1.52 2.48.12 0 .17-.05.17-.35v-2.02c-.04-.63-.37-.68-.37-.91 0-.11.09-.22.23-.22h1.46c.2 0 .27.11.27.34v1.84c0 .2.09.27.14.27.12 0 .22-.07.43-.29.67-.75 1.14-1.9 1.14-1.9.06-.13.17-.26.41-.26h.93c.28 0 .34.14.28.34-.12.54-1.25 2.14-1.25 2.14-.1.16-.13.23 0 .41.1.13.42.42.64.67.4.45.7.83.78 1.09.09.25-.04.38-.31.38z" />
  </svg>
)

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={cn("fill-current", className)}>
    <path d="M21.7 4.44l-3.55 17.14c-.26 1.17-1.03 1.45-2.08.9L12.36 19.1l-2.28 2.27c-.25.26-.47.48-.96.48l.34-4.72 8.35-7.74c.36-.33-.08-.52-.56-.19l-10.3 6.78-4.43-1.39c-1.18-.37-1.2-1.18.24-1.75L20.4 3.48c.98-.37 1.84.24 1.52 1.73z" />
  </svg>
)

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={cn("fill-current", className)}>
    <path d="M17.5 11.6c-.1-1.4-.8-2.6-1.9-3.4-.7-.5-1.5-.8-2.4-.8-2.3 0-4.1 1.8-4.1 4.1 0 .7.2 1.4.5 2l-.3 1.4 1.4-.3c.6.4 1.3.5 2 .5 2.2 0 4.1-1.8 4.1-4.1 0-.4 0-.7-.1-1.1l.8-.7zM12.2 18c-1.3 0-2.5-.4-3.5-1.1l-2.5.5.5-2.5c-.8-1.1-1.2-2.4-1.2-3.8 0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5h-.3z" />
  </svg>
)

const SHARE_TEXT =
  "За 20–30 минут репетитор объяснит решение конкретной задачи. Первое занятие бесплатно."

const SHARE_OPTIONS: ShareOption[] = [
  {
    id: "vk",
    label: "ВКонтакте",
    bg: "bg-[#0077ff]/10",
    text: "text-[#0077ff]",
    href: (_text, url) => `https://vk.com/share.php?url=${encodeURIComponent(url)}`,
    icon: VkIcon,
  },
  {
    id: "max",
    label: "МАКС",
    bg: "bg-[#7b61ff]/10",
    text: "text-[#7b61ff]",
    href: (_text, url) => `https://max.ru/:share?text=${encodeURIComponent(url)}`,
    icon: MaxIcon,
  },
  {
    id: "telegram",
    label: "Telegram",
    bg: "bg-[#24a1de]/10",
    text: "text-[#24a1de]",
    href: (text, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    icon: TelegramIcon,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    bg: "bg-[#25d366]/10",
    text: "text-[#25d366]",
    href: (text, url) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + url)}`,
    icon: WhatsAppIcon,
  },
]

type LandingShareButtonProps = {
  className?: string
}

export function LandingShareButton({ className }: LandingShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        size="icon-lg"
        variant="secondary"
        aria-label="Поделиться"
        onClick={() => setOpen(true)}
        className={cn(
          "rounded-xl bg-white/10 text-white backdrop-blur-sm transition",
          "hover:bg-white/20 active:scale-[0.98]",
          "focus-visible:ring-2 focus-visible:ring-white/30",
          className
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5 fill-none stroke-current stroke-[1.5]"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" />
          <line x1="15.5" y1="6.5" x2="8.5" y2="10.5" />
        </svg>
      </Button>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] border-white/10 bg-[#1e1a3d] p-5 text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white">Поделиться</DialogTitle>
          <DialogDescription className="text-white/70">
            Отправьте ссылку удобным способом
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 pt-2">
          {SHARE_OPTIONS.map((option) => {
            const Icon = option.icon
            return (
              <a
                key={option.id}
                href={option.href(SHARE_TEXT, shareUrl)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-4 transition",
                  "hover:bg-white/10 active:scale-[0.98]",
                  option.bg
                )}
              >
                <Icon className={cn("size-7", option.text)} />
                <span className="text-sm font-medium text-white">
                  {option.label}
                </span>
              </a>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
