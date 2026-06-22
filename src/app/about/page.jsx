"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Truck,
  BookOpen,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const steps = [
    {
      icon: Search,
      title: "1. Browse & Discover",
      description:
        "Explore our vast collection of books across multiple categories. Find your next favorite read easily.",
    },
    {
      icon: ShoppingBag,
      title: "2. Place Your Order",
      description:
        "Select the book you want and place a request. Our system securely logs your order instantly.",
    },
    {
      icon: Truck,
      title: "3. Fast Dispatch",
      description:
        "The librarian confirms your order and dispatches it. Track your order status right from your dashboard.",
    },
    {
      icon: BookOpen,
      title: "4. Receive & Read",
      description:
        "Get the book delivered right to your doorstep. Dive into your reading journey without any hassle.",
    },
  ];

  const rules = [
    {
      icon: ShieldCheck,
      title: "Secure Packaging",
      description:
        "All books are carefully packaged to ensure they reach you in pristine condition.",
    },
    {
      icon: Clock,
      title: "Delivery Timeframe",
      description:
        "Standard delivery takes 48-72 hours depending on your location and the librarian's availability.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 mt-10">
      <div className="max-w-7xl mx-auto space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            About Biblio<span className="text-emerald-500">Drop</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Your Local Library, Delivered. We bridge the gap between readers and
            book owners, making it easier than ever to discover, borrow, and
            read books from your community.
          </p>
        </motion.div>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Four simple steps to get your favorite books.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-white/10 p-8 rounded-3xl shadow-lg hover:shadow-xl dark:hover:border-emerald-500/30 transition-all text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ordering Guidelines</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                To maintain a smooth and reliable platform for everyone, we have
                set up a few standard guidelines for our delivery network.
              </p>
              <div className="space-y-6">
                {rules.map((rule, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 h-fit">
                      <rule.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{rule.title}</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-md">
              <Image
                src="/assets/about.png"
                alt="About BiblioDrop Guidelines"
                fill
                className="object-cover transition-opacity duration-300 hover:opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}