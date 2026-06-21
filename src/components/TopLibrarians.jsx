import React from "react";
import TopLibrariansClient from "./TopLibrariansClient";

export default async function TopLibrarians() {
  let topLibrarians = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [usersRes, ordersRes] = await Promise.all([
      fetch(`${baseUrl}/api/users`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/api/orders`, { next: { revalidate: 60 } })
    ]);

    const usersData = await usersRes.json();
    const ordersData = await ordersRes.json();

    const users = Array.isArray(usersData) ? usersData : (usersData.data || []);
    const orders = ordersData.success ? ordersData.data : [];

    const deliveredOrders = orders.filter(order => order.status === "Delivered");

    const librarianDeliveryCount = {};
    deliveredOrders.forEach(order => {
      const email = order.book?.librarianEmail;
      if (email) {
        librarianDeliveryCount[email] = (librarianDeliveryCount[email] || 0) + 1;
      }
    });


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