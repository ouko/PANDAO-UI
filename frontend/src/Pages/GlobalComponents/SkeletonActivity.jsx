import { Skeleton } from "@/components/ui/skeleton"

export function  SkeletonActivity() {
  return (
    <div className="bg-gradient-to-br from-[rgba(24,18,45,0.59)] via-transparent to-brand1 w-full
      flex flex-col my-4 md:flex-row items-start md:items-center justify-between gap-4 md:gap-2 mx-4 p-4 
      border border-brand2 rounded-lg shadow-sm transition-transform duration-300 hover:scale-95">

      <Skeleton className="h-16 w-20 rounded-lg bg-brand2" />

      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-4 w-32 bg-brand3" /> 
            <Skeleton className="h-3 w-24 bg-brand2" /> 
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full bg-brand2" /> 
          <Skeleton className="h-3 w-24 bg-brand2" /> 
        </div>
      </div>
    </div>
  )
}
