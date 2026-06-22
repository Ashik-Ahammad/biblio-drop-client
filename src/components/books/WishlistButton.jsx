"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toggleWishlist } from "@/lib/actions/wishlist";

export default function WishlistButton({ book, initialStatus, currentUser }) {
  const [isWishlisted, setIsWishlisted] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const res = await toggleWishlist(currentUser.email, book);

      if (res.success) {
        setIsWishlisted(res.action === "added");
        toast.success(res.message);
        router.refresh();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      isLoading={isLoading}
      onPress={handleToggle}
      className={`h-14 px-8 font-bold rounded-2xl transition-all border duration-300 ${
        isWishlisted
          ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-500/20"
          : "bg-transparent text-neutral-800 dark:text-white border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10"
      }`}
      startContent={!isLoading && (
        <Heart
          size={20}
          className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-neutral-600 dark:text-white transition-colors duration-300"}
        />
      )}
    >
      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
    </Button>
  );
}