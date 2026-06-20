export const getUserOrders = async (email) => {
  if (!email) return [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(`${baseUrl}/api/orders/user/${email}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Fetch User Orders Error:", error);
    return [];
  }
};

export const getLibrarianOrders = async (email) => {
  if (!email) return [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(`${baseUrl}/api/orders/librarian/${email}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return [];
  }
};

// Check if user has already ordered the book
export const checkDuplicateOrder = async (email, bookId) => {
  if (!email || !bookId) return false;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(`${baseUrl}/api/orders/check-duplicate?email=${email}&bookId=${bookId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.hasOrdered;
  } catch (error) {
    console.error("Duplicate order check failed:", error);
    return false;
  }
};

