import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import flowvaIcon from "../assets/flowva_icon(white).svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white pb-8 relative overflow-hidden rounded-t-[40px] ">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="flex justify-center mb-24">
          <div className="bg-[#111111]  rounded-b-[28px] p-10 md:p-14 w-full max-w-3xl text-center relative overflow-hidden">
            {/* Top Logo */}
            <div className="flex justify-center mb-8">
              <img src={flowvaIcon} alt="Flowva" className="h-16 w-auto" />
            </div>

            {/* Input Group */}
            <div className="max-w-md mx-auto relative mb-6">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-[#1F1F1F] text-gray-300 placeholder-gray-500 border border-gray-700 rounded-full px-6 py-4 pr-32 focus:outline-none focus:border-gray-500 transition-colors"
              />
              <button className="absolute right-2 top-1.5 bottom-1.5 bg-white text-black font-bold px-6 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center">
                Submit &rarr;
              </button>
            </div>

            <p className="text-gray-500 text-sm font-medium">
              10,000+ end their week inspired. Join Friday Flow.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 border-b border-gray-900 pb-16 mb-16">
          {/* Brand Column */}
          <div className="lg:w-1/4">
            <div className="flex items-center gap-2 mb-6">
              <img src={flowvaIcon} alt="Flowva" className="h-8 w-auto" />
              <span className="font-heading text-xl font-bold">Flowva</span>
            </div>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs">
              The smart way to manage your digital life and get rewarded
            </p>
            <p className="text-gray-600 text-xs">&copy; 2025 Flowva</p>
          </div>

          {/* Navigation Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-4">
            {/* Hub */}
            <div>
              <h4 className="font-bold text-white mb-6">Hub</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discover
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Library
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rewards
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-bold text-white mb-6">Community</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Affiliate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Influencer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Referral
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-gray-400">
          <a
            href="#"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Facebook className="w-5 h-5 fill-current" /> <span>Facebook</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            {/* X Icon (Custom SVG or text approx) */}
            <div className="w-5 h-5 flex items-center justify-center font-bold text-lg">
              𝕏
            </div>
            <span>X (Formerly Twitter)</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" /> <span>Instagram</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5 fill-current" /> <span>Linkedin</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            {/* Tiktok Icon (Custom or generic music) */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            <span>Tiktok</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
