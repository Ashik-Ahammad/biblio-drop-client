
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getAllBooks = async (email = "", role = "") => {
  try {
    const res = await fetch(`${BASE_URL}/api/books?email=${email}&role=${role}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Fetch All Books Error:", error);
    return [];
  }
};

export const getFeaturedBooks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/books/featured`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Fetch Featured Books Error:", error);
    return [];
  }
};

export const getBookById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/books/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Fetch Book By ID (${id}) Error:`, error);
    return { success: false };
  }
};

export const getLibrarianBooks = async (email) => {
  if (!email) return [];
  try {
    const res = await fetch(`${BASE_URL}/api/books/librarian/${email}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Fetch Librarian Books Error:", error);
    return [];
  }
};

// Fetch pending books for Admin approval
export const getPendingBooks = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(`${baseUrl}/api/books/pending`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Fetch Pending Books Error:", error);
    return [];
  }
};