import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(TextPlugin);


const AnimatedGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
     
      <div className="absolute inset-0 bg-gradient-radial from-blue-50 via-transparent to-transparent animate-pulse-slow"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(219, 234, 254, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(219, 234, 254, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="absolute inset-0 dot-pattern"></div>
    </div>
  );
};

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const videoRef = useRef(null);
  const statsRef = useRef(null);
  const particlesRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, TextPlugin);
      
      // Add typing effect to title
      const setupTypingEffect = () => {
        const titleElement = titleRef.current;
        if (!titleElement) return;
        
        const titleWords = titleElement.querySelectorAll('.title-word');
        const phrases = [
          { text: "Master ", el: titleWords[0] },
          { text: "IB concepts", el: titleWords[1] },
          { text: " with interactive video tutorials", el: titleWords[2] }
        ];
        
   
        titleWords.forEach(span => {
      
          span.dataset.originalText = span.textContent;
          span.textContent = '';
        });
        
        // Create the typing timeline
        const typingTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 2,
          onRepeat: () => {
            
            const gradientText = titleElement.querySelector('.gradient-text');
            if (gradientText) {
              gsap.fromTo(
                gradientText,
                { backgroundPosition: '0% 50%' },
                {
                  backgroundPosition: '100% 50%',
                  duration: 6,
                  repeat: -1,
                  ease: "sine.inOut",
                  yoyo: true
                }
              );
            }
          }
        });
        
      
        typingTl.fromTo(titleWords, {
          opacity: 0,
          y: 40,
          rotationX: -30,
          transformOrigin: "0% 50% -50",
          transformPerspective: 500
        }, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out"
        });
        

        phrases.forEach((phrase, index) => {
          typingTl.to(phrase.el, {
            duration: phrase.text.length * 0.08,
            text: phrase.text,
            ease: "none"
          }, "+=0.3"); 
        });
        
       
        typingTl.to({}, { duration: Infinity });
        
      
      };
      

      const createParticles = () => {
        const container = particlesRef.current;
        if (!container) return;
        
    
        container.innerHTML = '';
        

        for (let i = 0; i < 60; i++) {
          const particle = document.createElement('div');
          
          // More diverse particle types with enhanced styling
          const shapeType = Math.floor(Math.random() * 4);
          if (shapeType === 0) {
            particle.className = 'absolute rounded-full bg-blue-200 opacity-0 backdrop-blur-sm';
          } else if (shapeType === 1) {
            particle.className = 'absolute rounded-sm rotate-45 bg-indigo-100 opacity-0 backdrop-blur-sm';
          } else if (shapeType === 2) {
            particle.className = 'absolute rounded-full border border-blue-200 bg-transparent opacity-0';
          } else {
            particle.className = 'absolute w-1 h-6 bg-gradient-to-b from-blue-100 to-transparent opacity-0 rounded-full';
          }
          
   
          const size = Math.random() * 12 + 1;
          particle.style.width = `${shapeType === 3 ? 1 : size}px`;
          particle.style.height = `${shapeType === 3 ? 3 + Math.random() * 8 : size}px`;
          

          particle.style.left = `${Math.random() * 130 - 15}%`;
          particle.style.top = `${Math.random() * 130 - 15}%`;
          
          container.appendChild(particle);
         
          gsap.to(particle, {
            x: `${(Math.random() - 0.5) * 300}`,
            y: `${(Math.random() - 0.5) * 300}`,
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.4, 
            duration: Math.random() * 40 + 15,
            delay: Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      };
      
     
      const initAnimations = () => {
        createParticles();
        

        const masterTl = gsap.timeline();
        
      
        const typingTl = setupTypingEffect();
        
 
        const glowingOrbs = document.querySelectorAll('.glowing-orb');
        glowingOrbs.forEach((orb, index) => {
          gsap.set(orb, { 
            opacity: 0, 
            scale: 0.2,
          });
          
          // Initial appearance
          masterTl.to(orb, {
            opacity: 0.7, 
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
          }, index * 0.3);
          
          // Continuous hover effect
          gsap.to(orb, {
            y: `-${10 + Math.random() * 15}px`,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
          });
        });
        
        // Enhanced background shapes animation
        const bgShapes = document.querySelectorAll('.bg-shape');
        bgShapes.forEach((shape, index) => {
          gsap.set(shape, { 
            opacity: 0, 
            scale: 0.6, 
            x: (index % 2 === 0) ? -100 : 100,
            rotation: (index % 2 === 0) ? -10 : 10
          });
          
          masterTl.to(shape, {
            opacity: 0.6,
            scale: 1,
            x: 0,
            rotation: 0,
            duration: 1.8,
            ease: "power2.out"
          }, index * 0.25);
          
          // Add continuous subtle movement
          gsap.to(shape, {
            x: `${(Math.random() - 0.5) * 50}`,
            y: `${(Math.random() - 0.5) * 50}`,
            rotation: `${(Math.random() - 0.5) * 15}`,
            duration: 15 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
        
        // 3D floating card animation for video preview
        masterTl.fromTo(
          '.video-card-container', 
          { 
            opacity: 0, 
            y: 60,
            rotationY: -15,
            rotationX: 15,
            transformPerspective: 1000
          }, 
          { 
            opacity: 1, 
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 1.5,
            ease: "power3.out"
          },
          0.6
        );
        
        // Add subtle hover effect to card
        const videoCard = document.querySelector('.video-card-container');
        if (videoCard) {
          videoCard.addEventListener('mousemove', (e) => {
            const rect = videoCard.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
      
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 5; 
            const rotateX = ((centerY - y) / centerY) * 5; 
            
            gsap.to(videoCard, {
              rotationY: rotateY,
              rotationX: rotateX,
              duration: 0.5,
              ease: "power2.out"
            });
          });
          
          videoCard.addEventListener('mouseleave', () => {
            gsap.to(videoCard, {
              rotationY: 0,
              rotationX: 0,
              duration: 0.8,
              ease: "power3.out"
            });
          });
        }
        
        // Animate background grid dots
        const createGridDots = () => {
          const dotPattern = document.querySelector('.dot-pattern');
          if (!dotPattern) return;
          
          dotPattern.innerHTML = '';
          
          // Calculate grid points
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const gridSize = 40;
          
          for (let x = 0; x < windowWidth; x += gridSize) {
            for (let y = 0; y < windowHeight; y += gridSize) {
              const dot = document.createElement('div');
              dot.className = 'absolute w-1 h-1 rounded-full bg-blue-200 opacity-0';
              dot.style.left = `${x}px`;
              dot.style.top = `${y}px`;
              
              dotPattern.appendChild(dot);
              
              // Animate dot appearance
              gsap.to(dot, {
                opacity: 0.3,
                duration: 0.5,
                delay: (x + y) / 1000,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                repeatDelay: Math.random() * 3 + 2
              });
            }
          }
        };
        
        createGridDots();
        
        // Add wave effect to grid (ripple animation)
        const createRipple = () => {
          const rippleInterval = setInterval(() => {
            const ripple = document.createElement('div');
            ripple.className = 'absolute rounded-full border-2 border-blue-100 opacity-60';
            ripple.style.left = `${Math.random() * 100}%`;
            ripple.style.top = `${Math.random() * 100}%`;
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            
            document.querySelector('.dot-pattern')?.appendChild(ripple);
            
            gsap.to(ripple, {
              width: '200px',
              height: '200px',
              opacity: 0,
              duration: 3,
              ease: "power2.out",
              onComplete: () => ripple.remove()
            });
          }, 4000);
          
          return () => clearInterval(rippleInterval);
        };
        
        createRipple();
        
        // Stats counter animation with improved visuals
        const statsItems = document.querySelectorAll('.stat-item');
        statsItems.forEach((item, index) => {
          const counterEl = item.querySelector('.stat-counter');
          if (!counterEl) return;
          
          const finalValue = parseInt(counterEl.getAttribute('data-value'), 10);
          
          gsap.fromTo(
            counterEl, 
            { innerText: 0 }, 
            { 
              innerText: finalValue, 
              duration: 2,
              delay: 1.5 + (index * 0.2),
              snap: { innerText: 1 },
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
          
          // Add highlight effect on counter completion
          gsap.to(item, {
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.3)',
            duration: 0.8,
            delay: 3.5 + (index * 0.2),
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            yoyo: true,
            repeat: 1
          });
        });
        
        // Window resize handler
        const handleResize = () => {
          createParticles();
          createGridDots();
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
          typingTl.kill();
        };
      };
      
      
      setTimeout(initAnimations, 100);
    }
  }, []);
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  // Progress bar simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentVideoTime(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 150);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section 
    ref={heroRef} 
    className="relative bg-white text-gray-600 overflow-hidden min-h-screen font-['Open_Sans']"
  >
    {/* <AnimatedGridBackground></AnimatedGridBackground> */}
    {/* Enhanced animated grid background */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right,rgb(57, 96, 181) 1px, transparent 1px), linear-gradient(to bottom,rgb(47, 79, 150) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
        
        {/* Subtle glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-10 filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-400 opacity-10 filter blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-72 h-72 rounded-full bg-cyan-400 opacity-10 filter blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
    
    {/* Animated particles layer */}
    <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
  
    <div className="parallax-bg absolute inset-0 overflow-hidden pointer-events-none">
      <div className="bg-shape absolute -top-10 right-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
      <div className="bg-shape absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-blue-50 to-indigo-100 opacity-30 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      <div className="bg-shape absolute top-1/2 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-20 rounded-full blur-3xl"></div>
      
      {/* New glowing orbs for visual interest */}
      <div className="glowing-orb absolute top-1/4 left-1/5 w-24 h-24 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 opacity-0 blur-md"></div>
      <div className="glowing-orb absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-200 to-blue-200 opacity-0 blur-md"></div>
      <div className="glowing-orb absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-200 opacity-0 blur-md"></div>
    </div>
  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side content */}
        <div className="z-10">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm rounded-full mb-2 border border-blue-100 backdrop-blur-sm">
            <span className="text-blue-700 font-semibold text-sm flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              NEW: Interactive Video Learning
            </span>
          </div>
          
          <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-['IntegralCF'] font-bold leading-tight mb-8 text-gray-800">
            <span className="title-word">Master </span>
            <span className="title-word gradient-text bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-size-200">IB concepts</span>
            <span className="title-word"> with interactive video tutorials</span>
          </h1>
          
          <div className="mb-8 space-y-4 text-lg text-gray-600">
            <p className="desc-line relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-blue-100 before:rounded-full">
              Visualize complex topics with dynamic explanations
            </p>
            <p className="desc-line relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-blue-100 before:rounded-full">
              Join thousands of IB students achieving their best scores
            </p>
            <p className="desc-line relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-blue-100 before:rounded-full">
              Access 24/7 from any device, anywhere
            </p>
          </div>
          
          <div className="hero-cta flex flex-wrap gap-4 mb-10">
            <button className="group relative bg-gradient-to-r font-['IntegralCF'] from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg shadow-blue-200/50 transition-all overflow-hidden">
              <span className="relative z-10">Start Learning Free</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
            </button>
            <button className="group relative bg-white font-['IntegralCF'] hover:bg-blue-50 text-gray-700 font-medium px-8 py-4 rounded-lg border border-blue-200 shadow-lg shadow-blue-100/30 transition-all overflow-hidden">
              <span className="relative z-10">View Library</span>
              <span className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
          
          {/* Trust badges with improved design */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-700">
            <div className="trust-badge flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-50">
              <div className="w-6 h-6 flex items-center justify-center mr-2 bg-blue-100 rounded-full">
                <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>IB-aligned curriculum</span>
            </div>
            <div className="trust-badge flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-50">
              <div className="w-6 h-6 flex items-center justify-center mr-2 bg-blue-100 rounded-full">
                <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Expert IB instructors</span>
            </div>
            <div className="trust-badge flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-50">
              <div className="w-6 h-6 flex items-center justify-center mr-2 bg-blue-100 rounded-full">
                <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>24/7 access</span>
            </div>
          </div>
        </div>
        

        <div className="relative flex justify-center items-center z-10">
          <div className="video-card-container relative overflow-visible w-full max-w-lg">

            <div className="video-card-bg-2 absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl transform rotate-3 scale-105 translate-x-2 translate-y-3"></div>
            <div className="video-card-bg-1 absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl shadow-xl transform rotate-1 scale-102 translate-x-1 translate-y-1"></div>
            
 
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-blue-100 bg-white backdrop-blur-sm">
          
              <div 
                className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 relative w-full cursor-pointer group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handlePlayVideo}
              >
                {/* Video thumbnail with subtle pattern */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10" 
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  
                  {/* Video thumbnail content */}
                  <div className="relative z-10">
                  {!isPlaying ? (
                    <div className="relative">
                      {/* Thumbnail Image */}
                      <Image
                        src="/images/video/thumbnail.png" 
                        alt="Video Thumbnail"
                        width={800}
                        height={450}
                        className="w-full h-auto rounded-lg"
                      />
                      {/* Play Button */}
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsPlaying(true)}
                      >
                        <div className="play-button-container relative transform transition-transform duration-300 group-hover:scale-110">
                          <div className="play-button-outer absolute -inset-4 rounded-full bg-blue-500/20"></div>
                          <div className="play-button h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <svg
                              className="w-10 h-10 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Video Element
                    <video
                      className="w-full h-auto rounded-lg"
                      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Replace with your actual video path
                      autoPlay
                      loop
                      controls
                    />
                  )}
                  </div>
                  
                  {/* Light beams effect */}
                  <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className="absolute -inset-10 bg-gradient-to-tr from-blue-400 to-transparent rotate-45 translate-x-full group-hover:translate-x-1/4 transition-transform duration-1000 ease-in-out blur-2xl"></div>
                    <div className="absolute -inset-10 bg-gradient-to-bl from-indigo-400 to-transparent -rotate-45 -translate-x-full group-hover:-translate-x-1/4 transition-transform duration-1000 ease-in-out blur-2xl"></div>
                  </div>
                  
                  {/* Show video content when playing */}
                  {isPlaying && (
                    <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-700">IB Biology: Cell Theory Explained</span>
                    </div>
                  )}
                  
                  {/* Video overlay on hover */}
                  <div className={`absolute inset-0 bg-blue-600/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHovering && !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-lg font-medium text-white">Watch Preview</span>
                  </div>
                </div>
                
                {/* Enhanced video progress bar */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 relative" 
                      style={{ width: `${currentVideoTime}%` }}
                    >
                      <div className="absolute right-0 top-0 h-3 w-3 -mt-1 rounded-full bg-white border-2 border-indigo-600"></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video information  */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-['IntegralCF'] font-bold text-xl text-gray-900">Cell Theory Fundamentals</h3>
                  <span className="px-2 py-1 bg-blue-100 rounded-full text-xs text-blue-700 font-medium">12:35 mins</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">Learn the core principles of cell theory with clear visualizations and interactive models</p>
                
                {/* Enhanced video features section */}
                <div className="feature-tags flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-xs text-gray-700 border border-blue-100">IB Biology</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-xs text-gray-700 border border-blue-100">Core Concept</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full text-xs text-indigo-700 font-medium">Interactive</span>
                </div>
                
                
                {/* Instructor profile */}
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-gray-700">JD</div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-600">Dr. Jane Dawkins</p>
                    <p className="text-xs text-gray-600">PhD in Molecular Biology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div ref={statsRef} className="mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <div className="stat-item text-center p-6 bg-white rounded-xl shadow-md border border-indigo-50">
            <p className="font-['IntegralCF'] font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              <span className="stat-counter" data-value="950">0</span>+
            </p>
            <p className="text-gray-700 text-sm">Video Tutorials</p>
          </div>
          <div className="stat-item text-center p-6 bg-white rounded-xl shadow-md border border-indigo-50">
            <p className="font-['IntegralCF'] font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              <span className="stat-counter" data-value="32">0</span>
            </p>
            <p className="text-gray-700 text-sm">IB Subjects Covered</p>
          </div>
          <div className="stat-item text-center p-6 bg-white rounded-xl shadow-md border border-indigo-50">
            <p className="font-['IntegralCF'] font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              <span className="stat-counter" data-value="98">0</span>%
            </p>
            <p className="text-gray-700 text-sm">Student Satisfaction</p>
          </div>
          <div className="stat-item text-center p-6 bg-white rounded-xl shadow-md border border-indigo-50">
            <p className="font-['IntegralCF'] font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              <span className="stat-counter" data-value="7">0</span>
            </p>
            <p className="text-gray-700 text-sm">Points Average Increase</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator text-center mt-16">
        <div className="inline-block animate-bounce">
          <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <p className="text-xs text-gray-500 mt-2">Scroll to explore features</p>
      </div>
    </div>
  </section>
  );
}