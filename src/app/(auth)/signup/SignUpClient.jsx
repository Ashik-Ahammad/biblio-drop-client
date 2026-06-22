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
  User,
  Image as ImageIcon,
  Shield,
  ChevronDown,
  UserPlus,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import signupAnimation from "../../../../public/assets/signup.json";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Field = React.forwardRef(function Field(
  { icon: Icon, endButton, error, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      <div className="relative w-full">
        {Icon && (
          <Icon
            size={16}
            className="text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
          />
        )}
        <input
          ref={ref}
          {...props}
          className={`w-full h-12 rounded-xl bg-white dark:bg-white/5 border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 caret-emerald-500 outline-none transition-colors ${
            error
              ? "border-red-500/60 focus:border-red-500"
              : "border-neutral-200 dark:border-white/10 focus:border-emerald-500"
          } ${Icon ? "pl-10" : "pl-4"} ${
            endButton ? "pr-11" : "pr-4"
          } ${className}`}
        />
        {endButton}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-500 dark:text-red-400 text-xs mt-1.5 ml-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
});

export default function SignUpClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const toggleVisibility = () => setIsVisible((v) => !v);
  const toggleConfirmVisibility = () => setIsConfirmVisible((v) => !v);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating account...");

    try {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image || undefined,
      });

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      const { error: roleError } = await authClient.updateUser({
        role: data.role,
      });

      if (!roleError) {
        toast.success("Account created successfully!", { id: toastId });
        router.refresh();
        router.push("/role-check");
      } else {
        toast.error("Account created but role failed.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-100 dark:bg-linear-to-br dark:from-[#1e0a2d] dark:via-[#0f0c20] dark:to-[#1b1408] py-10 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-white dark:bg-white/3 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row-reverse transition-colors duration-300"
      >
        <div className="lg:w-[45%] p-8 hidden sm:flex items-center justify-center bg-neutral-50 dark:bg-black/20 transition-colors duration-300">
          <div className="w-full max-w-sm">
            <Lottie animationData={signupAnimation} loop={true} />
          </div>
        </div>

        <div className="w-full lg:w-[55%] p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors w-fit mb-8 text-sm font-medium"
          >
            <BookOpen size={18} />
            BiblioDrop
          </Link>

          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-3 transition-colors duration-300">
            <UserPlus className="text-emerald-600 dark:text-emerald-500 transition-colors duration-300" size={28} /> Create Account
          </h2>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
              <Field
                icon={User}
                placeholder="Full Name"
                error={errors.name?.message}
                {...register("name", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name is too short" },
                })}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
              <Field
                icon={Mail}
                type="email"
                placeholder="Email Address"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
              <Field
                icon={ImageIcon}
                type="url"
                placeholder="Profile Image URL (Optional)"
                error={errors.image?.message}
                {...register("image")}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}>
              <Field
                icon={Lock}
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                error={errors.password?.message}
                endButton={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
                  >
                    {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}>
              <Field
                icon={Lock}
                type={isConfirmVisible ? "text" : "password"}
                placeholder="Confirm Password"
                error={errors.confirmPassword?.message}
                endButton={
                  <button
                    type="button"
                    onClick={toggleConfirmVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
                  >
                    {isConfirmVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="w-full">
              <div className="relative w-full">
                <select
                  defaultValue=""
                  className={`w-full h-12 px-3 pl-10 pr-10 bg-white dark:bg-white/5 border text-neutral-900 dark:text-white rounded-xl appearance-none outline-none transition-colors ${
                    errors.role
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-neutral-200 dark:border-white/10 focus:border-emerald-500"
                  }`}
                  {...register("role", { required: "Please select a role" })}
                >
                  <option value="" disabled className="text-neutral-500 bg-white dark:bg-[#12081c]">
                    Select your role
                  </option>
                  <option value="user" className="bg-white dark:bg-[#12081c] text-neutral-900 dark:text-white">
                    Reader (User)
                  </option>
                  <option value="librarian" className="bg-white dark:bg-[#12081c] text-neutral-900 dark:text-white">
                    Librarian
                  </option>
                </select>
                <Shield
                  size={16}
                  className="text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <ChevronDown
                  className="text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  size={20}
                />
              </div>
              {errors.role && (
                <p className="flex items-center gap-1.5 text-red-500 dark:text-red-400 text-xs mt-1.5 ml-1">
                  <AlertCircle size={12} /> {errors.role.message}
                </p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.4 }}>
              <Button
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-12 rounded-xl mt-2 border-none transition-colors"
              >
                Create Account
              </Button>
            </motion.div>
          </Form>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="bordered"
            className="w-full bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-900 dark:text-white h-12 rounded-xl mt-6 flex items-center justify-center gap-3 transition-colors shadow-sm dark:shadow-none"
          >
            <FcGoogle size={24} /> Sign up with Google
          </Button>

          <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm mt-6 transition-colors duration-300">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-emerald-600 dark:text-emerald-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}