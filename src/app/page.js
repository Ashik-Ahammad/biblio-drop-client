import Banner from "@/components/Banner";
import FeaturedBooks from "@/components/FeaturedBooks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { getFeaturedBooks } from "@/lib/api/books";
import PopularCategories from "@/components/PopularCategories";
import TopLibrarians from "@/components/TopLibrarians";

export default async function Home() {

  const books = await getFeaturedBooks();

  return (
    <div>
      <Banner></Banner>
      <FeaturedBooks books={books}></FeaturedBooks>
      <PopularCategories></PopularCategories>
      <TopLibrarians></TopLibrarians>
      <Stats></Stats>
      <Footer></Footer>
    </div>
  );
}