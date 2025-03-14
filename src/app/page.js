// pages/index.js
'use client'
import { useEffect } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import VideoSection  from './components/VideoSection'
import TestimonialSection from './components/TestimonialSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function VideoLandingPage() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <div className="font-[OpenSans]">
      <Head>
        <title>Nailib Videos | IB Study Resources</title>
        <meta name="description" content="Boost your IB scores with Nailib's comprehensive video resources, created by top IB experts." />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" 
          rel="stylesheet"
        />
        {/* IntegralCF font would be loaded via custom font files */}
      </Head>

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <VideoSection></VideoSection>
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}