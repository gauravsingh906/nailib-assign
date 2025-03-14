// components/HowItWorksSection.js
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function HowItWorksSection() {
  const howItWorksRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // How it works animations
      const stepItems = document.querySelectorAll('.step-item');
      stepItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: howItWorksRef.current,
              start: 'top 70%'
            }
          }
        );
      });
    }
  }, []);

  const steps = [
    {
      number: "01",
      title: "Sign Up for an Account",
      description: "Create your Nailib account in less than 30 seconds. No credit card required for the free trial.",
      image: "/images/signup.png" // Replace with actual image path
    },
    {
      number: "02",
      title: "Select Your Subjects",
      description: "Choose the IB subjects you're studying from our comprehensive library of video resources.",
      image: "/images/select-subjects.png" // Replace with actual image path
    },
    {
      number: "03",
      title: "Watch & Learn",
      description: "Stream HD videos taught by IB experts. Take notes, bookmark important moments, and track your progress.",
      image: "/images/watch-learn.png" // Replace with actual image path
    },
    {
      number: "04",
      title: "Practice & Test",
      description: "Apply what you've learned with integrated quizzes and practice problems after each video.",
      image: "/images/practice.png" // Replace with actual image path
    }
  ];

  return (
    <section 
      ref={howItWorksRef} 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[IntegralCF] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Nailib <span className="text-indigo-600">Videos Work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes and transform your IB study experience with our easy-to-follow process.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step-item flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              <div className="md:w-1/2">
                <div className="bg-white rounded-2xl shadow-lg p-4 h-64 md:h-80 relative overflow-hidden">
                  {/* Replace with actual image */}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Image placeholder</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="font-[IntegralCF] text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}