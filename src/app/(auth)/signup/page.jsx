"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Form } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, Shield, ChevronDown, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import signupAnimation from "../../../../public/assets/signup.json";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (!validatePassword(user.password)) {
      setPasswordError("Password must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    delete user.confirmPassword;

    const toastId = toast.loading("Creating account...");
    try {
      const { data, error } = await authClient.signUp.email({
        ...user,
      });

      if (error) {
        toast.error(error.message || "Signup failed", { id: toastId });
        return;
      }

      toast.success("Account created successfully!", { id: toastId });

      window.location.href = "/";
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
      toast.error("Google signup failed.");
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-[#1e0a2d] via-[#0f0c20] to-[#1b1408] py-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.4, staggerChildren: 0.1 } }
        }}
        className="w-full max-w-5xl bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:flex-row-reverse"
      >
        <div className="lg:w-[45%] p-8 flex items-center justify-center bg-black/20">
          <div className="w-full max-w-sm sticky top-10">
            <Lottie animationData={signupAnimation} loop={true} />
          </div>
        </div>

        <div className="lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center">
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <UserPlus className="text-emerald-500" size={28} />
              Create Account
            </h2>
            <p className="text-neutral-400 text-sm">
              Join our community and explore the world of books.
            </p>
          </motion.div>

          <Form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
            <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <User size={16} className="text-emerald-500" />
                Full Name
              </label>
              <Input
                isRequired
                name="name"
                placeholder="John Doe"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-white/5 border-white/10 hover:border-emerald-500 focus-within:!border-emerald-500 h-12 text-white shadow-inner",
                  input: "text-white placeholder:text-neutral-500"
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
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

            <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <ImageIcon size={16} className="text-emerald-500" />
                Profile Image URL (Optional)
              </label>
              <Input
                name="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-white/5 border-white/10 hover:border-emerald-500 focus-within:!border-emerald-500 h-12 text-white shadow-inner",
                  input: "text-white placeholder:text-neutral-500"
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Lock size={16} className="text-emerald-500" />
                Password
              </label>
              <Input
                isRequired
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter password"
                variant="bordered"
                endContent={
                  <button className="focus:outline-none flex items-center justify-center p-2" type="button" onClick={toggleVisibility}>
                    {isVisible ? <EyeOff className="text-neutral-400 hover:text-emerald-500" size={20} /> : <Eye className="text-neutral-400 hover:text-emerald-500" size={20} />}
                  </button>
                }
                classNames={{
                  inputWrapper: "bg-white/5 border-white/10 hover:border-emerald-500 focus-within:!border-emerald-500 h-12 text-white shadow-inner",
                  input: "text-white placeholder:text-neutral-500",
                  innerWrapper: "flex items-center gap-2"
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Lock size={16} className="text-emerald-500" />
                Confirm Password
              </label>
              <Input
                isRequired
                name="confirmPassword"
                type={isConfirmVisible ? "text" : "password"}
                placeholder="Confirm password"
                variant="bordered"
                endContent={
                  <button className="focus:outline-none flex items-center justify-center p-2" type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? <EyeOff className="text-neutral-400 hover:text-emerald-500" size={20} /> : <Eye className="text-neutral-400 hover:text-emerald-500" size={20} />}
                  </button>
                }
                classNames={{
                  inputWrapper: "bg-white/5 border-white/10 hover:border-emerald-500 focus-within:!border-emerald-500 h-12 text-white shadow-inner",
                  input: "text-white placeholder:text-neutral-500",
                  innerWrapper: "flex items-center gap-2"
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-xs font-medium mt-1">{passwordError}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <Shield size={16} className="text-emerald-500" />
                Sign Up As
              </label>
              <div className="relative w-full">
                <select
                  required
                  name="role"
                  defaultValue=""
                  className="w-full h-12 px-3 bg-white/5 border border-white/10 text-white rounded-xl appearance-none outline-none hover:border-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer shadow-inner"
                >
                  <option value="" disabled className="text-neutral-500 bg-[#12081c]">Select your role</option>
                  <option value="user" className="bg-[#12081c] text-white py-2">Reader (User)</option>
                  <option value="librarian" className="bg-[#12081c] text-white py-2">Librarian</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="text-neutral-400" size={20} />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full mt-2">
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-12 rounded-xl transition-all shadow-lg shadow-emerald-900/20 border-none"
              >
                Create Account
              </Button>
            </motion.div>
          </Form>

          <motion.div variants={itemVariants} className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-neutral-500 text-sm font-medium">OR</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="bordered"
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-12 rounded-xl flex items-center justify-center gap-3 transition-all"
            >
              <FcGoogle size={24} />
              Sign up with Google
            </Button>

            <p className="text-center text-neutral-400 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/signin" className="text-emerald-500 hover:text-emerald-400 font-semibold">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}