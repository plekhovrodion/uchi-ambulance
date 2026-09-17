import Image from "next/image"
import { cn } from "@/lib/utils"
import type { TutorProfile } from "@/lib/tutors"

export function TutorAvatar({
  tutor,
  size = "md",
  className,
  dimmed,
}: {
  tutor: Pick<TutorProfile, "name" | "photo">
  size?: "sm" | "md" | "lg"
  className?: string
  dimmed?: boolean
}) {
  const sizes = {
    sm: "size-12 text-sm",
    md: "size-14 text-base",
    lg: "size-20 text-xl",
  }

  const px = {
    sm: 48,
    md: 56,
    lg: 80,
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full ring-2 ring-background",
        sizes[size],
        dimmed && "opacity-60 grayscale",
        className
      )}
    >
      <Image
        src={tutor.photo}
        alt={tutor.name}
        width={px[size]}
        height={px[size]}
        className="size-full object-cover"
      />
    </div>
  )
}
