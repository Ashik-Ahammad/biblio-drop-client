"use server";
import { serverMutation, serverFetch } from "@/lib/core/server";

export const deleteBook = async (id) =>
  await serverMutation(`/api/books/${id}`, null, "DELETE");

export const toggleBookStatus = async (id, currentStatus) =>
  await serverMutation(
    `/api/books/${id}/unpublish`,
    { currentStatus },
    "PATCH",
  );
export const updateBook = async (id, data) =>
  await serverMutation(`/api/books/${id}`, data, "PATCH");

export const addBook = async (data) =>
  await serverMutation("/api/books", data, "POST");

export const approveBookRequest = async (id) =>
  await serverMutation(`/api/books/${id}/approve`, {}, "PATCH");

export const fetchAdminBooksAction = async (page = 1, limit = 12) => {
  return await serverFetch(`/api/books/admin/all?page=${page}&limit=${limit}`);
};