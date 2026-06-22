"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function TopLibrariansClient({ librarians }) {
  if (!librarians || librarians.length === 0) return null;

  return (
    <section className="bg-neutral-50 dark:bg-[#050505] transition-colors duration-300 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-6 transition-colors">
            <Award size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Top Providers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4 transition-colors">
            Meet Our Top Librarians
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto transition-colors">
            The dedicated heroes connecting readers with their next favorite books.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {librarians.map((librarian, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0a0a0a] border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 rounded-3xl p-8 flex flex-col items-center text-center transition-all shadow-lg hover:shadow-xl dark:shadow-2xl group"
            >
              {/* Top Badge (1st, 2nd, 3rd) */}
              <div className="absolute -top-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 px-4 py-1 rounded-full text-xs font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:border-emerald-300 dark:group-hover:border-emerald-500/30 transition-colors shadow-sm">
                #{index + 1} Contributor
              </div>

              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-br from-emerald-500 to-emerald-200 dark:to-transparent mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#0a0a0a]">
                  <Image
                    width={100}
                    height={100}
                    src={librarian.avatar}
                    alt={librarian.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {librarian.name}
              </h3>

              <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 transition-colors">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  {librarian.deliveries} Deliveries
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}