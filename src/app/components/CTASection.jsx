// components/CTASection.js
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CTASection() {
  const ctaRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={ctaRef} 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-800 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 opacity-20 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="font-[IntegralCF] text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your <span className="text-yellow-400">IB Journey?</span>
              </h2>
              <p className="text-xl text-indigo-100 max-w-2xl">
                Join thousands of successful IB students who have leveled up their understanding and scores with Nailib Videos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white font-bold py-4 px-10 rounded-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}