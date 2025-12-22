import React, { useState } from 'react';
import { Menu, X, ChevronDown, Rocket } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Hub', hasDropdown: true },
    { name: 'Company', hasDropdown: true },
    { name: 'Support', hasDropdown: true },
    { name: 'Community', hasDropdown: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      {/* Announcement Bar */}
      <div className="bg-[#4A90E2] text-white text-center text-xs py-2 font-medium">
        <span className="opacity-90">New: Flowva 2.0 is live! </span>
        <a href="#" className="underline hover:text-white/80 ml-1">Read more inside &rarr;</a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
               F
             </div>
             <span className="font-heading text-2xl tracking-tight text-gray-900">flowva</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group cursor-pointer flex items-center gap-1 text-gray-600 hover:text-primary font-medium transition-colors">
                <span>{link.name}</span>
                {link.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary" />}
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-900 font-semibold hover:text-primary transition-colors">
              Log in
            </button>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
              Sign up
              <Rocket className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-4">
              <button className="w-full text-center py-2 font-semibold text-gray-900 border border-gray-200 rounded-lg bg-gray-50">
                Log in
              </button>
              <button className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-lg">
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
