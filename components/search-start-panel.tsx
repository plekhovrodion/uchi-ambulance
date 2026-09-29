import Image from "next/image"
import Link from "next/link"

import { pressScaleClass } from "@/lib/press-scale"
import { cn } from "@/lib/utils"

const START_AVATARS = [
  { photo: "/search/avatars/tutor-1.png", background: "#e6e2ff" },
  { photo: "/search/avatars/tutor-2.png", background: "#ffffa3" },
  { photo: "/search/avatars/tutor-4.png", background: "#ffc5c3" },
  { photo: "/search/avatars/tutor-3.png", background: "#eeffc5" },
] as const

const startButtonClassName = cn(
  "inline-flex h-14 items-center gap-2 rounded-lg bg-landing-purple py-4 pr-6 pl-4 font-sans text-[16px] leading-normal font-bold text-white",
  pressScaleClass
)

function StartButtonContent() {
  return (
    <>
      <Image
        src="/search/play.svg"
        alt=""
        width={24}
        height={24}
        className="size-6 brightness-0 invert"
      />
      Начать поиск
    </>
  )
}

export function SearchStartPanel({
  href,
  onStart,
}: {
  href?: string
  onStart?: () => void
}) {
  return (
    <div className="flex w-full max-w-[480px] flex-col items-center gap-6 text-center">
      <div className="flex items-start">
        {START_AVATARS.map((avatar, index) => (
          <div
            key={avatar.photo}
            className={cn(
              "relative size-20 overflow-hidden rounded-full border-2 border-white",
              index < START_AVATARS.length - 1 && "-mr-4"
            )}
            style={{ zIndex: index + 1, backgroundColor: avatar.background }}
          >
            <Image
              src={avatar.photo}
              alt=""
              fill
              sizes="80px"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <h1 className="font-heading text-[40px] leading-none md:text-[48px]">
          Поиск репетиторов
        </h1>
        <p className="font-sans text-[16px] leading-normal md:text-[18px] md:leading-[1.5]">
          Подключится и объяснит сложную тему или поможет с домашним заданием.
          Обычно это занимает до 5 минут
        </p>
      </div>
      {href ? (
        <Link href={href} className={startButtonClassName}>
          <StartButtonContent />
        </Link>
      ) : (
        <button type="button" onClick={onStart} className={startButtonClassName}>
          <StartButtonContent />
        </button>
      )}
    </div>
  )
}
