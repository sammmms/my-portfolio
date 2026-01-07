"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import { Moon, Sun, ArrowUp, ArrowDown } from "lucide-react";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const {
    variant,
    nextTheme,
    isNavigating,
    navigationDirection,
    navigationId,
  } = useCursor();

  const springConfig = { damping: 50, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the element or its parents are clickable
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest('[role="link"]');

      setIsHovering(!!isClickable);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: variant === "theme-switch" || isNavigating ? -24 : 0,
        y: variant === "theme-switch" || isNavigating ? -24 : 0,
      }}
    >
      <motion.div
        className="bg-white rounded-full flex items-center justify-center relative bg-opacity-90"
        animate={{
          width:
            variant === "theme-switch" || isNavigating
              ? 80
              : isHovering
              ? 48
              : 32,
          height:
            variant === "theme-switch" || isNavigating
              ? 80
              : isHovering
              ? 48
              : 32,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Loading Spinner */}
        <AnimatePresence>
          {isNavigating && (
            <motion.div
              key={navigationId}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 80 80"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  className="opacity-20"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
              </svg>
              {navigationDirection === "up" && (
                <ArrowUp className="w-8 h-8 text-black relative z-10" />
              )}
              {navigationDirection === "down" && (
                <ArrowDown className="w-8 h-8 text-black relative z-10" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isNavigating && variant === "theme-switch" && nextTheme && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-black font-bold text-[10px] uppercase tracking-widest flex flex-col items-center gap-1"
            >
              {nextTheme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span>{nextTheme}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
