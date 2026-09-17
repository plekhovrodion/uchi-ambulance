import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SearchTransitionOverlay } from "@/components/search-transition-overlay"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const oceanic = localFont({
  src: "../public/fonts/OceanicGroteskCondensed-Extrabold.otf",
  variable: "--font-heading",
  display: "swap",
})

const factorA = localFont({
  src: [
    {
      path: "../public/fonts/FactorA-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FactorA-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = {
  title: "Репетитор по ОГЭ и ЕГЭ за 5 минут — экспресс-репетитор Учи.ру",
  description:
    "За 20–30 минут репетитор объяснит решение конкретной задачи. Без записи, от 250 ₽ за занятие. Первое занятие бесплатно.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn(
        "antialiased dark",
        oceanic.variable,
        factorA.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <SearchTransitionOverlay />
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
