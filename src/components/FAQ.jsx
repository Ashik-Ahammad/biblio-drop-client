"use client";

import React from "react";
import { ChevronDown } from "@gravity-ui/icons";
import { Accordion } from "@heroui/react";
import { motion } from "framer-motion";

export default function FAQ() {
  const categories = [
    {
      title: "Delivery & Returns",
      items: [
        {
          title: "How long does delivery take?",
          content: "Swift delivery is our priority. Books are typically delivered to your doorstep within 24 to 48 hours depending on your exact location and the librarian's availability.",
        },
        {
          title: "What is the standard return policy?",
          content: "You can borrow a book for up to 14 days. If you need more time to finish your reading, you can easily request a renewal from your dashboard before the due date.",
        },
      ],
    },
    {
      title: "Fees & Penalties",
      items: [
        {
          title: "Is there any late fee?",
          content: "Yes, to ensure fair access for all readers, a nominal late fee of $1 per day is charged if the book is not returned or renewed by the due date.",
        },
        {
          title: "What happens if a book gets damaged?",
          content: "We understand that normal wear and tear happens. However, for severe damage (torn pages, water damage) or lost books, the borrower will be charged the replacement cost of the book.",
        },
      ],
    },
    {
      title: "General",
      items: [
        {
          title: "Can I cancel my book request?",
          content: "Yes, you can cancel your request anytime before the librarian approves and dispatches the book. Once it is out for delivery, cancellations are not permitted.",
        },
      ],
    },
  ];

  return (
    <div className="flex w-full max-w-4xl mx-auto flex-col gap-8 py-10 px-4 md:px-0 overflow-hidden">
      {/* Title Section Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-2 text-center md:text-left"
      >
        <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mb-6 text-lg text-neutral-600 dark:text-neutral-400">
          Everything you need to know about borrowing, deliveries, and policies.
        </p>
      </motion.div>

      {/* Categories Staggered Animation */}
      <div className="flex flex-col gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">
              {category.title}
            </p>
            <Accordion
              className="w-full bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-xl shadow-sm"
              variant="surface"
            >
              {category.items.map((item, itemIndex) => (
                <Accordion.Item key={itemIndex} className="border-b last:border-b-0 border-neutral-100 dark:border-white/5">
                  <Accordion.Heading>
                    <Accordion.Trigger className="py-4 px-5 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                      <span className="text-base font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {item.title}
                      </span>
                      <Accordion.Indicator>
                        <ChevronDown className="text-neutral-500 dark:text-neutral-400" />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="px-5 pb-5 pt-2 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.content}
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </motion.div>
        ))}
      </div>
    </div>
  );
}