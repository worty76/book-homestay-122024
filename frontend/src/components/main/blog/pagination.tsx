import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="secondary" size="sm" className="bg-[#ff5533] text-white hover:bg-[#ff5533]/90">
        1
      </Button>
      <Button variant="ghost" size="sm">
        2
      </Button>
      <Button variant="ghost" size="sm">
        3
      </Button>
      <Button variant="ghost" size="sm">
        4
      </Button>
      <Button variant="ghost" size="sm">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

