"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Avatar
} from "@heroui/react";
import {
  Mail,
  Shield,
  Calendar,
  Clock,
  Edit3,
  User,
  Image as ImageIcon
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();
  const user = session?.user;
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() || "U";

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleEditClick = () => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-500 dark:text-neutral-400">
        Loading profile details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-500 dark:text-neutral-400">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-28 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none hidden dark:block" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Profile Card */}
        <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-white/5 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
          <div className="p-8 md:p-12">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 border-b border-zinc-200 dark:border-white/5 pb-10">

              <Avatar className="size-32 ring-4 ring-emerald-100 dark:ring-emerald-900/50 shadow-2xl shrink-0 rounded-2xl bg-zinc-100 dark:bg-emerald-900/20">
                <Avatar.Image src={user.image} alt={user.name} className="object-cover rounded-2xl" />
                <Avatar.Fallback className="text-emerald-600 dark:text-emerald-400 text-4xl font-extrabold rounded-2xl">
                  {initials}
                </Avatar.Fallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {user.name}
                </h1>
                <p className="text-zinc-500 dark:text-neutral-400 mt-2 flex items-center justify-center md:justify-start gap-2 text-base">
                  <Mail size={18} /> {user.email}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-sm tracking-wider uppercase">
                  <Shield size={16} /> {user.role || 'User'}
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <Button
                  onPress={handleEditClick}
                  variant="secondary"
                  className="bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 shadow-sm font-bold px-6 h-12 rounded-xl transition-all"
                >
                  <Edit3 size={18} className="mr-2" /> Edit Profile
                </Button>

                <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                  <Modal.Backdrop>
                    <Modal.Container placement="auto">
                      <Modal.Dialog className="sm:max-w-md bg-white dark:bg-[#121212] border border-zinc-200 dark:border-white/5 shadow-2xl">
                        <Modal.CloseTrigger className="text-zinc-500 dark:text-neutral-400 hover:text-zinc-900 dark:hover:text-white transition-colors" />

                        <Modal.Header>
                          <Modal.Icon className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <Edit3 className="size-5" />
                          </Modal.Icon>
                          <Modal.Heading className="text-zinc-900 dark:text-white font-bold">Update Profile</Modal.Heading>
                          <p className="mt-1.5 text-sm leading-5 text-zinc-500 dark:text-neutral-400">
                            Update your name and avatar. Security details like email and role cannot be changed here.
                          </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                          <Surface variant="default" className="bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 rounded-2xl p-5">
                            <form id="profile-edit-form" onSubmit={handleUpdate} className="flex flex-col gap-5">

                              <TextField className="w-full" name="name" variant="secondary">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-neutral-300 flex items-center gap-2 mb-1.5">
                                  <User size={14} /> Full Name
                                </Label>
                                <Input
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Enter your full name"
                                  required
                                  className="bg-white dark:bg-[#151515] text-zinc-900 dark:text-white border-zinc-200 dark:border-white/5 focus-within:border-emerald-500 transition-colors"
                                />
                              </TextField>

                              <TextField className="w-full" name="image" type="url" variant="secondary">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-neutral-300 flex items-center gap-2 mb-1.5">
                                  <ImageIcon size={14} /> Avatar URL
                                </Label>
                                <Input
                                  value={image}
                                  onChange={(e) => setImage(e.target.value)}
                                  placeholder="https://example.com/avatar.jpg"
                                  className="bg-white dark:bg-[#151515] text-zinc-900 dark:text-white border-zinc-200 dark:border-white/5 focus-within:border-emerald-500 transition-colors"
                                />
                              </TextField>

                              <div className="h-px w-full bg-zinc-200 dark:bg-white/5 my-1" />

                              <TextField className="w-full opacity-60" name="email" variant="secondary">
                                <Label className="text-sm font-semibold text-zinc-500 dark:text-neutral-500 flex items-center gap-2 mb-1.5">
                                  <Mail size={14} /> Email Address
                                </Label>
                                <Input
                                  value={user.email}
                                  readOnly
                                  className="bg-zinc-100 dark:bg-[#151515] text-zinc-500 dark:text-neutral-500 border-zinc-200 dark:border-white/5 cursor-not-allowed"
                                />
                              </TextField>

                              <TextField className="w-full opacity-60" name="role" variant="secondary">
                                <Label className="text-sm font-semibold text-zinc-500 dark:text-neutral-500 flex items-center gap-2 mb-1.5">
                                  <Shield size={14} /> Account Role
                                </Label>
                                <Input
                                  value={user.role || "User"}
                                  readOnly
                                  className="bg-zinc-100 dark:bg-[#151515] text-zinc-500 dark:text-neutral-500 border-zinc-200 dark:border-white/5 cursor-not-allowed uppercase"
                                />
                              </TextField>

                            </form>
                          </Surface>
                        </Modal.Body>

                        <Modal.Footer className="border-t border-zinc-200 dark:border-white/5 p-4">
                          <Button onPress={() => setIsModalOpen(false)} variant="secondary" className="bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/5 font-bold">
                            Cancel
                          </Button>
                          <Button form="profile-edit-form" type="submit" isLoading={isUpdating} className="bg-emerald-600 text-white hover:bg-emerald-500 font-bold border-none shadow-lg shadow-emerald-900/20 px-6">
                            Save Changes
                          </Button>
                        </Modal.Footer>

                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">

              <div className="bg-zinc-50 dark:bg-[#151515] border border-zinc-200 dark:border-white/5 p-6 rounded-2xl flex items-center gap-5 transition-colors">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Calendar size={26} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 dark:text-neutral-500 uppercase tracking-wider mb-1">Member Since</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{formatDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-[#151515] border border-zinc-200 dark:border-white/5 p-6 rounded-2xl flex items-center gap-5 transition-colors">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <Clock size={26} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 dark:text-neutral-500 uppercase tracking-wider mb-1">Last Updated</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">{formatDate(user.updatedAt)}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}