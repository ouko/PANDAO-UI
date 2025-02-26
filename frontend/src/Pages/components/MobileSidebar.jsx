import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="z-[100] bg-brand1 overflow-hidden">
      <div className="fixed bottom-[-100px] left-1/3 bg-brand2 z-10 size-[500px] rounded-full blur-[200px]"></div>
      <div className="fixed top-[70px] left-[100%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <SheetHeader>
          <SheetTitle>
            <img src="/logo.png" className="h-20" />
          </SheetTitle>
          <SheetDescription>
            <ul className="text-white  text-2xl flex flex-col gap-6 mt-10">
              {/* <Link to="/aboutus">
                <li>About Us</li>
              </Link> */}

              <Link to="/products">
                <li>Products</li>
              </Link>
              <Link to="/resources">
                <li>Resources</li>
              </Link>
            </ul>
            <div className="flex flex-col mt-10 gap-4">
              <Button className="bg-purple-600 ">What is Dao?</Button>
              <Button className="bg-purple-600 flex items-center gap-2">
                <Rocket /> <span>Launch Dao </span>{" "}
              </Button>
              <div className="w-full">
              <radix-connect-button />

              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
