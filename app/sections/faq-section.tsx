"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Это для ОГЭ и ЕГЭ?",
    answer:
      "Да. И для экзаменов, и для сложных тем в течение года. Разбираем конкретное задание — прототип, вторую часть, домашку — а не весь курс.",
  },
  {
    question: "Это замена обычному репетитору?",
    answer:
      "Нет, это скорая помощь. Репетитор нужен на длинную дистанцию. Мы — когда застрял прямо сейчас и нельзя ждать до четверга.",
  },
  {
    question: "А если я не пойму объяснение?",
    answer:
      "Педагог переформулирует столько раз, сколько нужно. Главное — чтобы ты понял.",
  },
  {
    question: "Нужно что-то скачивать?",
    answer: "Нет. Всё работает в браузере. Открыл — и поехали.",
  },
  {
    question: "Это дорого?",
    answer:
      "Платишь только за разбор, когда застрял — не за абонемент на месяц. Первое занятие бесплатно.",
  },
  {
    question: "Вдруг педагог не сможет решить?",
    answer:
      "У нас математики, физики, русисты и англичане. Найдут подход к любой теме.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl leading-[0.95] tracking-tight sm:text-4xl">
            Популярные вопросы
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion defaultValue={[]} className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
