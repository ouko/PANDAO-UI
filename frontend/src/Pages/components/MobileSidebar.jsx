import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navconfig } from "@/lib/config";
import { Menu, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="z-[100] bg-brand1 overflow-hidden font-clash">
        <div className="fixed bottom-[-100px] left-1/3 bg-brand2 z-10 size-[500px] rounded-full blur-[200px]"></div>
        <div className="fixed top-[70px] left-[100%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <SheetHeader>
          <SheetTitle>
            <img src="/logo.png" className="h-20" />
          </SheetTitle>
          <SheetDescription>
            <ul className="text-white  text-2xl flex flex-col gap-6 mt-10">
              {navconfig.map((Item, index) => (
                <Link key={index} to={Item.path}>
                  <div className='flex items-center'>
                    <Item.icon className="w-5 h-5 mr-2" />
                    <span>{Item.title}</span>
                  </div>
                </Link>
              ))}




            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
