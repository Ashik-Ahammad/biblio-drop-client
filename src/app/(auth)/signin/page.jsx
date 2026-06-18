"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Form } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import signinAnimation from "../../../../public/assets/signin.json";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const toastId = toast.loading("Signing in...");
    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Invalid email or password", { id: toastId });
        return;
      }

      toast.success("Welcome back!", { id: toastId });

    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-[#1e0a2d] via-[#0f0c20] to-[#1b1408]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row"
      >

        <div className="lg:w-1/2 p-8 flex items-center justify-center bg-black/20">
          <div className="w-full max-w-sm">
            <Lottie animationData={signinAnimation} loop={true} />
          </div>
        </div>

        <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <LogIn className="text-emerald-500" size={28} />
              Welcome Back
            </h2>
            <p className="text-neutral-400 text-sm">
              Enter your credentials to access your library account.
            </p>
          </motion.div>

          <Form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-full flex flex-col gap-1.5"
            >
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Mail size={16} className="text-emerald-500" />
                Email Address
              </label>
              <Input
                isRequired
                name="email"
                type="email"
                placeholder="john@example.com"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-white/5 border-white/10 hover:border-emerald-500 focus-within:!border-emerald-500 h-12 text-white shadow-inner",
                  input: "text-white placeholder:text-neutral-500"
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-full flex flex-col gap-1.5"
            >
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Lock size={16} className="text-emerald-500" />
                Password
              </label>
              <Input
                isRequired
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none flex items-center justify-center p-2"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff className="text-neutral-400 hover:text-emerald-500 transition-colors" size={20} />
                    ) : (
                      <Eye className="text-neutral-400 hover:text-emerald-500 transition-colors" size={20} />
                    )}
                  </button>
                }
                classNames={{
                  inputWrapper: "bg-white/5 border-white/10 hover:border-emerald-500 focus-within:!border-emerald-500 h-12 text-white shadow-inner",
                  input: "text-white placeholder:text-neutral-500",
                  innerWrapper: "flex items-center gap-2"
                }}
              />
              <div className="flex justify-end w-full mt-1">
                <Link href="/forgot-password" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-full"
            >
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-12 rounded-xl mt-2 transition-all shadow-lg shadow-emerald-900/20 border-none"
              >
                Sign In
              </Button>
            </motion.div>
          </Form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center gap-4 my-6"
          >
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-neutral-500 text-sm font-medium">OR</span>
            <div className="h-1px flex-1 bg-white/10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="bordered"
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-12 rounded-xl flex items-center justify-center gap-3 transition-all"
            >
              <FcGoogle size={24} />
              Continue with Google
            </Button>

            <p className="text-center text-neutral-400 text-sm mt-8">
              Do not have an account?{" "}
              <Link href="/signup" className="text-emerald-500 hover:text-emerald-400 font-semibold">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}