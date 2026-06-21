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
  <div className="bg-linear-to-br from-[#111111] to-[#0a0a0a] p-6 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between group hover:border-white/20 transition-all">
    <div>
      <p className="text-neutral-400 text-sm font-semibold uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
    <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-transform group-hover:scale-110 ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] border border-white/10 p-4 rounded-xl shadow-2xl z-50">
        {label && <p className="text-white font-bold mb-2">{label}</p>}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm mb-1">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color || entry.payload.fill }} />
            <span className="text-neutral-300 capitalize">{entry.name}:</span>
            <span className="text-white font-semibold">
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
    <div className="min-h-screen p-4 md:p-6 bg-[#050505] w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[95%] xl:max-w-7xl mx-auto"
      >

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Overview
          </h1>
          <p className="text-neutral-400 mt-1">
            Monitor library statistics, revenue, and system activity.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers?.toLocaleString() || 0}
            icon={Users}
            colorClass="bg-blue-500/10 text-blue-400 border-blue-500/20"
          />
          <StatCard
            title="Total Books"
            value={stats?.totalBooks?.toLocaleString() || 0}
            icon={BookOpen}
            colorClass="bg-purple-500/10 text-purple-400 border-purple-500/20"
          />
          <StatCard
            title="Deliveries"
            value={stats?.totalDeliveries?.toLocaleString() || 0}
            icon={Truck}
            colorClass="bg-amber-500/10 text-amber-400 border-amber-500/20"
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
            icon={CircleDollarSign}
            colorClass="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6">Revenue & Orders (Monthly)</h3>
            <div className="h-[300px] md:h-[350px] w-full min-w-[500px] overflow-x-auto scrollbar-hide">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />

                  <YAxis yAxisId="left" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />

                  <YAxis yAxisId="right" orientation="right" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />

                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
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

          <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col h-[400px] md:h-auto">
            <h3 className="text-lg font-bold text-white mb-2 shrink-0">Books by Category</h3>

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

            <div className="flex-1 mt-2 overflow-y-auto pr-2 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full transition-all">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-3">
                {categoryData && categoryData.length > 0 ? categoryData.map((entry, index) => (
                  <div key={index} className="flex items-center text-xs text-neutral-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-2 shrink-0 shadow-md"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate max-w-[120px]" title={entry.name}>
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