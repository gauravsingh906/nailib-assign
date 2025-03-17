
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FeaturesSection() {
  const featuresRef = useRef(null);
  const titleRef = useRef(null);
  const featuresGridRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%'
          }
        }
      );
      
      // Features grid animation
      const featureItems = document.querySelectorAll('.feature-item');
      gsap.fromTo(
        featureItems,
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.7,
          stagger: {
            amount: 0.8,
            grid: [2, 3],
            from: "center"
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: featuresGridRef.current,
            start: 'top 85%'
          }
        }
      );
      
      // Icon animations
      gsap.fromTo(
        '.feature-icon',
        { scale: 0.5, rotation: -10, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          stagger: {
            amount: 0.8,
            grid: [2, 3],
            from: "center"
          },
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: featuresGridRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "Exam-Focused Content",
      description: "Videos are strategically aligned with IB syllabus requirements and exam patterns for maximum relevance.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: "👨‍🏫",
      title: "Expert IB Teachers",
      description: "Learn from experienced IB examiners and educators with proven track records of student success.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: "🧠",
      title: "Visual Learning",
      description: "Complex concepts explained visually for better retention, understanding, and application.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "⏱️",
      title: "Time-Efficient",
      description: "Concise videos that deliver maximum value in minimum time—perfect for busy IB students.",
      color: "from-yellow-500 to-amber-600"
    },
    {
      icon: "🔄",
      title: "Pause & Repeat",
      description: "Learn at your own pace—rewatch difficult sections as many times as needed until mastery.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: "📱",
      title: "Learn Anywhere",
      description: "Access videos on any device, anytime, even offline with our mobile app for flexible studying.",
      color: "from-indigo-500 to-violet-600"
    }
  ];

  return (
    <section 
      ref={featuresRef} 
      className="py-24 font-[IntegralCF] px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full transform translate-x-1/3 -translate-y-1/3 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full transform -translate-x-1/3 translate-y-1/3 opacity-30 blur-3xl"></div>
        
        {/* Animated floating dots */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-indigo-400 rounded-full opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/2 w-8 h-8 bg-indigo-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-yellow-300 rounded-full opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold tracking-wider uppercase mb-4">
            Elevate Your IB Experience
          </span>
          <h2 className="font-[IntegralCF] text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Nailib Videos <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Make a Difference</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our video resources are designed specifically for IB students to optimize learning and maximize scores—see what sets us apart.
          </p>
        </div>

        <div ref={featuresGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-item bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Highlight border */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.color} transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>
              
              {/* Icon with gradient background */}
              <div className="mb-6 relative">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${feature.color} opacity-10 transform scale-150 blur-lg`}></div>
                <div className="feature-icon relative z-10 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
              </div>
              
              <h3 className="font-[IntegralCF] text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              
              {/* Visual indicator */}
              <div className="mt-6 flex items-center text-indigo-600 font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="mr-2">Learn more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-4">Experience the difference for yourself</p>
          <button className="bg-indigo-600 font-[IntegralCF] hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-indigo-100">
            Explore Our Video Library
          </button>
        </div>
      </div>
    </section>
  );
}