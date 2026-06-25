import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  User,
  Calendar,
} from "lucide-react";
import { getBookById } from "@/lib/api/books";
import { getBookReviews, checkReviewEligibility } from "@/lib/api/reviews";
import { checkWishlistStatus } from "@/lib/api/wishlist";
import { checkDuplicateOrder } from "@/lib/api/orders";
import WishlistButton from "@/components/books/WishlistButton";
import CheckoutButton from "@/components/books/CheckoutButton";
import LibrarianControls from "@/components/books/LibrarianControls";
import ReviewSection from "@/components/books/ReviewSection";
import { getUserSession } from "@/lib/core/session";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await getBookById(id);
  const book = res?.success ? res.data : null;
  return { title: book ? `${book.title} | BiblioDrop` : "Book Not Found" };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;

  const [res, currentUser, reviews] = await Promise.all([
    getBookById(id),
    getUserSession(),
    getBookReviews(id),
  ]);

  if (!res?.success || !res?.data) return notFound();

  const book = res.data;
  const isAvailable = book.status === "Published";
  const isOwner =
    currentUser?.id === book.librarianId ||
    currentUser?.email === book.librarianEmail;

  const canReview = currentUser
    ? await checkReviewEligibility(currentUser.email, id)
    : false;

  const isNormalUser = currentUser?.role === "user";

  const isWishlisted = isNormalUser
    ? await checkWishlistStatus(currentUser.email, id)
    : false;

  const hasAlreadyOrdered = isNormalUser
    ? await checkDuplicateOrder(currentUser.email, id)
    : false;

  const timestamp = book.addedAt || book.createdAt || new Date().toISOString();
  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-neutral-900 dark:text-white relative overflow-hidden pt-28 pb-20 font-sans selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-50 transition-colors duration-500">
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-400/20 dark:bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-all duration-700" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-all duration-700" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <Link
            href="/books"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-neutral-200/60 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 font-medium w-fit transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Library
          </Link>

          <nav className="flex items-center gap-2 text-xs font-semibold tracking-wide text-neutral-400 dark:text-neutral-500 uppercase">
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/books"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Books
            </Link>
            <ChevronRight size={14} />
            <span className="text-neutral-800 dark:text-neutral-300 truncate max-w-[150px] sm:max-w-[200px]">
              {book.title}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 mb-20">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0 perspective-[1000px] group">
              <div className="relative w-full aspect-[2/3]">
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200 to-white dark:from-[#111] dark:to-[#1a1a1a] rounded-3xl -z-20 border border-neutral-300/50 dark:border-white/10 transform rotate-[5deg] translate-x-3 translate-y-2 shadow-lg transition-all duration-500 group-hover:rotate-[8deg] group-hover:translate-x-6 group-hover:translate-y-4" />

                <div className="absolute inset-0 bg-gradient-to-tl from-neutral-300 to-neutral-50 dark:from-white/5 dark:to-[#0a0a0a] rounded-3xl -z-10 border border-neutral-200/50 dark:border-white/5 transform rotate-[-3deg] -translate-x-2 translate-y-2 shadow-md transition-all duration-500 group-hover:rotate-[-6deg] group-hover:-translate-x-4 group-hover:translate-y-4" />

                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-white/20 bg-neutral-100 dark:bg-[#0a0a0a] shadow-[0_15px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(16,185,129,0.2)] group-hover:-translate-y-2">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-900 dark:text-white shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                    {book.category}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-sm transition-colors duration-300 ${
                  isAvailable
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
                }`}
              >
                {isAvailable ? (
                  <Sparkles size={14} className="animate-pulse" />
                ) : null}
                {isAvailable ? "Available to Order" : book.status}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-4 text-transparent bg-clip-text bg-gradient-to-br from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
              {book.title}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 mb-5 font-medium">
              Written by{" "}
              <span className="text-neutral-900 dark:text-white underline decoration-emerald-500/30 underline-offset-4 decoration-2">
                {book.author}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-8 bg-neutral-100/60 dark:bg-white/5 w-fit px-5 py-3 rounded-2xl border border-neutral-200/60 dark:border-white/10">
              <div className="flex items-center gap-2">
                <User
                  size={16}
                  className="text-emerald-600 dark:text-emerald-500"
                />
                <span>
                  Listed by{" "}
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {book.librarianEmail}
                  </span>
                </span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
              <div className="flex items-center gap-2">
                <Calendar
                  size={16}
                  className="text-emerald-600 dark:text-emerald-500"
                />
                <span>
                  Added on{" "}
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {formattedDate}
                  </span>
                </span>
              </div>
            </div>

            {isOwner && (
              <div className="mb-8 p-1 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent">
                <LibrarianControls
                  bookId={book._id}
                  bookTitle={book.title}
                  currentStatus={book.status}
                  bookData={book}
                />
              </div>
            )}

            <div className="mb-12 relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-neutral-200 dark:bg-white/10 rounded-full" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-3">
                Synopsis
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg font-light max-w-2xl">
                {book.description}
              </p>
            </div>

            <div className="mt-auto bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-neutral-200/60 dark:border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.02)] transition-all duration-300 hover:border-emerald-500/30">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/20 dark:to-emerald-500/5 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-200/50 dark:border-emerald-500/20">
                    <Truck className="text-emerald-600 dark:text-emerald-400 size-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-0.5">
                      Delivery Fee
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-2xl">
                        $
                      </span>
                      <span className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                        {book.deliveryFee}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium bg-neutral-100/80 dark:bg-black/40 px-5 py-2.5 rounded-full border border-neutral-200/80 dark:border-white/5 text-neutral-700 dark:text-neutral-300">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  100% Secure Payment
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <CheckoutButton
                    book={book}
                    isAvailable={isAvailable}
                    currentUser={currentUser}
                    hasAlreadyOrdered={hasAlreadyOrdered}
                  />
                </div>

                {isNormalUser && (
                  <div className="sm:w-auto">
                    <WishlistButton
                      book={book}
                      initialStatus={isWishlisted}
                      currentUser={currentUser}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200/60 dark:border-white/10 pt-16">
          <ReviewSection
            bookId={book._id}
            reviews={reviews}
            canReview={canReview}
            currentUser={currentUser}
          />
        </div>
      </div>
    </main>
  );
}
