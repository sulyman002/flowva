import React, { useState } from 'react';
import { ArrowRight, Star, Zap, Shield, Users } from 'lucide-react';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'brands'

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-20 sm:pt-16 sm:pb-24">
      {/* Background Blobs (Optional for flare) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-mint rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Toggle Switch */}
        <div className="inline-flex items-center bg-gray-100 p-1.5 rounded-full mb-8 shadow-inner">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === 'users' ? 'bg-white shadow-md text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            For users
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === 'brands' ? 'bg-white shadow-md text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            For brands
          </button>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading text-black leading-[0.95] tracking-tight mb-6 max-w-5xl mx-auto">
          DISCOVER & SHARE <br className="hidden md:block" />
          <span className="text-primary italic relative">
             TOP TOOLS
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow opacity-50 z-[-1]" viewBox="0 0 200 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 2.1932 73.2505 1.50346 195 2.00007" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/></svg>
          </span>
          {' '}WITH EASE
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 font-medium font-body leading-relaxed">
          The ultimate hub to organize your digital life, discover new tools, and get rewarded for your workflow. Join thousands of productive users today.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform flex items-center justify-center gap-2">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
               <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
               <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-white"></div>
               <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-white"></div>
            </div>
            Join Community
          </button>
        </div>

        {/* Floating Icons (Decorative) */}
        <div className="absolute top-1/4 left-0 hidden lg:block animate-bounce duration-[3000ms]">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-12 border border-gray-100">
             <Zap className="w-8 h-8 text-yellow-500" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-1/3 right-10 hidden lg:block animate-pulse duration-[4000ms]">
          <div className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center transform rotate-12 border border-gray-100">
             <Star className="w-6 h-6 text-primary" fill="currentColor" />
          </div>
        </div>
         <div className="absolute bottom-10 left-20 hidden lg:block animate-bounce duration-[5000ms]">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform rotate-6 border border-gray-100">
             <Shield className="w-8 h-8 text-mint-600" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
