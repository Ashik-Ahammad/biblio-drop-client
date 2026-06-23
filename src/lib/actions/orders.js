"use server";
import { serverMutation } from "@/lib/core/server";

export const createOrder = async (data) =>
  await serverMutation("/api/orders", data, "POST");

export const updateOrderStatus = async (id, status) =>
  await serverMutation(`/api/orders/${id}/status`, { status }, "PATCH");
