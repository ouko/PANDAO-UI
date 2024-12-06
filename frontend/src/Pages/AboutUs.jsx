import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid';

const Aboutus = () => {
  return (
    <div className="pt-20 relative text-black">
      <AnimatedGridPattern />
      <div className="min-h-screen flex flex-col items-center justify-center p-5 mx-auto max-w-[1440px]">
        <h1 className="text-7xl font-bold mb-6 text-center">Welcome to PanDao!</h1>

        <section className="mt-6 text-center">
          <p className="leading-relaxed text-base text-gray-700">
            Discover the essence of our company and the expansive opportunities available for engagement. Whether you're interested in job openings, career prospects, or connecting with us on social media, we provide numerous avenues to interact with our team and stay informed about our latest advancements. Furthermore, you can review essential legal documents such as our Terms of Service, Privacy Policy, Terms and Conditions, and Disclaimer to gain a comprehensive understanding of our policies and commitments. We are committed to transparency and fostering meaningful relationships with our community.
          </p>
        </section>

        {/* <section className="mt-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="leading-relaxed text-lg">
            Our mission is to make DAO technology accessible and user-friendly for everyone. We aim to empower communities to unlock new opportunities,
            collaborate innovatively, and drive meaningful change worldwide.
          </p>
        </section> */}

        {/* <section className="flex flex-col items-center mt-12">
          <h2 className="text-4xl font-bold mb-4">Meet Our Founder</h2>
          <img
            src="https://avatars.githubusercontent.com/u/88244542?v=4"
            alt="Founder Name"
            className="w-48 h-48 rounded-full mb-4 shadow-lg"
          />
          <p className="text-lg text-center max-w-lg">
            <strong>Founder Name</strong>
            <br />
            With a passion for blockchain and a vision for decentralized governance, our founder leads PanDao toward creating
            inclusive, efficient, and transparent communities. Their expertise in technology and innovation has laid the groundwork for the next generation of organizational collaboration.
          </p>
        </section> */}
      </div>
    </div>
  );
};

export default Aboutus;
