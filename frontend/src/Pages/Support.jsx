import AnimatedGridPattern from "@/components/ui/myComponents/animated-grid";

const Support = () => {
    return (
       <div className="pt-20 mb-5 pb-4">
                 <AnimatedGridPattern />
            <div className="pt-20 mb-5 pb-9 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
                    We’re here to help.
                </h1>
                <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                    Need assistance? Our Support Team is ready to guide you through any challenges
                    you encounter. Whether you have questions about setting up your DAO, managing
                    governance tools, or troubleshooting technical issues, we’re just a click away.
                    Contact us and let’s get things running smoothly.
                </p>
                <div className="mt-10">
                    <a
                        href="#contact"
                        className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Support;
