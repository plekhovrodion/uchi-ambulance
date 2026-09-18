"use client"

import { motion, useReducedMotion } from "framer-motion"

import { LandingCtaButton } from "@/components/landing-cta-button"
import { LandingShareButton } from "@/components/landing-share-button"

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
          className="w-full max-w-full font-heading text-[56px] leading-none text-white uppercase md:text-[72px] xl:text-[90px]"
          {...fadeUp(0.05)}
        >
          Репетитор
          <br />
          по ОГЭ и ЕГЭ
          <br />
          за 5 минут
        </motion.h1>
        <motion.p
          className="w-full max-w-[480px] font-sans text-[18px] leading-normal text-white md:text-[20px]"
          {...fadeUp(0.15)}
        >
          За 20–30 минут репетитор объяснит
          <br className="hidden md:inline" /> решение конкретной задачи
        </motion.p>

        <motion.div
          className="absolute top-0 right-0 hidden origin-center rotate-8 md:flex md:flex-col md:items-center"
          {...fadeUp(0.25)}
        >
          <div className="bg-landing-yellow px-3 py-1">
            <p className="font-heading text-[56px] leading-none text-landing-ink uppercase xl:text-[64px]">
              от 250 ₽
            </p>
          </div>
          <div className="bg-landing-yellow px-6 py-1">
            <p className="font-sans text-[16px] leading-normal text-landing-ink xl:text-[18px]">
              за занятие
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex w-full items-center justify-center gap-3 md:w-auto md:justify-start"
        {...fadeUp(0.3)}
      >
        <LandingCtaButton className="relative z-10 min-w-0 flex-1 md:w-auto md:flex-initial" />
        <LandingShareButton />
      </motion.div>
    </>
  )
}
