'use client';

import { Button } from '@/components/ui/button';
import TileEffect4 from '@/components/ui/myComponents/grid-bg-4';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OurStory = () => {
  return (
    <div className="bg-brand1 relative min-h-screen pb-20 font-clash overflow-hidden">
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>

      <section className="z-50 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h1 className="text-6xl relative lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white to-brand3 bg-clip-text text-transparent">
              Our Story
            </h1>
            <p className="mt-4 relative text-[26px] text-[#B59AEC]">
              Welcome to PANDAO, where innovation meets collaboration in the world of decentralized autonomous organizations (DAOs).
            </p>
          </motion.div>

       
          {[
            {
              title: 'Our Mission',
              content: `Our mission is to empower communities and developers by transforming how DAOs are built, managed, and scaled. With intuitive tools and a forward-thinking approach, PANDAO is redefining decentralized governance to make it more accessible and impactful.`,
            },
            {
              title: 'What We Do',
              list: [
                'Launch DAOs with Ease: Streamlined workflows and user-friendly tools make it simple for anyone to bring their vision to life.',
                'Enhance Governance: Create adaptable governance structures that ensure inclusive decision-making for your organization.',
                'Seamlessly Integrate with DeFi: Build DAOs that connect with Radix-based DeFi applications and beyond.',
              ],
            },
            {
              title: 'Why Choose PANDAO?',
              list: [
                'Radix DLT Native: PANDAO offers unmatched speed, security, and scalability by leveraging Radix DLT.',
                'Customizable and Future-Ready: Our platform adapts to your current needs while preparing for future challenges.',
                'Transparency and Decentralization: We stay true to blockchain principles, ensuring secure and autonomous operations.',
              ],
            },
            {
              title: 'Early Stages, Big Potential',
              content: `PANDAO is in a rapid phase of growth and development. Our roadmap includes modular templates, DeFi protocol integration, and advanced collaboration tools to meet the needs of today’s innovators and tomorrow’s leaders.`,
            },
            {
              title: 'Our Vision',
              content: `We envision a world where DAOs become the foundation of digital collaboration, driving meaningful change across industries and communities. Our goal is to be the go-to platform for DAO creation and management, empowering anyone to build decentralized organizations that are transparent, equitable, and sustainable.`,
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              className="mb-16 relative"
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand5 mb-4">{section.title}</h2>
              {section.content && (
                <p className="text-brand7 leading-relaxed">{section.content}</p>
              )}
              {section.list && (
                <ul className="space-y-6 mt-4">
                  {section.list.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-3">&#10003;</span>
                      <p className="text-brand7"><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</p>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
          <motion.div
            className="text-center mt-20 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand5 mb-4">Join Us</h2>
            <p className="text-brand7 mb-6 max-w-3xl mx-auto">
              Now is the time to explore the potential of decentralized technology. Whether you’re an experienced builder or just starting your journey, PANDAO is here to guide you.
            </p>
            <Button variant="brand" className="transition-all duration-300 hover:scale-105">
              Start Building with PANDAO
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
