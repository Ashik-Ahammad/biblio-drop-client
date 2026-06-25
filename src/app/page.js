import Banner from "@/components/Banner";
import FeaturedBooks from "@/components/FeaturedBooks";
import Stats from "@/components/Stats";
import { getFeaturedBooks } from "@/lib/api/books";
import PopularCategories from "@/components/PopularCategories";
import TopLibrarians from "@/components/TopLibrarians";
import FAQ from "@/components/FAQ";
import LibrarianCTA from "@/components/LibrarianCTA";

export default async function Home() {

  const books = await getFeaturedBooks();

  return (
    <div>
      <Banner></Banner>
      <FeaturedBooks books={books}></FeaturedBooks>
      <PopularCategories></PopularCategories>
      <TopLibrarians></TopLibrarians>
      <Stats></Stats>
      <FAQ></FAQ>
      <LibrarianCTA></LibrarianCTA>
    </div>
  );
}