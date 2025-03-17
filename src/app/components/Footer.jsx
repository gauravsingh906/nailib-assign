'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeCategory, setActiveCategory] = useState(null);
  const [email, setEmail] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showQuickStats, setShowQuickStats] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Refs for GSAP animations
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const newsletterRef = useRef(null);
  const socialIconsRef = useRef(null);
  const categoriesRef = useRef(null);
  const copyrightRef = useRef(null);
  const decorativeElementsRef = useRef(null);
  const statsRef = useRef(null);
  const chatbotRef = useRef(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if we're on client-side before accessing window
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      // Check for saved dark mode preference
      const savedMode = localStorage.getItem('nailib-dark-mode');
      if (savedMode) {
        setDarkMode(savedMode === 'true');
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      const handleScroll = () => {
        const position = window.pageYOffset;
        setIsScrolling(position > 50);
      };
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      
      // Initialize footer animations
      initFooterAnimations();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        
        // Kill all animations on unmount
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf([
          footerRef.current, 
          logoRef.current, 
          newsletterRef.current,
          socialIconsRef.current,
          categoriesRef.current,
          copyrightRef.current,
          statsRef.current,
          chatbotRef.current
        ]);
      };
    }
  }, []);

  // Apply dark mode effect
  useEffect(() => {
    if (footerRef.current) {
      if (darkMode) {
        gsap.to(footerRef.current, {
          backgroundColor: 'rgba(17, 24, 39, 1)', // darker background
          duration: 0.5
        });
      } else {
        gsap.to(footerRef.current, {
          backgroundColor: 'rgba(31, 41, 55, 1)',
          duration: 0.5
        });
      }
    }
    
    // Save preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('nailib-dark-mode', darkMode);
    }
  }, [darkMode]);

  const scrollToTop = () => {
    gsap.to(window, { 
      duration: 0, 
      scrollTo: { y: 0 }, 
      ease: "power2.inOut" 
    });
  };

  const initFooterAnimations = () => {
    // Main footer entrance animation
    gsap.fromTo(
      footerRef.current,
      { backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(31, 41, 55, 0.9)' },
      {
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 1)' : 'rgba(31, 41, 55, 1)',
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Logo animation with 3D effect
    gsap.fromTo(
      logoRef.current,
      { y: 50, opacity: 0, rotationY: -30 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Newsletter section entrance
    gsap.fromTo(
      newsletterRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Social icons entrance with stagger and 3D rotation
    gsap.fromTo(
      socialIconsRef.current.children,
      { scale: 0, opacity: 0, rotationY: 90 },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(2)',
        delay: 0.4,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Stats animation when visible
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Categories staggered entrance
    gsap.fromTo(
      categoriesRef.current.children,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power1.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Copyright bar entrance
    gsap.fromTo(
      copyrightRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: copyrightRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Decorative elements animation with gradient shift
    const decorElements = decorativeElementsRef.current.children;
    
    gsap.fromTo(
      decorElements,
      { width: 0 },
      {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Gradient shift animation
    gsap.to(decorElements, {
      backgroundPosition: '400px 0px',
      ease: 'none',
      duration: 15,
      repeat: -1
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Animate the button on submission
    gsap.to(e.target.querySelector('button'), {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
    
    // Success confetti animation
    createConfetti();
    
    // Newsletter subscription logic would go here
    alert(`Thank you for subscribing with ${email}! You'll receive our latest study resources.`);
    setEmail('');
  };
  
  // Create confetti effect
  const createConfetti = () => {
    const confettiCount = 100;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 5 + 3}px`;
      confetti.style.backgroundColor = ['#4F46E5', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981'][Math.floor(Math.random() * 5)];
      confetti.style.borderRadius = '3px';
      confetti.style.opacity = Math.random() * 0.8 + 0.2;
      container.appendChild(confetti);
      
      const startX = newsletterRef.current.getBoundingClientRect().left + newsletterRef.current.offsetWidth / 2;
      const startY = newsletterRef.current.getBoundingClientRect().top;
      
      gsap.fromTo(
        confetti, 
        {
          x: startX,
          y: startY,
          rotation: Math.random() * 360
        },
        {
          x: startX + (Math.random() - 0.5) * window.innerWidth * 0.8,
          y: startY - Math.random() * window.innerHeight * 0.7,
          rotation: Math.random() * 720,
          duration: Math.random() * 2 + 1,
          ease: 'power1.out',
          onComplete: () => {
            confetti.remove();
            if (i === confettiCount - 1) {
              setTimeout(() => container.remove(), 100);
            }
          }
        }
      );
    }
  };
  
  // Hover animation for links
  const handleLinkHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      x: enter ? 5 : 0,
      color: enter ? '#ffffff' : '#9CA3AF',
      duration: 0.2,
      ease: 'power1.out'
    });
  };
  
  // Hover animation for social icons with 3D effect
  const handleSocialHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      y: enter ? -3 : 0,
      rotationY: enter ? 15 : 0,
      backgroundColor: enter ? '#4B5563' : '#374151',
      duration: 0.3,
      ease: 'back.out(1.5)'
    });
  };
  
  // Animation for accordion toggle
  const handleCategoryClick = (category) => {
    const newActiveCategory = activeCategory === category ? null : category;
    setActiveCategory(newActiveCategory);
    
    if (isMobile) {
      const targetElement = document.querySelector(`#category-${category.replace(/\s+/g, '-').toLowerCase()}`);
      
      if (targetElement) {
        gsap.to(targetElement, {
          maxHeight: newActiveCategory === category ? 'none' : 0,
          opacity: newActiveCategory === category ? 1 : 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      }
    }
  };
  
  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Toggle chatbot visibility
  const toggleChatbot = () => {
    if (!showChatbot) {
      // Open chatbot with animation
      setShowChatbot(true);
      setTimeout(() => {
        if (chatbotRef.current) {
          gsap.fromTo(
            chatbotRef.current,
            { scale: 0.8, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
          );
        }
      }, 10);
    } else {
      // Close chatbot with animation
      if (chatbotRef.current) {
        gsap.to(
          chatbotRef.current,
          { 
            scale: 0.8, 
            opacity: 0, 
            y: 20, 
            duration: 0.3, 
            onComplete: () => setShowChatbot(false) 
          }
        );
      }
    }
  };
  
  // Toggle quick stats visibility
  const toggleQuickStats = () => {
    setShowQuickStats(!showQuickStats);
    
    // Animate the stats panel
    if (statsRef.current) {
      if (!showQuickStats) {
        gsap.fromTo(
          statsRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(
          statsRef.current,
          { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
        );
      }
    }
  };
  
  const footerLinks = {
    "Study Tools": [
      { name: "Past Papers", href: "/past-papers", new: false },
      { name: "Question Bank", href: "/question-bank", new: false },
      { name: "Flashcards", href: "/flashcards", new: false },
      { name: "Study Videos", href: "/videos", new: false },
      { name: "AI Tutor", href: "/ai-tutor", new: true },
      { name: "Exam Timer", href: "/exam-timer", new: true }
    ],
    "Subjects": [
      { name: "Mathematics", href: "/subjects/mathematics", new: false },
      { name: "Physics", href: "/subjects/physics", new: false },
      { name: "Chemistry", href: "/subjects/chemistry", new: false },
      { name: "Biology", href: "/subjects/biology", new: false },
      { name: "Economics", href: "/subjects/economics", new: false },
      { name: "Computer Science", href: "/subjects/computer-science", new: true },
      { name: "View All Subjects", href: "/subjects", new: false }
    ],
    "Resources": [
      { name: "IB Study Blog", href: "/blog", new: false },
      { name: "Study Guides", href: "/study-guides", new: false },
      { name: "IB Exam Calendar", href: "/ib-calendar", new: true },
      { name: "School Resources", href: "/schools", new: false },
      { name: "Scholarship Guide", href: "/scholarship-guide", new: true }
    ],
    "About NailIB": [
      { name: "Our Mission", href: "/about", new: false },
      { name: "Success Stories", href: "/success-stories", new: true },
      { name: "Join Our Team", href: "/careers", new: false },
      { name: "Contact Support", href: "/contact", new: false },
      { name: "Privacy Policy", href: "/privacy", new: false },
      { name: "Terms of Service", href: "/terms", new: false }
    ]
  };

  const quickStats = [
    { label: "Students Helped", value: "250K+", icon: "👨‍🎓" },
    { label: "Average Score Increase", value: "1.8 pts", icon: "📈" },
    { label: "Countries", value: "120+", icon: "🌎" },
    { label: "Study Materials", value: "45K+", icon: "📚" }
  ];

  return (
    <footer 
      ref={footerRef}
      className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} font-[IntegralCF] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${isScrolling ? 'shadow-2xl' : ''} transition-colors duration-300`}
    >
      {/* Decorative elements */}
      <div ref={decorativeElementsRef} className="absolute top-0 left-0 w-full pointer-events-none">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 bg-size-200"></div>
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 opacity-50 transform translate-y-1 bg-size-200"></div>
        <div className="h-px bg-gradient-to-r from-blue-400 to-indigo-600 opacity-30 transform translate-y-2 bg-size-200"></div>
      </div>
     
      <div className="max-w-8xl mx-auto relative z-10">
        {/* Dark mode toggle and language selector */}
        <div className="absolute top-0 right-0 flex space-x-3">
          <button 
            onClick={toggleDarkMode}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg className="h-5 w-5" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          <div className="relative">
            <select className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 rounded-full appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer transition-colors duration-300 transform hover:scale-105">
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="zh">ZH</option>
            </select>
            <svg className="h-4 w-4 text-gray-300 absolute right-2 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div ref={logoRef} className="mb-6 perspective">
              <Link href="/">
                <div className="bg-white rounded-xl inline-flex items-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-3 duration-300 relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 blur-md"></div>
                  <Image
                    alt="NailIB Logo"
                    width={50}
                    height={50}
                    src="https://cdn.nailib.com/_next/static/media/logo-small.5691114d.svg?w=256&q=75"
                    className="ml-2"
                  />
                </div>
              </Link>
            </div>
            
            <div className="relative mb-6">
              <p className="text-gray-300 font-['Open_Sans'] text-lg relative z-10">
                Helping IB students excel with innovative study tools built by top IB graduates.
              </p>
              <div className="absolute -left-2 top-0 w-1 h-full bg-blue-500 rounded-full opacity-70"></div>
            </div>
            
            <div ref={newsletterRef} className="my-8 mt-20 w-full relative">
          <div className="absolute -right-3 -top-3 w-30 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-40"></div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-700'} p-5 rounded-lg shadow-lg relative transition-colors duration-300`}>
              <h3 className="font-bold text-lg mb-4 flex items-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Study Tips Newsletter
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Your email "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2   focus:ring-blue-500 text-gray-800 w-[235px] md:w-full  border-2 border-transparent focus:border-blue-400 transition-colors pr-8"
                    required
                  />
                  <div className="absolute right-2 top-2.5 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-r-lg transition-all mt-2 sm:mt-0 sm:rounded-l-none rounded-l-lg shadow-md hover:shadow-lg relative group"
                >
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-r-lg sm:rounded-l-none rounded-l-lg"></div>
                </button>
              </form>
              <p className="text-xs text-gray-400 font-['Open_Sans'] mt-2">Join 250K+ students receiving weekly study tips</p>
            </div>
          </div>

            
            <div ref={socialIconsRef} className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-700 p-2 rounded-full transition-all transform perspective"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-700 p-2 rounded-full transition-all transform perspective"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-700 p-2 rounded-full transition-all transform perspective"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="Instagram"
              >
              <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
</svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-700 p-2 rounded-full transition-all transform perspective"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-700 p-2 rounded-full transition-all transform perspective"
                onMouseEnter={(e) => handleSocialHover(e, true)}
                onMouseLeave={(e) => handleSocialHover(e, false)}
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
         
            
            </div>
            
           
            <button 
              onClick={toggleQuickStats}
              className="mt-6 flex items-center text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <span className="mr-2 text-black">{showQuickStats ? "Hide Stats" : "Show Quick Stats"}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showQuickStats ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="black" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Quick Stats Panel */}
            <div 
              ref={statsRef}
              className={`overflow-hidden transition-all duration-300 ${showQuickStats ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="mt-4 grid grid-cols-2 gap-3 p-4 bg-gray-700 bg-opacity-50 rounded-lg backdrop-filter backdrop-blur-sm">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Categories */}
          <div ref={categoriesRef} className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.keys(footerLinks).map((category) => (
              <div key={category} className="relative">
                <h3 
                  className={`text-lg font-bold mb-4 ${isMobile ? 'cursor-pointer' : ''} flex items-center justify-between`}
                  onClick={() => isMobile && handleCategoryClick(category)}
                >
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{category}</span>
                  {isMobile && (
                    <svg 
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${activeCategory === category ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </h3>
                
                <ul 
                  id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`space-y-3 ${isMobile && activeCategory !== category ? 'hidden sm:block' : 'block'}`}
                >
                  {footerLinks[category].map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white relative group flex items-center transition-all"
                        onMouseEnter={(e) => handleLinkHover(e, true)}
                        onMouseLeave={(e) => handleLinkHover(e, false)}
                      >
                        <span className="absolute w-0 h-0.5 bg-blue-500 bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
                        {link.name}
                        {link.new && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            New
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Chat Help Button */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300">
              <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} rounded-lg p-4`}>
                <h3 className="font-bold text-lg mb-3 text-white">Need Help?</h3>
                <p className="text-gray-300 font-['Open_Sans'] text-sm mb-4">Our support team is here to help you with any questions about our IB study resources.</p>
                <button 
                  onClick={toggleChatbot}
                  className="w-full bg-gradient-to-r  from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center group"
                >
                  <span className="mr-2 relative z-10">Chat with Support</span>
                  <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
            
            {/* Compact hours/contact info */}
            <div className="mt-6 bg-gray-700 bg-opacity-50 rounded-lg p-4 backdrop-filter backdrop-blur-sm">
              <div className="flex items-start mb-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="font-['Open_Sans']">
                  <p className="text-sm text-gray-300 font-medium">Support Hours</p>
                  <p className="text-xs text-gray-400">Monday-Friday: 9am-7pm (GMT)</p>
                  <p className="text-xs text-gray-400">Weekend: 10am-5pm (GMT)</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-300 font-['Open_Sans'] font-medium">Email Us</p>
                  <a href="mailto:help@nailib.com" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">help@nailib.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chatbot popup */}
        {showChatbot && (
          <div 
            ref={chatbotRef}
            className="fixed bottom-20 right-4 w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 text-white flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="font-bold">NailIB Support</h3>
              </div>
              <button 
                onClick={toggleChatbot}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-80 bg-gray-50 p-3 overflow-y-auto">
              <div className="flex items-start mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm font-['Open_Sans'] max-w-xs">
                  <p className="text-gray-800 text-sm">Hi there! 👋 How can I help you with your IB studies today?</p>
                  <p className="text-xs text-gray-500 mt-1">2:45 PM</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-r-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Copyright bar */}
        <div 
          ref={copyrightRef}
          className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-700'} flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm transition-colors duration-300`}
        >
          <div className="mb-4 sm:mb-0">
            <p className="font-['Open_Sans']">© {currentYear} NailIB Learning Platform. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/privacy"
              className="hover:text-white transition-colors"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              Privacy
            </Link>
            <Link 
              href="/terms"
              className="hover:text-white transition-colors"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              Terms
            </Link>
            <Link 
              href="/cookies"
              className="hover:text-white transition-colors"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              Cookies
            </Link>
            <Link 
              href="/sitemap"
              className="hover:text-white transition-colors"
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
      <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 z-[100] rounded-full shadow-lg transition-all duration-300 ${
        isScrolling ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>

    </footer>
  );
}