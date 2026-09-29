"use client"

import { motion, useReducedMotion } from "framer-motion"

import { LandingCtaButton } from "@/components/landing-cta-button"

export function LandingHeroIntro() {
  const reduced = Boolean(useReducedMotion())

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }

  return (
    <>
      <div className="relative flex w-full min-w-0 flex-col items-center gap-4 text-center md:items-start md:text-left">
        <motion.h1
          className="w-full max-w-full font-heading text-[56px] leading-none text-white uppercase md:text-[72px] xl:text-[80px]"
          {...fadeUp(0.05)}
        >
          Поможем
          <br />
          с домашкой
          <br />
          за 5 минут
        </motion.h1>
        <motion.p
          className="w-full max-w-[480px] font-sans text-[18px] leading-normal text-white md:max-w-[360px] md:text-[20px] xl:max-w-[480px]"
          {...fadeUp(0.15)}
        >
          <span className="xl:hidden">
            За 20–30 минут репетитор объяснит
            <br className="hidden md:inline" /> решение конкретной задачи
          </span>
          <span className="hidden xl:inline">
            Экспресс-репетитор объяснит
            <br />
            решение конкретной задачи за 20 минут
          </span>
        </motion.p>
      </div>

      <motion.div {...fadeUp(0.3)}>
        <LandingCtaButton freeBadge fullWidth className="relative z-10 md:w-auto" />
      </motion.div>
    </>
  )
}
