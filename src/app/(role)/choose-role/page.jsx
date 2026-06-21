"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { User, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ChooseRolePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleRoleSelect = async (selectedRole) => {
    if (!session?.user?.email) {
      toast.error("Session expired. Please log in again.");
      router.push("/signin");
      return;
    }

    const toastId = toast.loading(`Setting up as ${selectedRole}...`);

    try {
      const { error } = await authClient.updateUser({
        role: selectedRole,
      });

      if (!error) {
        toast.success("Role updated successfully!", { id: toastId });

        router.refresh();
        // Route to correct dashboard
        if (selectedRole === "admin") {
          router.push("/dashboard/admin");
        } else if (selectedRole === "librarian") {
          router.push("/dashboard/librarian");
        } else {
          router.push("/");
        }
      } else {
        toast.error("Failed to set role.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-[#1e0a2d] via-[#0f0c20] to-[#1b1408]">
      <div className="w-full max-w-2xl bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center shadow-[0_0_40px_rgba(0,0,0,0.3)]">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome to BiblioDrop!
        </h2>
        <p className="text-neutral-400 mb-8">
          How would you like to use our platform?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button
            onPress={() => handleRoleSelect("user")}
            className="h-40 bg-white/5 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 flex flex-col items-center justify-center gap-3 rounded-2xl transition-all"
          >
            <User size={40} className="text-emerald-500" />
            <span className="text-white text-lg font-semibold">
              I am a Reader
            </span>
            <span className="text-neutral-500 text-xs text-wrap px-2">
              I want to borrow and read books
            </span>
          </Button>

          <Button
            onPress={() => handleRoleSelect("librarian")}
            className="h-40 bg-white/5 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 flex flex-col items-center justify-center gap-3 rounded-2xl transition-all"
          >
            <Shield size={40} className="text-emerald-500" />
            <span className="text-white text-lg font-semibold">
              I am a Librarian
            </span>
            <span className="text-neutral-500 text-xs text-wrap px-2">
              I want to list and share my books
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}