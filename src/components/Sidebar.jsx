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
    fixed inset-y-0 left-0 z-50 w-72 h-screen bg-white shadow-md border-r border-black/10 flex flex-col transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:inset-auto
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-7 py-2 my-2 flex justify-between items-center">
            <img
              src="/assets/flowva_logo-xVpZI3-U.png"
              alt="Flowva Logo"
              className="h-[40px] object-contain" // Adjusted height slightly
            />
            {/* Mobile Close Button inside Sidebar */}
            <button onClick={onClose} className="lg:hidden text-gray-500">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 mt-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive =
                  item.path === "/dashboard"
                    ? location.pathname === "/dashboard"
                    : location.pathname.startsWith(item.path);

                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() =>
                        onClose && window.innerWidth < 1024 && onClose()
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[rgba(144,_19,_254,_0.2)] text-[#9013FE]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {/* Clone element to enforce color if needed, or let text color handle it */}
                      {React.cloneElement(item.icon, {
                        className: isActive
                          ? "text-[#9013FE]"
                          : "text-gray-500", // Specific icon color
                      })}
                      <span className={isActive ? "font-bold" : "font-medium"}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info */}
          <div className="relative px-4 py-3 border-t border-[#64748B]">
            <div className="flex items-center gap-3 w-full text-left">
              <div className="w-10 h-10 rounded-full bg-[#E9D4FF] text-[#9013FE] flex items-center justify-center font-semibold">
                {user?.email?.[0]?.toUpperCase() || "P"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm capitalize">
                  {user?.user_metadata?.first_name || "Pulsepoint"}
                </p>
                <p className="text-xs text-[#718096] truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 p-2"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
