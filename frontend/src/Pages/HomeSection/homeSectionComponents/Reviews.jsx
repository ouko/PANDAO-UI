
function Reviews() {
  const data = [
    {
      name: "Karan J., Software Engineer",
      username: "karannnn",
      imageSrc: "/pic1.svg",
      bio: "AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies",
    },
   
    {
      name: "Neha R., Data Scientist",
      username: "neharai",
      imageSrc: "/pic2.svg",
      bio: "AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies",
    },
    {
      name: "Sohan K., DevOps Engineer",
      username: "sohandev",
      imageSrc: "/pic3.svg",
      bio: "Cloud computing, CI/CD, and automation expert. Love working with Docker, Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies Kubernetes, and AWS.",
    },
    {
      name: "Riya S., Frontend Developer",
      username: "riyasss",
      imageSrc: "/pic3.svg",
      bio: "Passionate about UI/UX and building interactive web applications. Love working with React and Tailwind CSS.",
    },
    {
      name: "Amit P., Backend Engineer",
      username: "amit_dev",
      imageSrc: "/pic1.svg",
      bio: "Backend enthusiast, working with Node.js, Express, and MongoDB. Scaling applications for better performance.",
    },
    {
      name: "Priya M., Full Stack Developer",
      username: "priyam",
      imageSrc: "/pic2.svg",
      bio: "AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies AI and ML enthusiast, working on NLP and predictive modeling. Always eager to learn new technologies.",
    },
    {
      name: "Priya M., Full Stack Developer",
      username: "priyam",
      imageSrc: "/pic2.svg",
      bio: "AI and ML enthusiast, working on NLP and predictive modeling. hjsn jsbndkjbk jkbfkjdbs kjsbdfkj sdkj .",
    },
  ];

  return (
    <div className="items-center justify-center  pb-20 z-50  container ">
      <div className="flex flex-col items-center justify-start gap-3  pb-10  w-full z-50">
        <h2
          className="text-center text-[64px] font-semibold relative self-stretch z-50" 
          style={{
            background:
              "linear-gradient(90.09deg, rgba(255, 255, 255, 1) 33.17%, rgba(99, 89, 233, 1) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hear It from Our Users
        </h2>
        <p className="text-[#B59AEC] text-center text-2xl leading-[120%] font-normal mb-6 self-stretch z-50">
          Discover how Urify is empowering users to take control of their finances
          effortlessly.
        </p>
      </div>

     



     
      <div className="md:columns-3 columns-1 space-y-5 z-50  ">
        {data.map((user, index) => (
          <div
            key={index}
            className="bg-[rgba(250,250,250,0.02)] rounded-xl border-solid border-[rgba(255,255,255,0.20)] border p-6 flex flex-col items-start justify-start relative overflow-hidden shadow-inner max-w-[460px] z-50"
            style={{
              boxShadow:
                "inset 0px 0px 64px 0px rgba(140, 140, 255, 0.12), inset 0px 0px 64px 0px rgba(140, 140, 255, 0), inset 0px 0px 64px 0px rgba(140, 140, 255, 0.16)",
            }}
          >
            <div className="flex flex-col-reverse items-start justify-start w-full relative ">
              <div className="flex flex-row  items-center justify-start w-full mt-2">
                <img
                  className="rounded-full w-[47px] mr-4 h-[47px] object-cover"
                  src={user.imageSrc}
                  alt={user.name}
                />
                <div className="flex flex-col gap-0 items-start justify-start">
                  <div className="text-[#B59AEC] text-left font-semibold text-lg leading-7">
                    {user.name}
                  </div>
                  <div className="text-gray-500 text-left text-base leading-6">
                    @{user.username}
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground text-left text-base leading-6">
                {user.bio}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
