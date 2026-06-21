import AdminDashboardClient from "./AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard | BiblioDrop",
};

export default async function AdminPage() {

  let stats = { totalUsers: 0, totalBooks: 0, totalDeliveries: 0, totalRevenue: 0 };
  let monthlyData = [];
  let categoryData = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [usersRes, booksRes, ordersRes] = await Promise.all([
      fetch(`${baseUrl}/api/users`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/books?role=admin`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/orders`, { cache: "no-store" })
    ]);

    const users = await usersRes.json();
    const booksData = await booksRes.json();
    const ordersData = await ordersRes.json();

    const books = booksData.success ? booksData.data : [];
    const orders = ordersData.success ? ordersData.data : [];

    stats.totalUsers = users.length || 0;
    stats.totalBooks = books.length || 0;
    stats.totalDeliveries = orders.filter(o => o.status === "Delivered").length;
    stats.totalRevenue = orders.reduce((sum, order) => sum + Number(order.book?.deliveryFee || 0), 0);

    const categoryCount = {};
    books.forEach(book => {
      const cat = book.category || "Uncategorized";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    categoryData = Object.keys(categoryCount).map(key => ({
      name: key,
      value: categoryCount[key]
    }));


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap = {};

    months.forEach(m => monthlyMap[m] = { month: m, revenue: 0, orders: 0 });

    orders.forEach(order => {
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