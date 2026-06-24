import { getAllBooks } from "@/lib/api/books";
import PopularCategoriesClient from "./PopularCategoriesClient";

export default async function PopularCategories() {
  let books = [];

  try {
    const res = await getAllBooks({ limit: 1000 });
    if (res && res.data && Array.isArray(res.data)) {
      books = res.data;
    }
  } catch (error) {
    books = [];
  }

  return <PopularCategoriesClient books={books} />;
}