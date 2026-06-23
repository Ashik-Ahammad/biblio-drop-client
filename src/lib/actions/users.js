"use server";
import { serverMutation } from "@/lib/core/server";

export const updateUserRole = async (userId, role) =>
  await serverMutation("/api/users/role", { userId, role }, "PATCH");

export const deleteUser = async (userId) =>
  await serverMutation(`/api/users/${userId}`, null, "DELETE");
