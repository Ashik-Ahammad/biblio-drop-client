"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@heroui/react";
import BookCard from "@/components/books/BookCard";

export default function FeaturedBooksClient({ books = [] }) {
  return (
    <section className="relative py-28 px-4 md:px-8 w-full bg-linear-to-b from-neutral-50 via-white to-neutral-50 dark:from-[#030303] dark:via-[#0A0A0A] dark:to-[#030303] transition-colors duration-300 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-16 border-b border-neutral-200 dark:border-white/5 pb-8 transition-colors duration-300">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight transition-colors duration-300"
          >
            Featured Books
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl transition-colors duration-300"
          >
            Curated collections delivered to your doorstep.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.length > 0 ? (
            books.map((book, i) => (
              <motion.div
                key={book._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <BookCard book={book} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-neutral-500 dark:text-neutral-400 transition-colors">
              No featured books available at the moment.
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/books"
            className="relative z-10 flex items-center justify-center w-[250px] h-[50px] text-neutral-800 dark:text-white no-underline transition-all duration-500 cursor-pointer group
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-neutral-200 dark:before:bg-white/10 before:transition-all before:duration-300 hover:before:opacity-0 hover:before:scale-50
            after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:-z-10 after:opacity-0 after:border after:border-neutral-400 dark:after:border-white/50 after:transition-all after:duration-300 after:scale-125 hover:after:opacity-100 hover:after:scale-100"
          >
            Discover More Books
          </Link>
        </motion.div>
      </div>
    </section>
  );
}