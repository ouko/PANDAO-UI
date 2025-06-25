import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import TopBar from "@/Pages/CommunityPage/components/TopBar";
import Sidebar from "@/Pages/components/CommunityComponents/Navbar";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import {
  Sheet,
  SheetContent,
} from "@/components/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

const CommunityDetailsLayout = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative bg-[#100821] font-clash min-h-screen pb-20">
      <div className="absolute inset-0 h-full bg-black/60 z-10 "></div>
      <div className="absolute  bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[200px] right-[5%] bg-brand4 z-10 size-[400px] rounded-full blur-[180px]"></div>
      <div className="absolute top-[50%]  bg-brand2 z-10 size-[350px] rounded-full blur-[170px]"></div>
      <div className="absolute top-[10%]  bg-brand3 z-10 size-[250px] rounded-full blur-[120px]"></div>
      <div className="w-full absolute overflow-hidden opacity-10 inset-0 h-full">
        <TileEffect4 />
      </div>

      <TopBar onOpenSheet={() => setOpen(true)} />

      {/* Background Decorations */}


      <div className="flex container mx-auto p-1 gap-3 relative z-10">
        <div className="hidden lg:block sticky top-0 z-50 mt-20">
          <Sidebar />
        </div>

        <div className="lg:hidden fixed top-20 left-4 z-50">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className=" mt-[70px] rounded-[30px] bg-brand1/40 text-gray-300 backdrop-blur-md border-0 border-brand3 ">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="community-details-content py-4">
            {children || <Outlet />}
          </div>
        </div>
      </div>
    </div>
  )
}

CommunityDetailsLayout.propTypes = {
  children: PropTypes.node,
}

export default CommunityDetailsLayout
