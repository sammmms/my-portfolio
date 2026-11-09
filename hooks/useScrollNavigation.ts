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

  // Touch tracking refs
  const touchStartYRef = useRef<number | null>(null);
  const isTouchDeviceRef = useRef(false);

  useEffect(() => {
    isTouchDeviceRef.current =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    // DESKTOP SCROLL HANDLER:
    // Only triggers automatically on NON-touch devices
    const handleScroll = () => {
      if (isTouchDeviceRef.current) return;
      if (isNavigatingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // Position-based cancellation for desktop
      if (
        navigationTimeoutRef.current &&
        pendingDirectionRef.current === "down"
      ) {
        const distanceToBottom = scrollHeight - scrollTop - clientHeight;
        if (distanceToBottom > 50) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          return;
        }
      }

      if (
        navigationTimeoutRef.current &&
        pendingDirectionRef.current === "up"
      ) {
        if (scrollTop > 50) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          return;
        }
      }

      const isBottom = scrollHeight - scrollTop <= clientHeight + threshold;

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

    // DESKTOP WHEEL HANDLER (Warp top)
    const handleWheel = (e: WheelEvent) => {
      if (isTouchDeviceRef.current) return;

      if (navigationTimeoutRef.current) {
        if (pendingDirectionRef.current === "up" && e.deltaY > 20) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          isNavigatingRef.current = false;
          return;
        }

        if (pendingDirectionRef.current === "down" && e.deltaY < -20) {
          clearTimeout(navigationTimeoutRef.current);
          navigationTimeoutRef.current = null;
          pendingDirectionRef.current = null;
          setIsNavigating(false);
          setNavigationDirection(null);
          isNavigatingRef.current = false;
          return;
        }
        return;
      }

      if (isNavigatingRef.current) return;

      const { scrollTop } = document.documentElement;

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

    // MOBILE TOUCH HANDLERS (Hold-scroll at bottom / top):
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || isNavigatingRef.current) return;

      const currentY = e.touches[0].clientY;
      const pullDistance = touchStartYRef.current - currentY; // > 0 when dragging upwards (trying to scroll further down)
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const isAtBottom = scrollHeight - scrollTop - clientHeight <= 25;
      const isAtTop = scrollTop <= 15;

      // BOTTOM HOLD-SCROLL (pulling up while at bottom)
      if (isAtBottom && pullDistance > 25 && nextPath) {
        if (!navigationTimeoutRef.current) {
          setIsNavigating(true);
          setNavigationDirection("down");
          pendingDirectionRef.current = "down";
          setNavigationId(Date.now());

          // Snappy hold duration on mobile: 700ms instead of 1500ms
          navigationTimeoutRef.current = setTimeout(() => {
            isNavigatingRef.current = true;
            setIsNavigating(false);
            setNavigationDirection(null);
            pendingDirectionRef.current = null;
            router.push(nextPath);
            navigationTimeoutRef.current = null;
          }, 700);
        }
      } else if (
        navigationTimeoutRef.current &&
        pendingDirectionRef.current === "down" &&
        pullDistance < 10
      ) {
        // User dragged finger back down -> Cancel!
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
        pendingDirectionRef.current = null;
        setIsNavigating(false);
        setNavigationDirection(null);
      }

      // TOP HOLD-SCROLL (pulling down while at top)
      if (isAtTop && pullDistance < -35 && prevPath) {
        if (!navigationTimeoutRef.current) {
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
          }, 700);
        }
      } else if (
        navigationTimeoutRef.current &&
        pendingDirectionRef.current === "up" &&
        pullDistance > -15
      ) {
        // User dragged finger back up -> Cancel!
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
        pendingDirectionRef.current = null;
        setIsNavigating(false);
        setNavigationDirection(null);
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;

      // If user lifts finger before 700ms hold completes -> CANCEL immediately
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
        pendingDirectionRef.current = null;
        setIsNavigating(false);
        setNavigationDirection(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
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
    setNavigationId,
  ]);
}
