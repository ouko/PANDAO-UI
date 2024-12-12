import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-center mx-auto border-t-2 bg-gradient-to-br from-black/80 to-purple-900 text-white">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 p-5 md:gap-60 gap-5 md:h-[200px] mt-10">
        <div className="flex flex-col gap-2 w-full">
          <img src="/logo.png" alt="Logo" className="h-16 w-44 aspect-square" />
          <div className="px-3">
            &copy; 2024 PanDao Association is a legally registered   profit
            organization in the United States. Our legal address is 1234 Main
            Street, Suite 123, San Francisco, CA 94105. All rights reserved.
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-2 items-start w-full p-2 md:p-0">
          <div className="flex flex-col gap-2 mt-2 w-full justify-start">
            <div className="font-bold">Quick Links</div>
            <Link to="/OurStory" className="hover:underline cursor-pointer">
            Our Story
            </Link>
            <Link to="/CatalystSuite" className="hover:underline cursor-pointer">
            Catalyst Suite
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full justify-start">
            <div className="font-bold">Follow Us On</div>
            <div className="flex items-center gap-2">
              <Twitter size={16} />
              <Link to="/" className="hover:underline cursor-pointer">
                Twitter
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin size={16} />
              <Link to="/" className="hover:underline cursor-pointer">
                LinkedIn
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2 w-full justify-start">
            <div className="font-bold">Company</div>
            <div className="flex items-center gap-2">
              <Link to="/privacypolicy" className="hover:underline cursor-pointer">
                Privacy Policy
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/termsandconditions" className="hover:underline cursor-pointer">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

