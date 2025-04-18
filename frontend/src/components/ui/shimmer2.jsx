import { cn } from "@/lib/utils"
import { Shimmer } from "./shimmer"

export const Shimmer2 = ({ className }) => {
  return (
    <div className={cn("animate-pulse rounded-lg bg-gray-200/80", className)} />
  )
}

export const CardShimmer2 = () => {
  return (
    <div className="w-full h-[600px] rounded-lg border border-brand4 p-4 space-y-4">
      <Shimmer className="h-10 w-full bg-brand2" />
      <div className="space-y-2">
        <Shimmer className="h-4 w-full bg-brand2" />
        <Shimmer className="h-4 w-5/6 bg-brand2" />
      </div>

      <div className="space-y-2">
      <Shimmer className="h-4 w-full bg-brand2" />
      <Shimmer className="h-4 w-5/6 bg-brand2" />
      </div>
      <div className="flex justify-center pt-10">
        <Shimmer className="w-60 h-60 rounded-full bg-brand2" />
      </div>
    </div>
  )
}
