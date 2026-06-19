
export const getUserOrders = async (email) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
    
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