"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Github, Linkedin } from "lucide-react";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "home", href: "/" },
    { name: "projects", href: "/projects" },
    { name: "experience", href: "/experience" },
  ];

  const socialItems = [
    { name: "github", href: "https://github.com/sammmms", icon: Github },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/samuel-onasis/",
      icon: Linkedin,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/80 dark:bg-black/80 dark:border-neutral-800 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Navigation Links */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black dark:hover:text-white relative",
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
        <div className="flex items-center gap-4">
          {socialItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
                aria-label={item.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
