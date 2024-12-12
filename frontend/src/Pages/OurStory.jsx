import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid';

const OurStory = () => {
  return (
    <div className="pt-20 relative text-black bg-gray-50">
      <AnimatedGridPattern />
      <div className="min-h-screen flex flex-col items-center justify-center p-5 mx-auto max-w-[1440px]">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-800">
          Welcome to PANDAO
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 text-center max-w-4xl">
          Where innovation meets collaboration in the world of decentralized autonomous organizations (DAOs). Our mission is to empower communities and developers by transforming how DAOs are built, managed, and scaled. With intuitive tools and a forward-thinking approach, PANDAO is redefining decentralized governance to make it more accessible and impactful.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 text-center max-w-4xl mt-4">
          Built on Radix DLT, PANDAO leverages unmatched scalability, security, and composability to provide a foundation for DAOs to thrive in the fast-paced and ever-evolving DeFi ecosystem.
        </p>

        <section className="mt-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">What We Do</h2>
          <p className="text-base leading-relaxed text-gray-700 max-w-3xl mx-auto">
            At PANDAO, we simplify the process of DAO creation and management, empowering you to focus on building and growing your community.
          </p>
          <ul className="mt-6 space-y-4 text-left text-gray-600 max-w-3xl mx-auto">
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              <strong>Launch DAOs with Ease:</strong> Streamlined workflows and user-friendly tools make it simple for anyone, regardless of technical expertise, to bring their vision to life.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              <strong>Enhance Governance:</strong> Create adaptable governance structures that reflect the unique needs of your organization and ensure inclusive decision-making.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              <strong>Seamlessly Integrate with DeFi:</strong> Build DAOs that connect effortlessly to Radix-based DeFi applications and beyond, unlocking new growth opportunities.
            </li>
          </ul>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Why Choose PANDAO?</h2>
          <ul className="space-y-4 text-left text-gray-600 max-w-3xl mx-auto">
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              <strong>Radix DLT Native:</strong> PANDAO offers the speed, security, and scalability required to support growing DAOs.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              <strong>Customizable and Future-Ready:</strong> Our platform adapts to your needs today while preparing you for tomorrow’s challenges.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              <strong>Transparency and Decentralization:</strong> Secure, transparent, and autonomous operations built on blockchain principles.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              <strong>Cutting-Edge Innovation:</strong> Features like DeFi integration and advanced governance tools equip your DAO for success.
            </li>
          </ul>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Early Stages, Big Potential</h2>
          <p className="text-base leading-relaxed text-gray-700 max-w-3xl mx-auto">
            We’re just getting started, and the possibilities are endless. PANDAO is in a rapid phase of growth and development, focused on creating solutions that set new benchmarks for DAOs worldwide.
          </p>
          <ul className="mt-6 space-y-4 text-left text-gray-600 max-w-3xl mx-auto">
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              Modular templates that simplify DAO customization.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              Seamless integration with emerging DeFi protocols.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 font-bold mr-2">&#x2022;</span>
              Advanced tools for collaboration and decision-making.
            </li>
          </ul>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Our Vision</h2>
          <p className="text-base leading-relaxed text-gray-700 max-w-3xl mx-auto">
            At PANDAO, we envision a world where DAOs become the foundation of digital collaboration, driving meaningful change across industries and communities. Our goal is to be the go-to platform for DAO creation and management, where anyone can confidently build decentralized organizations that are transparent, equitable, and sustainable.
          </p>
          <p className="text-base leading-relaxed text-gray-700 max-w-3xl mx-auto mt-4">
            By joining PANDAO, you’re not just creating a DAO—you’re becoming part of a global movement that’s reshaping the way we work together.
          </p>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Join Us</h2>
          <p className="text-base leading-relaxed text-gray-700 max-w-3xl mx-auto">
            Now is the time to explore the potential of decentralized technology. Whether you’re an experienced builder or just starting your journey, PANDAO is here to guide you.
          </p>
          <p className="text-base leading-relaxed text-gray-700 max-w-3xl mx-auto mt-4">
            Let’s shape the future of decentralized collaboration—together. Start building with PANDAO today.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OurStory;
