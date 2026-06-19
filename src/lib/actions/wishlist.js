"use server"

import { serverMutation } from "@/lib/core/server";

// Toggle wishlist status
export const toggleWishlist = async (email, book) => {
  try {
    const data = await serverMutation("/api/wishlist/toggle", { email, book });
    return data;
  } catch (error) {
    return { success: false, message: "Failed to update wishlist" };
  }
};