import AdminDashboardClient from "./AdminDashboardClient";
import { getAllUsers } from "@/lib/api/users";
import { getAllBooksForAdmin } from "@/lib/api/books";
import { getAllOrders } from "@/lib/api/orders";

export const metadata = {
  title: "Admin Dashboard | BiblioDrop",
};

export default async function AdminPage() {
  let stats = { totalUsers: 0, totalBooks: 0, totalDeliveries: 0, totalRevenue: 0 };
  let monthlyData = [];
  let categoryData = [];

  try {

    const [usersData, booksResponse, ordersData] = await Promise.all([
      getAllUsers(),
      getAllBooksForAdmin(1, 1000),
      getAllOrders(),
    ]);

    
    const users = Array.isArray(usersData) ? usersData : usersData?.data || [];
    const books = booksResponse?.success ? booksResponse.data : Array.isArray(booksResponse) ? booksResponse : [];
    const orders = Array.isArray(ordersData) ? ordersData : ordersData?.data || [];

    // Calculate Stats
    stats.totalUsers = users.length || 0;
    stats.totalBooks = booksResponse?.pagination?.totalItems || books.length || 0;
    stats.totalDeliveries = orders.filter((o) => o.status === "Delivered").length;
    stats.totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.book?.deliveryFee || 0),
      0
    );

    // Calculate Category Data
    const categoryCount = {};
    books.forEach((book) => {
      const cat = book.category || "Uncategorized";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    categoryData = Object.keys(categoryCount).map((key) => ({
      name: key,
      value: categoryCount[key],
    }));

    // Calculate Monthly Revenue & Orders
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap = {};

    months.forEach((m) => (monthlyMap[m] = { month: m, revenue: 0, orders: 0 }));

    orders.forEach((order) => {
      const date = new Date(order.orderedAt);
      if (!isNaN(date)) {
        const monthName = months[date.getMonth()];
        monthlyMap[monthName].orders += 1;
        monthlyMap[monthName].revenue += Number(order.book?.deliveryFee || 0);
      }
    });

    monthlyData = Object.values(monthlyMap);
  } catch (error) {
    console.error("Dashboard real data fetch error:", error);
  }

  return (
    <AdminDashboardClient
      stats={stats}
      monthlyData={monthlyData}
      categoryData={categoryData}
    />
  );
}