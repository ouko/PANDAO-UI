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
import { useState } from "react";
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const handleItemClick = (item) => {
    // Always close the mobile menu
    setOpen(false);

    // If it's a scroll type, handle scrolling
    if (item.type === "scroll") {
      // Use setTimeout to allow menu close animation to complete first
      setTimeout(() => {
        const elementId = item.path.replace(/^\/+/, '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
    // For link type, the Link component will handle navigation
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
            <ul className="text-white text-2xl flex flex-col gap-6 mt-10">
              {navconfig.map((item, index) => (
                <li key={index}>
                  {item.type === "scroll" ? (
                    // For scroll type, use a button styled to match links
                    <button
                      onClick={() => handleItemClick(item)}
                      className="text-white text-left flex items-center"
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      <span>{item.title}</span>
                    </button>
                  ) : (
                    // For link type, use React Router Link
                    <Link
                      to={item.path}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-2" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
