"use client"

import { ReactLenis } from "lenis/react"
import { useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

import "lenis/dist/lenis.css"

export function LandingSmoothScroll({ children }: { children: ReactNode }) {
  const reduced = Boolean(useReducedMotion())

  if (reduced) {
    return children
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        anchors: true,
        smoothWheel: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
