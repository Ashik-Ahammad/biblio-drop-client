"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center w-32 h-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-y-[3px] border-x-[3px] border-emerald-500/10 border-t-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border-y-[3px] border-x-[3px] border-emerald-900/20 border-b-emerald-400"
          />

          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/30 rounded-2xl flex items-center justify-center shadow-[inset_0_0_25px_rgba(16,185,129,0.2)] backdrop-blur-xl"
          >
            <BookOpen className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]" size={30} strokeWidth={2.5} />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-2xl md:text-3xl font-black text-white tracking-tight"
          >
            Biblio<span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">Drop</span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-1.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <span className="text-xs font-bold text-emerald-500/80 uppercase tracking-[0.3em]">
              Loading
            </span>
            <span className="flex gap-0.5">
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-emerald-500 rounded-full" />
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-emerald-500 rounded-full" />
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-emerald-500 rounded-full" />
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}