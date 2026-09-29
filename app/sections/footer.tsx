import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative z-50 overflow-hidden bg-white px-5 pt-16 pb-[152px] md:px-10 xl:px-16">
      <div className="relative mx-auto flex w-full max-w-[1152px] flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
        <Image
          src="/landing/footer-logo.svg"
          alt="Учи.ру"
          width={180}
          height={28}
          className="h-7 w-[180px]"
        />
        <p className="font-sans text-[18px] leading-normal text-landing-ink">
          © 2026 UCHI.RU, ООО Учи.ру
        </p>
      </div>
      <Image
        src="/landing/footer-eyes.svg"
        alt=""
        width={250}
        height={114}
        className="pointer-events-none absolute bottom-0 left-1/2 h-[114px] w-[250px] -translate-x-1/2"
      />
    </footer>
  )
}
