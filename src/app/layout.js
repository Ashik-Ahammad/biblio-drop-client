import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalFooter from "@/components/ConditionalFooter";
import ScrollToTop from '@/components/ScrollToTop';

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "BiblioDrop | Online Book Delivery & Library Management System",
  description:
    "Experience seamless book delivery with BiblioDrop. Discover a vast library, order your favorite titles, and track deliveries in real-time. Fast, reliable, and user-friendly book management for every reader.",
    keywords: [
    "online book delivery",
    "book management system",
    "buy books online",
    "library management",
    "track book delivery",
    "BiblioDrop"
  ],
  authors: [{ name: "Ashik Ahammad" }],
  openGraph: {
    title: "BiblioDrop | Your Ultimate Online Book Delivery Platform",
    description: "Discover, order, and track your favorite books with BiblioDrop. Fast, reliable delivery at your doorstep.",
    type: "website",
    siteName: "BiblioDrop",
  },
  twitter: {
    card: "summary_large_image",
    title: "BiblioDrop | Online Book Delivery & Library Management System",
    description: "Discover, order, and track your favorite books with BiblioDrop. Fast, reliable delivery at your doorstep.",
  },
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
          <main className="flex-1">
            <ScrollToTop />
            {children}</main>
          <ConditionalFooter />
          <Toaster position="bottom-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}