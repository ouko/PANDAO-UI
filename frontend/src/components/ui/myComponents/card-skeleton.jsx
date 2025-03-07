import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col   justify-between   p-5 h-[200px] bg-gradient-to-r from-[#100821] to-[#1c0f32] border-2 border-[#2b1b49] rounded-lg w-full space-y-5">
      <div className="flex items-start gap-4">
        <Skeleton className="h-[60px] w-[60px]   bg-brand2 rounded-md" />
        <div className="flex flex-col space-y-2 w-full overflow-hidden">
          <Skeleton className="h-4 w-3/4 bg-brand2" />
            <Skeleton className="h-4 w-1/2 bg-brand2" />

        </div>
      </div>

      <div className="flex items-center gap-2">
             <Skeleton className="h-4 w-[80px] bg-brand2 rounded-full" />
        <Skeleton className="h-4 w-[80px] bg-brand2 rounded-full" />
      </div>

      <div className="flex items-center gap-4 justify-end">
        <Skeleton className="h-4 w-10  bg-brand2 rounded-md" />
        <Skeleton className="h-4 w-10 bg-brand2 rounded-md" />
      </div>
    </div>
  );
}
