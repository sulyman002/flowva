import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  FileText,
  Layers,
  CreditCard,
  Gift,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/dashboard" },
    {
      name: "Discover",
      icon: <Compass size={20} />,
      path: "/dashboard/discover",
    },
    {
      name: "Library",
      icon: <FileText size={20} />,
      path: "/dashboard/library",
    },
    {
      name: "Tech Stack",
      icon: <Layers size={20} />,
      path: "/dashboard/tech-stack",
    },
    {
      name: "Subscriptions",
      icon: <CreditCard size={20} />,
      path: "/dashboard/subscriptions",
    },
    {
      name: "Rewards Hub",
      icon: <Gift size={20} />,
      path: "/dashboard/rewards",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:inset-auto md:flex md:flex-col
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-50 md:border-none">
          {/* Mobile Close Button */}
          <button onClick={onClose} className="md:hidden mr-4 text-gray-500">
            <X size={24} />
          </button>

          <div className="flex items-center gap-2 text-[#9013FE]">
            <span className="sr-only">Flowva</span>
            {/* Simple Logo Icon */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-heading text-xl font-bold tracking-tight">
              Flowva
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {menuItems.map((item) => {
            // Check for exact match for home, startsWith for others to handle sub-routes if any
            const isActive =
              item.path === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => onClose && window.innerWidth < 768 && onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#F4EBFF] text-[#9013FE]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* User Profile / Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#9013FE] font-bold">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                Pulsepoint
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
