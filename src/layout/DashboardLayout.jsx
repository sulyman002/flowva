import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth(); // To get user info for header if needed

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Hidden on mobile unless toggled */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Fixed) */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-gray-100 bg-white md:hidden shrink-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Menu size={24} />
          </button>

          <span className="font-heading text-lg font-bold text-gray-900">
            {/* Dynamic Title could go here based on route, or just Greeting */}
            {/* For now keeping it cleaner or matching the mockup which shows greeting */}
          </span>

          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
        </header>

        {/* Desktop Header (Optional: Mockup shows text "Good afternoon, Pulsepoint" at top content. 
            If we want that fixed, we can put it here or in the page. 
            User said "header of each of the outlet which will also be fix on scrolling".
            So it implies the header part should be outside the scrollable area.
        */}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white p-4 md:p-8 scroll-smooth">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
