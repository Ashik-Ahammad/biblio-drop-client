import { serverFetch } from "../core/server";

export const getAllOrders = async () => {
  const res = await serverFetch("/api/orders");
  return res.success ? res.data : [];
};

export const getUserOrders = async (email) => {
  if (!email) return [];
  const res = await serverFetch(`/api/orders/user/${email}`);
  return res.success ? res.data : [];
};

export const getLibrarianOrders = async (email) => {
  if (!email) return [];
  const res = await serverFetch(`/api/orders/librarian/${email}`);
  return res.success ? res.data : [];
};

export const checkDuplicateOrder = async (email, bookId) => {
  if (!email || !bookId) return false;
  const res = await serverFetch(`/api/orders/check-duplicate?email=${email}&bookId=${bookId}`);
  return res.hasOrdered;
};