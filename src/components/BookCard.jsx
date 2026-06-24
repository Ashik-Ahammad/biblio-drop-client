import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";

export default function BookCard({ book }) {
  return (
    <Card className="w-full bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-white/10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_8px_30px_-10px_rgba(16,185,129,0.15)] group flex flex-col h-full isolate">

      <div
        className="relative w-full h-48 sm:h-64 md:h-72 bg-neutral-100 dark:bg-neutral-900 shrink-0 overflow-hidden rounded-t-xl sm:rounded-t-2xl"
        style={{
          transform: "translateZ(0)",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
      >
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-white dark:from-[#0A0A0A] to-transparent pointer-events-none z-10 transition-colors duration-300" />

        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 dark:bg-black/80 backdrop-blur-md px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-neutral-200 dark:border-white/10 z-20 shadow-sm transition-colors">
          {book.category}
        </div>

        {book.status === "unavailable" && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-red-500/95 text-white text-[8px] sm:text-[10px] font-bold px-2 py-1 sm:px-2.5 rounded-md backdrop-blur-md z-20 shadow-sm">
            Checked Out
          </div>
        )}
      </div>

      <div className="flex flex-col grow bg-white dark:bg-[#0A0A0A] relative z-20 -mt-2 transition-colors duration-300">

        <Card.Header className="flex-col items-start px-3.5 pt-2 sm:px-5 sm:pt-3 pb-0 gap-0.5 sm:gap-1 border-none">
          <Card.Title className="text-sm sm:text-lg font-extrabold text-neutral-900 dark:text-white m-0 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors w-full text-left leading-tight">
            {book.title}
          </Card.Title>
          <Card.Description className="text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-xs font-medium m-0 w-full text-left transition-colors line-clamp-1">
            {book.author}
          </Card.Description>
        </Card.Header>

        <div className="grow min-h-[12px] sm:min-h-[16px]" />

        <Card.Footer className="px-3.5 pb-3.5 pt-2 sm:px-5 sm:pb-5 sm:pt-4 flex items-center justify-between border-none w-full">
          <div className="flex items-baseline gap-0.5 transition-colors">
            <span className="text-emerald-600 dark:text-emerald-500 text-xs sm:text-sm font-bold">$</span>
            <span className="text-neutral-900 dark:text-white text-lg sm:text-2xl font-black tracking-tight">{book.deliveryFee}</span>
          </div>

          <Link
            href={`/books/${book._id}`}
            className="group/btn relative flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 h-7 sm:h-10 bg-emerald-50/50 dark:bg-white/5 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg sm:rounded-xl border border-emerald-200 dark:border-white/10 transition-all duration-300 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <span className="tracking-wide text-[10px] sm:text-xs transition-transform duration-300 group-hover/btn:-translate-x-1">
              Details
            </span>
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 group-hover/btn:w-0 group-hover/btn:opacity-0" />
          </Link>
        </Card.Footer>
      </div>

    </Card>
  );
}