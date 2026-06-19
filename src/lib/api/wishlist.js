import { serverFetch } from "@/lib/core/server";

// Check if a book is in the user's wishlist
export const checkWishlistStatus = async (email, bookId) => {
  if (!email) return false;
  try {
    const data = await serverFetch(`/api/wishlist/check?email=${email}&bookId=${bookId}`, {
      cache: "no-store"
    });
    return data.inWishlist;
  } catch (error) {
    return false;
  }
};

// Get wishlist for the user
export const getUserWishlist = async (email) => {
  if (!email) return [];
  try {
    const data = await serverFetch(`/api/wishlist/${email}`, {
      cache: "no-store"
    });
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
};