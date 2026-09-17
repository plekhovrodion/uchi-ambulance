"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import type { MouseEvent, ReactNode } from "react"

import { cn } from "@/lib/utils"

export function WhyTiltCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = Boolean(useReducedMotion())
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const hover = useMotionValue(0)

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [20, -20]), {
    stiffness: 320,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 320,
    damping: 18,
  })
  const scale = useSpring(useTransform(hover, [0, 1], [1, 1.045]), {
    stiffness: 320,
    damping: 18,
  })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleEnter = () => {
    if (reduced) return
    hover.set(1)
  }

  const handleLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
    hover.set(0)
  }

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={
        reduced
          ? undefined
          : {
              rotateX,
              rotateY,
              scale,
              transformPerspective: 800,
              transformStyle: "preserve-3d",
            }
      }
      className={cn("relative transform-gpu", className)}
    >
      {children}
    </motion.article>
  )
}
