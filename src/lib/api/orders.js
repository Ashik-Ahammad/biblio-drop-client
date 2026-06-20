export const getUserOrders = async (email) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(`${baseUrl}/api/orders/user/${email}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching user orders:", error);
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