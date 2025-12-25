import React from "react";
import { Plus, Search, Filter } from "lucide-react";

const Library = () => {
  // Mock data for initial view - eventually this will come from Supabase
  const [tools, setTools] = React.useState([
    {
      id: 1,
      name: "Notion",
      category: "Productivity",
      cost: 0,
      status: "Active",
      icon: "N",
    },
    {
      id: 2,
      name: "Figma",
      category: "Design",
      cost: 12,
      status: "Active",
      icon: "Fi",
    },
    {
      id: 3,
      name: "Slack",
      category: "Communication",
      cost: 8,
      status: "Active",
      icon: "S",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const handleAddTool = () => {
    // Mock adding a tool
    const newTool = {
      id: tools.length + 1,
      name: "New Tool " + (tools.length + 1),
      category: "Uncategorized",
      cost: 0,
      status: "Active",
      icon: "T",
    };
    setTools([...tools, newTool]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tools</h1>
          <p className="text-gray-500 text-sm">
            Manage your software stack and subscriptions
          </p>
        </div>

        <button
          onClick={handleAddTool}
          className="bg-[#9013FE] hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-purple-200"
        >
          <Plus size={20} />
          <span>Add Tool</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your tools..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-purple-100 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
          <Filter size={18} />
          <span className="text-sm font-medium">Filter</span>
        </button>
      </div>

      {/* Content Area */}
      {tools.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <Plus size={32} className="text-[#9013FE]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No tools added yet
          </h3>
          <p className="text-gray-500 max-w-sm mb-6">
            Start building your stack by adding the tools you use for work.
          </p>
          <button
            onClick={handleAddTool}
            className="text-[#9013FE] font-semibold hover:underline"
          >
            Browse popular tools
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-[#9013FE] font-bold text-xl">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{tool.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  ...
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-50">
                <div>
                  <span className="block text-gray-400 text-xs">Cost</span>
                  <span className="font-semibold">${tool.cost}/mo</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-xs">Status</span>
                  <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    {tool.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
