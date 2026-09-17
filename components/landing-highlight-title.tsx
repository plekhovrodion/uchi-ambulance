import { cn } from "@/lib/utils"

type LandingHighlightTitleProps = {
  before?: string
  highlight: string
  className?: string
  highlightClassName?: string
  as?: "h1" | "h2"
}

export function LandingHighlightTitle({
  before,
  highlight,
  className,
  highlightClassName = "bg-landing-yellow",
  as: Tag = "h2",
}: LandingHighlightTitleProps) {
  return (
    <Tag
      className={cn(
        "text-center font-heading text-[48px] leading-none uppercase md:text-[64px] xl:text-[80px]",
        className
      )}
    >
      {before ? `${before} ` : null}
      <span className="relative inline-block">
        <span
          aria-hidden
          className={cn(
            "absolute -inset-x-1 top-[6%] bottom-[2%] -rotate-1",
            highlightClassName
          )}
        />
        <span className="relative">{highlight}</span>
      </span>
    </Tag>
  )
}
