import { SearchEntryLink } from "@/components/search-entry-link"
import { cn } from "@/lib/utils"

export function LandingCtaButton({
  className,
  fullWidth,
}: {
  className?: string
  fullWidth?: boolean
}) {
  return (
    <SearchEntryLink
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-landing-pink px-10 py-5 font-heading text-[24px] leading-none text-white md:text-[28px] xl:text-[32px]",
        fullWidth && "w-full",
        className
      )}
    >
      Найти репетитора
    </SearchEntryLink>
  )
}
