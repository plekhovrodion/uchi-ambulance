import Image from "next/image"

import { LandingInView } from "@/components/landing-in-view"
import { SearchEntryLink } from "@/components/search-entry-link"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "1 месяц",
    lessons: "4 занятия",
    price: "1 500 ₽",
    featured: false,
    notch: true,
  },
  {
    name: "3 месяца",
    lessons: "24 занятия",
    price: "5 700 ₽",
    featured: true,
    notch: false,
  },
  {
    name: "6 месяцев",
    lessons: "48 занятий",
    price: "10 000 ₽",
    featured: false,
    notch: false,
  },
] as const

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-30 -mt-6 overflow-hidden rounded-t-[24px] bg-white px-5 pt-20 pb-24 md:px-10 md:pt-24 md:pb-[120px] xl:px-16 xl:pt-32 xl:pb-[152px]"
    >
      <div className="mx-auto w-full max-w-[1152px]">
        <LandingInView>
          <h2 className="mb-6 text-center font-heading text-[48px] leading-none text-landing-ink uppercase md:text-[64px] xl:mb-10 xl:text-[80px]">
            Сколько стоит?
          </h2>
        </LandingInView>

        <div className="flex flex-col gap-4 md:flex-row">
          {plans.map((plan, index) => (
            <LandingInView key={plan.name} delay={index * 0.08} className="flex flex-1">
            <article
              className={cn(
                "relative flex w-full flex-1 flex-col items-start gap-6 rounded-3xl p-6",
                plan.featured
                  ? "bg-landing-pink text-white"
                  : "bg-landing-soft-purple text-landing-ink"
              )}
            >
              {plan.notch ? (
                <Image
                  src="/landing/pricing-notch.svg"
                  alt=""
                  width={80}
                  height={22}
                  className="absolute -top-6 right-8 h-[22px] w-20"
                />
              ) : null}
              <div className="flex w-full items-end gap-1">
                <p className="min-w-0 flex-1 font-sans text-[16px] leading-normal font-bold md:text-[20px]">
                  {plan.name}
                </p>
                <p className="shrink-0 font-sans text-[16px] leading-normal md:text-[18px]">
                  {plan.lessons}
                </p>
              </div>
              <p className="font-heading text-[48px] leading-none">
                {plan.price}
              </p>
              <SearchEntryLink
                className={cn(
                  "flex w-full items-center justify-center rounded-lg px-6 py-4 font-sans text-[16px] leading-normal font-bold",
                  plan.featured
                    ? "bg-white text-landing-pink"
                    : "bg-landing-purple text-white"
                )}
              >
                К оплате
              </SearchEntryLink>
            </article>
            </LandingInView>
          ))}
        </div>
      </div>
    </section>
  )
}
