"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Book,
  BookOpen,
  Rocket,
  Wand2,
  Search,
  Heart,
  Ghost,
  User,
  Sparkles,
  Landmark,
  GraduationCap,
  Image as ImageIcon,
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
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
        const allBooks = await getAllBooks();
        setBooks(allBooks);
      } catch (error) {
        console.error("Failed to load books for categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full transition-colors duration-300">

      <div className="flex flex-col items-center justify-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 mb-6 transition-colors">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transition-colors" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs tracking-widest uppercase transition-colors">
              Book Categories
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-5 transition-colors">
            Discover Your Next Read
          </h2>
          <p className="text-neutral-600 dark:text-zinc-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed transition-colors">
            Dive into our vast library categorized just for you. Whether you are searching for spine-chilling horror or an insightful biography, your next great adventure awaits.
          </p>
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

          const bookCount = books.filter(
            (book) => book.category === cat.key || book.category === cat.label
          ).length;

          return (
            <motion.div key={cat.key} variants={itemVariants}>
              <Link href="/books" className="block h-full">
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative h-full flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0a0c10] border border-neutral-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:border-neutral-300 dark:hover:border-white/10 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50"
                >
                  <div className={`absolute -inset-px bg-linear-to-b ${cat.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 mb-4 p-4 rounded-full bg-neutral-100 dark:bg-white/5 ring-1 ring-neutral-200 dark:ring-white/10 group-hover:bg-neutral-200 dark:group-hover:bg-white/10 transition-colors duration-500">
                    <Icon
                      className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-600 dark:text-zinc-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="relative z-10 text-center flex flex-col gap-1">
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">
                      {cat.label}
                    </h3>

                    <span className="text-xs font-medium text-neutral-500 dark:text-zinc-500 group-hover:text-neutral-700 dark:group-hover:text-zinc-300 transition-colors duration-500">
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