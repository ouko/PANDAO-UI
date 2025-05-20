'use client';

import { Button } from '@/components/ui/button';
import TileEffect4 from '@/components/ui/myComponents/grid-bg-4';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2 } },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.7 } },
};

const OurStory = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-brand1 relative min-h-screen pb-20 font-clash overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="bg-black/50 absolute inset-0"></div>
      
      {/* Animated background orbs with parallax effect */}
      <motion.div 
        className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"
        animate={{ 
          x: mousePosition.x / 50,
          y: mousePosition.y / 50,
          opacity: [0.6, 0.8, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      <motion.div 
        className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"
        animate={{ 
          x: -mousePosition.x / 70,
          y: -mousePosition.y / 70,
          opacity: [0.7, 0.9, 0.7],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"
        animate={{ 
          x: -mousePosition.x / 60,
          y: -mousePosition.y / 60,
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.08, 1],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2
        }}
      />
      
      {/* Enhanced grid background with subtle animation */}
      <motion.div 
        className="w-full absolute overflow-hidden h-[600px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
      >
        <TileEffect4 />
      </motion.div>

      {/* Floating particles effect */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand3/30 z-0"
          style={{
            width: Math.random() * 12 + 4,
            height: Math.random() * 12 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Main Content */}
      <section className="z-50 py-16 relative">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Title with enhanced animation */}
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-6xl relative lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white to-brand3 bg-clip-text text-transparent mt-20">
                Our Story
                <motion.span
                  className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand2/30 rounded-full blur-2xl"
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: "140%", height: "300%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </h1>
            </motion.div>
            
            <motion.p 
              className="mt-6 relative text-[26px] text-[#B59AEC] max-w-5xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            > 
              Where innovation meets imagination — and anyone can start a DAO. Welcome to <motion.strong 
                initial={{ color: "#B59AEC" }}
                animate={{ color: "#FFFFFF" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >PandaoLive</motion.strong>, your new favorite corner of the internet where community dreams become decentralized realities.
            </motion.p>
          </motion.div>

          {/* Story section with images */}
          <motion.div
            className="mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <motion.div 
                className="relative w-full md:w-1/2 flex justify-center items-center"
                variants={scaleIn}
              >
                <img 
                  src="/story.svg" 
                  alt="Our Story" 
                  className="w-full max-w-xl rounded-lg shadow-2xl z-10" 
                />
                

                
                {/* Additional decorative elements */}
                <motion.div 
                  className="absolute top-[-10%] right-[10%] z-0 bg-brand3/30 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  style={{ width: '120px', height: '120px' }}
                />
                
                <motion.div 
                  className="absolute bottom-[10%] left-[5%] z-0 bg-brand2/40 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.7 }}
                  style={{ width: '80px', height: '80px' }}
                />
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2 text-left"
                variants={fadeInUp}
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-brand3 bg-clip-text text-transparent">The Journey Begins</h2>
                <p className="text-[#B59AEC] text-xl mb-6">
                  PandaoLive started with a simple question: Why is creating a DAO so complicated? Our founders, tired of the technical barriers and complex interfaces, set out to build something different.
                </p>
                <p className="text-[#B59AEC] text-xl mb-8">
                  What began as a weekend hackathon project quickly evolved into a mission to democratize decentralized organizations for everyone, everywhere.
                </p>
                <Button className="bg-brand2 hover:bg-brand2/80 text-white px-8 py-6 text-lg rounded-full">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Sections with staggered animation */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
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
                  'Customize Everything or Keep it Simple: Use pre-built templates or start from scratch — its your DAO, your rules.',
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
              >
                <motion.div
                  className="absolute -left-4 top-1 h-12 w-1 bg-brand3"
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: 48, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
                
                <motion.h2 
                  className="text-3xl font-bold text-brand5 mb-4 pl-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {section.title}
                </motion.h2>
                
                {section.content && (
                  <motion.p 
                    className="text-brand7 leading-relaxed"
                    variants={fadeIn}
                  >
                    {section.content}
                  </motion.p>
                )}
                
                {section.list && (
                  <motion.ul 
                    className="space-y-6 mt-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {section.list.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start"
                        variants={fadeInUp}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="text-green-500 mr-3 text-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          viewport={{ once: true }}
                        >
                          &#10003;
                        </motion.span>
                        <p className="text-brand7">
                          <strong>{item.split(':')[0]}:</strong> 
                          {item.split(':').slice(1).join(':').trim()}
                        </p>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* At Pandao Section with enhanced animation */}
          <motion.div
            className="mb-16 relative"
            variants={scaleIn} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -z-10 inset-0 bg-brand2/10 rounded-xl blur-sm"
              whileInView={{ 
                boxShadow: ["0 0 0 rgba(181, 154, 236, 0)", "0 0 20px rgba(181, 154, 236, 0.2)", "0 0 0 rgba(181, 154, 236, 0)"] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
              viewport={{ once: true }}
            />
            
            <div className="p-6 rounded-xl">
              <h2 className="text-3xl font-bold text-brand5 mb-4">At PANDAO</h2>
              <p className="text-brand7 leading-relaxed">
                At <motion.strong
                  whileHover={{ color: "#B59AEC" }}
                >PandaoLive</motion.strong>, we aim to empower both communities and developers by redefining the way DAOs operate.
                We believe that decentralization fosters transparency, accountability, and sustainable growth.
                Our goal is to break down the traditional barriers of centralized control, enabling anyone—from seasoned experts to newcomers—to create impactful digital organizations with ease and confidence.
                Through intuitive tools and a forward-thinking approach, we are democratizing access to the power of blockchain technology.
              </p>
            </div>
          </motion.div>

          {/* Early Stages Section with parallax effect */}
          <motion.div
            className="mb-16 relative overflow-hidden rounded-xl"
            style={{ perspective: "1000px" }}
            variants={fadeInUp} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -z-10 inset-0 bg-gradient-to-br from-brand2/20 to-transparent"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{ 
                rotateX: [0, 2, 0, -2, 0], 
                rotateY: [0, -2, 0, 2, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="p-6">
              <h2 className="text-3xl font-bold text-brand5 mb-4">Early Stages, Big Potential</h2>
              <p className="text-brand7 leading-relaxed">
                <strong>PandaoLive</strong> is on an exciting path of rapid growth and innovation.
                Our evolving roadmap includes the introduction of modular templates, enhanced DeFi protocol integration, and advanced collaboration tools—all designed to support today's innovators and pave the way for tomorrow's leaders.
                We are committed to continuously refining our platform to meet the changing needs of the digital landscape.
              </p>
              <p className="text-brand7 leading-relaxed mt-4">
                We envision a future where DAOs form the backbone of digital collaboration, breaking down traditional barriers and empowering individuals across the globe.
                <motion.strong
                  whileHover={{ color: "#B59AEC" }}
                > PandaoLive </motion.strong> aims to become the definitive platform for DAO creation and management—one that champions transparency, equity, and sustainable growth.
                By fostering a vibrant ecosystem of decentralized organisations, we are driving meaningful change across industries and communities.
              </p>
            </div>
          </motion.div>

          {/* Join Us CTA Section with glow effect */}
          <motion.div
            className="mb-16 relative"
            variants={scaleIn} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -z-10 inset-0 bg-brand3/5 rounded-xl"
              animate={{ 
                boxShadow: [
                  "0 0 0px rgba(181, 154, 236, 0)",
                  "0 0 20px rgba(181, 154, 236, 0.3)",
                  "0 0 0px rgba(181, 154, 236, 0)"
                ] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="p-6 rounded-xl">
              <h2 className="text-3xl font-bold text-brand5 mb-4">Join Us</h2>
              <p className="text-brand7 leading-relaxed">
                Now is the time to explore the boundless potential of decentralized technology.
                Whether you are an experienced blockchain developer or just starting your journey in the world of DAOs,
                <motion.strong
                  whileHover={{ color: "#B59AEC" }}
                > PandaoLive </motion.strong> is here to guide and support you.
                Embrace a future of inclusive, transparent governance and join a community that values innovation, collaboration, and shared success.
              </p>
              <p className="text-brand7 leading-relaxed mt-4">
                Let's build the future of decentralized governance together.
              </p>
            </div>
          </motion.div>

          {/* Still Early Section with typing effect */}
          <motion.div
            className="mb-16 relative"
            variants={fadeInUp} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <TypingEffect 
              text="Still Early, But Growing Fast" 
              className="text-3xl font-bold text-brand5 mb-4"
            />
            <p className="text-brand7 leading-relaxed">
              We're in an exciting phase of rapid growth. Coming soon: DAO templates for real-world use cases, integrations with Radix DeFi, collaboration tools, treasury management, NFT-based memberships, and more — all built with you, the dreamers, schemers, and rebels building better worlds.
            </p>
          </motion.div>

          {/* Final CTA with enhanced animations */}
          <motion.div
            className="text-center mt-20 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="absolute -z-10 inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, rgba(181,154,236,0.5) 0%, rgba(0,0,0,0) 70%)" }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <h2 className="text-3xl font-bold text-brand5 mb-4">Join the DAOvolution</h2>
            <p className="text-brand7 mb-6 max-w-3xl mx-auto">
              Whether you're a buzzing community, a solo builder rallying your tribe, or a founder dreaming of transparent governance — PandaoLive is your launchpad.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button variant="brand" className="relative overflow-hidden group">
                <motion.span 
                  className="absolute inset-0 bg-brand3 opacity-30"
                  initial={{ scale: 0, borderRadius: "50%" }}
                  whileHover={{ scale: 1.5, borderRadius: "0%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Launch Your DAO Now</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Custom typing effect component
const TypingEffect = ({ text, className }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  
  return (
    <h2 className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >|</motion.span>
      )}
    </h2>
  );
};

export default OurStory;