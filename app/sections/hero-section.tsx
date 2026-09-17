import Image from "next/image"

import { LandingHeroIntro } from "@/components/landing-hero-intro"

export function HeroSection() {
  return (
    <section className="sticky top-0 z-0 flex h-svh flex-col bg-landing-purple px-5 pt-20 md:block md:h-auto md:px-10 md:pt-24 md:pb-[120px] xl:px-16 xl:pt-32 xl:pb-[152px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="landing-hero-union absolute top-[186px] left-1/2 h-[408px] w-[1864px] max-w-none -translate-x-[calc(50%+480px)] md:top-[214px] md:h-[586px] md:w-[2858px] md:-translate-x-[calc(50%+435px)] xl:top-[248px] xl:h-[472px] xl:w-[2299px] xl:-translate-x-1/2">
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

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-[1152px] shrink-0 flex-col items-center gap-6 md:min-h-[560px] md:items-start md:justify-between md:gap-0 xl:min-h-[520px]">
        <LandingHeroIntro />
      </div>

      <div className="pointer-events-none relative min-h-0 flex-1 overflow-visible md:contents">
        <div className="absolute inset-x-0 top-0 -bottom-14 overflow-visible md:inset-auto md:right-[-339px] md:bottom-0 md:top-auto md:h-[560px] md:w-[900px] xl:right-auto xl:bottom-6 xl:left-[calc(50%+231px)] xl:h-[640px] xl:w-[1024px] xl:-translate-x-1/2">
          <div className="relative h-full w-[155%] max-w-none -translate-x-[18%] md:w-full md:translate-x-0">
            <div className="landing-hero-photo relative h-full w-full">
              <Image
                src="/landing/hero.avif"
                alt=""
                fill
                sizes="(min-width: 1280px) 1024px, (min-width: 768px) 900px, 160vw"
                priority
                className="-scale-x-100 object-contain object-bottom md:object-cover md:object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
