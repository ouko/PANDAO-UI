import AnimatedGridPattern from "@/components/ui/myComponents/animated-grid";
import { ResourcesAnimation } from "./ResourcesAnimation";

const HomeSection = () => {
  return (
    <>
      <div className="relative">
        <AnimatedGridPattern />
        <div className="pt-20 h-auto flex flex-col items-center justify-center text-black max-w-[1440px] mx-auto py-10">
          <div className="flex flex-col items-center text-center gap-8 px-5">
            <h1 className="  md:text-7xl text-4xl font-bold tracking-wider text-gradient bg-gradient-to-r from-[#443f9c] via-[#2f2da3] to-[#61205a]">
              Catalyst Suite
            </h1>
            <p className="text-xl font-medium text-gray-700">
              Transforming DAO Creation and Management
            </p>

            <div className="grid md:grid-cols-2 gap-10 text-left">
              <div className="p-5 border rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#0097b2]">DAO Quick-Start Kit</h3>
                <p className="mt-3 text-gray-600">
                  Launch your DAO effortlessly with our comprehensive Quick-Start Kit. This toolkit includes templates for voting, governance management, and seamless member onboarding.
                </p>
                <p className="mt-2 font-semibold text-gray-800">Why It’s Essential:</p>
                <p>Focus on your mission while we handle the technical groundwork. Launching a DAO has never been easier.</p>
              </div>

              <div className="p-5 border rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#375e91]">Automated Governance Tools</h3>
                <p className="mt-3 text-gray-600">
                  Automate voting, proposal management, and decision-making processes. Reduce manual effort and keep your organization on track effortlessly.
                </p>
                <p className="mt-2 font-semibold text-gray-800">Why It’s Essential:</p>
                <p>Spend less time managing logistics and more time growing your DAO.</p>
              </div>

              <div className="p-5 border rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#7ed957]">Treasury & Funding Dashboard</h3>
                <p className="mt-3 text-gray-600">
                  Manage your DAO’s finances with real-time transparency. Allocate funds, manage budgets, and review spending with confidence.
                </p>
                <p className="mt-2 font-semibold text-gray-800">Why It’s Essential:</p>
                <p>Control your community’s resources efficiently and align every transaction with your vision.</p>
              </div>

              <div className="p-5 border rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#68237b]">Community Engagement Hub</h3>
                <p className="mt-3 text-gray-600">
                  Connect your members with built-in polls, discussions, and real-time notifications. Foster participation and keep everyone aligned.
                </p>
                <p className="mt-2 font-semibold text-gray-800">Why It’s Essential:</p>
                <p>A thriving community is a connected one. Strengthen bonds as your DAO grows stronger.</p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                Experience the Catalyst Suite Today
              </h3>
              <p className="mt-3 text-gray-600">
                PANDAO’s Catalyst Suite is your ultimate partner in creating and managing a DAO that works for you. Start building with Catalyst Suite today and redefine decentralized collaboration.
              </p>
            </div>
          </div>

          {/* Optionally Uncomment for Animation */}
          {/* <ResourcesAnimation /> */}
        </div>
      </div>
    </>
  );
};

export default HomeSection;
