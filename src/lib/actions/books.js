"use server";

import { serverMutation } from "../core/server";

export const addBook = async (bookData) => {
  return serverMutation("/api/books", bookData, "POST");
};

export const deleteBook = async (bookId) => {
  return serverMutation(`/api/books/${bookId}`, null, "DELETE");
};