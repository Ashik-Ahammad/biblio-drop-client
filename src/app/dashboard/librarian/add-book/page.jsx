"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Form, Input, TextArea, Button, Select, ListBox } from "@heroui/react";
import { BookPlus, ImagePlus, UploadCloud, ChevronDown } from "lucide-react";
import { imageUpload } from "@/lib/actions/imgUpload";
import { addBook } from "@/lib/actions/books";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function AddBookPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const categories = [
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // Form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formElement = e.currentTarget;
    const toastId = toast.loading("Uploading book details...");

    try {

      if (!currentUser) {
        throw new Error("You must be logged in as a librarian to add books.");
      }

      const formData = new FormData(formElement);
      const data = Object.fromEntries(formData.entries());

      const imageFile = formData.get("coverImage");

      // Upload image
      let imageUrl = "";
      if (imageFile && imageFile.size > 0) {
        imageUrl = await imageUpload(imageFile);
      }

      if (!imageUrl) throw new Error("Please upload a valid cover image.");

      // Final data
      const bookData = {
        title: data.title,
        author: data.author,
        category: data.category,
        deliveryFee: Number(data.deliveryFee),
        description: data.description,
        coverImage: imageUrl,
        status: "Pending Approval",
        addedAt: new Date().toISOString(),

        librarianId: currentUser.id,
        librarianEmail: currentUser.email,
      };

      //
      const res = await addBook(bookData);

      if (res.success) {
        toast.success("Book submitted for approval successfully!", { id: toastId });
        formElement.reset();
        setImagePreview(null);
      } else {
        throw new Error(res.message || "Failed to add book.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 lg:p-8">

      <div className="mb-10 text-center lg:text-left relative z-10">
        <h1 className="text-3xl md:text-4xl font-black text-white flex items-center justify-center lg:justify-start gap-4 tracking-tight drop-shadow-md">
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <BookPlus className="text-emerald-400" size={32} strokeWidth={2.5} />
          </div>
          Add New Book
        </h1>
        <p className="text-neutral-400 mt-4 text-sm md:text-base max-w-2xl">
          List your inventory for readers. Provide accurate details and a clear cover image. All submissions are reviewed by an admin before publishing.
        </p>
      </div>

      <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

        <Form className="relative z-10 flex flex-col gap-10 w-full" onSubmit={onSubmit}>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 w-full">

            <div className="xl:col-span-7 flex flex-col gap-7 w-full">

              <div className="flex flex-col gap-2">
                <label className="text-neutral-300 font-semibold text-sm">
                  Book Title <span className="text-emerald-500">*</span>
                </label>
                <Input
                  isRequired
                  name="title"
                  aria-label="Book Title"
                  placeholder="e.g. The Great Gatsby"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "!bg-[#121212] border-white/10 hover:border-emerald-500/50 focus-within:!border-emerald-500 h-14 rounded-xl shadow-inner transition-colors",
                    input: "text-white font-medium placeholder:text-neutral-600",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-neutral-300 font-semibold text-sm">
                  Author Name <span className="text-emerald-500">*</span>
                </label>
                <Input
                  isRequired
                  name="author"
                  aria-label="Author Name"
                  placeholder="e.g. F. Scott Fitzgerald"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "!bg-[#121212] border-white/10 hover:border-emerald-500/50 focus-within:!border-emerald-500 h-14 rounded-xl shadow-inner transition-colors",
                    input: "text-white font-medium placeholder:text-neutral-600",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 w-full items-start">

                <div className="flex flex-col gap-2">
                  <label className="text-neutral-300 font-semibold text-sm">
                    Category <span className="text-emerald-500">*</span>
                  </label>
                  <Select isRequired name="category" aria-label="Category" placeholder="Select a category" className="w-full">
                    <Select.Trigger className="bg-[#121212] border border-white/10 hover:border-emerald-500/50 focus:border-emerald-500 h-14 rounded-xl px-4 text-white shadow-inner transition-colors flex justify-between items-center w-full">
                      <Select.Value className="font-medium text-neutral-300" />
                      <ChevronDown size={18} className="text-neutral-500" />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#121212] border border-white/10 rounded-xl shadow-2xl p-1 backdrop-blur-xl">
                      <ListBox className="max-h-60 overflow-y-auto scrollbar-hide">
                        {categories.map((cat) => (
                          <ListBox.Item
                            key={cat.key}
                            id={cat.label}
                            textValue={cat.label}
                            className="hover:bg-emerald-500/20 text-neutral-300 py-3 px-4 rounded-lg transition-colors cursor-pointer font-medium"
                          >
                            {cat.label}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-neutral-300 font-semibold text-sm">
                    Delivery Fee ($) <span className="text-emerald-500">*</span>
                  </label>
                  <Input
                    isRequired
                    name="deliveryFee"
                    aria-label="Delivery Fee"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    variant="bordered"
                    startContent={<span className="text-emerald-500 font-bold mr-1">$</span>}
                    classNames={{
                      inputWrapper: "!bg-[#121212] border-white/10 hover:border-emerald-500/50 focus-within:!border-emerald-500 h-14 rounded-xl shadow-inner transition-colors",
                      input: "text-white font-medium placeholder:text-neutral-600",
                    }}
                  />
                </div>

              </div>
            </div>

            <div className="xl:col-span-5 flex flex-col gap-2 w-full h-full">
              <label className="text-sm font-semibold text-neutral-300">
                Cover Image <span className="text-emerald-500">*</span>
              </label>

              <div className="flex-1 w-full relative group">
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  required
                />

                <div
                  className={`w-full h-full min-h-[260px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-400 overflow-hidden ${
                    imagePreview
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : "border-white/10 group-hover:border-emerald-500/50 bg-[#121212]"
                  }`}
                >
                  {imagePreview ? (
                    <div className="absolute inset-2 rounded-xl overflow-hidden bg-black shadow-lg">
                      <Image
                        src={imagePreview}
                        alt="Book Cover Preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                        <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/50 text-white px-5 py-2.5 rounded-full font-semibold backdrop-blur-md">
                          <ImagePlus size={18} /> Change Cover
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 flex flex-col items-center gap-4 transition-transform duration-300 group-hover:scale-105">
                      <div className="w-16 h-16 rounded-full bg-white/3 flex items-center justify-center text-neutral-400 border border-white/5 shadow-inner">
                        <UploadCloud size={32} className="text-emerald-500/80 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white mb-1">Click or drag image here</p>
                        <p className="text-xs text-neutral-500 font-medium">Supports SVG, PNG, JPG or WEBP</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full pt-6 border-t border-white/5">

            <div className="flex flex-col gap-2">
              <label className="text-neutral-300 font-semibold text-sm">
                 Description <span className="text-emerald-500">*</span>
              </label>
              <TextArea
                isRequired
                name="description"
                aria-label="Description"
                placeholder="Write a brief and engaging overview of the book..."
                variant="bordered"
                minRows={5}
                classNames={{
                  inputWrapper: "!bg-[#121212] border-white/10 hover:border-emerald-500/50 focus-within:!border-emerald-500 rounded-xl shadow-inner transition-colors py-3",
                  input: "text-white font-medium placeholder:text-neutral-600 leading-relaxed",
                }}
              />
            </div>

            <div className="flex justify-end w-full pt-2">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full sm:w-auto px-12 h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-xl flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border-none"
              >
                {!isLoading && <UploadCloud size={22} strokeWidth={2.5} />}
                {isLoading ? "Submitting..." : "Submit for Approval"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}