import Image from "next/image"

export function LandingHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex w-full max-w-[100vw] flex-col items-center overflow-x-clip">
      <div className="h-2 w-full bg-white" />
      <div className="relative h-8 w-[170px]">
        <Image
          src="/landing/header-tab.svg"
          alt="Учи.ру"
          width={202}
          height={32}
          priority
          className="absolute inset-y-0 -left-[16px] h-8 w-[202px] max-w-none"
        />
      </div>
      <Image
        src="/landing/header-corner-left.svg"
        alt=""
        width={24}
        height={24}
        className="absolute top-2 left-0 size-6 -scale-y-100 rotate-180"
      />
      <Image
        src="/landing/header-corner-right.svg"
        alt=""
        width={24}
        height={24}
        className="absolute top-2 right-0 size-6"
      />
    </header>
  )
}
