import { SearchEntryLink } from "@/components/search-entry-link"
import { cn } from "@/lib/utils"

export function LandingCtaButton({
  className,
  fullWidth,
  freeBadge,
}: {
  className?: string
  fullWidth?: boolean
  freeBadge?: boolean
}) {
  return (
    <SearchEntryLink
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg bg-landing-pink px-10 py-5 font-heading text-[24px] leading-none text-white md:text-[28px] xl:text-[32px]",
        fullWidth && "w-full",
        className
      )}
    >
      Найти репетитора
      {freeBadge ? (
        <span className="pointer-events-none absolute -top-[11px] -right-1 rotate-2 bg-white px-1 font-sans text-[14px] leading-5 font-bold tracking-[-0.14px] text-landing-ink">
          Бесплатно
        </span>
      ) : null}
    </SearchEntryLink>
  )
}
