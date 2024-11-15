import ReactPlayer from "react-player";
import ResourceCard from "./Resourcard";

const blogs = [
  {
    title: "What is Radix",
    link: "what-is-radix",
  },
  {
    title: "How to create your first DAO",
    link: "how-create-your-first-dao",
  },
];
const ResourceSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-start   text-black max-w-[1000px] mx-auto ">
      <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5">
        <div className="text-4xl font-semibold">Video Guide</div>
        <p className="md:w-2/3 font-thin">Don&apos;t know where to start?</p>
      </div>
      <div className="w-full md:h-[90vh] px-2">
        <ReactPlayer
          url="https://youtu.be/6cDtHjgpCyE?si=ZJSmDCNT80mOSbPi"
          className=" w-full h-full"
          width="100%"
          height="100%"
        />{" "}
      </div>

      <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5 mt-6">
        <div className="text-4xl font-semibold">Get Inspiration</div>
        <p className="md:w-2/3 font-thin">
          Don&apos;t know where to start? Learn from projects that govern
          onchain with Aragon&apos;s DAO frameworks, and discover plugins that
          unlock powerful possibilities.
        </p>
      </div>
      <div className="p-5 grid md:grid-cols-3 grid-cols-1 w-full max-w-[1000px] mx-auto gap-7">
        {blogs.map((blog, index) => (
          <ResourceCard key={index} title={blog.title} link={blog.link} />
        ))}
      </div>
      {/* <div className="flex flex-col  items-start  gap-5 justify-center w-full p-5 mt-6">
        <div className="text-4xl font-semibold">Get pdfs</div>
        <p className="md:w-2/3 font-thin">
          Don&apos;t know where to start?
        </p>
      </div> */}
    </div>
  );
};

export default ResourceSection;
