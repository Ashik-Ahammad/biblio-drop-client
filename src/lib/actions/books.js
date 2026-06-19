"use server"

import { serverMutation } from "@/lib/core/server";

//  Delete Book
export const deleteBook = async (bookId) => {
  try {
    const data = await serverMutation(`/api/books/${bookId}`, null, "DELETE");
    return data;
  } catch (error) {
    return { success: false, message: "Failed to delete book" };
  }
};

// Unpublish / Publish Toggle
export const toggleBookStatus = async (bookId, currentStatus) => {
  try {
    const data = await serverMutation(`/api/books/${bookId}/unpublish`, { currentStatus }, "PATCH");
    return data;
  } catch (error) {
    return { success: false, message: "Failed to toggle status" };
  }
};

//  Update Book
export const updateBook = async (bookId, bookData) => {
  try {
    const data = await serverMutation(`/api/books/${bookId}`, bookData, "PATCH");
    return data;
  } catch (error) {
    return { success: false, message: "Failed to update book" };
  }
};

// Add Book
export const addBook = async (bookData) => {
  try {
    const data = await serverMutation("/api/books", bookData, "POST");
    return data;
  } catch (error) {
    return { success: false, message: "Failed to add book" };
  }
};