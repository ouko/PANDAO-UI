import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ✅ Fetch function that handles nested response
const fetchAirdrops = async () => {
  const res = await axios.get('/community/airdrops/live');
  // Handle both raw array and wrapped array in { data: [...] }
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.data)) return res.data.data;
  throw new Error("Unexpected API response format");
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // ✅ Use TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['airdrops', 'live'],
    queryFn: fetchAirdrops,
  });

  // ✅ Map API data to carousel slide format
  const slides = data?.map((item) => ({
    id: item.community_id,
    title: item.community_name,
    subtitle: `Airdrop: ${item.amount_per_air_drop}`,
    description: `Live from ${new Date(item.start_time).toLocaleDateString()} to ${new Date(item.end_time).toLocaleDateString()}.`,
    image: item.community_image,
    buttonText: "View Community",
    buttonLink: `/community/detail/${item.community_id}`,
  })) || [];

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide, slides.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (isLoading) {
    return <div className="h-[70vh] flex items-center justify-center text-white text-xl">Loading airdrops...</div>;
  }

  if (isError || slides.length === 0) {
    return <div className="h-[70vh] flex items-center justify-center text-white text-xl">Failed to load airdrops.</div>;
  }

  return (
    <div
      className="relative w-full h-[70vh] overflow-hidden rounded-2xl shadow-2xl group z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto text-white">
                <div className="animate-fade-in">
                  <p className="text-lg md:text-xl font-medium mb-2 text-blue-200">{slide.subtitle}</p>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{slide.title}</h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200 leading-relaxed">{slide.description}</p>
                  <a href={slide.buttonLink}>
                    <button className="bg-brand4 hover:bg-brand5 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      {slide.buttonText}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-brand4 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Carousel;
