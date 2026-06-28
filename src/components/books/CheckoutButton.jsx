"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { ShoppingBag, Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutButton({
  book,
  isAvailable,
  currentUser,
  hasAlreadyOrdered,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (hasAlreadyOrdered) {
    return (
      <Button
        isDisabled
        className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-bold px-8 h-14 rounded-2xl flex items-center gap-2 border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-300"
      >
        <CheckCircle size={18} />
        Already Ordered
      </Button>
    );
  }

  if (!isAvailable) {
    return (
      <Button
        isDisabled
        className="bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-bold px-8 h-14 rounded-2xl flex items-center gap-2 border border-neutral-300 dark:border-white/5 transition-colors duration-300"
      >
        <Lock size={18} />
        Currently Unavailable
      </Button>
    );
  }

  const isOwner =
    currentUser?.id === book.librarianId ||
    currentUser?.email === book.librarianEmail;

  const isDisabled = isOwner;

  const handleCheckout = async () => {
    if (!currentUser) {
      router.push("/signin");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Redirecting to secure checkout...");

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book._id, 
          user: currentUser,
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
      className={`flex-1 h-14 text-base font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ${
        !isDisabled
          ? "bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
          : "bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-neutral-500"
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
