"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookX } from "lucide-react";
import { Pagination } from "@heroui/react";
import BookCard from "@/components/books/BookCard";
import { getAllBooks } from "@/lib/api/books";
import SearchBook from "./SearchBook";

export default function BrowseBooksClient({ initialBooks, initialPagination, user, currentFilters }) {
  const [books, setBooks] = useState(initialBooks);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 12;

  const handlePageChange = async (newPage) => {
    setLoading(true);
    const res = await getAllBooks({
      ...currentFilters,
      email: user?.email || "",
      role: user?.role || "",
      page: newPage,
      limit: itemsPerPage,
    });

    if (res.success) {
      setBooks(res.data);
      setPagination(res.pagination);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setLoading(false);
  };

  const getPageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const page = pagination.page;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (pagination.page - 1) * itemsPerPage + 1;
  const endItem = Math.min(pagination.page * itemsPerPage, pagination.totalItems || 0);

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

        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7 transition-opacity duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
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

        {pagination.totalPages > 1 && books.length > 0 && (
          <div className="flex justify-center mt-16 w-full">
            <Pagination>
              <Pagination.Summary className="text-neutral-500 dark:text-neutral-400 font-medium">
                Showing {startItem}-{endItem} of {pagination.totalItems} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={pagination.page === 1 || loading}
                    onPress={() => handlePageChange(pagination.page - 1)}
                    className="bg-white dark:bg-white/5 text-neutral-700 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10"
                  >
                    <Pagination.PreviousIcon />
                    <span className="hidden sm:inline">Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis className="text-neutral-500 dark:text-neutral-400" />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === pagination.page}
                        onPress={() => handlePageChange(p)}
                        isDisabled={loading}
                        className={p === pagination.page
                          ? "bg-emerald-600 text-white border border-emerald-600"
                          : "bg-white dark:bg-white/5 text-neutral-700 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10"}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  )
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={pagination.page === pagination.totalPages || loading}
                    onPress={() => handlePageChange(pagination.page + 1)}
                    className="bg-white dark:bg-white/5 text-neutral-700 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}