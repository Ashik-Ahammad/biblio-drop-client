"use client";

import React, { useState } from "react";
import { Table, AlertDialog, Button } from "@heroui/react";
import { Users, Shield, Trash2, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { updateUserRole, deleteUser } from "@/lib/actions/users";

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    const user = users.find((u) => u._id === userId || u.id === userId);
    if (user?.role === newRole) return;

    setUpdatingId(userId);
    const toastId = toast.loading(`Updating role to ${newRole}...`);

    try {
      const data = await updateUserRole(userId, newRole);

      if (data && data.success !== false) {
        setUsers(
          users.map((u) =>
            u._id === userId || u.id === userId ? { ...u, role: newRole } : u
          )
        );
        toast.success(`Role successfully updated to ${newRole}`, { id: toastId });
      } else {
        toast.error(data?.message || "Failed to update role", { id: toastId });
      }
    } catch (error) {
      toast.error("Network error while updating role", { id: toastId });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    const toastId = toast.loading("Deleting user...");

    try {
      const data = await deleteUser(userId);

      if (data && data.success !== false) {
        setUsers(users.filter((user) => user._id !== userId && user.id !== userId));
        toast.success("User deleted successfully!", { id: toastId });
      } else {
        toast.error(data?.message || "Failed to delete user", { id: toastId });
      }
    } catch (error) {
      toast.error("Network error while deleting user", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-neutral-50 dark:bg-[#050505] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[95%] xl:max-w-7xl mx-auto"
      >
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2 md:gap-3">
            <Users className="text-emerald-600 dark:text-emerald-500" size={32} />
            Manage Users
          </h1>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-1">
            View, update roles, or remove users from the system.
          </p>
        </div>

        <div className="bg-white dark:bg-linear-to-b dark:from-[#111111] dark:to-[#0a0a0a] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden p-2 md:p-4 transition-colors duration-300">
          <Table aria-label="Manage Users Table" className="bg-transparent shadow-none" classNames={{ wrapper: "p-0 shadow-none bg-transparent" }}>
            <Table.ScrollContainer className="overflow-x-auto scrollbar-hide">
              <Table.Content className="min-w-[800px] w-full text-left border-collapse">
                <Table.Header className="bg-neutral-100 dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-white/10">
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider rounded-tl-xl">User Details</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Email Address</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">User Role</Table.Column>
                  <Table.Column className="p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider text-right rounded-tr-xl">Actions</Table.Column>
                </Table.Header>

                <Table.Body emptyContent={<span className="text-neutral-500 py-10 block text-center">No users found.</span>}>
                  {users.map((user) => {
                    const userId = user._id || user.id;
                    const isUpdating = updatingId === userId;

                    return (
                      <Table.Row key={userId} className="border-b border-neutral-200 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/3 transition-colors">
                        <Table.Cell className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 font-bold text-lg">
                              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                              <p className="text-neutral-900 dark:text-neutral-100 font-medium text-base truncate max-w-[150px] md:max-w-[200px]">
                                {user.name}
                              </p>
                              <p className="text-neutral-500 text-xs md:hidden truncate max-w-[150px]">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4 hidden md:table-cell text-neutral-700 dark:text-neutral-300">
                          <div className="flex items-center gap-2 text-sm truncate max-w-[250px]">
                            <Mail size={16} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <div className="inline-flex items-center bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-white/10 rounded-lg p-1 relative">
                            {isUpdating && (
                              <div className="absolute inset-0 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                                <Loader2 className="animate-spin text-emerald-600 dark:text-emerald-500" size={18} />
                              </div>
                            )}

                            {["user", "librarian", "admin"].map((roleType) => {
                              const isActive = user.role === roleType;
                              return (
                                <button
                                  key={roleType}
                                  onClick={() => handleRoleChange(userId, roleType)}
                                  disabled={isUpdating}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize flex items-center gap-1.5 ${
                                    isActive
                                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"
                                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 dark:hover:text-neutral-200 dark:hover:bg-white/5 border border-transparent"
                                  }`}
                                >
                                  {isActive && <Shield size={12} />}
                                  {roleType === "user" ? "Reader" : roleType}
                                </button>
                              );
                            })}
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4 text-right">
                          <AlertDialog>
                            <Button
                              isIconOnly
                              variant="flat"
                              aria-label="Delete User"
                              className="bg-neutral-100 text-red-600 hover:bg-red-600 hover:text-white border border-neutral-200 hover:border-red-600 dark:bg-[#1a1a1a] dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:border-white/10 dark:hover:border-red-500 transition-all rounded-lg h-10 w-10 min-w-10 outline-none"
                            >
                              <Trash2 size={18} />
                            </Button>

                            <AlertDialog.Backdrop className="bg-black/60 dark:bg-black/80 backdrop-blur-sm">
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[400px] bg-white dark:bg-[#111111] border border-neutral-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl outline-none">
                                  <AlertDialog.CloseTrigger className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white outline-none" />

                                  <AlertDialog.Header className="flex flex-col gap-3">
                                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center border border-red-200 dark:border-red-500/20 mx-auto">
                                      <AlertDialog.Icon status="danger" className="text-red-600 dark:text-red-500" />
                                    </div>
                                    <AlertDialog.Heading className="text-xl font-bold text-neutral-900 dark:text-white text-center">
                                      Delete User
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>

                                  <AlertDialog.Body className="text-center mt-2">
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                      Are you sure you want to permanently delete{" "}
                                      <strong className="text-neutral-900 dark:text-neutral-100">{user.name}</strong>
                                      ? All associated data will be removed.
                                    </p>
                                  </AlertDialog.Body>

                                  <AlertDialog.Footer className="flex gap-3 mt-6">
                                    <Button
                                      slot="close"
                                      variant="flat"
                                      className="flex-1 bg-neutral-100 dark:bg-[#1a1a1a] hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white font-medium rounded-xl h-11 transition-colors outline-none"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      slot="close"
                                      onPress={() => handleDeleteUser(userId)}
                                      className="flex-1 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl h-11 transition-colors border-none outline-none"
                                    >
                                      Confirm Delete
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}