"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaXTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa6";
import { ArrowRight, BookOpen, Heart, Mail } from "lucide-react";

const socialLinks = [
  { name: "X (Twitter)", href: "https://x.com", icon: FaXTwitter },
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebook },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "GitHub", href: "https://github.com", icon: FaGithub },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Browse Books", href: "/books" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FooterClient() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("You're on the list!");
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-white overflow-hidden border-t border-neutral-200 dark:border-white/5 pt-16 transition-colors duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16"
        >
          <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col items-center md:items-start gap-6 text-center md:text-left">
            <Link href="/" className="group flex items-center gap-3 transition-transform active:scale-95">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
                <BookOpen className="text-white" size={22} />
              </div>
              <p className="font-extrabold text-2xl tracking-tight text-neutral-900 dark:text-white transition-colors">
                Biblio<span className="text-emerald-500">Drop</span>
              </p>
            </Link>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm transition-colors">
              A community-driven platform connecting readers with local libraries and independent book owners. Democratizing access to literature, one delivery at a time.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-500 dark:text-neutral-400 bg-neutral-200 dark:bg-white/5 border border-neutral-300 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-3 flex flex-col items-center md:items-start gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white transition-colors">Quick Links</h3>
            <ul className="flex flex-col items-center md:items-start gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col items-center md:items-start gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white transition-colors">Stay in the loop</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-center md:text-left transition-colors">
              Get the latest updates on new arrivals, reading picks, and community news.
            </p>
            <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-500/50 focus:border-emerald-500 focus:bg-neutral-50 dark:focus:bg-white/10 pl-10 pr-4 py-3.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none transition-all shadow-sm dark:shadow-inner rounded-xl"
                />
              </div>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:cursor-pointer duration-300 ${
                  subscribed
                    ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 border border-transparent"
                }`}
              >
                {subscribed ? "✓ Subscribed Successfully" : "Subscribe Now"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        <div className="border-t border-neutral-200 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} BiblioDrop. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500 flex items-center gap-1.5 bg-neutral-200 dark:bg-white/5 px-4 py-2 rounded-full border border-neutral-300 dark:border-white/5 transition-colors">
            Built with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> for readers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}