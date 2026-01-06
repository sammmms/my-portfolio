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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/80 dark:bg-black/80 dark:border-neutral-800 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Navigation Links */}
        <nav className="flex items-center gap-4 lg:gap-6 overflow-x-auto no-scrollbar mask-gradient">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black dark:hover:text-white relative whitespace-nowrap",
                  isActive ? "text-black dark:text-white" : "text-neutral-500"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-black dark:bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4" ref={menuRef}>
          {/* Desktop: Always visible */}
          <div className="hidden md:flex items-center gap-4">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-500 transition-all hover:text-black dark:hover:text-white hover:scale-110"
                  aria-label={item.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Mobile: Floating Toggle */}
          <div className="md:hidden relative">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-full right-0 mb-4 flex flex-col gap-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 shadow-xl min-w-12 items-center"
                >
                  {socialItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-neutral-500 transition-all hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl"
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
                "p-2 rounded-full transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-900",
                isOpen
                  ? "text-black dark:text-white bg-neutral-100 dark:bg-neutral-900"
                  : "text-neutral-500"
              )}
              aria-label="Toggle social menu"
            >
              <AtSign className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
