import dynamic from 'next/dynamic';
const StatsClient = dynamic(() => import('./StatsClient'));
import { getPublicStats } from "@/lib/api/stats";
export default async function Stats() {
  
  const stats = await getPublicStats();

  return (
    <StatsClient
      totalBooks={stats.totalBooks}
      activeReaders={stats.totalReaders}
      booksOrdered={stats.totalOrders}
    />
  );
}