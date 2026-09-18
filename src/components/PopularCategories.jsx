import { getPopularCategories } from "@/lib/api/stats";
import dynamic from 'next/dynamic';

const PopularCategoriesClient = dynamic(() => import('./PopularCategoriesClient'));

export default async function PopularCategories() {
  let categoryCounts = {};

  try {
    categoryCounts = await getPopularCategories();
  } catch (error) {
    console.error("Error fetching popular categories:", error);
  }

  return <PopularCategoriesClient categoryCounts={categoryCounts} />;
}