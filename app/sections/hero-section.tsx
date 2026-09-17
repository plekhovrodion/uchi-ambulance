import Image from "next/image"

import { LandingHeroIntro } from "@/components/landing-hero-intro"

export function HeroSection() {
  return (
    <section className="relative overflow-x-hidden bg-landing-purple px-5 pt-20 pb-[280px] md:px-10 md:pt-24 md:pb-[120px] xl:px-16 xl:pt-32 xl:pb-[152px]">
      <div className="pointer-events-none absolute top-[186px] left-1/2 h-[408px] w-[1864px] max-w-none -translate-x-[calc(50%+480px)] md:top-[214px] md:h-[586px] md:w-[2858px] md:-translate-x-[calc(50%+435px)] xl:top-[248px] xl:h-[472px] xl:w-[2299px] xl:-translate-x-1/2">
        <div className="landing-hero-union h-full w-full">
          <Image
            src="/landing/hero-union.svg"
            alt=""
            width={2299}
            height={472}
            priority
            className="h-full w-full max-w-none"
          />
        </div>
      </div>

      <div className="relative mx-auto flex w-full min-w-0 max-w-[1152px] flex-col items-center gap-6 md:min-h-[560px] md:items-start md:justify-between md:gap-0 xl:min-h-[520px]">
        <LandingHeroIntro />
      </div>

      <div className="pointer-events-none absolute -bottom-[50px] left-[calc(50%+32px)] h-[350px] w-[560px] -translate-x-1/2 md:right-[-339px] md:bottom-0 md:left-auto md:h-[560px] md:w-[900px] md:translate-x-0 xl:right-auto xl:bottom-6 xl:left-[calc(50%+231px)] xl:h-[640px] xl:w-[1024px] xl:-translate-x-1/2">
        <div className="landing-hero-photo relative h-full w-full">
          <Image
            src="/landing/hero.png"
            alt=""
            fill
            sizes="(min-width: 1280px) 1024px, (min-width: 768px) 900px, 560px"
            priority
            className="-scale-x-100 object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  )
}
