"use client";

import React from "react";
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

  const booksRead = orders.filter((o) => o.status === "Delivered").length;
  const pendingDeliveries = orders.filter((o) =>
    ["Pending Delivery", "Dispatched"].includes(o.status)
  ).length;

  let totalSpent = 0;
  orders.forEach((o) => {
    totalSpent += Number(o.book?.deliveryFee) || 0;
  });

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return {
      name: d.toLocaleString("default", { month: "short" }),
      month: d.getMonth(),
      year: d.getFullYear(),
    };
  }).reverse();

  const monthlyData = last6Months.map((m) => {
    const monthOrders = orders.filter((o) => {
      const d = new Date(o.orderedAt);
      return d.getMonth() === m.month && d.getFullYear() === m.year;
    });

    const books = monthOrders.length;

    let spent = 0;
    monthOrders.forEach((o) => {
      spent += Number(o.book?.deliveryFee) || 0;
    });

    return { name: m.name, books, spent };
  });

  const counts = {};
  orders.forEach((o) => {
    const cat = o.book?.category || "Uncategorized";
    if (counts[cat]) {
      counts[cat] += 1;
    } else {
      counts[cat] = 1;
    }
  });

  const categoryData = Object.entries(counts).map(([name, value]) => ({ name, value }));

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#f43f5e'];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 relative pb-10">
      <div className="hidden sm:block absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-5 hover:border-emerald-500/30 transition-colors shadow-sm dark:shadow-xl">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
            <BookOpen size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5 sm:mb-1">Total Books</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">{booksRead}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-5 hover:border-amber-500/30 transition-colors shadow-sm dark:shadow-xl">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
            <Truck size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5 sm:mb-1">Pending Deliveries</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">{pendingDeliveries}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-5 hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-xl sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0">
            <CircleDollarSign size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5 sm:mb-1">Total Spent</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-xl">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-6 sm:mb-8">Reading Activity</h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.2)" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(150, 150, 150, 0.1)' }}
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  formatter={(value) => [value, "Books Ordered"]}
                />
                <Bar dataKey="books" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-xl">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-6 sm:mb-8">Spending History</h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.2)" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                  formatter={(value) => [`$${value.toFixed(2)}`, "Amount Spent"]}
                />
                <Area type="monotone" dataKey="spent" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-xl lg:col-span-2 flex flex-col items-center">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-4 w-full text-left">Favorite Categories</h3>
          {categoryData.length > 0 ? (
            <div className="h-[250px] sm:h-[300px] w-full max-w-md">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ fontWeight: 'bold' }}
                    formatter={(value) => [value, "Books"]}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#a3a3a3', fontSize: '12px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-neutral-500 text-sm sm:text-base">
              No category data available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}