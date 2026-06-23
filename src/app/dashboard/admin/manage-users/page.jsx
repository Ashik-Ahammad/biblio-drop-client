import ManageUsersClient from "./ManageUsersClient";
import { getAllUsers } from "@/lib/api/users";

export const metadata = {
  title: "Manage Users | BiblioDrop",
};

export default async function ManageUsersPage() {
  let users = [];

  try {
    const fetchedUsers = await getAllUsers();
    users = Array.isArray(fetchedUsers) ? fetchedUsers : [];
  } catch (error) {
    console.error("Manage Users Page Error:", error);
  }

  return <ManageUsersClient initialUsers={users} />;
}