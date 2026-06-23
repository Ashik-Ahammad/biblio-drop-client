"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Truck, CircleDollarSign } from "lucide-react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts";

const COLORS = [
  "#10b981", "#3b82f6", "#a855f7", "#f59e0b", "#f43f5e",
  "#06b6d4", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
  "#6366f1", "#eab308", "#ef4444", "#0ea5e9", "#d946ef"
];

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-gradient-to-br dark:from-[#111111] dark:to-[#0a0a0a] p-4 sm:p-6 rounded-2xl border border-neutral-200 dark:border-white/10 shadow-sm dark:shadow-xl flex items-center justify-between group hover:border-emerald-500/30 dark:hover:border-white/20 transition-all duration-300">
    <div>
      <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">{value}</h3>
    </div>
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border transition-transform group-hover:scale-110 ${colorClass}`}>
      <Icon size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-white/10 p-4 rounded-xl shadow-xl z-50 transition-colors duration-300">
        {label && <p className="text-neutral-900 dark:text-white font-bold mb-2">{label}</p>}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm mb-1">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color || entry.payload.fill }} />
            <span className="text-neutral-600 dark:text-neutral-300 capitalize">{entry.name}:</span>
            <span className="text-neutral-900 dark:text-white font-semibold">
              {entry.name.toLowerCase() === "revenue" ? `$${entry.value}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboardClient({ stats, monthlyData, categoryData }) {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-neutral-50 dark:bg-[#050505] w-full overflow-x-hidden transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[95%] xl:max-w-7xl mx-auto"
      >
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
            Overview
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm md:text-base">
            Monitor library statistics, revenue, and system activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers?.toLocaleString() || 0}
            icon={Users}
            colorClass="bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
          />
          <StatCard
            title="Total Books"
            value={stats?.totalBooks?.toLocaleString() || 0}
            icon={BookOpen}
            colorClass="bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20"
          />
          <StatCard
            title="Deliveries"
            value={stats?.totalDeliveries?.toLocaleString() || 0}
            icon={Truck}
            colorClass="bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
            icon={CircleDollarSign}
            colorClass="bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl p-4 md:p-6 shadow-sm dark:shadow-xl overflow-hidden transition-colors duration-300">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Revenue & Orders (Monthly)</h3>
            <div className="h-[300px] md:h-[350px] w-full overflow-x-auto scrollbar-hide">
              <div className="min-w-[500px] h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#88888830" vertical={false} />
                    <XAxis dataKey="month" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#88888815' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar yAxisId="right" dataKey="orders" name="Total Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={0.2} fill="url(#colorRevenue)" />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl p-4 md:p-6 shadow-sm dark:shadow-xl flex flex-col h-[400px] md:h-auto transition-colors duration-300">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 shrink-0">Books by Category</h3>

            <div className="h-[220px] w-full shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 mt-2 overflow-y-auto pr-2 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full transition-all">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-3">
                {categoryData && categoryData.length > 0 ? categoryData.map((entry, index) => (
                  <div key={index} className="flex items-center text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-white/5 transition-colors duration-300">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-2 shrink-0 shadow-md"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate max-w-[100px] sm:max-w-[120px]" title={entry.name}>
                      {entry.name}
                    </span>
                    <span className="text-neutral-500 font-medium ml-1">
                      ({entry.value})
                    </span>
                  </div>
                )) : (
                  <p className="text-neutral-500 text-sm mt-4">No categories found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}