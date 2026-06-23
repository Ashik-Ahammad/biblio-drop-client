import { serverFetch } from "../core/server";

export const getBookReviews = async (bookId) => {
  const data = await serverFetch(`/api/reviews/${bookId}`);
  return data.success ? data.data : [];
};

export const checkReviewEligibility = async (email, bookId) => {
  if (!email) return false;

  try {
    const data = await serverFetch(
      `/api/reviews/check-eligibility?email=${email}&bookId=${bookId}`,
    );

    return data?.canReview === true;
  } catch (error) {
    console.error("Eligibility check failed:", error);
    return false; 
  }
};

export const getUserReviews = async (email) => {
  if (!email) return [];
  const data = await serverFetch(`/api/reviews/user/${email}`);
  return data.success ? data.data : [];
};
