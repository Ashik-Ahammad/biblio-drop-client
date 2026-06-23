import React from "react";
import TopLibrariansClient from "./TopLibrariansClient";
import { getAllUsers } from "@/lib/api/users";
import { getAllOrders } from "@/lib/api/orders";

export default async function TopLibrarians() {
  let topLibrarians = [];

  try {

    const [usersData, ordersData] = await Promise.all([
      getAllUsers(),
      getAllOrders()
    ]);

    const users = Array.isArray(usersData) ? usersData : (usersData?.data || []);
    const orders = Array.isArray(ordersData) ? ordersData : [];

    // Filter only delivered orders
    const deliveredOrders = orders.filter(order => order.status === "Delivered");

    // Count deliveries per librarian email
    const librarianDeliveryCount = {};
    deliveredOrders.forEach(order => {
      const email = order.book?.librarianEmail;
      if (email) {
        librarianDeliveryCount[email] = (librarianDeliveryCount[email] || 0) + 1;
      }
    });

    // Sort by most deliveries and get top 3
    const sortedEmails = Object.keys(librarianDeliveryCount)
      .sort((a, b) => librarianDeliveryCount[b] - librarianDeliveryCount[a])
      .slice(0, 3);

    topLibrarians = sortedEmails.map(email => {
      const user = users.find(u => u.email === email) || {};

      return {
        name: user.name || email.split("@")[0],
        avatar: user.image || `https://ui-avatars.com/api/?name=${email}&background=10b981&color=fff`,
        deliveries: librarianDeliveryCount[email]
      };
    });

  } catch (error) {
    console.error("Error fetching top librarians:", error);
  }

  return <TopLibrariansClient librarians={topLibrarians} />;
}