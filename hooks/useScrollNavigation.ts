"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCursor } from "@/context/CursorContext";

interface UseScrollNavigationProps {
  nextPath?: string;
  prevPath?: string;
  threshold?: number; // Pixel threshold from bottom/top to trigger
}

export function useScrollNavigation({
  nextPath,
  prevPath,
  threshold = 10,
}: UseScrollNavigationProps) {
  const router = useRouter();
  const { setIsNavigating } = useCursor();

  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // If already navigating (locked), ignore inputs
      if (isNavigatingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollYRef.current;
      const isScrollingUp = scrollY < lastScrollYRef.current;

      lastScrollYRef.current = scrollY;

      const isBottom = scrollHeight - scrollTop <= clientHeight + threshold;
      const isTop = scrollTop <= threshold;

      // START NAVIGATION LOGIC
      if ((isBottom && nextPath) || (isTop && prevPath)) {
        if (!navigationTimeoutRef.current) {
          // Start navigation sequence
          setIsNavigating(true);

          navigationTimeoutRef.current = setTimeout(() => {
            isNavigatingRef.current = true; // Lock
            setIsNavigating(false); // Stop loading animation (optional, or keep until route change)

            if (isBottom && nextPath) router.push(nextPath);
            else if (isTop && prevPath) router.push(prevPath);

            // Cleanup timeout ref after execution
            navigationTimeoutRef.current = null;
          }, 1500);
        }
      } else {
        // CANCEL NAVIGATION LOGIC
        // If user scrolls away from edge before timeout completes
        if (navigationTimeoutRef.current) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          setIsNavigating(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navigationTimeoutRef.current)
        clearTimeout(navigationTimeoutRef.current);
      setIsNavigating(false); // Ensure reset on unmount
    };
  }, [nextPath, prevPath, threshold, router, setIsNavigating]);
}
