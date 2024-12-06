import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid';

const Aboutus = () => {
  return (
    <div className="pt-20 relative text-black">
      <AnimatedGridPattern />
      <div className="min-h-screen flex flex-col items-center justify-center p-5 mx-auto max-w-[1440px]">
        <h1 className="text-7xl font-bold mb-6 text-center">Welcome to PanDao!</h1>

        <section className="mt-6 text-center">
          <p className="leading-relaxed text-lg">
            Get to know our company and explore opportunities to engage with us
            further. From job openings and career opportunities to our presence on
            social media platforms, you'll find ways to connect with our team and stay
            updated on our latest developments. Additionally, access important legal
            documents such as our Terms of Service, Privacy Policy, Terms and
            Conditions, and Disclaimer to understand our policies and commitments.
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
