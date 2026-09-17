"use client"

import Image from "next/image"
import { useLenis } from "lenis/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LandingHighlightTitle } from "@/components/landing-highlight-title"
import { LandingInView } from "@/components/landing-in-view"
import { pressScaleClass } from "@/lib/press-scale"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Как быстро подключается педагог?",
    answer:
      "Обычно в течение 5 минут в часы работы. Если все специалисты заняты, предложим оставить заявку",
  },
  {
    question: "Это заменит репетитора?",
    answer:
      "Нет. Репетитор — для системной подготовки. Мы — для конкретной задачи здесь и сейчас. Это дополнение, а не замена",
  },
  {
    question: "Можно вернуть деньги?",
    answer: "Да, если занятие не состоялось или качество не устроило",
  },
  {
    question: "Педагог может дать свои контакты?",
    answer:
      "Нет. Все коммуникации проходят только через платформу. Педагогам запрещено передавать личные контакты",
  },
]

function FaqIcon() {
  return (
    <span className="relative size-6 shrink-0">
      <span className="absolute inset-0 group-aria-expanded/accordion-trigger:hidden">
        <Image
          src="/landing/faq-minus.svg"
          alt=""
          width={24}
          height={24}
          className="absolute inset-0 size-6"
        />
        <Image
          src="/landing/faq-minus.svg"
          alt=""
          width={24}
          height={24}
          className="absolute inset-0 size-6 rotate-90"
        />
      </span>
      <Image
        src="/landing/faq-minus.svg"
        alt=""
        width={24}
        height={24}
        className="absolute inset-0 hidden size-6 group-aria-expanded/accordion-trigger:block"
      />
    </span>
  )
}

export function FAQSection() {
  const lenis = useLenis()

  return (
    <section className="sticky top-0 z-50 -mt-6 overflow-hidden rounded-t-[24px] bg-white px-5 pt-20 pb-6 md:px-10 md:pt-24 xl:px-16 xl:pt-32">
      <div className="mx-auto flex w-full max-w-[800px] flex-col items-center">
        <LandingInView className="mb-6 xl:mb-10">
          <LandingHighlightTitle
            before="Популярные"
            highlight="вопросы"
            className="text-landing-ink"
          />
        </LandingInView>

        <Accordion multiple className="w-full overflow-hidden rounded-[32px]">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-none"
            >
              <AccordionTrigger className="items-start gap-4 rounded-3xl px-6 py-4 text-left font-sans text-[20px] leading-normal font-bold text-landing-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                {faq.question}
                <FaqIcon />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 font-sans text-[18px] leading-normal text-landing-ink">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="pt-8">
          <button
            type="button"
            onClick={() => {
              if (lenis) {
                lenis.scrollTo(0, { duration: 1.4 })
                return
              }
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className={cn(
              "rounded-lg bg-white px-6 py-4 font-sans text-[16px] leading-normal font-bold text-landing-pink",
              pressScaleClass
            )}
          >
            Вернуться наверх
          </button>
        </div>
      </div>
    </section>
  )
}
