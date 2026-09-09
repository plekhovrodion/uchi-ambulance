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
import { cn } from "@/lib/utils"

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

function nationalDigits(value: string) {
  let digits = value.replace(/\D/g, "")
  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`
  }
  if (digits.length > 0 && !digits.startsWith("7")) {
    digits = `7${digits}`
  }
  return digits.slice(0, 11)
}

function formatRuPhone(value: string) {
  const digits = nationalDigits(value)
  if (!digits) return ""

  const rest = digits.slice(1)
  let formatted = "+7"
  if (rest.length === 0) return formatted
  formatted += ` (${rest.slice(0, 3)}`
  if (rest.length >= 3) formatted += ")"
  if (rest.length > 3) formatted += ` ${rest.slice(3, 6)}`
  if (rest.length > 6) formatted += `-${rest.slice(6, 8)}`
  if (rest.length > 8) formatted += `-${rest.slice(8, 10)}`
  return formatted
}

function isValidRuPhone(value: string) {
  return nationalDigits(value).length === 11
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
      description: "Пришлём уведомление на телефон, когда педагог будет свободен.",
    })
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "flex w-full flex-col items-center rounded-2xl border border-primary/20 bg-primary/10 p-5 text-center",
          className
        )}
      >
        <div className="rounded-full bg-primary/15 p-3 text-primary">
          <Check className="size-5" />
        </div>
        <p className="mt-3 font-semibold">Пришлём уведомление на телефон</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Напишем на {phone}, как только освободится педагог.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full rounded-2xl border border-border/50 bg-card/80 p-5 text-left backdrop-blur",
        className
      )}
    >
      <p className="font-semibold">Оставь контакты</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Пришлём уведомление на телефон, если педагог будет занят.
      </p>

      <FieldGroup className="mt-5 gap-4">
        <Field>
          <FieldLabel htmlFor="notify-name">Имя</FieldLabel>
          <Input
            id="notify-name"
            name="name"
            autoComplete="given-name"
            placeholder="Как к тебе обращаться"
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
            <FieldError>Введи номер, чтобы мы смогли написать в SMS</FieldError>
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
        className="mt-5 h-12 w-full rounded-full text-base font-semibold"
      >
        <Bell data-icon="inline-start" />
        Прислать уведомление
      </Button>
    </form>
  )
}
