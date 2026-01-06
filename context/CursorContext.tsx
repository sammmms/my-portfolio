"use client";

import { createContext, useContext, useState } from "react";

type CursorVariant = "default" | "theme-switch";

interface CursorContextType {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
  nextTheme: string | null;
  setNextTheme: (theme: string | null) => void;
  isNavigating: boolean;
  setIsNavigating: (isNavigating: boolean) => void;
  navigationDirection: "up" | "down" | null;
  setNavigationDirection: (direction: "up" | "down" | null) => void;
  navigationId: number;
  setNavigationId: (id: number) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [nextTheme, setNextTheme] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationDirection, setNavigationDirection] = useState<
    "up" | "down" | null
  >(null);
  const [navigationId, setNavigationId] = useState(0);

  return (
    <CursorContext.Provider
      value={{
        variant,
        setVariant,
        nextTheme,
        setNextTheme,
        isNavigating,
        setIsNavigating,
        navigationDirection,
        setNavigationDirection,
        navigationId,
        setNavigationId,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
