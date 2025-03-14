// components/PricingSection.js
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function PricingSection() {
  const pricingRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 80%'
          }
        }
      );
    }
  }, []);

  const plans = [
    {
      name: "Monthly",
      price: "$19.99",
      period: "per month",
      description: "Perfect for short-term exam preparation.",
      features: [
        "Full access to all video content",
        "HD quality streaming",
        "Access on all devices",
        "Interactive quizzes",
        "Note-taking tools"
      ],
      popular: false,
      buttonText: "Start Monthly Plan"
    },
    {
      name: "Annual",
      price: "$149.99",
      period: "per year",
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
      buttonText: "Start Annual Plan"
    },
    {
      name: "Schools",
      price: "Custom",
      period: "pricing available",
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
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section 
      ref={pricingRef} 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[IntegralCF] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-indigo-600">Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing options to suit your IB journey. All plans include a 7-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-2 border-yellow-400 shadow-xl' 
                  : 'border border-gray-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 font-bold py-1 px-4 text-sm">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="font-[IntegralCF] text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold text-indigo-600">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                  plan.popular 
                    ? 'bg-yellow-400 hover:bg-yellow-300 text-indigo-900' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Not sure which plan is right for you? <span className="text-indigo-600 font-bold cursor-pointer">Schedule a demo</span> with our team.
          </p>
        </div>
      </div>
    </section>
  );
}