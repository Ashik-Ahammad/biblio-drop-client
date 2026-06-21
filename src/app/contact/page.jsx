"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@heroui/react";

export default function ContactPage() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";
    const publicKey = "YOUR_PUBLIC_KEY";

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey).then(
      (result) => {
        setIsSubmitting(false);
        setSuccess(true);
        formRef.current.reset();
        setTimeout(() => setSuccess(false), 5000);
      },
      (error) => {
        setIsSubmitting(false);
        setError("Failed to send message. Please try again later.");
        console.error(error.text);
      },
    );
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", detail: "support@bibliodrop.com" },
    { icon: Phone, title: "Call Us", detail: "+880 1234 567 890" },
    { icon: MapPin, title: "Location", detail: "Dhaka, Bangladesh" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-white py-20 px-4 mt-10 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Facing an issue with your delivery or have a question? Our support
            team is here to help you out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-white/10 p-6 rounded-2xl shadow-md flex items-start gap-4"
              >
                <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <info.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {info.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white dark:bg-[#111111] border border-neutral-200 dark:border-white/10 p-8 md:p-10 rounded-[2rem] shadow-xl relative"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Subject / Order ID
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Delivery issue with Order #12345"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Describe your issue or inquiry here..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
              {success && (
                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 p-3 rounded-lg">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">
                    Message sent successfully! We will get back to you soon.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold  hover:cursor-pointer rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
