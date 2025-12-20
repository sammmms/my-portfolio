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
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [nextTheme, setNextTheme] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <CursorContext.Provider
      value={{
        variant,
        setVariant,
        nextTheme,
        setNextTheme,
        isNavigating,
        setIsNavigating,
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
