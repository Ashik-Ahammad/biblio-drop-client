"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Button, Form } from "@heroui/react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import signinAnimation from "../../../../public/assets/signin.json";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Field = React.forwardRef(function Field(
  { endButton, error, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          ref={ref}
          {...props}
          className={`w-full h-12 rounded-xl bg-white/5 border text-white placeholder-neutral-500 caret-emerald-500 outline-none transition-colors px-4 ${
            error
              ? "border-red-500/60 focus:border-red-500"
              : "border-white/10 focus:border-emerald-500"
          } ${endButton ? "pr-11" : "pr-4"} ${className}`}
        />
        {endButton}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5 ml-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
});

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const toggleVisibility = () => setIsVisible((v) => !v);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Signing in...");

    try {
      const { error } = await authClient.signIn.email({ ...data });

      if (error) {
        toast.error(error.message || "Invalid email or password", {
          id: toastId,
        });
        return;
      }

      toast.success("Welcome back!", { id: toastId });
      router.refresh();
      router.push("/role-check");
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        id: toastId,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/role-check",
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
        <div className="lg:w-1/2 p-8 hidden sm:flex items-center justify-center bg-black/20">
          <div className="w-full max-w-sm">
            <Lottie animationData={signinAnimation} loop={true} />
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-14 flex flex-col justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-emerald-500 transition-colors w-fit mb-8 text-sm font-medium"
          >
            <BookOpen size={18} /> BiblioDrop
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
               Welcome Back
            </h2>
            <p className="text-neutral-400 text-sm">
              Enter your credentials to access your account.
            </p>
          </motion.div>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Mail size={16} className="text-emerald-500" /> Email Address
              </label>
              <Field
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
                })}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Lock size={16} className="text-emerald-500" /> Password
              </label>
              <Field
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                error={errors.password?.message}
                endButton={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-400 hover:text-white transition-colors"
                  >
                    {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register("password", { required: "Password is required" })}
              />
              <div className="flex justify-end w-full mt-1">
                <Link href="/forgot-password" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="w-full">
              <Button
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-12 rounded-xl mt-2 border-none transition-colors"
              >
                Sign In
              </Button>
            </motion.div>
          </Form>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="mt-8">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="bordered"
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-12 rounded-xl flex items-center justify-center gap-3 transition-colors"
            >
              <FcGoogle size={24} /> Continue with Google
            </Button>
            <p className="text-center text-neutral-400 text-sm mt-6">
              Do not have an account?{" "}
              <Link href="/signup" className="text-emerald-500 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}