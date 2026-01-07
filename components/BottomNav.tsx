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
    <div className="fixed inset-0 z-50 pointer-events-none md:pointer-events-auto md:inset-auto md:bottom-0 md:left-0 md:right-0 md:border-t md:border-neutral-200 md:bg-white/80 md:dark:bg-black/80 md:dark:border-neutral-800 md:backdrop-blur-md">
      <div className="h-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between md:px-6 md:py-4">
        {/* Navigation Links - Mobile: Top Floating Pill, Desktop: standard list */}
        <nav className="pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:bg-transparent md:border-none md:shadow-none bg-white/80 dark:bg-black/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-full px-2 py-2 md:p-0 flex items-center gap-1 md:gap-6 overflow-x-auto no-scrollbar z-50">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 md:px-2 md:py-1 rounded-full md:rounded-none transition-colors",
                  isActive ? "text-black dark:text-white" : "text-neutral-500"
                )}
              >
                <motion.div
                  className="relative flex flex-col items-center"
                  initial="initial"
                  whileHover="hover"
                >
                  <motion.span
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-black dark:hover:text-white whitespace-nowrap z-10",
                      isActive && "font-bold text-black dark:text-white" // Bold for active
                    )}
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.1 },
                    }}
                    animate={isActive ? { scale: 1.2 } : { scale: 1 }} // Scale up active item
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.name}
                  </motion.span>

                  {/* Hover Underline - Desktop Only */}
                  {!isActive && (
                    <motion.span
                      className="hidden md:block absolute -bottom-1 left-0 right-0 h-px bg-black/50 dark:bg-white/50"
                      variants={{
                        initial: { scaleX: 0 },
                        hover: { scaleX: 1 },
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <>
                      {/* Desktop Active Underline */}
                      <motion.span
                        layoutId="navbar-underline"
                        className="hidden md:block absolute -bottom-1 left-0 right-0 h-px bg-black dark:bg-white"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    </>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Right: Social Icons - Mobile: Bottom Right FAB, Desktop: Inline */}
        <div
          className="pointer-events-auto fixed bottom-6 right-6 md:static"
          ref={menuRef}
        >
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

          {/* Mobile: Floating Toggle (FAB) */}
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
                "w-12 h-12 flex items-center justify-center rounded-full shadow-lg border border-neutral-200 dark:border-neutral-800 backdrop-blur-md transition-all duration-300",
                isOpen
                  ? "text-black dark:text-white bg-neutral-100 dark:bg-neutral-900 scale-110"
                  : "text-neutral-500 bg-white/90 dark:bg-black/90"
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
