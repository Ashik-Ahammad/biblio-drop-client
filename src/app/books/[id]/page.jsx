import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowLeft, ShieldCheck, Truck, Star, Info, ChevronRight, Lock } from "lucide-react";
import { getBookById } from "@/lib/api/books";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await getBookById(id);
  const book = res?.success ? res.data : null;

  return {
    title: book ? `${book.title} | BiblioDrop` : "Book Not Found",
  };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const res = await getBookById(id);

  if (!res?.success || !res?.data) {
    return notFound();
  }

  const book = res.data;
  const isAvailable = book.status === "Published";

  return (

    <main className="min-h-screen bg-[#000000] text-white relative overflow-hidden pt-28 pb-12 px-4 md:px-8 font-sans selection:bg-white/30">

      <div className="absolute top-[-10%] left-[-10%] w-200 h-200 bg-white/3 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-white/2 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Sleek Navigation Bar */}
        <nav className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-12 tracking-wide">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/books" className="hover:text-white transition-colors">Collections</Link>
          <ChevronRight size={14} />
          <span className="text-white truncate max-w-50">{book.title}</span>
        </nav>

        {/* Back Button (Glass Pill) */}
        <Link
          href="/books"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/3 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white font-medium transition-all backdrop-blur-md mb-10 w-fit"
        >
          <ArrowLeft size={18} /> Back to Books List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: Premium Cover Presentation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md aspect-2/3 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 group bg-[#0a0a0a]">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              {/* Internal Glass Reflection */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-xl">
                {book.category}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-xl border ${
                isAvailable
                  ? "bg-white/3 border-white/20 text-neutral-300"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                {isAvailable ? "Available Now" : "Checked Out"}
              </span>
            </div>

            {/* Typography Hierarchy */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-[1.1] tracking-tighter">
              {book.title}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 font-medium mb-10 tracking-tight">
              By <span className="text-white">{book.author}</span>
            </p>

            {/* Synopsis Area */}
            <div className="mb-12">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">
                Synopsis
              </h3>
              <p className="text-neutral-300 leading-relaxed text-lg max-w-[65ch] font-light">
                {book.description}
              </p>
            </div>

            {/* Action Card (Glass Checkout Strip) */}
            <div className="bg-white/2 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl mt-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/5">
                    <Truck className="text-white" size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-400">Delivery Fee</p>
                    <p className="text-3xl font-bold text-white tracking-tight">${book.deliveryFee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-400 bg-black/50 px-4 py-2 rounded-full border border-white/5">
                  <Lock size={14} /> Secure Checkout
                </div>
              </div>

              {/* Premium White Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  isDisabled={!isAvailable}
                  className={`flex-1 h-14 text-base font-bold rounded-2xl transition-all duration-300 ${
                    isAvailable
                      ? "bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                      : "bg-white/5 text-neutral-500 border border-white/5"
                  }`}
                >
                  {isAvailable ? "Request Delivery" : "Currently Unavailable"}
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-transparent border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                >
                  Save to Wishlist
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Section - Minimalist Enterprise Look */}
        <div className="mt-32 pt-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Reader Reviews</h2>
              <p className="text-neutral-400 text-lg">Verified opinions from our community.</p>
            </div>
            <Button className="h-12 px-6 bg-white/10 hover:bg-white/20 border border-white/5 text-white font-bold rounded-xl transition-all backdrop-blur-md">
              Write a Review
            </Button>
          </div>

          {/* Empty State Card */}
          <div className="bg-white/2 border border-white/5 rounded-3xl p-16 text-center flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Star className="text-neutral-400" size={32} strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">No reviews yet</h4>
            <p className="text-neutral-400 max-w-lg text-lg font-light leading-relaxed">
              Be the first to review this book. Only readers who have successfully received delivery can share their thoughts to ensure authenticity.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}