"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaXTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa6";
import { ArrowRight, BookOpen, Heart } from "lucide-react";

const socialLinks = [
  { name: "X (Twitter)", href: "https://x.com", icon: FaXTwitter, hover: "hover:bg-slate-800 hover:text-white dark:hover:bg-white/10" },
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebook, hover: "hover:bg-blue-600 hover:text-white" },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram, hover: "hover:bg-pink-600 hover:text-white" },
  { name: "GitHub", href: "https://github.com", icon: FaGithub, hover: "hover:bg-slate-700 hover:text-white dark:hover:bg-white/10" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Browse Books", href: "/jobs" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Footer = () => {
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
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16 text-center md:text-left"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-200">
                BiblioDrop
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              A community-driven platform connecting readers with local libraries and independent book owners.
            </p>
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 bg-white/5 border border-white/10 transition-all duration-200 ${social.hover}`}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Quick Links</h3>
            <ul className="flex flex-col items-center md:items-start gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-emerald-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Stay in the loop</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              New arrivals, reading picks, and community updates — no spam.
            </p>
            <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-2 max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.96 }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  subscribed
                    ? "bg-emerald-700 text-emerald-200"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/40"
                }`}
              >
                {subscribed ? "✓ Joined" : "Subscribe"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} BiblioDrop. All rights reserved.
          </p>
          <p className="text-xs text-slate-700 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-emerald-700 fill-emerald-700" /> for readers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;