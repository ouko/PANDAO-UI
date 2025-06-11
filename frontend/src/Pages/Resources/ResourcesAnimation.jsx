import { LibraryBig } from "lucide-react";

export function ResourcesAnimation() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg bg-transparent">
      <div className="flex flex-col items-center justify-center gap-8">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-400 to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          DAO
        </span>
        
        {/* Static content replacing the orbiting circles */}
        <div className="flex flex-col gap-6 items-center">
          <div className="border-2 rounded-full p-2 bg-blue-600 text-white">
            What is DAO
          </div>
          
          <div className="border-2 rounded-full p-2">
            <LibraryBig className="h-20 w-20 text-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
