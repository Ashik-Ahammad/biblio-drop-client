"use client";

import React, { useMemo } from "react";
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
  // Summary Stats
  const stats = useMemo(() => {
    const totalBooks = books.length;
    const totalEarnings = orders.reduce((sum, o) => sum + (Number(o.book?.deliveryFee) || 0), 0);
    const pendingRequests = orders.filter((o) =>
      ["Pending Delivery", "Pending", "Dispatched"].includes(o.status)
    ).length;

    return { totalBooks, totalEarnings, pendingRequests };
  }, [books, orders]);

  // Earnings & Requests Trend
  const monthlyTrendData = useMemo(() => {
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
      const monthOrders = orders.filter((o) => {
        const d = new Date(o.orderedAt);
        return d.getMonth() === m.month && d.getFullYear() === m.year;
      });

      const requests = monthOrders.length;
      const earnings = monthOrders.reduce((sum, o) => sum + (Number(o.book?.deliveryFee) || 0), 0);

      return { name: m.name, requests, earnings };
    });
  }, [orders]);

  // Category Data
  const categoryData = useMemo(() => {
    const counts = books.reduce((acc, b) => {
      const cat = b.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [books]);

  //  Most Requested Books
  const topBooks = useMemo(() => {
    const counts = orders.reduce((acc, o) => {
      const title = o.book?.title || "Unknown Title";
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([title, requests]) => ({ title, requests }))
      .sort((a, b) => b.requests - a.requests)
      .slice(0, 5);
  }, [orders]);

  // Chart Colors
  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#f43f5e'];

  return (
    <div className="flex flex-col gap-8 relative pb-10">

      <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/2 right-[-50px] w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

        {/* Total Books Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl flex items-center gap-5 hover:border-purple-500/30 transition-colors shadow-xl group">
          <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
            <BookCopy size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-400 mb-1">Total Books Listed</p>
            <p className="text-3xl font-extrabold text-white">{stats.totalBooks}</p>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl flex items-center gap-5 hover:border-emerald-500/30 transition-colors shadow-xl group">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-400 mb-1">Total Earnings</p>
            <p className="text-3xl font-extrabold text-white">${stats.totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl flex items-center gap-5 hover:border-amber-500/30 transition-colors shadow-xl group">
          <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-400 mb-1">Pending Requests</p>
            <p className="text-3xl font-extrabold text-white">{stats.pendingRequests}</p>
          </div>
        </div>
      </div>

      {/* MAIN CHARTS SECTION  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

        {/* Earnings & Requests Trend Area Chart */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-emerald-500" size={24} />
            <h3 className="text-xl font-bold text-white">Earnings Trend</h3>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  formatter={(value, name) => [name === 'earnings' ? `$${value.toFixed(2)}` : value, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Books by Category Pie Chart */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <h3 className="text-xl font-bold text-white mb-6 w-full text-left">Books by Category</h3>
          {categoryData.length > 0 ? (
            <div className="h-[280px] w-full max-w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
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
                    formatter={(value) => [value, "Books Listed"]}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#a3a3a3', fontSize: '13px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-500">
              No books listed yet.
            </div>
          )}
        </div>
      </div>

      {/* MOST REQUESTED BOOKS LIST  */}
      <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl relative z-10">
        <h3 className="text-xl font-bold text-white mb-6">Most Requested Books</h3>

        {topBooks.length === 0 ? (
          <p className="text-neutral-500 text-center py-6">No requests found yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {topBooks.map((book, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-amber-500/20 text-amber-500' :
                    index === 1 ? 'bg-neutral-300/20 text-neutral-300' :
                    index === 2 ? 'bg-amber-700/20 text-amber-600' : 'bg-white/10 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <p className="font-bold text-white line-clamp-1">{book.title}</p>
                </div>
                <div className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                  {book.requests} {book.requests === 1 ? 'Request' : 'Requests'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}