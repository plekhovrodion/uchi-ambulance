import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
  title: "Экстренная помощь репетитора — ОГЭ, ЕГЭ и сложные темы",
  description:
    "Живой педагог в кармане для ОГЭ, ЕГЭ и сложных тем. Без поиска, без записей, без обязательств. Первое занятие бесплатно.",
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
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
