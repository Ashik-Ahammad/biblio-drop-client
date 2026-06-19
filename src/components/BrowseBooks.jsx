"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookX } from "lucide-react";
import BookCard from "@/components/BookCard";

export default function BrowseBooks({ books = [] }) {
  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 w-full bg-linear-to-b from-[#030303] via-[#0A0A0A] to-[#030303] overflow-hidden text-white">

      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="mb-12 border-b border-white/5 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white"
          >
            Explore Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-400 text-lg max-w-2xl"
          >
            Discover your next favorite read. Find books delivered right to you.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {books.length > 0 ? (
            books.map((book, i) => (
              <motion.div
                key={book._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-white/5 p-6 rounded-full mb-4">
                <BookX size={48} className="text-neutral-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No books available</h3>
              <p className="text-neutral-400">Check back later for new collections.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}