import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function RoleCheckPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Redirect unauthenticated users
  if (!session) {
    redirect("/signin");
  }

  const user = session.user;
  const role = user?.role || "user";

  // 🎯 THE FIX: Magic Logic for FIRST-TIME Google Login
  // Check if account was created within the last 2 minutes
  const createdAt = new Date(user.createdAt).getTime();
  const updatedAt = user.updatedAt ? new Date(user.updatedAt).getTime() : createdAt;
  const isNewUser = (Date.now() - createdAt) < 120000; // 120,000 ms = 2 mins

  // If timestamps are identical, the profile is untouched (no role selected)
  const isProfileUntouched = createdAt === updatedAt;

  // Force brand new Google users to select a role
  if (isNewUser && isProfileUntouched) {
    redirect("/choose-role");
  }

  // 🎯 Existing Users & Email Signups Routing
  if (role === "admin") {
    redirect("/dashboard/admin");
  } else if (role === "librarian") {
    redirect("/dashboard/librarian");
  } else {
    redirect("/"); // Default reader goes to home
  }

  return null;
}