export const revalidate = 3600;
import { Suspense } from "react";
import Banner from "@/components/Banner";
import FeaturedBooks from "@/components/FeaturedBooks";
import Stats from "@/components/Stats";
import { getFeaturedBooks } from "@/lib/api/books";
import PopularCategories from "@/components/PopularCategories";
import TopLibrarians from "@/components/TopLibrarians";
import nextDynamic from 'next/dynamic';

const FAQ = nextDynamic(() => import('@/components/FAQ'));
const LibrarianCTA = nextDynamic(() => import('@/components/LibrarianCTA'));

export default async function Home() {

  const books = await getFeaturedBooks();

  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Featured Books...</div>}>
        <FeaturedBooks books={books}></FeaturedBooks>
      </Suspense>
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Categories...</div>}>
        <PopularCategories></PopularCategories>
      </Suspense>
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading Top Librarians...</div>}>
        <TopLibrarians></TopLibrarians>
      </Suspense>
      <Suspense fallback={<div className="h-48 flex items-center justify-center">Loading Stats...</div>}>
        <Stats></Stats>
      </Suspense>
      <FAQ></FAQ>
      <LibrarianCTA></LibrarianCTA>
    </div>
  );
}