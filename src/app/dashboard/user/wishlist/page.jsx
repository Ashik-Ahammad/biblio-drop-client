import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getUserWishlist } from "@/lib/api/wishlist";
import { Table, Button } from "@heroui/react";
import { Heart, HeartCrack } from "lucide-react";
import WishlistButton from "@/components/books/WishlistButton";
import { FaBook } from "react-icons/fa";

export const metadata = {
  title: "My Wishlist | BiblioDrop",
};

export default async function WishlistPage() {
  const currentUser = await getUserSession();

  if (!currentUser || currentUser.role !== "user") {
    redirect("/dashboard");
  }

  const wishlistItems = await getUserWishlist(currentUser.email);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#000000] text-white font-sans w-full">

      <div className="mb-10 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <Heart className="text-rose-500 fill-rose-500/20" size={28} strokeWidth={2.5} />
          My Wishlist
        </h1>
        <p className="text-neutral-400 mt-2 text-sm md:text-base">
          Books you have saved for later. Checkout whenever you are ready!
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white/2 border border-white/5 rounded-3xl p-16 text-center flex flex-col items-center justify-center backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50%] left-[50%] translate-x-[-50%] w-75 h-75 bg-rose-900/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 relative z-10">
            <HeartCrack className="text-neutral-500" size={36} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white relative z-10">Your wishlist is empty</h3>
          <p className="text-neutral-400 max-w-md font-light leading-relaxed relative z-10 mb-6">
            You have not added any books to your wishlist yet. Explore our library and find something exciting to read.
          </p>
          <Link href="/books">
            <Button className="bg-emerald-600 text-white font-bold h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Browse Books
            </Button>
          </Link>
        </div>
      ) : (
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden">

          <div className="absolute top-0 right-0 w-75 h-75 bg-rose-900/10 blur-[100px] rounded-full pointer-events-none" />

          <Table variant="secondary" className="dark relative z-10 w-full" aria-label="User Wishlist">
            <Table.ScrollContainer>
              <Table.Content className="min-w-200">
                <Table.Header className="bg-white/5 border-b border-white/10">
                  <Table.Column isRowHeader className="text-neutral-400 font-bold uppercase text-xs">Book</Table.Column>
                  <Table.Column className="text-neutral-400 font-bold uppercase text-xs">Author</Table.Column>
                  <Table.Column className="text-neutral-400 font-bold uppercase text-xs">Added On</Table.Column>
                  <Table.Column className="text-neutral-400 font-bold uppercase text-xs">Fee</Table.Column>
                  <Table.Column className="text-neutral-400 font-bold uppercase text-xs text-right">Actions</Table.Column>
                </Table.Header>

                <Table.Body className="divide-y divide-white/5">
                  {wishlistItems.map((item) => {
                    const addedDate = new Date(item.addedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    });

                    return (
                      <Table.Row key={item._id} className="hover:bg-white/2 transition-colors">

                        <Table.Cell>
                          <div className="flex items-center gap-4 py-2">
                            <div className="relative w-12 h-16 rounded overflow-hidden border border-white/10 bg-neutral-900 shadow-md">
                              <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                            </div>
                            <Link href={`/books/${item.bookId}`} className="font-bold text-white text-base hover:text-emerald-400 transition-colors line-clamp-2">
                              {item.title}
                            </Link>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-neutral-300 font-medium">
                            {item.author}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-neutral-400">
                            {addedDate}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="font-bold text-emerald-400 text-lg">
                            ${item.deliveryFee}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex items-center justify-end gap-3">
                            <Link href={`/books/${item.bookId}`}>
                              <Button size="sm" variant="flat" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold">
                                <FaBook  size={14} className="mr-1" /> View
                              </Button>
                            </Link>

                            <WishlistButton
                              book={{ _id: item.bookId }}
                              initialStatus={true}
                              currentUser={currentUser}
                            />
                          </div>
                        </Table.Cell>

                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}