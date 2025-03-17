
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FAQSection() {
  const faqRef = useRef(null);
  const titleRef = useRef(null);
  const faqItemsRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 80%'
          }
        }
      );
      
      // FAQ items staggered animation
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 30, scale: 0.97 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: faqItemsRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do Nailib Videos complement other IB resources?",
      answer: "Nailib Videos serve as a visual learning complement to textbooks and past papers. While textbooks provide detailed information, our videos break down complex concepts visually, making them easier to understand and remember. They're designed to work alongside other study resources to provide a comprehensive learning experience."
    },
    {
      question: "Are the videos aligned with the latest IB curriculum?",
      answer: "Yes, absolutely! Our content team continuously updates all videos to align with the latest IB curriculum changes. We work directly with experienced IB examiners to ensure our content matches the most current syllabus requirements and assessment objectives."
    },
    {
      question: "Can I download videos for offline viewing?",
      answer: "Yes, subscribers on our Annual plan can download videos for offline viewing through our mobile app. This feature is particularly useful for studying on-the-go or in areas with limited internet connectivity."
    },
    {
      question: "Do you offer videos for all IB subjects?",
      answer: "We currently offer comprehensive video libraries for the most popular IB subjects including Mathematics (AA/AI), Biology, Chemistry, Physics, Economics, Business Management, English Literature, History, and Psychology. We're constantly expanding our library based on student demand."
    },
    {
      question: "How often is new content added?",
      answer: "Our content team releases new videos weekly, focusing on challenging topics and responding to student requests. We also create special review series before examination periods to help with targeted revision."
    },
    {
      question: "Can teachers use these videos in their classrooms?",
      answer: "Absolutely! Many IB teachers use our videos as supplementary teaching resources. We offer special licensing options for schools that want to integrate our content into their curriculum. Contact our Schools team for more information."
    }
  ];

  return (
    <section 
      ref={faqRef} 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden font-['Open_Sans']"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-indigo-400 rounded-full opacity-20"></div>
        <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-indigo-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/4 right-1/3 w-5 h-5 bg-yellow-300 rounded-full opacity-20"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold tracking-wider uppercase mb-4 font-['IntegralCF']">
            Have Questions?
          </span>
          <h2 className="font-['IntegralCF'] text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Nailib Videos to supercharge your IB learning journey
          </p>
        </div>

        <div ref={faqItemsRef} className="space-y-5">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item bg-white rounded-2xl shadow-md overflow-hidden border-l-4 ${
                openIndex === index ? 'border-indigo-600' : 'border-transparent'
              } transition-all duration-300`}
            >
              <button 
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className={`font-['IntegralCF'] text-lg ${
                  openIndex === index ? 'text-indigo-700' : 'text-gray-800'
                } group-hover:text-indigo-600 transition-colors duration-200 font-bold`}>
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full ${
                  openIndex === index ? 'bg-indigo-600' : 'bg-gray-200'
                } flex items-center justify-center transition-colors duration-300`}>
                  <svg 
                    className={`h-5 w-5 text-white transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div 
                id={`faq-answer-${index}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className={`text-gray-600 transition-opacity duration-300 ${
                    openIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-6">Still have questions? We're here to help!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-indigo-600 font-['IntegralCF'] hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-indigo-100 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Contact Support
            </button>
            <button className="bg-transparent font-['IntegralCF'] hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-xl border border-indigo-200 hover:border-indigo-300 transition-all flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}