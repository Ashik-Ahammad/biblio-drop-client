"use server";
import { serverMutation } from "@/lib/core/server";

export const toggleWishlist = async (email, book) =>
  await serverMutation("/api/wishlist/toggle", { email, book }, "POST");
