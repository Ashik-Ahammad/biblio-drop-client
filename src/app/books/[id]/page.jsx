import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowLeft, Truck, Star, Lock, ChevronRight, Edit, Trash2, EyeOff } from "lucide-react";
import { getBookById } from "@/lib/api/books";
import CheckoutButton from "@/components/CheckoutButton";
import { getUserSession } from "@/lib/core/session";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await getBookById(id);
  const book = res?.success ? res.data : null;
  return { title: book ? `${book.title} | BiblioDrop` : "Book Not Found" };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;

  const res = await getBookById(id);

  const currentUser = await getUserSession();

  if (!res?.success || !res?.data) return notFound();

  const book = res.data;
  const isAvailable = book.status === "Published";

  const isOwner = currentUser?.id === book.librarianId || currentUser?.email === book.librarianEmail;

  return (
    <main className="min-h-screen bg-[#000000] text-white relative overflow-hidden pt-28 pb-12 px-4 md:px-8 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-white/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> <ChevronRight size={14} />
          <Link href="/books" className="hover:text-white transition-colors">Collections</Link> <ChevronRight size={14} />
          <span className="text-white truncate max-w-[200px]">{book.title}</span>
        </nav>

        <Link href="/books" className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/3 border border-white/10 hover:bg-white/10 text-neutral-300 font-medium mb-10 w-fit">
          <ArrowLeft size={18} /> Back to Books List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 relative w-full max-w-md aspect-2/3 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 bg-[#0a0a0a]">
            <Image src={book.coverImage} alt={book.title} fill className="object-cover opacity-90 hover:opacity-100 transition-opacity" />
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="flex gap-3 mb-6">
              <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase text-white">{book.category}</span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase border ${isAvailable ? "bg-white/5 border-white/20 text-neutral-300" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
                {isAvailable ? "Available Now" : book.status}
              </span>
            </div>

            <h1 className="text-5xl font-extrabold mb-4">{book.title}</h1>
            <p className="text-2xl text-neutral-400 mb-10">By <span className="text-white">{book.author}</span></p>

            {/* Librarian Controls */}
            {isOwner && (
              <div className="flex flex-wrap gap-4 mb-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <p className="w-full text-sm font-bold text-emerald-400 mb-2">Librarian Controls (You own this book)</p>
                <Button variant="flat" className="bg-white/10 text-white" startContent={<Edit size={16}/>}>Edit</Button>
                <Button variant="flat" className="bg-white/10 text-white" startContent={<EyeOff size={16}/>}>Unpublish</Button>
                <Button color="danger" variant="flat" className="bg-red-500/20 text-red-400" startContent={<Trash2 size={16}/>}>Delete</Button>
              </div>
            )}

            <div className="mb-12">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Synopsis</h3>
              <p className="text-neutral-300 leading-relaxed text-lg font-light">{book.description}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mt-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center"><Truck /></div>
                  <div>
                    <p className="text-sm text-neutral-400">Delivery Fee</p>
                    <p className="text-3xl font-bold">${book.deliveryFee}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm bg-black/50 px-4 py-2 rounded-full border border-white/5"><Lock size={14}/> Secure</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Checkout Btn */}
                <CheckoutButton book={book} isAvailable={isAvailable} currentUser={currentUser} />
                <Button size="lg" className="h-14 px-8 bg-transparent border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10">Wishlist</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-white/10">
          <h2 className="text-3xl font-extrabold mb-3">Reader Reviews</h2>
          <div className="bg-white/5 border border-white/5 rounded-3xl p-16 text-center mt-12 flex flex-col items-center">
            <Star className="text-neutral-400 mb-4" size={40} />
            <h4 className="text-2xl font-bold mb-3">No reviews yet</h4>
            <p className="text-neutral-400 max-w-lg">Be the first to review this book after receiving delivery.</p>
          </div>
        </div>
      </div>
    </main>
  );
}