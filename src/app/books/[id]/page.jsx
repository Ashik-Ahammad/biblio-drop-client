import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowLeft, Truck, Lock, ChevronRight } from "lucide-react";
import { getBookById } from "@/lib/api/books";
import { getBookReviews, checkReviewEligibility } from "@/lib/api/reviews";
import { checkWishlistStatus } from "@/lib/api/wishlist";
import { checkDuplicateOrder } from "@/lib/api/orders";
import WishlistButton from "@/components/books/WishlistButton";
import CheckoutButton from "@/components/CheckoutButton";
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

  return (
    <main className="min-h-screen bg-[#000000] text-white relative overflow-hidden pt-28 pb-12 px-4 md:px-8 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-white/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-12">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          <ChevronRight size={14} />
          <Link href="/books" className="hover:text-white transition-colors">
            Collections
          </Link>{" "}
          <ChevronRight size={14} />
          <span className="text-white truncate max-w-50">
            {book.title}
          </span>
        </nav>

        <Link
          href="/books"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/3 border border-white/10 hover:bg-white/10 text-neutral-300 font-medium mb-10 w-fit"
        >
          <ArrowLeft size={18} /> Back to Books List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 relative w-full max-w-md aspect-2/3 rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="flex gap-3 mb-6">
              <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase text-white">
                {book.category}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${isAvailable ? "bg-white/5 border-white/20 text-neutral-300" : "bg-red-500/10 border-red-500/30 text-red-400"}`}
              >
                {isAvailable ? "Available Now" : book.status}
              </span>
            </div>

            <h1 className="text-5xl font-extrabold mb-4">{book.title}</h1>
            <p className="text-2xl text-neutral-400 mb-10">
              By <span className="text-white">{book.author}</span>
            </p>

            {isOwner && (
              <LibrarianControls
                bookId={book._id}
                bookTitle={book.title}
                currentStatus={book.status}
                bookData={book}
              />
            )}

            <div className="mb-12">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">
                Description
              </h3>
              <p className="text-neutral-300 leading-relaxed text-lg font-light">
                {book.description}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mt-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                    <Truck />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Delivery Fee</p>
                    <p className="text-3xl font-bold">${book.deliveryFee}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm bg-black/50 px-4 py-2 rounded-full border border-white/5">
                  <Lock size={14} /> Secure
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CheckoutButton
                  book={book}
                  isAvailable={isAvailable}
                  currentUser={currentUser}
                  hasAlreadyOrdered={hasAlreadyOrdered}
                />

                {isNormalUser && (
                  <WishlistButton
                    book={book}
                    initialStatus={isWishlisted}
                    currentUser={currentUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <ReviewSection
          bookId={book._id}
          reviews={reviews}
          canReview={canReview}
          currentUser={currentUser}
        />
      </div>
    </main>
  );
}