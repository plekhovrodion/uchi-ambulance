import Image from "next/image"

import { LandingHighlightTitle } from "@/components/landing-highlight-title"
import { LandingInView } from "@/components/landing-in-view"
import { WhyTiltCard } from "@/components/why-tilt-card"
import { cn } from "@/lib/utils"

const cards = [
  {
    title: "Дешевле в 4 раза",
    body: "Одно занятие с репетитором от 1400 ₽. Экспресс-репетитор от 250 ₽ за занятие",
    image: "/landing/why-1.avif",
    dark: false,
  },
  {
    title: "Без ожидания",
    body: "Репетитор подключится за 5 минут",
    image: "/landing/why-2.avif",
    dark: false,
  },
  {
    title: "Свободный график",
    body: "Занимайся когда удобно",
    image: "/landing/why-3.avif",
    dark: true,
  },
] as const

export function WhySection() {
  return (
    <section className="relative z-10 -mt-6 overflow-hidden rounded-t-[24px] bg-white px-5 pt-20 pb-24 md:px-10 md:pt-24 md:pb-[120px] xl:px-16 xl:pt-32 xl:pb-[152px]">
      <div className="mx-auto w-full max-w-[1152px]">
        <LandingInView className="mb-6 flex justify-center xl:mb-10">
          <LandingHighlightTitle
            before="Почему стоит"
            highlight="попробовать"
            className="text-landing-ink"
          />
        </LandingInView>

        <div className="grid grid-cols-1 gap-6 [perspective:800px] xl:grid-cols-3 xl:gap-4">
          {cards.map((card, index) => (
            <LandingInView key={card.title} delay={index * 0.08}>
              <WhyTiltCard className="flex h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl p-6 xl:h-[400px] xl:rounded-3xl">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 370px, 100vw"
                  className="object-cover"
                />
                <div
                  className={cn(
                    "relative z-10 flex w-full flex-col items-center text-center",
                    card.dark ? "text-landing-dark-green" : "text-white"
                  )}
                  style={{ transform: "translateZ(64px)" }}
                >
                  <h3 className="mb-3 font-heading text-[40px] leading-none uppercase xl:mb-4 xl:text-[48px]">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[16px] leading-normal xl:text-[20px]">
                    {card.body}
                  </p>
                </div>
              </WhyTiltCard>
            </LandingInView>
          ))}
        </div>
      </div>
    </section>
  )
}
