"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Form } from "@heroui/react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    const toastId = toast.loading("Updating your password...");
    setLoading(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword,
      });

      if (error) {
        toast.error(error.message || "Failed to reset password. The link might be expired.", {
          id: toastId,
        });
        return;
      }

      toast.success("Password reset successfully! You can now log in.", { id: toastId });
      router.push("/signin");
    } catch (err) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const inputClassNames = {
    inputWrapper:
      "bg-neutral-50 dark:bg-white/10 border-neutral-300 dark:border-white/20 hover:border-emerald-500 dark:hover:border-emerald-500 focus-within:!border-emerald-500 h-12 shadow-sm dark:shadow-inner transition-colors duration-300",
    input: "text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-base transition-colors duration-300",
    innerWrapper: "flex items-center gap-2 w-full",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-100 dark:bg-linear-to-br dark:from-[#1e0a2d] dark:via-[#0f0c20] dark:to-[#1b1408] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white dark:bg-white/5 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 lg:p-10 text-center transition-colors duration-300"
      >
        <div className="w-16 h-16 mx-auto bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-300">
          <ShieldCheck className="text-emerald-600 dark:text-emerald-500 size-8 transition-colors duration-300" />
        </div>

        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">
          Create New Password
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8 leading-relaxed transition-colors duration-300">
          Your new password must be different from previous used passwords.
        </p>

        <Form
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-5 text-left"
        >
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2 transition-colors duration-300">
              <Lock size={16} className="text-emerald-500" /> New Password
            </label>
            <Input
              isRequired
              name="newPassword"
              type={isVisible ? "text" : "password"}
              placeholder="Enter new password"
              variant="bordered"
              classNames={inputClassNames}
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors flex items-center justify-center w-8 h-full"
                >
                  {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2 transition-colors duration-300">
              <Lock size={16} className="text-emerald-500" /> Confirm Password
            </label>
            <Input
              isRequired
              name="confirmPassword"
              type={isConfirmVisible ? "text" : "password"}
              placeholder="Confirm new password"
              variant="bordered"
              classNames={inputClassNames}
              endContent={
                <button
                  type="button"
                  onClick={toggleConfirmVisibility}
                  className="text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors flex items-center justify-center w-8 h-full"
                >
                  {isConfirmVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-12 rounded-xl mt-4 transition-colors duration-300 border-none shadow-lg shadow-emerald-900/20"
          >
            Reset Password
          </Button>
        </Form>
      </motion.div>
    </div>
  );
}