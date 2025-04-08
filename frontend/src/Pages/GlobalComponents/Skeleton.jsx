import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight } from "lucide-react"

export function SkeletonCard() {
  return (
    <div className="bg-gradient-to-br from-[rgba(24,18,45,0.59)] via-transparent to-brand1 w-full
      flex flex-col my-4 md:flex-row items-start md:items-center justify-between gap-4 md:gap-2 mx-4 p-4 
      border border-brand2 rounded-lg shadow-sm transition-transform duration-300 hover:scale-95">
      
      <div className="flex items-center gap-3">
        <Skeleton className="h-[50px] w-[50px] rounded-full bg-brand2" />
        <div className="text-left space-y-2">
          <Skeleton className="h-4 w-[180px] bg-brand2" />
          <Skeleton className="h-3 w-[140px] bg-brand2" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row z-20 items-start md:items-center gap-4">
        <Skeleton className="rounded-[26px] py-2 px-[30px] w-[120px] h-[36px] bg-brand2" />
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-[26px] py-2 px-[30px] w-[140px] h-[36px] bg-brand2" />
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
