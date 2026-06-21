"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { LibraryBig, Users, BookOpenCheck } from "lucide-react";

const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function StatsClient({ totalBooks, activeReaders, booksOrdered }) {
 
  const statsData = [
    { icon: LibraryBig, label: "Total Books", target: totalBooks, suffix: "+" },
    { icon: Users, label: "Active Readers", target: activeReaders, suffix: "+" },
    { icon: BookOpenCheck, label: "Books Ordered", target: booksOrdered, suffix: "+" },
  ];

  const stepsData = [
    { title: "Browse", desc: "Explore thousands of books from local libraries and owners." },
    { title: "Order", desc: "Request your favorite books securely with just one click." },
    { title: "Read", desc: "Get it delivered to your doorstep quickly within 48 hours." },
  ];

  return (
    <div className="bg-[#050505] py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col gap-32">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-3xl border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden text-center flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <stat.icon className="text-emerald-400" size={36} strokeWidth={1.5} />
              </div>

              <h3 className="relative text-5xl font-black text-white mb-2 tracking-tight drop-shadow-sm">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </h3>
              <p className="relative text-emerald-500/80 font-semibold uppercase tracking-[0.2em] text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            How Biblio<span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">Drop</span> Works
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Your reading journey simplified into three easy steps. Join the community and start borrowing today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 relative">

          <div className="hidden lg:block absolute top-14 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {stepsData.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="relative w-28 h-28 rounded-full bg-[#050505] border border-white/5 flex items-center justify-center p-3 mb-8 shadow-2xl group-hover:border-emerald-500/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 flex items-center justify-center text-white text-4xl font-black shadow-inner group-hover:text-emerald-400 group-hover:from-emerald-500/20 group-hover:to-transparent group-hover:border-emerald-500/40 transition-all duration-500">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed max-w-[260px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}