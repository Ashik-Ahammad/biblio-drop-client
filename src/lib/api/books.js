import { serverFetch } from "../core/server";

export const getAllBooks = async ({
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  sort = "",
  availability = "",
  email = "",
  role = "",
  page = 1,
  limit = 12,
}) => {
  const timestamp = Date.now();
  const query = new URLSearchParams({
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    availability,
    email,
    role,
    page,
    limit,
    t: timestamp,
  }).toString();
  return await serverFetch(`/api/books?${query}`);
};

// Fetch featured books for the home page
export const getFeaturedBooks = async () => {
  const data = await serverFetch("/api/books/featured");
  return data.success ? data.data : [];
};

// Fetch a single book by its ID
export const getBookById = async (id) => {
  return await serverFetch(`/api/books/${id}`);
};

// Fetch books owned by a specific librarian
export const getLibrarianBooks = async (email) => {
  if (!email) return [];
  const data = await serverFetch(`/api/books/librarian/${email}`);
  return data.success ? data.data : [];
};

// Fetch books that are pending admin approval
export const getPendingBooks = async () => {
  const data = await serverFetch("/api/books/pending");
  return data.success ? data.data : [];
};

// Fetch all books for the admin dashboard management table
export const getAllBooksForAdmin = async (page = 1, limit = 12) => {
  return await serverFetch(`/api/books/admin/all?page=${page}&limit=${limit}`);
};
