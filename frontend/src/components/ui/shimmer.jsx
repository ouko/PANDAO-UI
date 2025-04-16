import { cn } from "@/lib/utils"

export const Shimmer = ({ className }) => {
  return (
    <div className={cn("animate-pulse rounded-lg bg-gray-200/80", className)} />
  )
}

export const CardShimmer = () => {
  return (
    <div className="w-full rounded-lg border p-4 space-y-4">
      <Shimmer className="h-8 w-3/4" />
      <div className="space-y-2">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
      </div>
    </div>
  )
}
