import { serverFetch } from "../core/server";

export const getAllBooks = async (email = "", role = "", page = 1, limit = 12) => {
  return await serverFetch(`/api/books?email=${email}&role=${role}&page=${page}&limit=${limit}`);
};

export const getFeaturedBooks = async () => {
  const data = await serverFetch("/api/books/featured");
  return data.success ? data.data : [];
};

export const getBookById = async (id) => {
  return await serverFetch(`/api/books/${id}`);
};

export const getLibrarianBooks = async (email) => {
  if (!email) return [];
  const data = await serverFetch(`/api/books/librarian/${email}`);
  return data.success ? data.data : [];
};

export const getPendingBooks = async () => {
  const data = await serverFetch("/api/books/pending");
  return data.success ? data.data : [];
};

export const getAllBooksForAdmin = async (page = 1, limit = 12) => {
  return await serverFetch(`/api/books/admin/all?page=${page}&limit=${limit}`);
};