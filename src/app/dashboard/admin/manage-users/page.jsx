import ManageUsersClient from "./ManageUsersClient";

export default async function ManageUsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
    cache: "no-store",
  });
  const users = await res.json();

  return <ManageUsersClient initialUsers={users} />;
}