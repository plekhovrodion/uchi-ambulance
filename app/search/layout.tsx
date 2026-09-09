import { SearchBackButton } from "./search-back-button"

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative flex min-h-screen flex-col bg-background px-4 pt-20 pb-12">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      <SearchBackButton />

      <div className="m-auto w-full">{children}</div>
    </main>
  )
}
