import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  TrendingUp,
  Plus,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const MOCK_SUBSCRIPTIONS = [
  {
    id: 1,
    name: "Adobe Creative Cloud",
    cost: 54.99,
    currency: "$",
    frequency: "Monthly",
    nextPayment: "2024-02-15",
    status: "Active",
    category: "Design",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Adobe_logo.svg/1024px-Old_Adobe_logo.svg.png",
    // Using a generic placeholder or letter if image fails, handled in UI
  },
  {
    id: 2,
    name: "Netflix",
    cost: 15.49,
    currency: "$",
    frequency: "Monthly",
    nextPayment: "2024-02-20",
    status: "Active",
    category: "Entertainment",
  },
  {
    id: 3,
    name: "Spotify",
    cost: 9.99,
    currency: "$",
    frequency: "Monthly",
    nextPayment: "2024-02-10",
    status: "Active",
    category: "Music",
  },
  {
    id: 4,
    name: "Notion",
    cost: 48.0,
    currency: "$",
    frequency: "Yearly",
    nextPayment: "2024-06-01",
    status: "Active",
    category: "Productivity",
  },
];

const Subscriptions = () => {
  // Calculate totals
  const totalMonthly = MOCK_SUBSCRIPTIONS.reduce((acc, sub) => {
    if (sub.frequency === "Monthly") return acc + sub.cost;
    if (sub.frequency === "Yearly") return acc + sub.cost / 12;
    return acc;
  }, 0);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-500">Track your recurring expenses</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#9013FE] hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          <Plus size={20} />
          Add Subscription
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Total Monthly Spend
            </p>
            <h3 className="text-3xl font-bold text-gray-900">
              ${totalMonthly.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl text-[#9013FE]">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Active Subscriptions
            </p>
            <h3 className="text-3xl font-bold text-gray-900">
              {MOCK_SUBSCRIPTIONS.length}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <CreditCard size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Upcoming Renewals
            </p>
            <h3 className="text-3xl font-bold text-gray-900">2</h3>
            <p className="text-xs text-orange-500 mt-1">Due within 7 days</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Your Subscriptions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Cost</th>
                <th className="px-6 py-4 font-medium">Frequency</th>
                <th className="px-6 py-4 font-medium">Next Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_SUBSCRIPTIONS.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {sub.name}
                        </p>
                        <p className="text-xs text-gray-500">{sub.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {sub.currency}
                    {sub.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sub.frequency}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(sub.nextPayment).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        sub.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          sub.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
