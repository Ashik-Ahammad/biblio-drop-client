"use client";

import { useState } from "react";
import { Button, Input, Slider, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBook({ currentFilters = {} }) {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [search, setSearch] = useState(currentFilters.search || "");
  const [sort, setSort] = useState(currentFilters.sort || "newest");
  const [category, setCategory] = useState(currentFilters.category || "All");
  const [availability, setAvailability] = useState("All");

  const [priceRange, setPriceRange] = useState([
    currentFilters.minPrice ? Number(currentFilters.minPrice) : 0,
    currentFilters.maxPrice ? Number(currentFilters.maxPrice) : 500
  ]);

  const CATEGORIES = [
    { key: "All", label: "All Categories" },
    { key: "Fiction", label: "Fiction" },
    { key: "Non-Fiction", label: "Non-Fiction" },
    { key: "Sci-Fi", label: "Science Fiction" },
    { key: "Fantasy", label: "Fantasy" },
    { key: "Mystery", label: "Mystery & Thriller" },
    { key: "Romance", label: "Romance" },
    { key: "Horror", label: "Horror" },
    { key: "Biography", label: "Biography & Memoir" },
    { key: "Self-Help", label: "Self-Help" },
    { key: "History", label: "History" },
    { key: "Academic", label: "Academic & Education" },
    { key: "Graphic-Novel", label: "Graphic Novels & Comics" },
  ];

  const applyFilters = (overrides = {}) => {
    const params = new URLSearchParams();

    const finalSearch = overrides.search !== undefined ? overrides.search : search;
    const finalSort = overrides.sort !== undefined ? overrides.sort : sort;
    const finalCategory = overrides.category !== undefined ? overrides.category : category;
    const finalMin = overrides.minPrice !== undefined ? overrides.minPrice : priceRange[0];
    const finalMax = overrides.maxPrice !== undefined ? overrides.maxPrice : priceRange[1];

    if (finalSearch) params.set("search", finalSearch);
    if (finalSort && finalSort !== "newest") params.set("sort", finalSort);
    if (finalCategory && finalCategory !== "All") params.set("category", finalCategory);
    if (finalMin > 0) params.set("minPrice", finalMin);
    if (finalMax < 1000) params.set("maxPrice", finalMax);

    router.push(`/books?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleClearAll = () => {
    setSearch("");
    setSort("newest");
    setCategory("All");
    setPriceRange([0, 500]);
    router.push(`/books`);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1 h-12">
          <Input
            type="search"
            size="lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author..."
            startContent={<Search size={18} className="text-neutral-500 dark:text-neutral-300" />}
            className="w-full h-full"
            classNames={{
              base: "h-12",
              inputWrapper: "!h-12 !min-h-[48px] bg-white dark:bg-[#111] border border-neutral-200 dark:border-white/10 hover:border-emerald-500/50 focus-within:!border-emerald-500 focus-within:!bg-white dark:focus-within:!bg-[#161616] focus-within:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 rounded-xl shadow-none",
              input: "placeholder:text-neutral-500 dark:placeholder:text-neutral-300 text-neutral-900 dark:text-white text-[15px]"
            }}
          />
        </div>

        <div className="flex gap-3 h-12">
          <div className="relative bg-white dark:bg-[#111] border border-neutral-200 dark:border-white/10 rounded-xl h-12 flex items-center px-3 min-w-[160px]">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                applyFilters({ sort: e.target.value });
              }}
              className="w-full bg-transparent outline-none text-sm text-neutral-700 dark:text-neutral-300 appearance-none cursor-pointer"
            >
              <option value="newest" className="dark:bg-[#1a1a1a]">Newest First</option>
              <option value="oldest" className="dark:bg-[#1a1a1a]">Oldest First</option>
              <option value="priceAsc" className="dark:bg-[#1a1a1a]">Price: Low → High</option>
              <option value="priceDesc" className="dark:bg-[#1a1a1a]">Price: High → Low</option>
              <option value="nameAsc" className="dark:bg-[#1a1a1a]">Name: A → Z</option>
              <option value="nameDesc" className="dark:bg-[#1a1a1a]">Name: Z → A</option>
            </select>
          </div>

          <Button
            type="button"
            variant="flat"
            onPress={() => setIsFilterOpen(!isFilterOpen)}
            className={`h-12 px-6 rounded-xl font-medium transition-all duration-300 ${isFilterOpen ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-white dark:bg-[#111] border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300"}`}
          >
            <SlidersHorizontal size={18} className="mr-2" /> Filters
          </Button>

          <Button type="submit" className="hidden md:flex bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Search
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-sm dark:shadow-xl relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-neutral-900 dark:text-white">Filter Options</h3>
                <button type="button" onClick={handleClearAll} className="flex items-center text-sm text-neutral-500 hover:text-red-500 transition-colors">
                  <X size={14} className="mr-1" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Category</label>
                  <div className="border border-neutral-200 dark:border-white/10 rounded-xl h-11 flex items-center px-3 bg-neutral-50 dark:bg-[#1a1a1a]">
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        applyFilters({ category: e.target.value });
                      }}
                      className="w-full bg-transparent outline-none text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.key} value={cat.key} className="dark:bg-[#1a1a1a]">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <Slider
                    className="w-full"
                    value={priceRange}
                    onChange={setPriceRange}
                    onChangeEnd={(value) => applyFilters({ minPrice: value[0], maxPrice: value[1] })}
                    formatOptions={{ currency: "USD", style: "currency" }}
                    maxValue={1000}
                    minValue={0}
                    step={10}
                    classNames={{
                      track: "bg-neutral-200 dark:bg-white/10",
                      filler: "bg-emerald-500",
                      thumb: "bg-white border-2 border-emerald-500 shadow-md"
                    }}
                  >
                    <div className="flex justify-between text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                      <Label>Price Range</Label>
                      <Slider.Output />
                    </div>
                    <Slider.Track>
                      {({ state }) => (
                        <>
                          <Slider.Fill />
                          {state.values.map((_, i) => (
                            <Slider.Thumb key={i} index={i} />
                          ))}
                        </>
                      )}
                    </Slider.Track>
                  </Slider>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Availability</label>
                  <div className="border border-neutral-200 dark:border-white/10 rounded-xl h-11 flex items-center px-3 bg-neutral-50 dark:bg-[#1a1a1a]">
                    <select
                      value={availability}
                      onChange={(e) => {
                        setAvailability(e.target.value);
                        applyFilters({ availability: e.target.value });
                      }}
                      className="w-full bg-transparent outline-none text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer"
                    >
                      <option value="All" className="dark:bg-[#1a1a1a]">All</option>
                      <option value="Available Only" className="dark:bg-[#1a1a1a]">Available Only</option>
                      <option value="Checked Out" className="dark:bg-[#1a1a1a]">Checked Out</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}