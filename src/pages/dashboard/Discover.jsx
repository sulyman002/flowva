import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Plus,
  ExternalLink,
  Zap,
  Layout,
  PenTool,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", label: "All Tools" },
  { id: "marketing", label: "Marketing" },
  { id: "productivity", label: "Productivity" },
  { id: "design", label: "Design" },
  { id: "communication", label: "Communication" },
];

const MOCK_TOOLS = [
  {
    id: 1,
    name: "Instapage",
    description: "Landing page builder for higher conversions.",
    category: "marketing",
    rating: 4.8,
    reviews: 1240,
    icon: <Layout size={24} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "Notion",
    description: "All-in-one workspace for notes & tasks.",
    category: "productivity",
    rating: 4.9,
    reviews: 5800,
    icon: <Zap size={24} />,
    color: "bg-gray-100 text-gray-700",
  },
  {
    id: 3,
    name: "Figma",
    description: "Collaborative interface design tool.",
    category: "design",
    rating: 4.9,
    reviews: 3200,
    icon: <PenTool size={24} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    name: "Slack",
    description: "Team communication and collaboration.",
    category: "communication",
    rating: 4.7,
    reviews: 8500,
    icon: <MessageSquare size={24} />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 5,
    name: "Hootsuite",
    description: "Social media management platform.",
    category: "marketing",
    rating: 4.5,
    reviews: 900,
    icon: <BarChart size={24} />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 6,
    name: "Canva",
    description: "Graphic design platform for everyone.",
    category: "design",
    rating: 4.8,
    reviews: 15000,
    icon: <PenTool size={24} />,
    color: "bg-teal-100 text-teal-600",
  },
];

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = MOCK_TOOLS.filter((tool) => {
    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddTool = (toolName) => {
    toast.success(`Added ${toolName} to your library`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Tools</h1>
        <p className="text-gray-500">
          Find the best tools to power up your workflow
        </p>
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
      {/* Search & Filter * /}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9013FE]/20 shadow-sm"
          />
        </div>

        {/* Categories (Desktop) * /}
        <div className="hidden md:flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-[#9013FE] text-white shadow-md"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Categories (Mobile Scroll) * /}
        <div className="md:hidden w-full overflow-x-auto pb-2 flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                activeCategory === cat.id
                  ? "bg-[#9013FE] text-white border-[#9013FE]"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid * /}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.color}`}
                >
                  {tool.icon}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-[#9013FE] transition-colors">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {tool.name}
              </h3>
              <div className="flex items-center gap-1 mb-3">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">
                  {tool.rating}
                </span>
                <span className="text-xs text-gray-400">
                  ({tool.reviews} reviews)
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {tool.description}
              </p>

              <button
                onClick={() => handleAddTool(tool.name)}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:border-[#9013FE] hover:text-[#9013FE] hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add to Library
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400">
            <p className="text-lg">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
      */}
    </div>
  );
};

export default Discover;
