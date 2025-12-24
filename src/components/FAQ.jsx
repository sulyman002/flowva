import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Flowvahub?",
      answer:
        "Flowvahub is your productivity sidekick — helping you discover new tools, manage subscriptions, and earn rewards for staying productive.",
    },
    {
      question: "Is my data secure with Flowva?",
      answer:
        "Absolutely. Your data is private and never sold. You decide what to share, and it’s only used to improve your experience.",
    },
    {
      question: "How does team collaboration work?",
      answer:
        "Teams can share recommendations, optimize workflows together, view analytics, and manage shared subscriptions from a single dashboard. (Note: Rewards are not included for Teams.)",
    },
    {
      question: "How do Smart Tool Recommendations work?",
      answer:
        "The more you use our platform, the better it understands your workflow — giving you smarter, more relevant tool suggestions over time.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes. You can cancel your Pro or Team plan anytime. You'll keep access until the end of your billing cycle, and you can always downgrade to our Free plan.",
    },
    {
      question: "Can I manage all my subscriptions in one place?",
      answer:
        "Yes! Flowva tracks all your subscriptions in one place — sending renewal alerts, monitoring spending, and helping you save money.",
    },
    {
      question: "Do you offer mobile apps?",
      answer:
        "Yes 😃 Our iOS and Android apps are launching soon, so you can manage subscriptions, get recommendations, earn rewards, and stay connected anywhere.",
    },
    {
      question: "What if I need help getting started?",
      answer:
        "We provide onboarding guides, tutorials, and email support. Pro users get priority support, while Teams and Organizations receive dedicated onboarding and training.",
    },
    {
      question: "Can I connect with other tech professionals on Flowva?",
      answer:
        "Yes! Flowva has an active community of tech enthusiasts, freelancers, and remote professionals. You can connect with others, discuss tools, get feedback, and collaborate with like-minded users, all while discovering new ways to optimize your workflow.",
    },
    {
      question: "What rewards can I earn with Flowva?",
      answer:
        "All users earn basic rewards by using Flowva, with extra perks for Premium. Rewards come from completing simple tasks — trying recommended tools or sharing feedback — and can be redeemed for gift cards, cash, or community perks.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-black uppercase">
            NEED ANSWERS?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            // Simple logic to distribute items if we wanted strict columns, but grid-flow-row is default.
            // The image shows them ordered: Q1 left, Q2 right, Q3 left... roughly.
            // Grid handles this automatically.
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start gap-3 p-5 text-left"
                >
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {faq.question}
                    </h3>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-96 opacity-100 mt-3"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
