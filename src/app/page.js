// pages/index.js
'use client'
import { useEffect } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components

import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import VideoSection  from './components/VideoSection'
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';


export default function VideoLandingPage() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <div className="font-[IntegralCF]">
   

      
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <VideoSection></VideoSection>
      <TestimonialSection />
     
      <FAQSection />
      <CTASection />
      
    </div>
  );
}