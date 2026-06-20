"use server"
import { serverMutation } from "@/lib/core/server";

export const updateOrderStatus = async (orderId, status) => {
  try {
    const data = await serverMutation(`/api/orders/${orderId}/status`, { status }, "PATCH");
    return data;
  } catch (error) {
    return { success: false, message: "Failed to update status" };
  }
};