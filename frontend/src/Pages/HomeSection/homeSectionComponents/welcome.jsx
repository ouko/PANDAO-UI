import { WobbleCard } from "@/components/ui/myComponents/wobble-card";

const Welcome = () => {
    return (<div className="min-h-screen flex flex-col items-center py-28  justify-center gap-7  text-white max-w-[1440px] mx-auto p-5 z-50" id="catalystsuite">
        <div className="text-[35px] md:text-[64px] leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent text-center font-clash z-50">
            Welcome to the Future of Decentralized Governance
        </div>
        <div className="md:text-[24px] text-[18px]  leading-tight font-semibold bg-gradient-to-r from-white to-[#9290bb] bg-clip-text text-transparent text-center  z-50 pb-10 ">
            Discover how Urify is empowering users to take control of their finances effortlessly.
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full z-50">
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-3 h-full bg-brand1 min-h-[500px] lg:min-h-[300px]"
                className=""
            >
                <div className="max-w-xl font-clash">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-5xl font-semibold tracking-[-0.015em] text-white">
                        Join, Vote, and Shape the Future – A Community-Driven DAO
                        Experience!
                    </h2>
                    <p className="mt-4 text-left  text-base/6 text-neutral-200">
                        A DAO Community Built for Engagement – Buy, Propose, and Vote to
                        Lead the Change!
                    </p>
                </div>
                <img
                    src="/home.jpg"
                    width={500}
                    height={500}
                    alt="linear demo image"
                    className="absolute -right-4 lg:-right-[10%]  filter bottom-10 object-contain rounded-2xl"
                />
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-brand3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className="max-w-sm font-clash">
                    <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-5xl font-semibold tracking-[-0.015em] text-white">
                        Actus for Precision, Radix for Trust
                    </h2>
                    <h6 className="mt-3">
                        The Ultimate DAO
                        Platform.
                    </h6>
                </div>
                <img
                    src="/radix.webp"
                    width={300}
                    height={300}
                    alt="linear demo image"
                    className="absolute -right-10 md:right-[600]  -bottom-10 object-contain rounded-2xl"
                />
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-brand2 ">
                <div className="font-clash">
                <h2 className="max-w-80  text-center text-balance text-base md:text-xl lg:text-5xl font-semibold tracking-[-0.015em] text-white">
                    Secure, Scalable, and Seamless DAOs 
                </h2>
                <h2 className="max-w-80  text-center text-balance text-base md:text-xl lg:text-xl font-semibold tracking-[-0.015em] text-white">
                Made Possible with Radix &
                Actus.
                </h2>

                </div>
               
            </WobbleCard>
        </div>


    </div>);
}

export default Welcome;