"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";

export default function CheckoutButton({ book, isAvailable, currentUser }) {
  const [isLoading, setIsLoading] = useState(false);

  const isOwner =
    currentUser?.id === book.librarianId ||
    currentUser?.email === book.librarianEmail;

  const isDisabled = !currentUser || !isAvailable || isOwner;

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
      className={`flex-1 h-14 text-base font-bold rounded-2xl transition-all ${
        !isDisabled
          ? "bg-white text-black hover:scale-[1.02]"
          : "bg-white/5 text-neutral-500"
      }`}
    >
      {isLoading
        ? "Processing..."
        : !currentUser
          ? "Login to Request"
          : isOwner
            ? "You Own This Book"
            : !isAvailable
              ? "Currently Unavailable"
              : "Request Delivery"}
    </Button>
  );
}
