import Banner from "@/components/Banner";
import FeaturedBooks from "@/components/FeaturedBooks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { getFeaturedBooks } from "@/lib/api/books";

export default async function Home() {
  
  const books = await getFeaturedBooks();

  return (
    <div>
      <Banner></Banner>
      <FeaturedBooks books={books}></FeaturedBooks>
      <Stats></Stats>
      <Footer></Footer>
    </div>
  );
}