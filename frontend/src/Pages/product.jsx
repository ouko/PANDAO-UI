import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid'
import { WobbleCard } from '@/components/ui/myComponents/wobble-card'

const Product = () => {
  return (
    <div className="relative ">
      <AnimatedGridPattern />
      <div className="min-h-screen flex flex-col items-center py-28  justify-center gap-7  text-black max-w-[1440px] mx-auto p-5">
        <div className="text-6xl text-center leading-[80px] font-bold">
          Welcome to the Future of Decentralized Governance
        </div>
        <div className="text-3xl font-bold">What is Pandao?</div>
        <p className="text-left max-w-[1200px]">
          In an era where decentralization is more than a buzzword, our platform
          represents a revolutionary step forward in empowering communities and
          organizations. Built on the robust foundation of the Radix blockchain,
          our platform offers a universal DAO (Decentralized Autonomous
          Organization) launchpad, designed to democratize governance and
          innovate how collective decisions are made and implemented. Radix
          stands out in the blockchain landscape for its unique approach to
          scalability and security, which are critical for the efficient
          operation of DAOs. Radix&apos;s ledger design and consensus mechanism
          ensure that as more DAOs are launched and more participants join, the
          network maintains high transaction speeds without compromising on
          security. This is crucial for DAOs, where timely and secure execution
          of governance decisions can be the difference between success and
          stagnation.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
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
              className="absolute -right-4 lg:-right-[10%]  filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px]">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Secure, Scalable, and Seamless DAOs – Made Possible with Radix &
              Actus.
            </h2>
            {/* <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              If someone yells “stop!”, goes limp, or taps out, the fight is
              over.
            </p> */}
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Actus for Precision, Radix for Trust – The Ultimate DAO
                Platform.
              </h2>
              {/* <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                With over 100,000 mothly active bot users, Gippity AI is the
                most popular AI platform for developers.
              </p> */}
            </div>
            <img
              src="/radix.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>

        <div>
          <h2 className="text-5xl text-center leading-[80px] font-bold">
            Empowering Community-Led Innovation
          </h2>
          <p className="text-left max-w-[1200px]">
            Join a DAO Where Every Voice Matters! Buy tokens to gain a stake,
            propose ideas that fuel progress, and vote on key decisions that
            shape our collective future. This is more than a DAO; it’s a
            dynamic, participatory ecosystem built for those ready to drive real
            change. Whether youre an investor, innovator, or advocate, our
            community gives you the tools to actively influence and lead. Step
            into a space where engagement thrives, and each member is empowered
            to contribute, connect, and grow. <br /> Here, collaboration is at
            the heart of every decision. From supporting groundbreaking
            proposals to voting on projects that align with our shared values,
            you have the chance to impact the direction we take. Every token
            gives you a voice, every discussion brings new ideas, and every vote
            brings us closer to a future we all believe in. Join us and be part
            of a decentralized movement where we build, innovate, and
            succeed—together.
          </p>
          {/* <ul>
            <li>
              <strong>Scalability:</strong> Radix’s Cerberus consensus protocol
              allows for unprecedented scalability. This means your DAO can grow
              in membership and transaction volume without facing the
              bottlenecks typically associated with blockchain networks.
            </li>
            <li>
              <strong>Security:</strong> Security is paramount in governance.
              Radix’s built-in security measures protect against common
              vulnerabilities in smart contracts, making your DAO’s operations
              transparent and tamper-proof.
            </li>
            <li>
              <strong>Interoperability:</strong> Radix excels in allowing
              various applications and tokens to interact seamlessly on its
              network. This interoperability is vital for DAOs that may need to
              integrate multiple tokens or interact with other blockchain
              services as part of their governance processes.
            </li>
            <li>
              <strong>Developer Friendly:</strong> With Radix Engine, developers
              can build using secure Scrypto language specifically designed for
              DeFi applications. This reduces the barrier to entry for setting
              up a DAO and customizing it according to specific governance
              needs.
            </li>
            <li>
              <strong>Resource-Oriented Programming:</strong> Unique to Radix,
              this programming paradigm mirrors physical world constraints in
              the digital environment, making it easier to manage DAO resources
              effectively and safely.
            </li>
          </ul> */}
        </div>
        <div>
          <h2 className="text-5xl text-center leading-[70px] font-bold max-w-[1200px]">
            Secure, Scalable, and Seamless DAOs – Made Possible with Radix &
            Actus.
          </h2>
          <p className="text-left max-w-[1200px]">
            Secure, Scalable, and Seamless DAOs – Made Possible with Radix &
            Actus. Built on the trusted foundation of Radix and driven by the
            precision of Actus, our DAOs offer unmatched security, scalability,
            and simplicity. From the initial setup to day-to-day governance,
            experience a platform designed for effortless growth and innovation. <br />
            With Radixs powerful blockchain infrastructure, enjoy seamless
            transactions and fast, secure scaling to support any size community.
            Actus brings clarity and structure to DAO creation, empowering
            communities to confidently propose, vote, and decide on key
            initiatives. Together, Radix and Actus ensure a future-ready DAO
            experience where integrity and efficiency are at the forefront.
            Build, collaborate, and succeed with a DAO ecosystem tailored to
            your vision!
          </p>
          {/* <ul>
            <li>
              <strong>Scalability:</strong> Radix’s Cerberus consensus protocol
              allows for unprecedented scalability. This means your DAO can grow
              in membership and transaction volume without facing the
              bottlenecks typically associated with blockchain networks.
            </li>
            <li>
              <strong>Security:</strong> Security is paramount in governance.
              Radix’s built-in security measures protect against common
              vulnerabilities in smart contracts, making your DAO’s operations
              transparent and tamper-proof.
            </li>
            <li>
              <strong>Interoperability:</strong> Radix excels in allowing
              various applications and tokens to interact seamlessly on its
              network. This interoperability is vital for DAOs that may need to
              integrate multiple tokens or interact with other blockchain
              services as part of their governance processes.
            </li>
            <li>
              <strong>Developer Friendly:</strong> With Radix Engine, developers
              can build using secure Scrypto language specifically designed for
              DeFi applications. This reduces the barrier to entry for setting
              up a DAO and customizing it according to specific governance
              needs.
            </li>
            <li>
              <strong>Resource-Oriented Programming:</strong> Unique to Radix,
              this programming paradigm mirrors physical world constraints in
              the digital environment, making it easier to manage DAO resources
              effectively and safely.
            </li>
          </ul> */}
        </div>
        {/* <section>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            Launch Your DAO with Ease
          </h1>
          <span>
            Our platform utilizes these Radix features to offer a range of DAO
            blueprints – templates that can be customized to meet specific
            governance models. Whether you’re looking to start a venture DAO, a
            grant DAO, or a social club, our blueprints save time and reduce
            complexity in setting up your organization.
          </span>
        </section>
        <section>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            Integrated Tools for Enhanced Functionality
          </h1>
          <span>
            Beyond the launch capabilities, our platform provides integrated
            analytics tools, voting systems, and treasury management solutions,
            all designed to enhance the functionality and autonomy of your DAO.
            These tools leverage Radix’s fast and secure transaction
            capabilities, ensuring that your DAO operates efficiently and
            transparently.
          </span>
        </section>
        <section>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            Join the Decentralized Revolution
          </h1>

          <span>
            Our commitment is to provide an accessible, powerful, and secure
            platform for anyone looking to harness the power of decentralized
            governance. Powered by Radix, our platform is not just a tool for
            creating DAOs but a stepping stone towards a more equitable and
            participatory future.
          </span>
          <br />
          <span>
            Experience the power of decentralized governance. Launch your DAO on
            our platform and be part of the future today.
          </span>
        </section>
        <h2 className="text-3xl font-bold mt-6 ">Features of Pandao</h2>
        <p className="">
          Pandao integrates several key features to support its mission:
          <ul className="list-disc pl-8">
            <li>
              Simple DAO Setup: With just a few clicks, set up your own DAO,
              define its rules, and get it running.
            </li>
            <li>
              Customizable Governance Models: Choose from a variety of
              governance templates or customize your own to meet the specific
              needs of your community.
            </li>
            <li>
              Secure on Radix: Built on the Radix blockchain, Pandao leverages
              the security and scalability of this layer-1 protocol.
            </li>
            <li>
              Community Support: Gain access to a broad network of users and
              resources to ensure your DAO thrives.
            </li>
          </ul>
        </p>
        <section>
          <h2 className="text-3xl font-bold mt-6 mb-2">
            Getting Started with Pandao
          </h2>
          <p className="mt-2">
            Starting your journey with Pandao is straightforward:
            <ol className="list-decimal pl-8">
              <li>Visit the Pandao platform and sign up for an account.</li>
              <li>Follow the guided setup to create your DAO.</li>
              <li>
                Engage your community and begin governance with full autonomy
                and minimal fuss.
              </li>
            </ol>
            Embrace the future of decentralized governance with Pandao, where
            creating a DAO is as simple as managing a social media profile.
          </p>
        </section> */}
      </div>
    </div>
  )
}

export default Product
