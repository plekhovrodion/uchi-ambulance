import Image from "next/image"

import { LandingInView } from "@/components/landing-in-view"

const steps = [
  {
    title: "запусти поиск репетитора",
    body: "Подключим свободного репетитора, обычно меньше минуты",
    images: ["/landing/how-1.avif"],
  },
  {
    title: "Расскажи про задание",
    body: "Можешь приложить фото, нарисовать или написать на интерактивной доске",
    images: ["/landing/how-2-base.avif", "/landing/how-2.avif"],
  },
  {
    title: "разбери вместе с репетитором",
    body: "Репетитор задаст наводящие вопросы и объяснит ход решения, чтобы разбирать следующие задания было легко",
    images: ["/landing/how-2-base.avif", "/landing/how-3.avif"],
  },
] as const

export function HowSection() {
  return (
    <section className="relative z-20 -mt-6 rounded-t-[24px] bg-landing-ink px-5 pt-20 pb-24 md:px-10 md:pt-24 md:pb-[120px] xl:px-16 xl:pt-32 xl:pb-[152px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[24px]">
        <Image
          src="/landing/how-bg.svg"
          alt=""
          width={2000}
          height={1990}
          className="absolute top-1/2 left-1/2 h-[1990px] w-[2000px] max-w-none -translate-x-1/2 -translate-y-1/2 -scale-y-100"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1152px]">
        <LandingInView>
          <h2 className="mb-6 text-center font-heading text-[48px] leading-none text-white uppercase md:text-[64px] xl:mb-10 xl:text-[80px]">
            Как это работает
          </h2>
        </LandingInView>

        <div className="relative isolate flex flex-col gap-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="sticky top-20 flex h-auto flex-col gap-4 rounded-3xl bg-landing-purple-dark p-4 md:top-24 md:h-[400px] md:flex-row xl:h-[480px]"
              style={{ zIndex: index + 1 }}
            >
              <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                <h3 className="mb-3 font-heading text-[32px] leading-none text-white uppercase md:text-[40px] xl:text-[56px]">
                  {step.title}
                </h3>
                <p className="font-sans text-[16px] leading-normal text-white md:text-[20px]">
                  {step.body}
                </p>
              </div>
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl md:min-h-0">
                {step.images.map((src, imageIndex) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={
                      imageIndex === 0 ? "object-cover" : "z-[1] object-cover"
                    }
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
