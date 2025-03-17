'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-4' : 'bg-white shadow-md py-4'
    }`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="no-underline">
              <div className="flex items-center cursor-pointer">
                <div className="relative h-10 w-32">
                  {/* Replace with actual Nailib logo */}
                  <div className="bg-white rounded-lg inline-flex">
                    <Image
                      alt="Nail IB's App Icon"
                      width={40}
                      height={40}
                      src="https://cdn.nailib.com/_next/static/media/logo-small.5691114d.svg?w=256&q=75"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/past-papers" className="no-underline">
              <span className={`text-gray-800 hover:text-blue-400 font-medium transition-colors font-[Open_Sans]`}>
                Past Papers
              </span>
            </Link>
            <Link href="/schools" className="no-underline">
              <span className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} hover:text-blue-400 font-medium transition-colors font-[Open_Sans]`}>
                Schools
              </span>
            </Link>
            <Link href="/flashcards" className="no-underline">
              <span className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} hover:text-blue-400 font-medium transition-colors font-[Open_Sans]`}>
                Flashcards
              </span>
            </Link>
            <Link href="/question-bank" className="no-underline">
              <span className={`${isScrolled ? 'text-gray-800' : 'text-gray-800'} hover:text-blue-400 font-medium transition-colors font-[Open_Sans]`}>
                Question Bank
              </span>
            </Link>
            <Link href="/videos" className="font-bold no-underline">
              <span className={`${isScrolled ? 'text-indigo-600' : 'text-indigo-600'} font-medium transition-colors font-[Open_Sans]`}>
                Videos
              </span>
            </Link>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="no-underline">
              <span className={`${isScrolled ? 'text-indigo-600' : 'text-indigo-600'} font-bold transition-colors font-[IntegralCF]`}>
                Log in
              </span>
            </Link>
            <Link href="/signup" className="no-underline">
              <button className="bg-blue-400 hover:bg-blue-300 text-indigo-900 font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 font-[IntegralCF]">
                Sign Up Free
              </button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl p-4">
          <div className="flex flex-col space-y-4">
            <Link href="/past-papers" className="no-underline">
              <span className="text-gray-800 hover:text-indigo-600  block py-2 font-[Open_Sans]">
                Past Papers
              </span>
            </Link>
            <Link href="/schools" className="no-underline">
              <span className="text-gray-800 hover:text-indigo-600 font-medium block py-2 font-[Open_Sans]">
                Schools
              </span>
            </Link>
            <Link href="/flashcards" className="no-underline">
              <span className="text-gray-800 hover:text-indigo-600 font-medium block py-2 font-[Open_Sans]">
                Flashcards
              </span>
            </Link>
            <Link href="/question-bank" className="no-underline">
              <span className="text-gray-800 hover:text-indigo-600 font-medium block py-2 font-[Open_Sans]">
                Question Bank
              </span>
            </Link>
            <Link href="/videos" className="no-underline">
              <span className="text-indigo-600 font-bold block py-2 font-[Open_Sans]">
                Videos
              </span>
            </Link>
            <div className="pt-4 flex flex-col space-y-4">
              <Link href="/login" className="no-underline">
                <span className="text-indigo-600 font-bold block py-2 font-[IntegralCF]">
                  Log in
                </span>
              </Link>
              <Link href="/signup" className="no-underline">
                <button className="bg-blue-400 hover:bg-blue-300 text-indigo-900 font-bold py-3 px-6 rounded-lg w-full font-[IntegralCF]">
                  Sign Up Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}