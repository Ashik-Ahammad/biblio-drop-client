"use client";

import React from "react";
import { BookCopy, DollarSign, Clock, TrendingUp } from "lucide-react";
import {
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

export default function LibrarianOverviewClient({ books, orders }) {

  // 1. Stats Calculation
  const totalBooks = books.length;

  const pendingRequests = orders.filter((o) =>
    ["Pending Delivery", "Pending", "Dispatched"].includes(o.status)
  ).length;

  let totalEarnings = 0;
  orders.forEach((o) => {
    totalEarnings += Number(o.book?.deliveryFee) || 0;
  });

  // 2. Monthly Trend Data Calculation
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return {
      name: d.toLocaleString("default", { month: "short" }),
      month: d.getMonth(),
      year: d.getFullYear(),
    };
  }).reverse();

  const monthlyTrendData = last6Months.map((m) => {
    const monthOrders = orders.filter((o) => {
      const d = new Date(o.orderedAt);
      return d.getMonth() === m.month && d.getFullYear() === m.year;
    });

    const requests = monthOrders.length;

    let earnings = 0;
    monthOrders.forEach((o) => {
      earnings += Number(o.book?.deliveryFee) || 0;
    });

    return { name: m.name, requests, earnings };
  });

  // 3. Category Data Calculation
  const categoryCounts = {};
  books.forEach((b) => {
    const cat = b.category || "Uncategorized";
    if (categoryCounts[cat]) {
      categoryCounts[cat] += 1;
    } else {
      categoryCounts[cat] = 1;
    }
  });

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  // 4. Top Books Calculation
  const titleCounts = {};
  orders.forEach((o) => {
    const title = o.book?.title || "Unknown Title";
    if (titleCounts[title]) {
      titleCounts[title] += 1;
    } else {
      titleCounts[title] = 1;
    }
  });

  const topBooks = Object.entries(titleCounts)
    .map(([title, requests]) => ({ title, requests }))
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 5);

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#f43f5e'];

  return (
    <div className="flex flex-col gap-6 md:gap-8 relative pb-10 w-full overflow-hidden">
      <div className="hidden sm:block absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/2 right-[-50px] w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-5 hover:border-purple-500/50 dark:hover:border-purple-500/30 transition-colors shadow-sm dark:shadow-xl group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 dark:bg-purple-500/10 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-500 shrink-0 group-hover:scale-110 transition-transform">
            <BookCopy size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5 sm:mb-1 truncate">Total Books Listed</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white truncate">{totalBooks}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-5 hover:border-emerald-500/50 dark:hover:border-emerald-500/30 transition-colors shadow-sm dark:shadow-xl group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
            <DollarSign size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5 sm:mb-1 truncate">Total Earnings</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white truncate">${totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-5 hover:border-amber-500/50 dark:hover:border-amber-500/30 transition-colors shadow-sm dark:shadow-xl group sm:col-span-2 md:col-span-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0 group-hover:scale-110 transition-transform">
            <Clock size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5 sm:mb-1 truncate">Pending Requests</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white truncate">{pendingRequests}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 w-full">
        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-xl lg:col-span-2 w-full overflow-hidden">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <TrendingUp className="text-emerald-600 dark:text-emerald-500 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white truncate">Earnings Trend</h3>
          </div>
          <div className="h-[250px] sm:h-[320px] w-full -ml-4 sm:ml-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" className="dark:stroke-[#262626]" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  formatter={(value, name) => [name === 'earnings' ? `$${value.toFixed(2)}` : value, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-xl flex flex-col items-center w-full">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 w-full text-left truncate">Books by Category</h3>
          {categoryData.length > 0 ? (
            <div className="h-[300px] sm:h-[350px] w-full max-w-sm mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={85}
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
                    formatter={(value) => [value, "Books Listed"]}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ color: '#737373', fontSize: '12px', marginTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm sm:text-base text-neutral-500 dark:text-neutral-400 text-center">
              No books listed yet.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm dark:shadow-xl relative z-10 w-full overflow-hidden">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 truncate">Most Requested Books</h3>

        {topBooks.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400 text-center py-6 text-sm sm:text-base">No requests found yet.</p>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            {topBooks.map((book, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-100 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors w-full overflow-hidden"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${
                    index === 0 ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-500' :
                    index === 1 ? 'bg-neutral-200 dark:bg-neutral-300/20 text-neutral-600 dark:text-neutral-300' :
                    index === 2 ? 'bg-orange-100 dark:bg-amber-700/20 text-orange-600 dark:text-amber-600' : 'bg-neutral-200 dark:bg-white/10 text-neutral-700 dark:text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <p className="font-bold text-neutral-900 dark:text-white truncate text-sm sm:text-base pr-2">{book.title}</p>
                </div>
                <div className="text-[10px] sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 whitespace-nowrap shrink-0 ml-2">
                  {book.requests} {book.requests === 1 ? 'Req' : 'Reqs'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}