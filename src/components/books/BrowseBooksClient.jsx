"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookX } from "lucide-react";
import { Button } from "@heroui/react";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/api/books";
import SearchBook from "./SearchBook";

export default function BrowseBooksClient({ initialBooks, initialPagination, user, currentFilters }) {
  const [books, setBooks] = useState(initialBooks);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const res = await getAllBooks({
      ...currentFilters,
      email: user?.email || "",
      role: user?.role || "",
      page: pagination.page + 1,
      limit: 12
    });

    if (res.success) {
      setBooks((prev) => [...prev, ...res.data]);
      setPagination(res.pagination);
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 w-full bg-neutral-50 dark:bg-[#0A0A0A] overflow-hidden text-neutral-900 dark:text-white transition-colors duration-300">
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 border-b border-neutral-200 dark:border-white/5 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 mt-3"
          >
            Explore Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl"
          >
            Discover your next favorite read. Find books delivered right to you.
          </motion.p>
        </div>

        <div className="flex flex-col mb-12">
          <SearchBook currentFilters={currentFilters} />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
          {books.length > 0 ? (
            books.map((book, i) => (
              <motion.div
                key={book._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 12) * 0.05, duration: 0.4 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-neutral-100 dark:bg-white/5 p-6 rounded-full mb-4">
                <BookX size={48} className="text-neutral-400 dark:text-neutral-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No books available</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Check back later or adjust your filters.</p>
            </div>
          )}
        </div>

        {/* Load More */}
        {pagination.page < pagination.totalPages && (
          <div className="flex justify-center mt-16">
            <Button
              isLoading={loading}
              onPress={loadMore}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 px-10 rounded-2xl"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}