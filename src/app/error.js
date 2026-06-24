"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react"; 

export default function Error({ error, reset }) {
  useEffect(() => {

    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 dark:bg-[#050505] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl text-center"
      >

        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <AlertTriangle className="text-red-600 dark:text-red-400" size={40} />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mb-3">
          Something went wrong!
        </h2>

        <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm sm:text-base leading-relaxed">
          We apologize for the inconvenience. Our team has been notified.
          You can try refreshing the page or head back home.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-6 rounded-xl transition-all"
            startContent={<RefreshCcw size={18} />}
          >
            Try again
          </Button>

          <Link href="/">
            <Button
              variant="bordered"
              className="border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-white font-bold h-12 px-6 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/10"
              startContent={<Home size={18} />}
            >
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}