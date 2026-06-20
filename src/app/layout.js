import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Biblio Drop",
  description:
    "Fast, reliable, and seamless online book delivery and management system. Discover, order, and track your favorite books effortlessly with BiblioDrop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>

      <body className={`${outfit.className} min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalNavbar></ConditionalNavbar>
          <main className="flex-1">{children}</main>
          <Toaster position="bottom-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}