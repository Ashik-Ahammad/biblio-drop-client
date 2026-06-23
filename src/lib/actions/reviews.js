"use server";
import { serverMutation } from "@/lib/core/server";

export const submitReview = async (data) =>
  await serverMutation(`/api/reviews`, data, "POST");

export const updateReview = async (id, data) =>
  await serverMutation(`/api/reviews/${id}`, data, "PATCH");

export const deleteReview = async (id) =>
  await serverMutation(`/api/reviews/${id}`, null, "DELETE");

