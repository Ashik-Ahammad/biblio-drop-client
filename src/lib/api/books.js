"use server";

import { serverFetch } from "../core/server";

export const getAllBooks = async () => {
  return serverFetch("/api/books");
};

export const getBookById = async (bookId) => {
  return serverFetch(`/api/books/${bookId}`);
};

export const getFeaturedBooks = async () => {
  return serverFetch("/api/books/featured");
};