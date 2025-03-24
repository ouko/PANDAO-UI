import Footer from "@/Pages/components/CommunityComponents/Footer";
import Navbar from "@/Pages/components/CommunityComponents/Navbar";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const CommunityDetailsLayout = ({ children }) => {
  return (
    <div className="flex bg-[#100821]">
    
      <div className="sticky top-0 z-10 mt-10">
        <Navbar />
      </div>

      
      <div className=" flex-1 overflow-y-auto">
        <div className="community-details-content p-4">
          {children || <Outlet />}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

CommunityDetailsLayout.propTypes = {
  children: PropTypes.node,
};

export default CommunityDetailsLayout;
