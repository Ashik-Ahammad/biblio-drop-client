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

  const createdAt = new Date(user.createdAt).getTime();
  const updatedAt = user.updatedAt ? new Date(user.updatedAt).getTime() : createdAt;
  const isNewUser = (Date.now() - createdAt) < 120000;
  const isProfileUntouched = createdAt === updatedAt;

  if (isNewUser && isProfileUntouched) {
    redirect("/choose-role");
  }

  if (role === "admin") {
    redirect("/dashboard/admin");
  } else if (role === "librarian") {
    redirect("/dashboard/librarian");
  } else {
    redirect("/"); 
  }

  return null;
}