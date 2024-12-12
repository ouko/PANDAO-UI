import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid';

const Price = () => {
    return (
        <div className="pt-10 relative text-black">
            <AnimatedGridPattern />
            <div className="min-h-screen flex flex-col items-center justify-center p-5 mx-auto max-w-[1440px]">
                <h1 className="text-7xl font-bold mb-6 text-center">Price</h1>

                <section className="mt-6 text-center">
                    <p className="leading-relaxed text-base text-gray-700">
                        Purpose: Clearly outline the cost structure, including free options, premium features, or custom enterprise solutions.
                    </p>
                </section>
                <h1 className="mt-4 text-4xl font-bold mb-6 text-center">Simple pricing for every stage of your DAO journey</h1>
                <section className="mt-6 text-center">
                    <p className="leading-relaxed text-base text-gray-700">
                        At PANDAO, we believe in transparency, not just in governance but also in costs. Explore our pricing plans, designed to meet the needs of small communities, growing organizations, and large enterprises. Whether you’re experimenting with your first DAO or scaling an existing one, you’ll find a plan that fits your needs and budget.
                    </p>
                </section>

                {/* Pricing Catalog Section */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="border border-gray-300 rounded-lg shadow-md p-6 text-center bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                        <h2 className="text-2xl font-bold mb-4 text-purple-800">Free Plan</h2>
                        <p className="text-base text-purple-700 mb-4">Perfect for small communities just starting their DAO journey.</p>
                        <ul className="list-disc list-inside text-purple-600">
                            <li>Basic governance tools</li>
                            <li>Up to 50 members</li>
                            <li>Community support</li>
                        </ul>
                        <p className="mt-4 text-lg font-bold text-purple-900">$0 / month</p>
                    </div>

                    
                    <div className="border border-gray-300 rounded-lg shadow-md p-6 text-center bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                        <h2 className="text-2xl font-bold mb-4 text-purple-800">Premium Plan</h2>
                        <p className="text-base text-purple-700 mb-4">Ideal for growing organizations with advanced needs.</p>
                        <ul className="list-disc list-inside text-purple-600">
                            <li>Advanced governance tools</li>
                            <li>Up to 500 members</li>
                            <li>Email and chat support</li>
                            <li>Custom analytics</li>
                        </ul>
                        <p className="mt-4 text-lg font-bold text-purple-900">$49 / month</p>
                    </div>

                   
                    <div className="border border-gray-300 rounded-lg shadow-md p-6 text-center bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                        <h2 className="text-2xl font-bold mb-4 text-purple-800">Enterprise Plan</h2>
                        <p className="text-base text-purple-700 mb-4">Tailored for large-scale enterprises with custom requirements.</p>
                        <ul className="list-disc list-inside text-purple-600">
                            <li>Unlimited members</li>
                            <li>Dedicated account manager</li>
                            <li>24/7 priority support</li>
                            <li>Custom integrations</li>
                        </ul>
                        <p className="mt-4 text-lg font-bold text-purple-900">Contact us for pricing</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Price;
