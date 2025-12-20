"use client";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CursorProvider } from "@/context/CursorContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <HeroUIProvider>
        <CursorProvider>{children}</CursorProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
