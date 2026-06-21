"use client";

import React, { useState } from "react";
import { Table, AlertDialog, Button } from "@heroui/react";
import { Users, Shield, Trash2, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    const user = users.find((u) => u._id === userId || u.id === userId);
    if (user?.role === newRole) return;

    setUpdatingId(userId);
    const toastId = toast.loading(`Updating role to ${newRole}...`);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, role: newRole }),
        }
      );

      if (res.ok) {
        setUsers(
          users.map((u) =>
            u._id === userId || u.id === userId ? { ...u, role: newRole } : u
          )
        );
        toast.success(`Role successfully updated to ${newRole}`, {
          id: toastId,
        });
      } else {
        toast.error("Failed to update role", { id: toastId });
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setUsers(
          users.filter((user) => user._id !== userId && user.id !== userId)
        );
        toast.success("User deleted successfully!", { id: toastId });
      } else {
        toast.error("Failed to delete user", { id: toastId });
      }
    } catch (error) {
      toast.error("Network error while deleting user", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-emerald-500" size={32} />
            Manage Users
          </h1>
          <p className="text-neutral-400 mt-1">
            View, update roles, or remove users from the system.
          </p>
        </div>

        <div className="bg-linear-to-b from-[#111111] to-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 md:p-4">
          <Table aria-label="Manage Users Table" className="bg-transparent">
            <Table.ScrollContainer className="overflow-x-auto scrollbar-hide">
              <Table.Content className="min-w-[800px] w-full text-left border-collapse">
                <Table.Header className="bg-[#1a1a1a] border-b border-white/10">
                  <Table.Column className="p-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                    User Details
                  </Table.Column>
                  <Table.Column className="p-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                    Email Address
                  </Table.Column>
                  <Table.Column className="p-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                    User Role
                  </Table.Column>
                  <Table.Column className="p-4 text-sm font-semibold text-neutral-400 uppercase tracking-wider text-right">
                    Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {users.map((user) => {
                    const userId = user._id || user.id;
                    const isUpdating = updatingId === userId;

                    return (
                      <Table.Row
                        key={userId}
                        className="border-b border-white/5 hover:bg-white/3 transition-colors"
                      >
                        <Table.Cell className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-emerald-500 font-bold text-lg">
                              {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}
                            </div>
                            <div>
                              <p className="text-neutral-100 font-medium text-base">
                                {user.name}
                              </p>
                              <p className="text-neutral-500 text-xs md:hidden">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4 hidden md:table-cell text-neutral-300">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail size={16} className="text-neutral-500" />
                            {user.email}
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4">
                          <div className="inline-flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg p-1 relative">
                            {isUpdating && (
                              <div className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                                <Loader2
                                  className="animate-spin text-emerald-500"
                                  size={18}
                                />
                              </div>
                            )}

                            {["user", "librarian", "admin"].map((roleType) => {
                              const isActive = user.role === roleType;
                              return (
                                <button
                                  key={roleType}
                                  onClick={() =>
                                    handleRoleChange(userId, roleType)
                                  }
                                  disabled={isUpdating}
                                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize flex items-center gap-1.5 ${
                                    isActive
                                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm"
                                      : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5 border border-transparent"
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
                              className="bg-[#1a1a1a] text-red-500 hover:bg-red-500 hover:text-white border border-white/10 hover:border-red-500 transition-all rounded-lg h-10 w-10 min-w-10 outline-none"
                            >
                              <Trash2 size={18} />
                            </Button>

                            <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-sm">
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl outline-none">
                                  <AlertDialog.CloseTrigger className="text-neutral-500 hover:text-white outline-none" />

                                  <AlertDialog.Header className="flex flex-col gap-3">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mx-auto">
                                      <AlertDialog.Icon
                                        status="danger"
                                        className="text-red-500"
                                      />
                                    </div>
                                    <AlertDialog.Heading className="text-xl font-bold text-white text-center">
                                      Delete User
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>

                                  <AlertDialog.Body className="text-center mt-2">
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                      Are you sure you want to permanently delete{" "}
                                      <strong className="text-neutral-100">
                                        {user.name}
                                      </strong>
                                      ? All associated data will be removed.
                                    </p>
                                  </AlertDialog.Body>

                                  <AlertDialog.Footer className="flex gap-3 mt-6">
                                    <Button
                                      slot="close"
                                      variant="flat"
                                      className="flex-1 bg-[#1a1a1a] hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl h-11 transition-colors outline-none"
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

          {users.length === 0 && (
            <div className="py-20 text-center">
              <Users className="mx-auto text-neutral-700 mb-4" size={48} />
              <h3 className="text-neutral-200 font-semibold text-lg">
                No users found
              </h3>
              <p className="text-neutral-500 text-sm mt-1">
                The database is currently empty.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}