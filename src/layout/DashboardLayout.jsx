import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Get first name safely
  const firstName = user?.user_metadata?.first_name || "Pulsepoint";

  return (
    <div className="flex flex-col lg:flex-row min-h-[100dvh] lg:h-screen w-full bg-gray-50">
      {/* Sidebar Component handles its own responsive behavior (fixed on mobile, static on desktop) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-grow bg-gray-50 px-4 lg:px-8 lg:pt-6 overflow-y-auto relative">
        {/* Sticky Header - Minimal for Mobile Toggle */}
        <header className="sticky top-0 z-20 bg-gray-50 py-3 flex justify-between items-center lg:hidden">
          {/* Hamburger for Mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          {/* No other content in global header as requested */}
        </header>

        {/* Content Scroll Area */}
        <section className="space-y-6 pb-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
