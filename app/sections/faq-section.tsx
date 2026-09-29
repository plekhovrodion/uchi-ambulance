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
      "Обычно в течение 5 минут в часы работы. В пиковые моменты ожидание может быть немного дольше. Мы стараемся найти свободного специалиста как можно быстрее.",
  },
  {
    question: "Это заменит обычного репетитора?",
    answer:
      "Нет, обычный репетитор занимается системной подготовкой ученика. А наш сервис решает конкретный срочный вопрос: объяснить сложную тему, помочь с домашним заданием или ответить на вопрос перед контрольной.",
  },
  {
    question: "Сколько длится занятие?",
    answer:
      "Обычно от 20 до 30 минут — этого достаточно, чтобы разобрать конкретный вопрос. Если тема окажется сложнее и потребует больше времени, педагог подскажет, как действовать дальше.",
  },
  {
    question: "С чем помогает экспресс-репетитор",
    answer:
      "Педагог поможет решить домашнее задание, нагнать упущенный материал, ответить на вопросы по контрольной работе.",
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
    <section className="relative z-50 -mt-6 overflow-hidden rounded-t-[24px] bg-white px-5 pt-20 pb-6 md:px-10 md:pt-24 xl:px-16 xl:pt-32">
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
