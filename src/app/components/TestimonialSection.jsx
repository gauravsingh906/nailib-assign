// components/TestimonialSection.js
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TestimonialSection() {
  const testimonialRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  const testimonials = [
    {
      quote: "Nailib videos helped me understand complex IB Economics concepts that I was struggling with for months. The visual explanations made everything click!",
      name: "Sarah L.",
      role: "IB Economics Student",
      score: "Scored 7 in Economics",
      avatar: "/images/avatar/avatar1.jpg" // Replace with actual image path
    },
    {
      quote: "As a Math HL student, I was looking for clear explanations of difficult topics. Nailib's videos broke everything down in an accessible way that my textbooks couldn't.",
      name: "James K.",
      role: "IB Math HL Student",
      score: "Scored 6 in Mathematics",
      avatar: "/images/avatar/avatar2.jpeg" // Replace with actual image path
    },
    {
      quote: "The videos are concise yet comprehensive. They helped me prepare efficiently for my IB Biology exams, saving me countless hours of study time.",
      name: "Mei T.",
      role: "IB Biology Student",
      score: "Scored 7 in Biology",
      avatar: "/images/avatar/avatar3.webp" // Replace with actual image path
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={testimonialRef} 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 to-indigo-700 text-white"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[IntegralCF] text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-yellow-400">Students Say</span>
          </h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Don't just take our word for it—hear from IB students who have transformed their learning with Nailib Videos.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full ">
                  <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-300 overflow-hidden relative">
                          {/* Replace with actual image */}
                          <div className="absolute inset-0 bg-indigo-200 flex items-center justify-center text-black font-bold text-xl">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <div>
                        <svg className="h-8 w-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-xl italic mb-6">{testimonial.quote}</p>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-indigo-200">{testimonial.role}</p>
                          <p className="text-yellow-400 font-medium mt-1">{testimonial.score}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:translate-x-0 bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all"
            onClick={prevSlide}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-0 bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all"
            onClick={nextSlide}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-yellow-400' : 'bg-white bg-opacity-30'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}