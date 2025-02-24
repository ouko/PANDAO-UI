import React from "react";

const FooterSection = ({ title, items }) => (
  <div className="flex flex-col gap-6 items-start min-w-[120px]">
    <div className="text-blue-700 font-semibold text-2xl">{title}</div>
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <a 
          key={index} 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#8c89b4] text-lg hover:underline"
        >
          {item.label}
        </a>
      ))}
    </div>
  </div>
);

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between p-8 bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] text-center md:text-left">
      
      {/* Branding Section */}
      <div className="w-full md:w-auto max-w-sm md:max-w-md lg:max-w-lg mb-6 md:mb-0">
        <div className="text-white text-4xl font-bold">PanDAO</div>
        <div className="text-white text-lg mt-2">
          Sign up for a free trial today, and experience the difference!
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center md:justify-start gap-10 md:gap-20">
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
