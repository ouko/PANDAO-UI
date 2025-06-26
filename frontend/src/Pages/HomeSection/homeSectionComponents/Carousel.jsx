import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BrandButton from '@/components/ui/myComponents/brand-button';
import { Link } from 'react-router-dom';

const fetchAirdrops = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/community/airdrops/live`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!Array.isArray(res.data)) {
    console.error('Unexpected API response:', res.data);
    throw new Error('API did not return expected array');
  }

  return res.data;
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['airdrops', 'live'],
    queryFn: fetchAirdrops,
  });

  const slides = data?.map((item) => ({
    id: item.community_id,
    title: item.community_name,
    subtitle: `Airdrop: ${item.amount_per_air_drop}`,
    description: `Live from ${new Date(item.start_time).toLocaleDateString()} to ${new Date(item.end_time).toLocaleDateString()}.`,
    start_time: new Date(item.start_time).toLocaleDateString(),
    end_time: new Date(item.end_time).toLocaleDateString(),
    image: item.community_image,
    buttonText: 'View Community',
    buttonLink: `/community/detail/${item.community_id}`,
  }));

  useEffect(() => {
    if (!isAutoPlaying || !slides || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide, slides]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // UI States
  if (isLoading) {
    return <div className="h-[70vh] flex items-center justify-center text-white text-xl">Loading airdrops...</div>;
  }

  if (isError) {
    return <div className="h-[70vh] flex items-center justify-center text-white text-xl">Failed to load airdrops.</div>;
  }

  if (!slides || slides.length === 0) {
    return <div className="h-[70vh] flex items-center justify-center text-white text-xl">No airdrops available right now.</div>;
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

            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
  <div className="max-w-4xl mx-auto text-white">
    <div className="animate-fade-in">
      
      {/* Subtitle */}
      <p className="text-lg md:text-xl font-medium mb-2 text-blue-200">
        {slide.subtitle}
      </p>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {slide.title}
      </h1>

      {/* Time Info */}
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200 leading-relaxed">
        {`Starts on ${slide.start_time} to ${slide.end_time}`}
      </p>

      {/* Image */}
      <img 
        src={slide.image} 
        alt={slide.title} 
        className="size-20 rounded-full object-cover mb-6 mx-auto" 
      />

      {/* CTA Button */}
      <Link
        to={slide.buttonLink}
        className="group/btn relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white
        bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
        rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
        transform hover:scale-105 hover:-translate-y-1
        transition-all duration-300 ease-out
        border border-white/20 backdrop-blur-sm
        overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-out"></div>

        {/* Button Content */}
        <span className="relative z-10 flex items-center space-x-2">
          <span>Explore More</span>
          <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>

        {/* Glowing Edge */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-sm"></div>
        </div>
      </Link>
      
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
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
