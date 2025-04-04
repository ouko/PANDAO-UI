import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonProposal() {
  return (
    <div className="bg-gradient-to-br from-[rgba(27,18,63,0.92)] to-brand1 border-[1px] w-full mt-5 border-brand5 rounded-lg p-3 h-[150px] flex flex-col justify-between relative hover:scale-95 transition-transform duration-300">
     
      <Skeleton className="absolute right-2 top-2 h-5 w-16 rounded-full bg-green-300" />
      <Skeleton className="absolute right-20 top-2 h-5 w-20 rounded-full bg-black" />

      
      <div className="space-y-2 mt-6">
        <Skeleton className="h-5 w-3/4 bg-brand2" />
        <Skeleton className="h-4 w-2/3 bg-brand2" />
      </div>

 
      

    
      <div className="w-full flex justify-end items-end h-full">
  <Skeleton className="h-4 w-[200px] mt-2 bg-brand4" />
</div>

    </div>
  )
}
