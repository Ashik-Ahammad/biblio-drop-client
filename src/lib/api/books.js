import { serverFetch } from "@/lib/core/server";

export const getAllBooks = async (email = "", role = "") => {
  try {
    const data = await serverFetch(`/api/books?email=${email}&role=${role}`, {
      cache: "no-store",
    });
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
};

// Get featured books
export const getFeaturedBooks = async () => {
  try {
    const data = await serverFetch(`/api/books/featured`, {
      cache: "no-store",
    });
    return data.success ? data.data : [];
  } catch (error) {
    return [];
  }
};

// Get book by ID
export const getBookById = async (id) => {
  try {
    const data = await serverFetch(`/api/books/${id}`, {
      cache: "no-store",
    });
    return data;
  } catch (error) {
    return { success: false };
  }
};