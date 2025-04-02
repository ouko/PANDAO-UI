import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import TopBar from "@/Pages/CommunityPage/components/TopBar";
import Sidebar from "@/Pages/components/CommunityComponents/Navbar";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";


const CommunityDetailsLayout = ({ children }) => {
  return (
    <div className="relative bg-[#100821] font-clash ">

      <TopBar />
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[0px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-10 inset-0 h-full">
        <TileEffect4 />

      </div>
      <div className="flex    container mx-auto p-1 gap-3  ">




        <div className="sticky top-0 z-50 mt-20 ">
          <Sidebar />
        </div>



        <div className=" flex-1 overflow-y-auto">
          <div className="community-details-content py-4">
            {children || <Outlet />}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

CommunityDetailsLayout.propTypes = {
  children: PropTypes.node,
};

export default CommunityDetailsLayout;
