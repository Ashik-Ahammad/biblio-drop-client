import dynamic from 'next/dynamic';
const TopLibrariansClient = dynamic(() => import('./TopLibrariansClient'));
import { getTopLibrarians } from "@/lib/api/stats";

export default async function TopLibrarians() {
  let topLibrarians = [];

  try {
    topLibrarians = await getTopLibrarians();
  } catch (error) {
    console.error("Error fetching top librarians:", error);
  }

  return <TopLibrariansClient librarians={topLibrarians} />;
}