import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";

export default function BookCard({ book }) {
  return (
    <Card className="w-full bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_8px_30px_-10px_rgba(16,185,129,0.15)] group flex flex-col h-full isolate">

      <div
        className="relative w-full h-55 bg-neutral-200 dark:bg-neutral-900 shrink-0 overflow-hidden rounded-t-2xl"
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
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white dark:from-[#0A0A0A] to-transparent pointer-events-none z-10 transition-colors duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border border-neutral-200 dark:border-white/10 z-20 shadow-sm dark:shadow-none transition-colors">
          {book.category}
        </div>

        {book.status === "unavailable" && (
          <div className="absolute top-3 right-3 bg-red-500/90 text-white text-[9px] font-bold px-3 py-1 rounded-full backdrop-blur-sm z-20 shadow-sm">
            Checked Out
          </div>
        )}
      </div>

      <div className="flex flex-col grow bg-white dark:bg-[#0A0A0A] relative z-20 -mt-px transition-colors duration-300">

        <Card.Header className="flex-col items-start px-5 pt-4 pb-0 gap-0.5 border-none">
          <Card.Title className="text-lg font-bold text-neutral-900 dark:text-white m-0 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors w-full text-left">
            {book.title}
          </Card.Title>
          <Card.Description className="text-neutral-500 dark:text-neutral-400 text-xs font-medium m-0 w-full text-left transition-colors">
            {book.author}
          </Card.Description>
        </Card.Header>

        <div className="grow" />

        <Card.Footer className="px-5 pb-5 pt-4 flex items-center justify-between border-none">
          <div className="flex items-center gap-0.5 font-bold transition-colors">
            <span className="text-emerald-600 dark:text-emerald-500 text-sm">$</span>
            <span className="text-neutral-900 dark:text-white text-xl">{book.deliveryFee}</span>
          </div>
          <Link
            href={`/books/${book._id}`}
            className="group/btn relative flex items-center justify-center gap-2 px-4 h-9 bg-transparent text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl border border-neutral-300 dark:border-white/10 transition-all duration-300 hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-transparent hover:shadow-sm dark:hover:shadow-[inset_0_0_15px_rgba(16,185,129,0.1),0_0_15px_rgba(16,185,129,0.2)]"
          >
            <span className="tracking-wide text-xs transition-transform duration-300 group-hover/btn:-translate-x-1">
              Details
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-all duration-300 group-hover/btn:w-3 group-hover/btn:bg-emerald-500 dark:group-hover/btn:bg-emerald-400" />
          </Link>
        </Card.Footer>
      </div>

    </Card>
  );
}
