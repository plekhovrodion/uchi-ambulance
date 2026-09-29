import { SearchStageShell } from "@/components/search-stage-shell"
import { SearchStartPanel } from "@/components/search-start-panel"

export default function SearchStartPage() {
  return (
    <SearchStageShell contentClassName="justify-center pb-16">
      <SearchStartPanel href="/search/loading" />
    </SearchStageShell>
  )
}
