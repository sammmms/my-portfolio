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
  const { setIsNavigating, setNavigationDirection, setNavigationId } =
    useCursor();

  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingDirectionRef = useRef<"up" | "down" | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // If already navigating (locked), ignore inputs
      if (isNavigatingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollY = window.scrollY;

      // CANCELLATION (Position Based):
      // If pending 'down' (next), and we scroll UP away from bottom -> Cancel
      if (
        navigationTimeoutRef.current &&
        pendingDirectionRef.current === "down"
      ) {
        const distanceToBottom = scrollHeight - scrollTop - clientHeight;
        // If we move away from bottom (e.g. > 50px away), cancel
        if (distanceToBottom > 50) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          return;
        }
      }

      // If pending 'up' (warp), and we scroll DOWN away from top -> Cancel
      if (
        navigationTimeoutRef.current &&
        pendingDirectionRef.current === "up"
      ) {
        // If we move away from top (e.g. > 50px), cancel
        if (scrollTop > 50) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          return;
        }
      }

      lastScrollYRef.current = scrollY;

      const isBottom = scrollHeight - scrollTop <= clientHeight + threshold;

      // Standard scroll navigation for bottom
      if (isBottom && nextPath) {
        if (!navigationTimeoutRef.current) {
          setIsNavigating(true);
          setNavigationDirection("down");
          pendingDirectionRef.current = "down";
          setNavigationId(Date.now());

          navigationTimeoutRef.current = setTimeout(() => {
            isNavigatingRef.current = true;
            setIsNavigating(false);
            setNavigationDirection(null);
            pendingDirectionRef.current = null;
            router.push(nextPath);
            navigationTimeoutRef.current = null;
          }, 1500);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // If a navigation is PENDING (timeout active), check for cancellation
      if (navigationTimeoutRef.current) {
        // If navigating UP (warp) and user scrolls DOWN -> CANCEL
        if (pendingDirectionRef.current === "up" && e.deltaY > 20) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          isNavigatingRef.current = false;
          return;
        }

        // If navigating DOWN (bottom) and user scrolls UP -> CANCEL
        if (pendingDirectionRef.current === "down" && e.deltaY < -20) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          isNavigatingRef.current = false;
          return;
        }

        return; // Still pending, don't trigger new one
      }

      // If already navigating (locked/transitioning), ignore
      if (isNavigatingRef.current) return;

      const { scrollTop } = document.documentElement;

      // WARP TRIGGER (TOP): Check if at top/near-top and scrolling up
      if (scrollTop <= 10 && e.deltaY < -50 && prevPath) {
        setIsNavigating(true);
        setNavigationDirection("up");
        pendingDirectionRef.current = "up";
        setNavigationId(Date.now());

        navigationTimeoutRef.current = setTimeout(() => {
          isNavigatingRef.current = true;
          setIsNavigating(false);
          setNavigationDirection(null);
          pendingDirectionRef.current = null;
          router.push(prevPath);
          navigationTimeoutRef.current = null;
        }, 1500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel); // Add wheel listener

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (navigationTimeoutRef.current)
        clearTimeout(navigationTimeoutRef.current);
      setIsNavigating(false);
      setNavigationDirection(null);
      pendingDirectionRef.current = null;
    };
  }, [
    nextPath,
    prevPath,
    threshold,
    router,
    setIsNavigating,
    setNavigationDirection,
  ]);
}
