// components/Footer.js
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeCategory, setActiveCategory] = useState(null);
  const [email, setEmail] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on client-side before accessing window
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      const position = window.pageYOffset;
      setIsScrolling(position > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    alert(`Thank you for subscribing with ${email}! You'll receive our latest study resources.`);
    setEmail('');
  };
  
  const footerLinks = {
    "Study Tools": [
      { name: "Past Papers", href: "/past-papers", new: false },
      { name: "Question Bank", href: "/question-bank", new: false },
      { name: "Flashcards", href: "/flashcards", new: false },
      { name: "Study Videos", href: "/videos", new: false },
      { name: "AI Tutor", href: "/ai-tutor", new: true }
    ],
    "Subjects": [
      { name: "Mathematics", href: "/subjects/mathematics", new: false },
      { name: "Physics", href: "/subjects/physics", new: false },
      { name: "Chemistry", href: "/subjects/chemistry", new: false },
      { name: "Biology", href: "/subjects/biology", new: false },
      { name: "Economics", href: "/subjects/economics", new: false },
      { name: "View All Subjects", href: "/subjects", new: false }
    ],
    "Resources": [
      { name: "IB Study Blog", href: "/blog", new: false },
      { name: "Study Guides", href: "/study-guides", new: false },
      { name: "IB Exam Calendar", href: "/ib-calendar", new: true },
      { name: "School Resources", href: "/schools", new: false }
    ],
    "About NailIB": [
      { name: "Our Mission", href: "/about", new: false },
      { name: "Join Our Team", href: "/careers", new: false },
      { name: "Contact Support", href: "/contact", new: false },
      { name: "Privacy Policy", href: "/privacy", new: false },
      { name: "Terms of Service", href: "/terms", new: false }
    ]
  };

  return (
    <footer className={`bg-gray-800 font-[IntegralCF] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${isScrolling ? 'shadow-2xl' : ''}`}>
      {/* Decorative elements - more subtle now */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
     
      <div className="max-w-8xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-6 transform transition hover:scale-105 duration-300">
              <Link href="/">
                <div className="bg-white  rounded-xl inline-flex items-center shadow-lg hover:shadow-xl transition-all">
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
            
            <p className="text-gray-300 mb-6 text-lg">
              Helping IB students excel with innovative study tools built by top IB graduates.
            </p>
            
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Study Tips Newsletter
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 w-full sm:w-auto"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-r-lg transition-colors mt-2 sm:mt-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="relative">
              <h3 
                className="font-bold text-lg mb-4 cursor-pointer md:cursor-default flex items-center justify-between"
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              >
                <span>{category}</span>
                <svg className={`h-5 w-5 transition-transform md:hidden ${activeCategory === category ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <ul className={`space-y-3 md:h-auto transition-all duration-300 overflow-hidden ${
                activeCategory === category || !isMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-96'
              }`}>
                {links.map((link) => (
                  <li key={link.name} className="group">
                    <Link href={link.href}>
                      <span className="text-gray-400 hover:text-white transition-colors flex items-center group-hover:translate-x-1 transform transition duration-200">
                        {link.name}
                        {link.new && (
                          <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">New</span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-400 text-sm">
                © {currentYear} NailIB Education Technologies. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </span>
              </Link>
              <Link href="/cookies">
                <span className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </span>
              </Link>
              <Link href="/accessibility">
                <span className="text-gray-400 hover:text-white text-sm transition-colors">
                  Accessibility
                </span>
              </Link>
            </div>
          </div>
          
    
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className={`fixed right-6 bottom-6 bg-gray-700 hover:bg-gray-600 text-white p-3 z-50 rounded-full shadow-lg transition-all duration-300 ${isScrolling ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}