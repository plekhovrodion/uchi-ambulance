import Image from "next/image"

import { LandingCtaButton } from "@/components/landing-cta-button"
import { LandingInView } from "@/components/landing-in-view"

export function CTASection() {
  return (
    <section className="relative z-40 -mt-6 overflow-hidden rounded-t-[24px] bg-landing-purple px-5 pt-20 pb-24 md:px-10 md:pt-24 md:pb-[120px] xl:px-16 xl:pt-32 xl:pb-[152px]">
      <Image
        src="/landing/cta-union.svg"
        alt=""
        width={2299}
        height={472}
        className="pointer-events-none absolute top-[100px] left-1/2 h-[472px] w-[2299px] max-w-none -translate-x-1/2"
      />

      <div className="relative mx-auto flex w-full max-w-[1152px] flex-col items-center">
        <LandingInView>
          <h2 className="mb-6 text-center font-heading text-[56px] leading-none text-white uppercase md:text-[72px] xl:mb-10 xl:text-[90px]">
            первое занятие
            <br />
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute -inset-x-2 top-[6%] bottom-[2%] -rotate-1 bg-landing-pink"
              />
              <span className="relative">бесплатно</span>
            </span>
          </h2>
        </LandingInView>
        <LandingInView delay={0.12}>
          <LandingCtaButton />
        </LandingInView>
      </div>
    </section>
  )
}
