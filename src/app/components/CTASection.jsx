import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function CTASection() {
  const ctaRef = useRef(null);
  const ctaContentRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const decorationRef = useRef(null);
  const backgroundShapesRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Main section animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%'
          }
        }
      );
      
      // Content animation with slight delay
      gsap.fromTo(
        ctaContentRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%'
          }
        }
      );
      
      // Buttons animation with stagger
      gsap.fromTo(
        ctaButtonsRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          delay: 0.4,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%'
          }
        }
      );
      
      // Decorative elements animation
      gsap.fromTo(
        decorationRef.current.children,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2,
          stagger: 0.2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%'
          }
        }
      );
      
      // Animate background shapes
      if (backgroundShapesRef.current) {
        const shapes = backgroundShapesRef.current.querySelectorAll('.bg-shape');
        
        shapes.forEach((shape) => {
          // Random starting position
          gsap.set(shape, {
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            rotation: Math.random() * 360,
            scale: 0.7 + Math.random() * 0.5,
          });
          
          // Floating animation
          gsap.to(shape, {
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            rotation: `+=${Math.random() * 180}`,
            duration: 20 + Math.random() * 15,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      }
    }
  }, []);

  return (
    <section 
      ref={ctaRef} 
      className="py-24 px-4 sm:px-6 font-[IntegralCF] lg:px-8 text-blue-900 relative overflow-hidden"
    >
      {/* Updated background with white and blue gradient */}
      <div className="absolute inset-0  pointer-events-none"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23blue' fill-opacity='0.3'%3E%3Cpath d='M0 20h40v1H0v-1zm0-19h1v40H0V1zm39 0h1v40h-1V1zM0 0h40v1H0V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "40px 40px"
        }}></div>
      </div>
      
      {/* Subtle blue dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "radial-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px, 40px 40px",
          backgroundPosition: "0 0, 25px 25px"
        }}></div>
      </div>
      
      {/* Animated background shapes with blue shades */}
      <div ref={backgroundShapesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-shape absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/20 to-blue-200/15 blur-3xl"></div>
        <div className="bg-shape absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-200/15 to-blue-100/10 blur-3xl"></div>
        <div className="bg-shape absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-100/10 to-blue-50/5 blur-3xl"></div>
        
        {/* Geometric accents with blue shades */}
        <div className="absolute top-1/4 right-1/5 opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 10L110 95H10L60 10Z" fill="url(#paint0_linear)" />
            <path d="M60 95L10 10H110L60 95Z" fill="url(#paint1_linear)" opacity="0.6" />
            <defs>
              <linearGradient id="paint0_linear" x1="60" y1="10" x2="60" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#93C5FD" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="60" y1="95" x2="60" y2="10" gradientUnits="userSpaceOnUse">
                <stop stopColor="#93C5FD" />
                <stop offset="1" stopColor="#3B82F6" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Educational theme circular elements with blue colors */}
        <div className="absolute bottom-1/4 left-1/5 opacity-20">
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 border-2 border-blue-300/30 rounded-full animate-[spin_25s_linear_infinite]"></div>
            <div className="absolute inset-2 border-2 border-blue-400/30 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
            <div className="absolute inset-4 border-2 border-blue-300/30 rounded-full animate-[spin_15s_linear_infinite]"></div>
            <div className="absolute inset-6 border-2 border-blue-200/30 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-blue-400/50 blur-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Light blue beams effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -inset-[10%] bg-gradient-conic from-blue-300/0 via-blue-300/10 to-blue-300/0 animate-[spin_20s_linear_infinite]" style={{ transform: 'skewY(-15deg)' }}></div>
      </div>
      
      {/* Subtle horizontal line decorations */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-white/90 via-white/95 to-blue-50/90 rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 relative overflow-hidden backdrop-blur-sm border border-blue-200/50">
          {/* Decorative elements with blue shades */}
          <div ref={decorationRef} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 opacity-10 rounded-full transform -translate-x-1/3 -translate-y-1/3 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 opacity-15 rounded-full transform translate-x-1/4 translate-y-1/4 blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-400 opacity-10 rounded-full transform -translate-y-1/2 blur-lg"></div>
            <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-blue-100 opacity-15 rounded-full blur-md"></div>
            
            {/* Video play button decoration with blue colors */}
            <div className="hidden lg:block absolute -right-16 top-1/2 transform -translate-y-1/2">
              <div className="w-32 h-32 rounded-full bg-blue-200/30 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-300/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={ctaContentRef} className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-10 lg:mb-0 lg:mr-8 text-center lg:text-left lg:max-w-2xl">
              <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                Premium Video Content
              </span>
              <h2 className="font-[IntegralCF] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">IB Journey?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-800 mb-8">
                Join thousands of successful IB students who have leveled up their understanding and scores with Nailib Videos. Expert-led content designed specifically for your curriculum.
              </p>
              
              {/* Stats showcase with blue colors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 lg:mb-0">
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                  <div className="font-[IntegralCF] text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-blue-700">Score Improvement</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                  <div className="font-[IntegralCF] text-2xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-blue-700">Active Students</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm sm:col-span-1 col-span-2">
                  <div className="font-[IntegralCF] text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-blue-700">Access Anywhere</div>
                </div>
              </div>
            </div>
            
            <div ref={ctaButtonsRef} className="lg:w-auto w-full flex flex-col sm:flex-row lg:flex-col gap-4">
              <button className="bg-gradient-to-r font-[IntegralCF] from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-300/20 flex items-center justify-center">
                <span>Start Free Trial</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button className="bg-transparent font-[IntegralCF] backdrop-blur-sm bg-blue-500/5 hover:bg-blue-500/10 border-2 border-blue-500/20 hover:border-blue-500/40 text-gray-700 font-bold py-4 px-10 rounded-xl transition-all duration-300 flex items-center justify-center">
                <span>Watch Demo</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              <div className="mt-4 text-center lg:text-left">
                <span className="text-sm text-blue-700 block mb-1">No credit card required</span>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-8 h-8 rounded-full bg-blue-${i*100} border-2 border-white flex items-center justify-center text-xs font-bold text-white`}>
                        {i === 4 ? '+' : ''}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700 ml-2">Join 10,000+ students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}