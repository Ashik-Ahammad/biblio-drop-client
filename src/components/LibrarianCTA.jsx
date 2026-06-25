"use client";

import React from "react";
import { Card, Link } from "@heroui/react";
import { Library } from "lucide-react";
import { motion } from "framer-motion";

export default function LibrarianCTA() {
  return (
    <div className="w-full flex justify-center py-10 px-4 md:px-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <Card
          className="w-full border-none shadow-xl bg-linear-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-[#050505] relative overflow-hidden"
        >
          {/* Decorative Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex gap-5 items-start">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl shrink-0">
                <Library className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
              </div>
              <div className="flex flex-col gap-2">
                <Card.Header className="p-0">
                  <Card.Title className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white">
                    Have a shelf full of books?
                  </Card.Title>
                </Card.Header>
                <Card.Description className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-lg">
                  Become a Librarian on BiblioDrop today. Share your collection with the community, meet fellow readers, and earn while you lend.
                </Card.Description>
              </div>
            </div>

            <Card.Footer className="p-0 shrink-0">
              <Link
                href="/choose-role"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                Start Sharing
                <Link.Icon aria-hidden="true" className="w-4 h-4" />
              </Link>
            </Card.Footer>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}