import { Skeleton } from "@/components/ui/skeleton"

export function DaoCard() {
  return (
    <div className="flex flex-col justify-between p-5 h-[200px] bg-brand1 border border-[#5228A4] rounded-2xl w-full space-y-5">
      <div className="flex flex-col gap-[37px] items-start justify-start self-stretch flex-1 relative w-full">
        <Skeleton className="h-[32px] w-full bg-brand2" />
        <Skeleton className="h-[72px] w-full bg-brand2" />
       
      </div>
    </div>
  )
}
