import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function PricingSection() {
  const pricingRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Annual (index 1)
  const [isYearly, setIsYearly] = useState(true);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Main section animation
      gsap.fromTo(
        pricingRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 80%'
          }
        }
      );
      
      // Cards staggered animation
      gsap.fromTo(
        '.pricing-card',
        { 
          opacity: 0, 
          y: 40,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 75%'
          }
        }
      );
      
      // Create floating elements animation
      gsap.to('.floating-element', {
        y: 20,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      });
    }
  }, []);
  
  const handlePlanSelect = (index) => {
    if (selectedPlan === index) return;
    
    // Animate current card scale down
    gsap.to(`#pricing-card-${selectedPlan}`, {
      scale: 1,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      duration: 0.4
    });
    
    // Animate new card scale up
    gsap.to(`#pricing-card-${index}`, {
      scale: 1.03,
      boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.2)',
      duration: 0.5,
      ease: "back.out(1.2)"
    });
    
    setSelectedPlan(index);
  };

  const toggleBilling = () => {
    setIsYearly(!isYearly);
    
    // Animate the switch
    gsap.to('.toggle-circle', {
      x: isYearly ? 0 : 24,
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Animate pricing change
    gsap.fromTo(
      '.price-value',
      { 
        opacity: 0,
        y: -10
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.5)"
      }
    );
  };

  const plans = [
    {
      name: "Monthly",
      monthlyPrice: "$19.99",
      yearlyPrice: "$16.99",
      period: isYearly ? "monthly, billed yearly" : "per month",
      description: "Perfect for short-term exam preparation.",
      features: [
        "Full access to all video content",
        "HD quality streaming",
        "Access on all devices",
        "Interactive quizzes",
        "Note-taking tools"
      ],
      popular: false,
      buttonText: "Start Free Trial",
      color: "indigo",
      icon: "📚"
    },
    {
      name: "Annual",
      monthlyPrice: "$149.99",
      yearlyPrice: "$127.99",
      period: isYearly ? "per year" : "equivalent to $12.99/mo",
      description: "Best value for serious IB students.",
      features: [
        "Everything in Monthly plan",
        "37% savings compared to monthly",
        "Offline downloads",
        "Progress tracking",
        "Priority support",
        "Extended access to archived content"
      ],
      popular: true,
      buttonText: "Start Free Trial",
      color: "yellow",
      icon: "🌟"
    },
    {
      name: "Schools",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      period: isYearly ? "yearly packages" : "monthly packages",
      description: "For IB schools and learning institutions.",
      features: [
        "Volume licensing for students",
        "Teacher dashboard",
        "Analytics and reporting",
        "Custom branding options",
        "PD resources for teachers",
        "Dedicated account manager"
      ],
      popular: false,
      buttonText: "Contact Sales",
      color: "green",
      icon: "🏫"
    }
  ];

  // Background decoration elements
  const decorationElements = [
    { icon: "🧠", top: "5%", left: "3%", size: "50px", rotation: "15deg" },
    { icon: "📊", top: "15%", right: "5%", size: "40px", rotation: "-10deg" },
    { icon: "🔬", bottom: "10%", left: "7%", size: "45px", rotation: "5deg" },
    { icon: "🧮", bottom: "20%", right: "8%", size: "35px", rotation: "-5deg" },
    { icon: "📝", top: "40%", left: "5%", size: "30px", rotation: "10deg" },
    { icon: "📈", top: "30%", right: "2%", size: "35px", rotation: "-15deg" }
  ];

  return (
    <section 
      ref={pricingRef} 
      className="pt-24 pb-32 px-4 font-[IntegralCF] sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5f7ff 0%, #edf1fd 40%, #e6ebfc 100%)",
      }}
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(129, 140, 248, 0.1) 0%, transparent 8%),
            radial-gradient(circle at 70% 60%, rgba(76, 29, 149, 0.1) 0%, transparent 10%),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 8%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 15%)
          `,
          backgroundSize: "120% 120%",
          backgroundPosition: "center"
        }}
      ></div>
      
      {/* Floating decoration elements */}
      {decorationElements.map((element, index) => (
        <div 
          key={index}
          className="floating-element absolute hidden md:block opacity-20 select-none pointer-events-none"
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
            bottom: element.bottom,
            fontSize: element.size,
            transform: `rotate(${element.rotation})`,
            filter: "blur(1px)",
            zIndex: 0
          }}
        >
          {element.icon}
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <span className="text-xs uppercase tracking-widest font-bold bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">
              Pricing Plans
            </span>
          </div>
          <h2 className="font-[IntegralCF] text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-500">
              Investment In Excellence
            </span>
            <div className="absolute -bottom-2 left-4 right-4 h-4 bg-yellow-300 opacity-30 transform -rotate-1 rounded"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Find the perfect plan to fuel your IB success. All plans include our industry-leading content, taught by expert IB educators.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-3 mt-12">
            <span className={`text-lg ${!isYearly ? 'font-semibold text-indigo-800' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={toggleBilling}
              className="relative w-14 h-7 flex items-center bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full px-1 transition-all cursor-pointer"
            >
              <div 
                className="toggle-circle absolute left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300"
                style={{ transform: isYearly ? 'translateX(24px)' : 'translateX(0)' }}
              ></div>
            </button>
            <div className="flex flex-col items-start">
              <span className={`text-lg ${isYearly ? 'font-semibold text-indigo-800' : 'text-gray-500'}`}>Annual</span>
              <span className="text-xs bg-yellow-400 text-indigo-900 font-bold px-2 py-0.5 rounded-sm -mt-1">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {plans.map((plan, index) => (
            <div 
              id={`pricing-card-${index}`}
              key={index} 
              className={`pricing-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 bg-white`}
              style={{
                boxShadow: selectedPlan === index 
                  ? '0 20px 30px -10px rgba(0, 0, 0, 0.2)' 
                  : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transform: selectedPlan === index ? 'scale(1.03)' : 'scale(1)',
                border: selectedPlan === index 
                  ? `2px solid ${plan.color === 'indigo' ? '#6366F1' : plan.color === 'yellow' ? '#FBBF24' : '#10B981'}`
                  : '2px solid transparent'
              }}
              onClick={() => handlePlanSelect(index)}
            >
              {plan.popular && (
                <div 
                  className="absolute top-0 right-0 font-bold py-2 px-6 text-xs uppercase tracking-wide transform translate-y-2 translate-x-8 rotate-45"
                  style={{
                    background: 'linear-gradient(90deg, #FBBF24, #F59E0B)',
                    color: '#7E1F86',
                    boxShadow: '0 2px 10px rgba(251, 191, 36, 0.5)'
                  }}
                >
                  Best Value
                </div>
              )}
              
              <div className="absolute top-0 left-0 w-full h-full opacity-10"
                style={{
                  background: plan.color === 'indigo' 
                    ? 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)' 
                    : plan.color === 'yellow' 
                      ? 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' 
                      : 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
                }}
              ></div>
              
              <div className="p-8 relative z-10">
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <div 
                      className="text-xl inline-block p-2 rounded-lg mb-3"
                      style={{
                        background: plan.color === 'indigo' 
                          ? 'rgba(79, 70, 229, 0.1)' 
                          : plan.color === 'yellow' 
                            ? 'rgba(251, 191, 36, 0.1)' 
                            : 'rgba(16, 185, 129, 0.1)',
                        color: plan.color === 'indigo' 
                          ? '#4F46E5' 
                          : plan.color === 'yellow' 
                            ? '#B45309' 
                            : '#059669'
                      }}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="font-[IntegralCF] text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                  </div>
                  
                  {selectedPlan === index && (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="price-value text-4xl font-bold" style={{
                      color: plan.color === 'indigo' 
                        ? '#4338CA' 
                        : plan.color === 'yellow' 
                          ? '#B45309' 
                          : '#047857'
                    }}>
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-1 mb-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                </div>
                
                <div className="border-t border-gray-100 my-6 pt-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg 
                          className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          style={{
                            color: plan.color === 'indigo' 
                              ? '#4F46E5' 
                              : plan.color === 'yellow' 
                                ? '#D97706' 
                                : '#059669'
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span></li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className="w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center"
                  style={{
                    background: plan.color === 'indigo' 
                      ? 'linear-gradient(90deg, #4F46E5, #6366F1)' 
                      : plan.color === 'yellow' 
                        ? 'linear-gradient(90deg, #F59E0B, #FBBF24)' 
                        : 'linear-gradient(90deg, #059669, #10B981)',
                    boxShadow: plan.color === 'indigo' 
                      ? '0 10px 15px -3px rgba(79, 70, 229, 0.3)' 
                      : plan.color === 'yellow' 
                        ? '0 10px 15px -3px rgba(251, 191, 36, 0.3)' 
                        : '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <span>{plan.buttonText}</span>
                  {plan.color !== 'green' && (
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
                
                {plan.color === 'yellow' && (
                  <div className="text-center text-xs text-gray-500 mt-4">
                    7-day free trial, no credit card required
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Not sure which plan fits your needs?</h4>
                <p className="text-gray-600">Our education consultants can help you choose the perfect learning path.</p>
              </div>
              <button className="shrink-0 bg-gradient-to-r from-indigo-700 to-indigo-900 hover:from-indigo-800 hover:to-indigo-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1">
                Schedule a Demo
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gray-600">30-Day Money Back</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gray-600">No Hidden Fees</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gray-600">Cancel Anytime</span>
            </div>
          </div>
        </div>
        
        {/* Floating accent shapes */}
        <div className="absolute -bottom-8 -left-16 w-32 h-32 bg-indigo-600 opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute top-20 -right-20 w-40 h-40 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}