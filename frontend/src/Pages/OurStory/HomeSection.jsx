import BrandButton from "@/components/ui/myComponents/brand-button";

function HomeSection() {
  return (
    <div className="w-full h-full min-h-screen flex pt-40 flex-col items-center px-4 py-16 md:px-8">
      <div className="flex flex-col items-center gap-6 text-center mx-auto z-50">
        <h2 className="text-center font-semibold text-[40px] md:text-[64px] self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent">
          The Journey Begins
        </h2>
        <p className="text-xl md:text-2xl text-brand6 leading-relaxed max-w-4xl">
          PandaoLive started with a simple question: Why is creating a DAO so complicated?
          Our founders, tired of the technical barriers and complex interfaces, set out to
          build something different.
          <br />
          What began as a weekend hackathon project quickly evolved into a mission to
          democratize decentralized organizations for everyone, everywhere.
        </p>

        <div className=" left-0 justify-start absolute items-start gap-5 opacity-10">
        <img
          src="/ic.svg" alt=""
          className="w-[400px] h-[400px] object-cover"
        />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-5 mt-10">
        <BrandButton title="Get Started" href="" />
      </div>

      <div className=" right-0 top-[500px] justify-start absolute items-start gap-5 opacity-10">
        <img
          src="/ic.svg" alt=""
          className="w-[250px] h-[250px] object-cover"
        />
        </div>
    </div>
  );
}

export default HomeSection;
