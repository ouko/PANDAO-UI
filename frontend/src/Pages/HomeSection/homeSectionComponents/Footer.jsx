import TileEffect from "@/components/ui/myComponents/grid-bg-2";
import React from "react";

const FooterSection = ({ title, items }) => (
  <div className="flex flex-col gap-6 items-start ">
    <div className="text-blue-700 font-semibold text-2xl">{title}</div>
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <a 
          key={index} 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#8c89b4] text-lg hover:underline text-left"
        >
          {item.label}
        </a>
      ))}
    </div>
  </div>
);

const Footer = () => {
  return (
    <div className="grid grid-cols-2 items-start justify-between p-8 container text-center md:text-left z-50  relative overflow-hidden ">
     
      {/* Branding Section */}
      <div className="w-full md:w-auto max-w-sm md:max-w-md lg:max-w-lg mb-6 md:mb-0 z-50 ">
        <div className="text-white text-4xl font-bold text-left">PanDAO</div>
        <div className="text-white text-lg mt-2 text-left">
          Sign up for a free trial today,  and experience <br /> the difference!
        </div>
      </div>

      {/* Footer Links */}
      <div className="
      grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 z-50  mt-5 md:mt-0 w-full">
        <FooterSection
          title="Product"
          items={[
            { label: "Changelog", href: "/changelog" },
            { label: "Documentation", href: "/docs" }
          ]}
        />
        <FooterSection
          title="Company"
          items={[
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Blog", href: "/blog" }
          ]}
        />
        <FooterSection
          title="Contact"
          items={[
            { label: "GitHub", href: "https://github.com" },
            { label: "Discord", href: "https://discord.com" },
            { label: "Twitter", href: "https://twitter.com" }
          ]}
        />
      </div>

    </div>
  );
};

export default Footer;
