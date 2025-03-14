// components/FeaturesSection.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FeaturesSection() {
  const featuresRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Features animations
      const featureItems = document.querySelectorAll('.feature-item');
      featureItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%'
            }
          }
        );
      });
    }
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "Exam-Focused Content",
      description: "Videos are strategically aligned with IB syllabus requirements and exam patterns."
    },
    {
      icon: "👨‍🏫",
      title: "Expert IB Teachers",
      description: "Learn from experienced IB examiners and educators with proven track records."
    },
    {
      icon: "🧠",
      title: "Visual Learning",
      description: "Complex concepts explained visually for better retention and understanding."
    },
    {
      icon: "⏱️",
      title: "Time-Efficient",
      description: "Concise videos that deliver maximum value in minimum time."
    },
    {
      icon: "🔄",
      title: "Pause & Repeat",
      description: "Learn at your own pace—rewatch difficult sections as many times as needed."
    },
    {
      icon: "📱",
      title: "Learn Anywhere",
      description: "Access videos on any device, anytime, even offline with our app."
    }
  ];

  return (
    <section 
      ref={featuresRef} 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[IntegralCF] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Nailib Videos <span className="text-indigo-600">Make a Difference</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our video resources are designed specifically for IB students to optimize learning and maximize scores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-item bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-[IntegralCF] text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}