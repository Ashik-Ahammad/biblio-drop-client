"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function RoleCheckPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const verifyRoleFromDB = async (email) => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${email}`);
        const data = await res.json();

        if (data.success && data.isRoleSelected) {
          router.push("/");
        } else {
          router.push("/choose-role");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/choose-role");
      }
    };

    if (session?.user?.email) {
      verifyRoleFromDB(session.user.email);
    } else {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-[#1e0a2d] via-[#0f0c20] to-[#1b1408]">
      <div className="flex flex-col items-center gap-4 bg-white/3 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <Loader2 className="text-emerald-500 animate-spin" size={48} />
        <p className="text-neutral-300 text-lg font-medium animate-pulse">
          Setting up your account...
        </p>
      </div>
    </div>
  );
}