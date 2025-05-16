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
      {/* Background Effects */}
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>

      {/* Main Content */}
      <section className="z-50 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Title */}
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
            <p className="mt-4 relative text-[26px] text-[#B59AEC] max-w-5xl mx-auto"> 
              Where innovation meets imagination — and anyone can start a DAO. Welcome to <strong>PandaoLive</strong>, your new favorite corner of the internet where community dreams become decentralized realities.
            </p>
          </motion.div>

          {/* Sections */}
          {[
            {
              title: 'Our Mission',
              content: `To radically simplify how DAOs are launched, scaled, and sustained. We're not just giving you the tools to launch a DAO — we're giving you the freedom to organize, fund, and govern transparently from Day 1.`,
            },
            {
              title: 'Our Vision',
              content: `We imagine a world where DAOs are as common as group chats and as impactful as corporations. PandaoLive is building that world — one DAO at a time.`,
            },
            {
              title: 'Our Ethos',
              list: [
                'Permissionless by Design: Anyone, anywhere should be able to launch or join a DAO without gatekeepers.',
                'Community is Everything: Built for builders, organizers, rebels, and dreamers who believe in doing things together, better.',
                'Simplicity Over Complexity: No code. No jargon. No sleepless nights. DAO creation should feel like starting a group chat.',
                'Transparency & Trust: Every action, vote, and transaction is on-chain, verifiable, and crystal-clear.',
                'Composable Future: PandaoLive plays well with others — no walled gardens, full interoperability.',
              ],
            },
            {
              title: 'What We Do',
              list: [
                'Launch DAOs with Ease: Spin up your DAO and governance structure as easily as creating a group chat — without the developer jargon.',
                'Govern Like a Pro: Set up adaptable, inclusive governance frameworks. No spreadsheets. No gatekeeping.',
                'Plug into DeFi Effortlessly: Connect your DAO to Radix-native DeFi apps and beyond. Treasury management that just works.',
                'Customize Everything or Keep it Simple: Use pre-built templates or start from scratch — it’s your DAO, your rules.',
              ],
            },
            {
              title: 'Why PandaoLive?',
              list: [
                'Built for Radix, Ready for the Future: The only layer one purpose-built for DeFi and composability — faster, safer, smarter.',
                'Modular & Scalable: Start small. Grow big. Add modules as your community evolves.',
                'Actually Transparent: Every vote, rule, and transfer is on-chain. Full trust. No tricks.',
              ],
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
                      <p className="text-brand7"><strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':').trim()}</p>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          {/* At Pandao Section */}
          <motion.div
            className="mb-16 relative"
            variants={fadeInUp} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand5 mb-4">At PANDAO</h2>
            <p className="text-brand7 leading-relaxed">
              At <strong>PandaoLive</strong>, we aim to empower both communities and developers by redefining the way DAOs operate.
              We believe that decentralization fosters transparency, accountability, and sustainable growth.
              Our goal is to break down the traditional barriers of centralized control, enabling anyone—from seasoned experts to newcomers—to create impactful digital organizations with ease and confidence.
              Through intuitive tools and a forward-thinking approach, we are democratizing access to the power of blockchain technology.
            </p>
          </motion.div>

          {/* Early Stages Section */}
          <motion.div
            className="mb-16 relative"
            variants={fadeInUp} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand5 mb-4">Early Stages, Big Potential</h2>
            <p className="text-brand7 leading-relaxed">
              <strong>PandaoLive</strong> is on an exciting path of rapid growth and innovation.
              Our evolving roadmap includes the introduction of modular templates, enhanced DeFi protocol integration, and advanced collaboration tools—all designed to support today’s innovators and pave the way for tomorrow’s leaders.
              We are committed to continuously refining our platform to meet the changing needs of the digital landscape.
            </p>
            <p className="text-brand7 leading-relaxed mt-4">
              We envision a future where DAOs form the backbone of digital collaboration, breaking down traditional barriers and empowering individuals across the globe.
              <strong> PandaoLive </strong> aims to become the definitive platform for DAO creation and management—one that champions transparency, equity, and sustainable growth.
              By fostering a vibrant ecosystem of decentralized organisations, we are driving meaningful change across industries and communities.
            </p>
          </motion.div>

          {/* Join Us CTA Section */}
          <motion.div
            className="mb-16 relative"
            variants={fadeInUp} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand5 mb-4">Join Us</h2>
            <p className="text-brand7 leading-relaxed">
              Now is the time to explore the boundless potential of decentralized technology.
              Whether you are an experienced blockchain developer or just starting your journey in the world of DAOs,
              <strong> PandaoLive </strong> is here to guide and support you.
              Embrace a future of inclusive, transparent governance and join a community that values innovation, collaboration, and shared success.
            </p>
            <p className="text-brand7 leading-relaxed mt-4">
              Let’s build the future of decentralized governance together.
            </p>
          </motion.div>

          {/* Still Early Section */}
          <motion.div
            className="mb-16 relative"
            variants={fadeInUp} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand5 mb-4">Still Early, But Growing Fast</h2>
            <p className="text-brand7 leading-relaxed">
              We're in an exciting phase of rapid growth. Coming soon: DAO templates for real-world use cases, integrations with Radix DeFi, collaboration tools, treasury management, NFT-based memberships, and more — all built with you, the dreamers, schemers, and rebels building better worlds.
            </p>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            className="text-center mt-20 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand5 mb-4">Join the DAOvolution</h2>
            <p className="text-brand7 mb-6 max-w-3xl mx-auto">
              Whether you're a buzzing community, a solo builder rallying your tribe, or a founder dreaming of transparent governance — PandaoLive is your launchpad.
            </p>
            <Button variant="brand" className="transition-all duration-300 hover:scale-105">
              Launch Your DAO Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
