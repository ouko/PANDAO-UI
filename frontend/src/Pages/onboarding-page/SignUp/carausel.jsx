import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const carouselData = [
    { image: "/s1.png" },
    { image: "/s2.png" },
    { image: "/s3.png" },
];

export default function CarouselComponent() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full mx-auto p-6 opacity-100">
                        <AnimatePresence mode="wait">

            <motion.img
                key={activeIndex}
                src={carouselData[activeIndex].image}
                alt="Carousel Image"
                className="rounded-lg shadow-lg object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
            />
             </AnimatePresence>
        </div>
    );
}
