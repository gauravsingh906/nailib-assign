import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, ChevronRight, ChevronLeft, Mouse, Volume2 } from 'lucide-react';

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRotated, setIsRotated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  // Handle 3D rotation effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({
        x: ((x / rect.width) - 0.5) * 20,
        y: ((y / rect.height) - 0.5) * 20
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRotated) {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRotated]);

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const steps = [
    {
      number: "01",
      title: "Sign Up For Free",
      description: "Create your Nailib account in less than 30 seconds with just your email. No credit card required.",
      features: ["Instant access", "Social login options", "Personalized dashboard"],
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-700",
      icon: "signup",
      animation: "float"
    },
    {
      number: "02",
      title: "Select Your IB Subjects",
      description: "Choose from our library of 20+ IB subjects with comprehensive video coverage of all topics.",
      features: ["Filter by HL/SL", "Topic categorization", "Teacher recommendations"],
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-700",
      icon: "subjects",
      animation: "pulse"
    },
    {
      number: "03",
      title: "Watch Interactive Videos",
      description: "Immerse yourself in crystal-clear HD videos with interactive elements to enhance your learning.",
      features: ["Smart player", "Interactive timestamps", "Quiz integration"],
      color: "from-teal-500 to-emerald-600",
      textColor: "text-teal-700",
      icon: "watch",
      animation: "bounce"
    },
    {
      number: "04",
      title: "Track Your Mastery",
      description: "Monitor your progress with detailed analytics that help you focus on areas needing improvement.",
      features: ["Visual progress tracking", "Personalized insights", "Study recommendations"],
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-700",
      icon: "practice",
      animation: "spin"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative font-[Open_Sans] py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50"
      style={{
        perspective: '1000px'
      }}
    >
   
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, #c1d3fa 1px, transparent 1px), linear-gradient(to bottom, #c1d3fa 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: `translateX(${mousePosition.x / 2}px) translateY(${mousePosition.y / 2}px)`
            }}
          ></div>

          {/* Subtle glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-10 filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-400 opacity-10 filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-2/3 w-72 h-72 rounded-full bg-cyan-400 opacity-10 filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Interactive Elements Indicator */}
      <div className="absolute top-10 left-10 z-10 flex items-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-blue-200 shadow-md animate-pulse">
          <Mouse className="w-5 h-5 text-blue-500" />
        </div>
        <div className="ml-3 px-4 py-2 rounded-full bg-white border border-blue-200 shadow-md backdrop-blur-lg">
          <p className="text-blue-600 text-sm">Try moving your cursor</p>
        </div>
      </div>

      {/* Audio Toggle */}
      <div className="absolute top-10 right-10 z-10">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-blue-200 shadow-md hover:border-blue-300 transition-all cursor-pointer">
          <Volume2 className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto relative z-10"
        style={{
          transform: `rotateX(${isRotated ? mousePosition.y / 3 : 0}deg) rotateY(${isRotated ? -mousePosition.x / 3 : 0}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="relative">
              <h2 className="font-[IntegralCF] text-5xl md:text-6xl font-bold text-gray-800 mb-2 tracking-tight relative">
                YOUR <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">JOURNEY</span>
              </h2>
              <div className="absolute -top-4 -right-4 text-cyan-500 text-3xl font-bold opacity-30">+</div>
              <div className="absolute -bottom-4 -left-4 text-blue-500 text-3xl font-bold opacity-30">+</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          </div>

          <p className="text-xl font-[Open_Sans] text-gray-600 max-w-xl mx-auto">
            Unlock your IB potential through an immersive video learning experience
          </p>
        </div>

        {/* 3D Carousel Mode Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsRotated(!isRotated)}
            className={`px-4 py-2 rounded-full flex items-center text-sm font-[Open_Sans] font-medium transition-all duration-300 ${isRotated ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-white text-gray-700 border border-blue-200 shadow-md'}`}
          >
            {isRotated ? 'Disable 3D Mode' : 'Enable 3D Mode'}
          </button>
        </div>

        {/* Main Carousel */}
        <div
          ref={carouselRef}
          className="relative mx-auto max-w-5xl h-[600px] overflow-visible"
        >
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 z-20">
            <button
              onClick={handlePrevStep}
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-200 shadow-lg hover:border-blue-300 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 z-20">
            <button
              onClick={handleNextStep}
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-200 shadow-lg hover:border-blue-300 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-3 mb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStep === index
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 w-10'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>

          {/* Main Content Cards */}
          <div className="relative h-full w-full">
            {steps.map((step, index) => {
           
              let position = (index - activeStep) % steps.length;
              if (position < 0) position += steps.length;

              let transform = '';
              let opacity = 0;
              let zIndex = 0;
              let scale = 0.7;

              if (position === 0) {
                // Active card
                transform = 'translateX(0) scale(1)';
                opacity = 1;
                zIndex = 10;
                scale = 1;
              } else if (position === 1 || position === steps.length - 1) {
               
                transform = position === 1 ? 'translateX(40%) scale(0.85)' : 'translateX(-40%) scale(0.85)';
                opacity = 0.7;
                zIndex = 5;
                scale = 0.85;
              } else {
     
                transform = position === 2 ? 'translateX(70%) scale(0.7)' : 'translateX(-70%) scale(0.7)';
                opacity = 0.3;
                zIndex = 1;
              }

              return (
                <div
                  key={step.number}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out`}
                  style={{
                    transform,
                    opacity,
                    zIndex
                  }}
                >
                  <div className={`w-full h-full flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100`}>
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                      <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${step.color} opacity-10 blur-2xl`}></div>

                      <div className="flex items-center mb-6">
                        <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br ${step.color} shadow-lg mr-4`}>
                          {step.icon === "signup" && <CheckCircle className="h-8 w-8 text-white" />}
                          {step.icon === "subjects" && (
                            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {step.icon === "watch" && <Play className="h-8 w-8 text-white" />}
                          {step.icon === "practice" && (
                            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        <span className={`font-[IntegralCF] text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${step.color}`}>
                          {step.number}
                        </span>
                      </div>

                      <h3 className="font-[IntegralCF] text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                        {step.title}
                      </h3>

                      <p className="font-[Open_Sans] text-gray-600 text-lg mb-8">
                        {step.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {step.features.map((feature, i) => (
                          <div key={i} className="flex items-center">
                            <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${step.color} mr-3`}></div>
                            <span className={`font-[Open_Sans] ${step.textColor} font-medium`}>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button className={`font-[IntegralCF] self-start px-8 py-3 rounded-xl bg-gradient-to-r ${step.color} text-white font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                        Get Started
                      </button>
                    </div>

                    <div className="w-full md:w-1/2 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gray-100 opacity-80"></div>
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `radial-gradient(circle, ${step.color.split(' ')[1].replace('to-', '')} 1px, transparent 1px)`,
                            backgroundSize: '20px 20px'
                          }}
                        ></div>
                      </div>

                      {/* Interactive Element */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {step.icon === "signup" && (
                          <div className="relative w-64 h-64">
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-xl animate-pulse`}></div>
                            <div className="relative h-full w-full bg-white rounded-3xl p-6 border border-blue-100 shadow-xl transform hover:scale-105 transition-all duration-300">
                              <div className="w-full h-8 flex justify-between items-center mb-4">
                                <div className="flex space-x-2">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="h-5 w-24 bg-blue-100 rounded-md"></div>
                              </div>
                              <div className="space-y-3">
                                <div className="w-full h-10 bg-blue-50 rounded-lg"></div>
                                <div className="w-full h-10 bg-blue-50 rounded-lg"></div>
                                <div className="w-3/4 h-10 bg-blue-50 rounded-lg"></div>
                              </div>
                              <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-white" />
                              </div>
                            </div>
                          </div>
                        )}

                        {step.icon === "subjects" && (
                          <div className="grid grid-cols-2 gap-4 p-6 max-w-sm">
                            {[
                              { name: "Biology", color: "bg-emerald-500" },
                              { name: "Chemistry", color: "bg-blue-500" },
                              { name: "Physics", color: "bg-indigo-500" },
                              { name: "Mathematics", color: "bg-amber-500" }
                            ].map((subject, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl bg-white border border-blue-100 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                              >
                                <div className={`w-10 h-10 rounded-lg ${subject.color} mb-2 flex items-center justify-center`}>
                                  <span className="text-white font-[IntegralCF] font-bold">{subject.name.charAt(0)}</span>
                                </div>
                                <span className="text-gray-800 text-sm font-[Open_Sans] font-medium">{subject.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {step.icon === "watch" && (
                          <div className="w-80 h-48 bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 relative transform hover:scale-105 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-blue-500/80 flex items-center justify-center cursor-pointer hover:bg-blue-600/80 transition-all duration-300">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-teal-500"></div>
                              </div>
                            </div>
                          </div>
                        )}

                        {step.icon === "practice" && (
                          <div className="w-80 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="h-8 w-40 bg-gradient-to-r from-amber-500 to-orange-500 rounded-md flex items-center justify-center">
                                <span className="text-white text-sm font-[IntegralCF] font-bold">Your Progress</span>
                              </div>
                              <div className="text-amber-600 text-xl font-[IntegralCF] font-bold">78%</div>
                            </div>
                            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full w-[78%] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-6">
                              {[75, 90, 65].map((score, i) => (
                                <div key={i} className="rounded-xl bg-white p-3 border border-blue-100 shadow-md">
                                  <div className="text-center">
                                    <div className={`text-2xl font-[IntegralCF] font-bold ${score > 80 ? 'text-green-500' : score > 70 ? 'text-amber-500' : 'text-red-500'}`}>
                                      {score}%
                                    </div>
                                    <div className="text-xs font-[Open_Sans] text-gray-500 mt-1">Topic {i + 1}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

   
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 p-px rounded-2xl">
            <button className="px-8 py-4 bg-white rounded-2xl text-blue-600 font-[IntegralCF] font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Begin Your IB Video Journey
            </button>
          </div>
          <p className="mt-4 text-blue-600 text-sm font-[Open_Sans]">
            Join 50,000+ IB students already achieving higher grades
          </p>
        </div>
      </div>

     
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-200 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-blue-200 rounded-tr-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-blue-200 rounded-bl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-200 rounded-br-3xl"></div>
    </section>
  );
}