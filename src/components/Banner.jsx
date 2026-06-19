"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const bannerData = [
  {
    id: 1,
    image: "/assets/banner1.png",
    title: "Your Local Library, Delivered",
    desc: "Democratizing access to literature. Browse our vast, community-driven collection and have your next great read delivered to your doorstep.",
  },
  {
    id: 2,
    image: "/assets/banner2.png",
    title: "Discover Your Next Great Read",
    desc: "Explore curated collections from independent book owners and local libraries. Finding the perfect book has never been easier.",
  },
  {
    id: 3,
    image: "/assets/banner3.png",
    title: "Fast, Secure & Seamless",
    desc: "Enjoy a frictionless borrowing experience with secure payment integration and real-time delivery tracking from your dashboard.",
  },
  {
    id: 4,
    image: "/assets/banner4.png",
    title: "Join the Reading Revolution",
    desc: "Connect with a growing community of avid readers. Share reviews, build your wishlist, and manage your reading journey.",
  },
];

const Banner = () => {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-screen"
      >
        {bannerData.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/20" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Community-driven book platform
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-tight drop-shadow-2xl"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="text-base md:text-lg lg:text-xl text-white/75 mb-10 max-w-2xl leading-relaxed"
              >
                {slide.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <Link
                  href="/books"
                  className="px-8 py-3.5 text-sm font-bold rounded-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xl shadow-emerald-900/50 border border-emerald-500/30 transition-all hover:scale-105 duration-300"
                >
                  Explore Books
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-3.5 text-sm font-bold rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/25 hover:border-white/40 transition-all duration-300"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;