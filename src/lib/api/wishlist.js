import { serverFetch } from "../core/server";

export const checkWishlistStatus = async (email, bookId) => {
  if (!email || !bookId) return false;
  const data = await serverFetch(
    `/api/wishlist/check?email=${email}&bookId=${bookId}`,
  );
  return data.inWishlist;
};

export const getUserWishlist = async (email) => {
  if (!email) return [];
  const data = await serverFetch(`/api/wishlist/${email}`);
  return data.success ? data.data : [];
};
