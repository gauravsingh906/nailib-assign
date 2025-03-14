// components/HeroSection.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const heroRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Hero animations
      gsap.fromTo(
        '.hero-title', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );
      
      gsap.fromTo(
        '.hero-description', 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, delay: 0.4 }
      );
      
      gsap.fromTo(
        '.hero-cta', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
      );
      
      gsap.fromTo(
        '.hero-video', 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 1, delay: 0.3 }
      );
    }
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative bg-gradient-to-br from-indigo-900 to-indigo-700 text-white px-4 sm:px-6 lg:px-8 pt-32 pb-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="hero-title font-[IntegralCF] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Master the IB <span className="text-yellow-400">through Video</span>
            </h1>
            <p className="hero-description text-lg md:text-xl mb-8 text-gray-100 max-w-xl">
              Boost your understanding with our expert-made video lessons tailored specifically for IB students. Visual learning that makes complex concepts clear.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white font-bold py-3 px-8 rounded-lg transition-all">
                View Sample Videos
              </button>
            </div>
          </div>
          <div className="hero-video lg:w-1/2 relative">
            <div className="relative w-full h-64 md:h-80 lg:h-96">
              <div className="absolute inset-0 bg-indigo-500 opacity-70 rounded-lg transform -rotate-3"></div>
              <div className="absolute inset-0 bg-yellow-400 opacity-70 rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <div className="relative w-full h-full bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white bg-opacity-25 rounded-full flex items-center justify-center cursor-pointer transform transition-transform hover:scale-110">
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-16 border-t-transparent border-b-transparent border-l-white ml-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 right-8 bg-white p-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs font-bold text-gray-800">3,200+ students watching now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}