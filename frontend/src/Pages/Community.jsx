import AnimatedGridPattern from "@/components/ui/myComponents/animated-grid";

const Community = () => {
  return (
    
    <div className="pt-20 ">
              <AnimatedGridPattern />
      
      <div className="max-w-5xl  mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 sm:text-5xl">
          Join the PANDAO community.
        </h1>
        <p className="mt-6 text-lg text-gray-600 text-center sm:text-xl">
          DAOs thrive on collaboration, and so do we. Connect with other creators, share insights, 
          and stay updated on the latest from PANDAO. Whether it’s through our forums, social media, 
          or exclusive events, our community is the place to learn, grow, and shape the future of 
          decentralized collaboration together.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#community-links"
            className="inline-block px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Join the Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default Community;
