import { Button } from '@/components/ui/button';
import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid';

const Roadmap = () => {
  return (
    <div className="pt-20 relative text-black bg-gray-50 min-h-screen">
      <AnimatedGridPattern />
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl leading-[70px] font-bold text-gray-800">
              The future of DAOs starts here.
            </h1>
            <p className="mt-6 text-lg text-gray-600 sm:text-xl">
              We’re just getting started. At PANDAO, innovation drives everything we do. Our roadmap 
              is packed with upcoming features and improvements designed to empower your DAO even further. 
              From advanced DeFi integrations to enhanced governance modules, discover what’s next and how 
              we’re staying ahead of the curve in decentralized technology.
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <Button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;
