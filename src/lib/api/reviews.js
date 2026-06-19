
import { serverFetch } from "@/lib/core/server";

export const getBookReviews = async (bookId) => {
  try {
    const data = await serverFetch(`/api/reviews/${bookId}`, { cache: "no-store" });
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
};

export const checkReviewEligibility = async (email, bookId) => {
  if (!email) return false;
  try {
    const data = await serverFetch(`/api/reviews/check-eligibility?email=${email}&bookId=${bookId}`, { cache: "no-store" });
    return data.canReview;
  } catch (error) {
    return false;
  }
};

export const getUserReviews = async (email) => {
  if (!email) return [];
  try {
    const data = await serverFetch(`/api/reviews/user/${email}`, {
      cache: "no-store",
    });
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
};
