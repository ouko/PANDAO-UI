import { Button } from '@/components/ui/button';
import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid';

const OurStory = () => {
  return (
    <div className="pt-20 relative text-black bg-gray-50">
      <AnimatedGridPattern />
      <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Our Story</h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to PANDAO, where innovation meets collaboration in the world of decentralized autonomous organizations (DAOs).
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to empower communities and developers by transforming how DAOs are built, managed, and scaled. 
            With intuitive tools and a forward-thinking approach, PANDAO is redefining decentralized governance to make it more accessible and impactful.
          </p>
        </div>

        {/* What We Do Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Do</h2>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-3">&#10003;</span>
              <p className="text-gray-700"><strong>Launch DAOs with Ease:</strong> Streamlined workflows and user-friendly tools make it simple for anyone to bring their vision to life.</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">&#10003;</span>
              <p className="text-gray-700"><strong>Enhance Governance:</strong> Create adaptable governance structures that ensure inclusive decision-making for your organization.</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">&#10003;</span>
              <p className="text-gray-700"><strong>Seamlessly Integrate with DeFi:</strong> Build DAOs that connect with Radix-based DeFi applications and beyond.</p>
            </li>
          </ul>
        </div>

        {/* Why Choose PANDAO Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose PANDAO?</h2>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-3">&#10003;</span>
              <p className="text-gray-700"><strong>Radix DLT Native:</strong> PANDAO offers unmatched speed, security, and scalability by leveraging Radix DLT.</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">&#10003;</span>
              <p className="text-gray-700"><strong>Customizable and Future-Ready:</strong> Our platform adapts to your current needs while preparing for future challenges.</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3">&#10003;</span>
              <p className="text-gray-700"><strong>Transparency and Decentralization:</strong> We stay true to blockchain principles, ensuring secure and autonomous operations.</p>
            </li>
          </ul>
        </div>

        {/* Early Stages, Big Potential Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Early Stages, Big Potential</h2>
          <p className="text-gray-700 leading-relaxed">
            PANDAO is in a rapid phase of growth and development. Our roadmap includes modular templates, DeFi protocol integration, and advanced collaboration tools to meet the needs of today’s innovators and tomorrow’s leaders.
          </p>
        </div>

        {/* Our Vision Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a world where DAOs become the foundation of digital collaboration, driving meaningful change across industries and communities. 
            Our goal is to be the go-to platform for DAO creation and management, empowering anyone to build decentralized organizations that are transparent, equitable, and sustainable.
          </p>
        </div>

        {/* Join Us Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Us</h2>
          <p className="text-gray-700 mb-6">
            Now is the time to explore the potential of decentralized technology. Whether you’re an experienced builder or just starting your journey, PANDAO is here to guide you.
          </p>
          <Button 
            variant="radix" 
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600"
          >
            Start Building with PANDAO
          </Button>
        </div>
      </div>
    </section>
    </div>
  );
};

export default OurStory;
