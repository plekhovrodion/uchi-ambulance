import Image from "next/image"

export function SearchBusyIcon() {
  return (
    <div className="relative h-24 w-[128px]" aria-hidden>
      <Image
        src="/search/busy/left.svg"
        alt=""
        width={63}
        height={88}
        className="absolute top-0 left-0 h-[88px] w-[63px] origin-center rotate-[6.65deg]"
      />
      <Image
        src="/search/busy/lens.svg"
        alt=""
        width={48}
        height={48}
        className="absolute top-[39px] left-2 size-12"
      />
      <Image
        src="/search/busy/right.svg"
        alt=""
        width={67}
        height={90}
        className="absolute top-[6px] left-[61px] h-[90px] w-[67px]"
      />
      <Image
        src="/search/busy/spark.svg"
        alt=""
        width={18}
        height={17}
        className="absolute top-[37px] left-[55px] h-[17px] w-[18px]"
      />
      <Image
        src="/search/busy/gleam.svg"
        alt=""
        width={16}
        height={16}
        className="absolute top-[47px] left-[55px] size-4"
      />
    </div>
  )
}
