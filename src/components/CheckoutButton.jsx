"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { ShoppingBag, Lock, CheckCircle } from "lucide-react";

export default function CheckoutButton({ book, isAvailable, currentUser, hasAlreadyOrdered }) {
  const [isLoading, setIsLoading] = useState(false);

  // Prevent ordering if already ordered
  if (hasAlreadyOrdered) {
    return (
      <Button
        isDisabled
        className="bg-emerald-500/10 text-emerald-500 font-bold px-8 h-14 rounded-2xl flex items-center gap-2 border border-emerald-500/20"
      >
        <CheckCircle size={18} />
        Already Ordered
      </Button>
    );
  }

  // Prevent ordering if book is unavailable Checked Out or Pending
  if (!isAvailable) {
    return (
      <Button
        isDisabled
        className="bg-neutral-800 text-neutral-400 font-bold px-8 h-14 rounded-2xl flex items-center gap-2 border border-white/5"
      >
        <Lock size={18} />
        Currently Unavailable
      </Button>
    );
  }

  const isOwner =
    currentUser?.id === book.librarianId ||
    currentUser?.email === book.librarianEmail;

  const isDisabled = !currentUser || isOwner;

  const handleCheckout = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Redirecting to secure checkout...");

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book._id,
          title: book.title,
          deliveryFee: book.deliveryFee,
          coverImage: book.coverImage,
          user: currentUser,
          author: book.author,
          librarianEmail: book.librarianEmail
        }),
      });

      const data = await res.json();

      if (data.success && data.url) {
        toast.success("Redirecting...", { id: toastId });
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleCheckout}
      isLoading={isLoading}
      isDisabled={isDisabled}
      className={`flex-1 h-14 text-base font-bold rounded-2xl flex items-center gap-2 transition-all duration-300 ${
        !isDisabled
          ? "bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
          : "bg-white/5 text-neutral-500"
      }`}
    >
      {isLoading ? (
        "Processing..."
      ) : !currentUser ? (
        "Login to Order"
      ) : isOwner ? (
        "You Own This Book"
      ) : (
        <>
          <ShoppingBag size={18} /> Request Delivery
        </>
      )}
    </Button>
  );
}