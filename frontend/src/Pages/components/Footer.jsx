import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-center mx-auto border-t-2  bg-gradient-to-l from-black/80 to-purple-900 text-white">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 p-5 md:gap-60 gap-5 md:h-[200px] mt-10">
        <div className="flex flex-col gap-2 w-full ">
          <img src="/logo.png" alt="Logo" className="h-16 w-44 aspect-square" />
          <div className="px-3">© 2024</div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2  gap-2 items-start w-full p-2 md:p-0  ">
          
          <div className="flex flex-col gap-2 mt-2 w-full  justify-start ">
            <div className="font-bold">Quick Link</div>
            <Link to="/" className="hover:underline cursor-pointer">
              About
            </Link>
            <Link to="/" className="hover:underline cursor-pointer">
              Resources
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full  justify-start ">
            <div className="font-bold">Follow Us On</div>
            <Link to="/" className="hover:underline cursor-pointer">
              Twiiter
            </Link>
            <Link to="/" className="hover:underline cursor-pointer">
              LinkedIn
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full  justify-start ">
            <div className="font-bold">Company</div>
            <Link to="/privacypolicy" className="hover:underline cursor-pointer">
            Privacy Policy 
            </Link>
            <Link to="/termsandcondition" className="hover:underline cursor-pointer">
Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
