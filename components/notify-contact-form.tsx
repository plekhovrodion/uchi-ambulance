"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Bell, Check } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { pressScaleClass } from "@/lib/press-scale"
import { cn } from "@/lib/utils"
import { formatRuPhone, isValidRuPhone } from "@/lib/phone"
const STORAGE_KEY = "uchi-notify-contact"

type NotifyContact = {
  name: string
  phone: string
}

function readSaved(): NotifyContact | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as NotifyContact
    if (!parsed.phone) return null
    return parsed
  } catch {
    return null
  }
}

export function NotifyContactForm({ className }: { className?: string }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  useEffect(() => {
    const saved = readSaved()
    if (!saved) return
    setName(saved.name)
    setPhone(saved.phone)
    setSubmitted(true)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidRuPhone(phone)) {
      setPhoneError(true)
      return
    }

    const contact = { name: name.trim(), phone }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(contact))
    setSubmitted(true)
    toast.success("Номер сохранён", {
      description: "Пришлём SMS, когда педагог будет свободен.",
    })
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "flex w-full flex-col items-center rounded-3xl bg-[#f5f5f8] p-6 text-center text-landing-ink",
          className
        )}
      >
        <div className="rounded-full bg-landing-purple/15 p-3 text-landing-purple">
          <Check className="size-5" />
        </div>
        <p className="mt-3 font-sans text-[16px] font-bold">
          Пришлём уведомление на телефон
        </p>
        <p className="mt-1 font-sans text-sm text-landing-ink/70">
          Напишем на {phone}, как только освободится педагог.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full rounded-3xl bg-[#f5f5f8] p-6 text-left text-landing-ink",
        className
      )}
    >
      <p className="font-sans text-[16px] font-bold">Оставить контакты</p>
      <p className="mt-1 font-sans text-sm leading-relaxed text-landing-ink/70">
        Пришлём SMS, когда освободится педагог по вашему предмету.
      </p>

      <FieldGroup className="mt-5 gap-4">
        <Field>
          <FieldLabel htmlFor="notify-name">Ваше имя</FieldLabel>
          <Input
            id="notify-name"
            name="name"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11"
          />
        </Field>

        <Field data-invalid={phoneError || undefined}>
          <FieldLabel htmlFor="notify-phone">Телефон</FieldLabel>
          <Input
            id="notify-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (999) 123-45-67"
            value={phone}
            aria-invalid={phoneError || undefined}
            onChange={(event) => {
              setPhone(formatRuPhone(event.target.value))
              setPhoneError(false)
            }}
            className="h-11"
          />
          {phoneError ? (
            <FieldError>
              Введите номер, чтобы мы смогли написать в SMS
            </FieldError>
          ) : (
            <FieldDescription>
              Только телефон — на него придёт уведомление.
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className={cn(
          "mt-5 h-14 w-full rounded-lg bg-landing-pink text-base font-bold text-white hover:bg-landing-pink",
          pressScaleClass
        )}
      >
        <Bell data-icon="inline-start" />
        Прислать уведомление
      </Button>
    </form>
  )
}
