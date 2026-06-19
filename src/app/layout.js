import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ConditionalNavbar from "@/components/ConditionalNavbar";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Biblio Drop",
  description:
    "Fast, reliable, and seamless online book delivery and management system. Discover, order, and track your favorite books effortlessly with BiblioDrop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ConditionalNavbar></ConditionalNavbar>
        <main className="flex-1">{children}</main>

        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
