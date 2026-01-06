"use client";

import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import { Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";

export default function ContactPage() {
  useScrollNavigation({ prevPath: "/experience" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-full w-full max-w-5xl mx-auto gap-12 lg:gap-24 items-center justify-center p-6 py-24 lg:py-0 lg:h-[60vh]">
      {/* Left Column: Info */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        className="flex-1 flex flex-col justify-center space-y-8 text-center lg:text-left"
      >
        <motion.div variants={fadeInUp}>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 text-black dark:text-white">
            let's connect
          </h1>
          <p className="text-lg lg:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto lg:mx-0">
            i'm currently open to new opportunities and collaborations. whether
            you have a project in mind or just want to say hello, feel free to
            reach out.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-6 items-center lg:items-start"
        >
          <a
            href="mailto:samuelonasis.work@gmail.com"
            className="group flex items-center gap-3 text-xl lg:text-2xl font-medium text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
            samuelonasis.work@gmail.com
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="pt-4">
          <Button
            href="/documents/cv_dec2025.pdf"
            target="_blank"
            size="lg"
            className="px-8" // Add specific padding override if needed, but 'lg' handles basic
          >
            <span>resume</span>
            <Download className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Column: Image Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex items-center justify-center"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-full shadow-2xl shadow-neutral-200 dark:shadow-neutral-900 overflow-hidden shrink-0 border-4 border-white dark:border-neutral-800"
        >
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
