import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TestimonialSection() {
  const testimonialRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const autoScrollTimerRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initial animation
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 80%'
          }
        }
      );
      
      // Animated particles
      const particlesContainer = document.querySelector('.particles-container');
      if (particlesContainer) {
        const particles = particlesContainer.querySelectorAll('.particle');
        particles.forEach((particle) => {
          gsap.to(particle, {
            x: `random(-50, 50)`,
            y: `random(-50, 50)`,
            rotation: `random(-15, 15)`,
            duration: `random(20, 40)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    }
  }, []);
  
  // Auto-scroll functionality
  useEffect(() => {
    // Clear any existing timer when component mounts or auto-scroll setting changes
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    
    // Set up auto-scroll timer if enabled
    if (autoScroll && !isAnimating) {
      autoScrollTimerRef.current = setInterval(() => {
        changeSlide((currentSlide + 1) % testimonials.length);
      }, 5000); // Change slides every 5 seconds
    }
    
    // Clean up timer on component unmount
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [autoScroll, currentSlide, isAnimating]);

  const testimonials = [
    {
      quote: "Nailib videos helped me understand complex IB Economics concepts that I was struggling with for months. The visual explanations made everything click!",
      name: "Sarah L.",
      role: "IB Economics Student",
      score: "Scored 7 in Economics",
      avatar: "/images/avatar/avatar1.jpg",
      color: "#3B82F6"
    },
    {
      quote: "As a Math HL student, I was looking for clear explanations of difficult topics. Nailib's videos broke everything down in an accessible way that my textbooks couldn't.",
      name: "James K.",
      role: "IB Math HL Student",
      score: "Scored 6 in Mathematics",
      avatar: "/images/avatar/avatar2.jpeg",
      color: "#2563EB"
    },
    {
      quote: "The videos are concise yet comprehensive. They helped me prepare efficiently for my IB Biology exams, saving me countless hours of study time.",
      name: "Mei T.",
      role: "IB Biology Student",
      score: "Scored 7 in Biology",
      avatar: "/images/avatar/avatar3.webp",
      color: "#1D4ED8"
    }
  ];

  const changeSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    
    // Animate current slide out
    gsap.to(`#testimonial-${currentSlide}`, {
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: 0.5,
      ease: "power2.in"
    });
    
    // Animate new slide in
    gsap.fromTo(
      `#testimonial-${index}`,
      { opacity: 0, y: -20, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: 0.3,
        ease: "back.out(1.2)",
        onComplete: () => setIsAnimating(false)
      }
    );
    
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setAutoScroll(false); // Pause auto-scroll when user manually navigates
    changeSlide((currentSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setAutoScroll(false); // Pause auto-scroll when user manually navigates
    changeSlide((currentSlide - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={testimonialRef} 
      className="relative py-24 font-[IntegralCF] px-6 mb-16 lg:px-8 h-auto overflow-hidden bg-gradient-to-br from-white to-blue-50"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden particles-container">
        {/* Layered circular elements */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute particle rounded-full"
            style={{
              width: `${Math.random() * 160 + 80}px`,
              height: `${Math.random() * 160 + 80}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, rgba(59, 130, 246, ${Math.random() * 0.08 + 0.02}), rgba(37, 99, 235, ${Math.random() * 0.05 + 0.01}))`,
              border: `2px solid rgba(255, 255, 255, ${Math.random() * 0.4 + 0.4})`,
              transform: `translate(-50%, -50%) scale(${Math.random() * 0.3 + 0.7})`,
              zIndex: 0
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0  opacity-30" 
             style={{
               backgroundImage: `linear-gradient(to right, rgba(219, 234, 254, 0.3) 1px, transparent 1px), 
                                 linear-gradient(to bottom, rgba(219, 234, 254, 0.3) 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      {/* Blue accent shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 relative">
            <span className=" text-transparent font-[IntegralCF] bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 text-4xl md:text-5xl font-extrabold relative z-10">
              Student Success
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-200 opacity-70 transform skew-x-12"></div>
          </div>
          <h2 className="text-2xl md:text-3xl text-gray-800 font-light mb-8">Transforming <span className="text-blue-600 font-semibold">IB Education</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real success stories from students who achieved their academic goals with Nailib's innovative learning approach.
          </p>
        </div>

        <div className="relative mt-12 min-h-[400px]">
          {testimonials.map((testimonial, index) => (
            <div 
              id={`testimonial-${index}`}
              key={index} 
              className={`absolute top-0 left-0 right-0 transition-all duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                perspective: "1000px"
              }}
            >
              <div 
                className="bg-white rounded-2xl p-8 md:p-10 shadow-xl"
                style={{
                  borderLeft: `5px solid ${testimonial.color}`,
                  boxShadow: `0 10px 40px rgba(15, 23, 42, 0.07), 
                             0 0 0 1px rgba(255, 255, 255, 0.1), 
                             0 -10px 0 -5px ${testimonial.color}80,
                             0 10px 0 -5px ${testimonial.color}40`,
                }}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-shrink-0 relative order-1 md:order-1">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden relative transform rotate-3 hover:rotate-0 transition-transform duration-300"
                         style={{
                           boxShadow: `5px 5px 0 ${testimonial.color}`,
                         }}>
                      {/* Replace with actual image */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl"
                        style={{
                          background: `linear-gradient(45deg, ${testimonial.color}, ${testimonial.color}dd)`,
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div 
                      className="absolute -bottom-3 -right-2 rounded-full py-1 px-3 text-xs font-bold"
                      style={{
                        background: "white",
                        border: `2px solid ${testimonial.color}`,
                        color: testimonial.color,
                        boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                      }}
                    >
                      {testimonial.score.split(' ')[1]}
                    </div>
                  </div>
                  
                  <div className="order-2 md:order-2 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <svg className="h-10 w-10 text-blue-100 mb-3 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed relative">
                      <span className="relative z-10">"{testimonial.quote}"</span>
                      <span className="absolute -bottom-3 -left-1 right-0 h-3 bg-blue-100 opacity-50 transform -skew-x-3"></span>
                    </p>
                    <div className="mt-6 bg-blue-50 p-4 rounded-xl inline-block">
                      <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <div 
                        className="inline-block mt-2 py-1 px-3 rounded-full text-sm font-medium"
                        style={{
                          background: testimonial.color,
                          color: 'white'
                        }}
                      >
                        {testimonial.score}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons and Controls */}
          <div className="flex flex-col items-center mt-8 space-y-4">
            <div className="flex justify-between w-full">
              <button 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-blue-50 transition-all transform hover:scale-105 focus:outline-none"
                onClick={prevSlide}
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 0 0 2px rgba(219, 234, 254, 0.7)" }}
              >
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-blue-50 transition-all transform hover:scale-105 focus:outline-none"
                onClick={nextSlide}
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 0 0 2px rgba(219, 234, 254, 0.7)" }}
              >
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Auto-scroll toggle button */}
            <button
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                autoScroll ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setAutoScroll(!autoScroll)}
            >
              {autoScroll ? (
                <>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pause Auto-Scroll
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Enable Auto-Scroll
                </>
              )}
            </button>

            {/* Indicators */}
            <div className="flex justify-center space-x-3">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  className={`group transition-all duration-300 focus:outline-none`}
                  onClick={() => {
                    setAutoScroll(false);
                    changeSlide(index);
                  }}
                >
                  <div className="relative p-1">
                    <div 
                      className={`h-2 w-12 rounded-full transition-colors duration-500 ${
                        currentSlide === index 
                          ? 'bg-gradient-to-r' 
                          : 'bg-blue-100 group-hover:bg-blue-200'
                      }`}
                      style={
                        currentSlide === index 
                        ? { 
                            backgroundImage: `linear-gradient(to right, #3B82F6, ${testimonial.color})`,
                            boxShadow: `0 0 10px rgba(59, 130, 246, 0.4)`
                          } 
                        : {}
                      }
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}