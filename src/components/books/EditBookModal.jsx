"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Modal } from "@heroui/react";
import { Edit, BookOpen, PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateBook } from "@/lib/actions/books";

export default function EditBookModal({ book }) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    deliveryFee: book.deliveryFee || "",
    description: book.description || "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Updating book details...");

    try {
      const updatedData = {
        title: formData.title,
        author: formData.author,
        deliveryFee: Number(formData.deliveryFee),
        description: formData.description,
      };

      const res = await updateBook(book._id, updatedData);

      if (res.success) {
        toast.success("Book updated successfully!", { id: toastId });
        router.refresh();
        // Close modal automatically after success
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <Button
        variant="flat"
        className="bg-white/10 text-white hover:bg-white/20 hover:scale-105 font-bold transition-all"
        startContent={<Edit size={16} />}
      >
        Edit Book
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          {/* Premium Glassmorphism Dialog */}
          <Modal.Dialog className="sm:max-w-2xl bg-[#0a0a0a]/95 border border-white/10 text-white backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden relative">

            {/* Background Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none" />

            <Modal.CloseTrigger className="text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 absolute top-4 right-4" />

            <Modal.Header className="pt-8 px-8 pb-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-inner">
                  <BookOpen className="text-emerald-400 size-6" strokeWidth={2.5} />
                </div>
                <div>
                  <Modal.Heading className="text-2xl font-extrabold text-sky-200 tracking-tight">Edit Book Details</Modal.Heading>
                  <p className="mt-1 text-sm text-neutral-400 font-medium">
                    Update the information for <span className="text-white">`{book.title}`</span>.
                  </p>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="px-8 py-4 relative z-10">
              <form id={`edit-form-${book._id}`} className="flex flex-col gap-6" onSubmit={onSubmit}>

                {/* Custom Input Group: Title */}
                <div className="flex flex-col gap-2 group">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                    Book Title
                  </label>
                  <div className="relative">
                    <input
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner pl-11"
                    />
                    <PenLine size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Custom Input Group: Author */}
                  <div className="flex flex-col gap-2 group">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                      Author Name
                    </label>
                    <input
                      name="author"
                      type="text"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
                    />
                  </div>

                  {/* Custom Input Group: Delivery Fee */}
                  <div className="flex flex-col gap-2 group">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                      Delivery Fee ($)
                    </label>
                    <div className="relative">
                      <input
                        name="deliveryFee"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.deliveryFee}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner pl-10"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">$</span>
                    </div>
                  </div>
                </div>

                {/* Custom Input Group: Description */}
                <div className="flex flex-col gap-2 group">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                    Description 
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner resize-none leading-relaxed"
                  />
                </div>

              </form>
            </Modal.Body>

            <Modal.Footer className="px-8 pb-8 pt-4 relative z-10 border-t border-white/5 mt-4">
              <Button
                slot="close"
                variant="tertiary"
                className="text-neutral-400 hover:text-white hover:bg-white/5 font-bold h-12 px-6 rounded-xl transition-colors"
              >
                Cancel
              </Button>
              <Button
                form={`edit-form-${book._id}`}
                type="submit"
                isLoading={isLoading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all border-none"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}