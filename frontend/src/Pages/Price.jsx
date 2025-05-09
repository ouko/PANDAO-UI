import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid'
import PricingCard from './PricingCard'

const Price = () => {
  return (
    <div className="pt-10 relative text-black">
      <AnimatedGridPattern />

      <div className="container my-40  flex flex-col items-center gap-2 justify-center  ">
        <div className="md:text-6xl text-xl pt-8 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-black dark:from-white to-gray-600 dark:to-gray-400">
          The perfect pricing to power your DAO development.
        </div>
        <p className="text-center tracking-wide pb-8">
         
At PANDAO, we believe in transparency, not just in governance but also in costs. Explore our pricing plans, designed to meet the needs of small communities, growing organizations, and large enterprises. Whether you’re experimenting with your first DAO or scaling an existing one, you’ll find a plan that fits your needs and budget.

        </p>
        <div className="grid md:grid-cols-3 grid-cols-1 w-full mt-5 gap-5 ">
        <PricingCard
          title="Community Plan"
          description="Perfect for early-stage DAOs."
          price="Free"
          details="Access essential DAO tools and resources to kickstart your journey."
          features={[
            'Basic DAO setup',
            'Voting & governance tools',
            'Essential analytics',
            'Community support',
          ]}
          buttonText="Get Started"
        />

<PricingCard
          title="Growth Plan"
          description="For growing DAOs aiming for sustainable growth."
          price="$299/mo"
          details="Scale your DAO with enhanced features and dedicated support."
          features={[
            'Advanced voting mechanisms',
            'Custom analytics dashboards',
            'Member onboarding tools',
            'Email & chat support',
          ]}
          buttonText="Subscribe"
        />

<PricingCard
          title="Enterprise Plan"
          description="Customized solutions for enterprise DAOs."
          price="Custom Pricing"
          details="Tailored DAO solutions to meet your unique organizational needs."
          features={[
            'Dedicated DAO strategist',
            'Custom integrations & tools',
            'On-site workshops & training',
            'Priority 24/7 support',
          ]}
          buttonText="Contact Us"
        />
        </div>
      </div>
    </div>
  )
}

export default Price
