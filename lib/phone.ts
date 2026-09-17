export function nationalDigits(value: string) {
  let digits = value.replace(/\D/g, "")
  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`
  }
  if (digits.length > 0 && !digits.startsWith("7")) {
    digits = `7${digits}`
  }
  return digits.slice(0, 11)
}

export function formatRuPhone(value: string) {
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

export function isValidRuPhone(value: string) {
  return nationalDigits(value).length === 11
}
