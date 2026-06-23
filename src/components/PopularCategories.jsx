"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Book, BookOpen, Rocket, Wand2, Search, Heart, Ghost, User,
  Sparkles, Landmark, GraduationCap, Image as ImageIcon
} from "lucide-react";
import { getAllBooks } from "@/lib/api/books";

const categories = [
  { key: "Fiction", label: "Fiction", icon: Book, glow: "from-emerald-500/20" },
  { key: "Non-Fiction", label: "Non-Fiction", icon: BookOpen, glow: "from-blue-500/20" },
  { key: "Sci-Fi", label: "Science Fiction", icon: Rocket, glow: "from-purple-500/20" },
  { key: "Fantasy", label: "Fantasy", icon: Wand2, glow: "from-indigo-500/20" },
  { key: "Mystery", label: "Mystery & Thriller", icon: Search, glow: "from-orange-500/20" },
  { key: "Romance", label: "Romance", icon: Heart, glow: "from-pink-500/20" },
  { key: "Horror", label: "Horror", icon: Ghost, glow: "from-red-500/20" },
  { key: "Biography", label: "Biography & Memoir", icon: User, glow: "from-cyan-500/20" },
  { key: "Self-Help", label: "Self-Help", icon: Sparkles, glow: "from-yellow-500/20" },
  { key: "History", label: "History", icon: Landmark, glow: "from-amber-600/20" },
  { key: "Academic", label: "Academic & Education", icon: GraduationCap, glow: "from-teal-500/20" },
  { key: "Graphic-Novel", label: "Graphic Novels & Comics", icon: ImageIcon, glow: "from-fuchsia-500/20" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

export default function PopularCategories() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getAllBooks({ limit: 1000 });

        if (res && res.data && Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Failed to load books:", error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full transition-colors duration-300">
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs tracking-widest uppercase">Book Categories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-5">
            Discover Your Next Read
          </h2>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const safeBooks = Array.isArray(books) ? books : [];

          const bookCount = safeBooks.filter((book) => {
            const dbCat = book.category;
            return dbCat === cat.key || dbCat === cat.label || (cat.key === "Mystery" && dbCat === "Thriller");
          }).length;

          return (
            <motion.div key={cat.key} variants={itemVariants}>
              <Link href={`/books?category=${encodeURIComponent(cat.key)}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative h-full flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0a0c10] border border-neutral-200 dark:border-white/5 transition-all duration-500 overflow-hidden"
                >
                  <div className={`absolute -inset-px bg-linear-to-b ${cat.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 mb-4 p-4 rounded-full bg-neutral-100 dark:bg-white/5 border dark:border-white/10 group-hover:bg-neutral-200 dark:group-hover:bg-white/10 transition-colors duration-500">
                    <Icon className="w-6 h-6 text-neutral-600 dark:text-zinc-300" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 text-center flex flex-col gap-1">
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-zinc-300">{cat.label}</h3>
                    <span className="text-xs font-medium text-neutral-500 dark:text-zinc-500">
                      {isLoading ? "Counting..." : `${bookCount} ${bookCount === 1 ? "Book" : "Books"}`}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}