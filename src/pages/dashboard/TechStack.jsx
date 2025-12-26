import React, { useState } from "react";
import {
  Plus,
  Search,
  Layers,
  MoreHorizontal,
  Share2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const TechStack = () => {
  const [activeTab, setActiveTab] = useState("my-stacks");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Data for Stacks
  const [myStacks, setMyStacks] = useState([
    {
      id: 1,
      name: "Marketing Essentials",
      description: "Core tools for daily marketing operations",
      tools: ["Instapage", "Moosend", "Hootsuite"],
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 2,
      name: "Productivity Pack",
      description: "Tools to keep the team organized",
      tools: ["Notion", "Slack", "Zoom"],
      color: "bg-blue-100 text-blue-600",
    },
  ]);

  const handleDelete = (id) => {
    setMyStacks(myStacks.filter((stack) => stack.id !== id));
    toast.success("Stack deleted successfully");
  };

  const handleCreateStack = () => {
    toast.info("Create Stack Modal would open here");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tech Stacks</h1>
          <p className="text-gray-500">
            Curate and share your favorite tool collections
          </p>
        </div>
        <button
          onClick={handleCreateStack}
          className="flex items-center justify-center gap-2 bg-[#9013FE] hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <Plus size={20} />
          Create New Stack
        </button>
      </div>

      {/* Coming Soon Message */}
      <div className="mt-20 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Coming Soon</h2>
        <p className="text-gray-500 max-w-md">
          We're working hard to bring you these features. Stay tuned for
          exciting updates!
        </p>
      </div>

      {/* 
      {/* Tabs & Search * /}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab("my-stacks")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "my-stacks"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Stacks
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "explore"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Explore Community
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search stacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#9013FE]/20 text-sm"
          />
        </div>
      </div>

      {/* Content Grid * /}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myStacks.map((stack) => (
          <div
            key={stack.id}
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stack.color}`}
              >
                <Layers size={24} />
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {stack.name}
            </h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
              {stack.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Tools Inside
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600"
                  >
                    {tool}
                  </span>
                ))}
                <button className="px-3 py-1 border border-dashed border-gray-200 rounded-lg text-xs font-medium text-gray-400 hover:text-[#9013FE] hover:border-[#9013FE] transition-colors">
                  + Add
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-[#9013FE] hover:bg-purple-50 rounded-lg transition-colors">
                <Share2 size={16} /> Share
              </button>
              <button
                onClick={() => handleDelete(stack.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}

        {/* Create New Placeholder Card * /}
        <button
          onClick={handleCreateStack}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-[#9013FE] hover:text-[#9013FE] hover:bg-purple-50/50 transition-all duration-300 min-h-[300px]"
        >
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <span className="font-semibold">Create New Stack</span>
        </button>
      </div>
      */}
    </div>
  );
};

export default TechStack;
