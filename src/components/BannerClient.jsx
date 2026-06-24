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

const BannerClient = ({ bannerData }) => {
  return (
    <section className="relative w-full transition-colors duration-300">
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


            <div className="absolute inset-0 bg-white/30 dark:bg-black/60 transition-colors duration-500" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="mb-4 inline-flex items-center gap-2 bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-white dark:text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                Community-driven book platform
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-tight drop-shadow-lg dark:drop-shadow-2xl transition-colors"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="text-base md:text-lg lg:text-xl text-white mb-10 max-w-2xl leading-relaxed transition-colors font-medium drop-shadow-md"
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
                  className="px-8 py-3.5 text-sm font-bold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl dark:shadow-2xl shadow-emerald-900/20 dark:shadow-emerald-900/50 border border-emerald-500/30 transition-all hover:scale-105 duration-300"
                >
                  Explore Books
                </Link>
                <Link
                  href="/signup"
                  className="px-8 py-3.5 text-sm font-bold bg-white/20 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 backdrop-blur-md text-white border border-white/30 dark:border-white/25 hover:border-white/50 dark:hover:border-white/40 transition-all duration-300"
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

export default BannerClient;