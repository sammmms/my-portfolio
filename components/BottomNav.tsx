"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Github, Instagram, Linkedin, Twitter, AtSign } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function BottomNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide navigation on document preview pages
  if (pathname?.startsWith("/preview")) {
    return null;
  }

  const navItems = [
    { name: "home", href: "/" },
    { name: "projects", href: "/projects" },
    { name: "experience", href: "/experience" },
    { name: "contact", href: "/contact" },
  ];

  const socialItems = [
    { name: "github", href: "https://github.com/sammmms", icon: Github },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/samuel-onasis/",
      icon: Linkedin,
    },
    {
      name: "instagram",
      href: "https://www.instagram.com/wsn.samm_/",
      icon: Instagram,
    },
    {
      name: "x",
      href: "https://x.com/wsn_samm",
      icon: Twitter,
    },
  ];

  return (
    <>
      {/* Mobile Top Floating Pill */}
      <nav className="md:hidden pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 bg-white/85 dark:bg-black/85 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-full px-2 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-3.5 py-1.5 rounded-full transition-colors text-xs font-medium",
                isActive
                  ? "text-black dark:text-white font-bold bg-neutral-100 dark:bg-neutral-800"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              )}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Bottom-Right FAB for Socials */}
      <div
        className="md:hidden pointer-events-auto fixed bottom-6 right-6 z-50"
        ref={menuRef}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-full right-0 mb-3 flex flex-col gap-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 shadow-xl min-w-12 items-center"
            >
              {socialItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-neutral-500 transition-all hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-neutral-200 dark:border-neutral-800 backdrop-blur-md transition-all duration-300",
            isOpen
              ? "text-black dark:text-white bg-neutral-100 dark:bg-neutral-900 scale-105"
              : "text-neutral-500 bg-white/90 dark:bg-black/90"
          )}
          aria-label="Toggle social menu"
        >
          <AtSign className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Floating Island Dock (Bottom Center) - Modern macOS Style */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto items-center gap-3 px-3.5 py-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-800/90 shadow-2xl shadow-black/5 dark:shadow-white/5 transition-all duration-300 hover:shadow-neutral-950/10 dark:hover:shadow-white/10">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full transition-colors text-sm font-medium",
                  isActive
                    ? "text-black dark:text-white font-bold"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-pill"
                    className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800/90 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Subtle Vertical Divider */}
        <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Social Icons Inline */}
        <div className="flex items-center gap-1">
          {socialItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-neutral-500 transition-all hover:text-black dark:hover:text-white hover:scale-110 rounded-full"
                aria-label={item.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
