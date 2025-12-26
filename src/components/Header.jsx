import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { navLinks, announcementData } from "../data/data";
import flowva_logo from "../assets/flowva_logo(blue).png";

const Header = () => {
  const { user, signOut, onboardingComplete } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className=" " onMouseLeave={() => setActiveDropdown(null)}>
      <div className="relative bg-black text-white font-500 text-center text-xs py-4 font-medium mb-4">
        <span className="opacity-90">{announcementData.text} </span>
        <a
          href={announcementData.linkHref}
          className="underline hover:text-white/80 ml-1"
        >
          {announcementData.linkText}
        </a>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 bg-white/90 lg:px-3 border border-gray-200 rounded-full px-2 py-2 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex items-center  z-50 relative">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer px-4">
              <div className="w-8 h-8 flex items-center justify-center text-primary font-bold text-xl">
                <img src={flowva_logo} alt="" />
              </div>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <nav className="flex space-x-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group cursor-pointer flex items-center gap-1 text-gray-500 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-50 font-medium transition-colors text-sm"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 text-gray-400 transition-transform ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              F
            </div>
            <span className="font-heading text-2xl tracking-tight text-gray-900">
              flowva
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 ">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to={onboardingComplete ? "/dashboard" : "/onboarding"}
                  className="text-sm font-medium text-gray-700 hover:text-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-[100px] h-[40px] text-sm font-bold border-[#9013FE1A] rounded-[100px] border p-1 cursor-pointer"
                >
                  <div className="h-full w-full flex justify-center items-center px-[16px] transition-all ease-linear duration-200 rounded-[100px] bg-white hover:bg-[#111111] hover:text-white relative shadow-sm">
                    Sign Out
                  </div>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="w-[84px] h-[40px] text-sm font-bold border-[#9013FE1A] rounded-[100px] border p-1 cursor-pointer">
                    <div className="h-full w-full flex justify-center items-center px-[16px] transition-all ease-linear duration-200 rounded-[100px] bg-white hover:bg-[#111111] hover:shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,0px_40px_11px_0px_#00000000,-4px_13px_19px_0px_#ECD6FF80_inset] hover:text-white relative shadow-[0px_2px_4px_0px_#0000001A]">
                      Login
                    </div>
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="w-[84px] font-manrope h-[40px] text-sm font-bold border-[#9013FE1A] rounded-[100px] border p-1">
                    <div className="cursor-pointer h-full flex items-center justify-center  w-full whitespace-nowrap px-[16px] rounded-[100px] relative bg-[#111111] hover:bg-[#b362fae3] transition-all ease-linear duration-200 text-white shadow-[0px_2px_4px_0px_#0000001A,0px_6px_6px_0px_#00000017,0px_14px_9px_0px_#0000000D,0px_26px_10px_0px_#00000003,0px_40px_11px_0px_#00000000,-4px_13px_19px_0px_#ECD6FF80_inset]">
                      Sign up
                    </div>
                  </button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none bg-white p-2 rounded-full shadow-sm border border-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {activeDropdown && (
          <div
            className="absolute top-full left-0 right-0 w-full pt-2 z-40 px-2"
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8 w-full animate-fade-in-up min-h-[400px]">
              {navLinks.map(
                (link) =>
                  link.name === activeDropdown && (
                    <div key={link.name} className="flex gap-8 justify-start">
                      {link.items.map((item) => (
                        <div
                          key={item.title}
                          className="w-56 h-72 bg-gradient-to-b from-purple-50 via-white to-white rounded-2xl flex flex-col items-center justify-center border border-purple-50 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div
                            className={`relative z-10 w-24 h-24 ${item.color} rounded-full flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}
                          >
                            {item.icon}
                          </div>
                          <span className="relative z-10 font-heading text-2xl text-black uppercase tracking-wider">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-50">
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
              {user ? (
                <>
                  <span className="text-center text-gray-600 text-sm">
                    Signed in as {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 font-semibold text-gray-900 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full">
                    <button className="w-full text-center py-2 font-semibold text-gray-900 border border-gray-200 rounded-lg bg-gray-50">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <button className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-lg">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
