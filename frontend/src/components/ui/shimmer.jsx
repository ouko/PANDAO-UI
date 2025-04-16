import { cn } from "@/lib/utils"

export const Shimmer = ({ className }) => {
  return (
    <div className={cn("animate-pulse rounded-lg bg-gray-200/80", className)} />
  )
}

export const CardShimmer = () => {
  return (
    <div className="w-full h-[300px] rounded-lg border border-brand4 p-4 space-y-4">
      <Shimmer className="h-10 w-3/4 bg-brand2" />
      <div className="space-y-2">
        <Shimmer className="h-4 w-full bg-brand2" />
        <Shimmer className="h-4 w-5/6 bg-brand2" />
      </div>
      <div className="space-y-2 pt-10">
        <Shimmer className="h-4 w-5/6 bg-brand2" />
        <Shimmer className="h-4 w-5/6 bg-brand2" />
      </div>
    </div>
  )
}
