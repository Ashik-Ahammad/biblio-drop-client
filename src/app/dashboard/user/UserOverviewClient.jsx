"use client";

import React, { useMemo } from "react";
import { BookOpen, Truck, CircleDollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function UserOverviewClient({ orders }) {
  // Calculate Summary Stats
  const stats = useMemo(() => {
    const booksRead = orders.filter((o) => o.status === "Delivered").length;
    const pendingDeliveries = orders.filter((o) =>
      ["Pending Delivery", "Dispatched"].includes(o.status)
    ).length;
    const totalSpent = orders.reduce((sum, o) => sum + (Number(o.book?.deliveryFee) || 0), 0);

    return { booksRead, pendingDeliveries, totalSpent };
  }, [orders]);

  // Prepare Dynamic Chart Data (Monthly Activity & Spending)
  const monthlyData = useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        name: d.toLocaleString("default", { month: "short" }),
        month: d.getMonth(),
        year: d.getFullYear(),
      };
    }).reverse();

    return last6Months.map((m) => {
      // Find orders in this specific month
      const monthOrders = orders.filter((o) => {
        const d = new Date(o.orderedAt);
        return d.getMonth() === m.month && d.getFullYear() === m.year;
      });

      const books = monthOrders.length;
      const spent = monthOrders.reduce((sum, o) => sum + (Number(o.book?.deliveryFee) || 0), 0);

      return { name: m.name, books, spent };
    });
  }, [orders]);

  // Prepare Category Data pie chart
  const categoryData = useMemo(() => {
    const counts = orders.reduce((acc, o) => {
      const cat = o.book?.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // Colors for the Donut Chart
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#f43f5e'];

  return (
    <div className="flex flex-col gap-8 relative pb-10">

      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Books Read Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl flex items-center gap-5 hover:border-emerald-500/30 transition-colors shadow-xl">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-400 mb-1">Total Books</p>
            <p className="text-3xl font-extrabold text-white">{stats.booksRead}</p>
          </div>
        </div>

        {/* Pending Deliveries Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl flex items-center gap-5 hover:border-amber-500/30 transition-colors shadow-xl">
          <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-400 mb-1">Pending Deliveries</p>
            <p className="text-3xl font-extrabold text-white">{stats.pendingDeliveries}</p>
          </div>
        </div>

        {/* Total Spent Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl flex items-center gap-5 hover:border-blue-500/30 transition-colors shadow-xl">
          <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
            <CircleDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-400 mb-1">Total Spent</p>
            <p className="text-3xl font-extrabold text-white">
              ${stats.totalSpent.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">

        {/* Monthly Reading Activity (Bar Chart) */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-8">Reading Activity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: '#1a1a1a' }}
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  formatter={(value) => [value, "Books Ordered"]}
                />
                <Bar dataKey="books" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending History (Area Chart) */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-8">Spending History</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                  formatter={(value) => [`$${value.toFixed(2)}`, "Amount Spent"]}
                />
                <Area type="monotone" dataKey="spent" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Favorite Categories (Donut Chart) - Spans full width on large screens */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl lg:col-span-2 flex flex-col items-center">
          <h3 className="text-xl font-bold text-white mb-4 w-full text-left">Favorite Categories</h3>
          {categoryData.length > 0 ? (
            <div className="h-[300px] w-full max-w-md">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontWeight: 'bold' }}
                    formatter={(value) => [value, "Books"]}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#a3a3a3', fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-neutral-500">
              No category data available yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}