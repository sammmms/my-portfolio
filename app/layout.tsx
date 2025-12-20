import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import BottomNav from "@/components/BottomNav";
import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sam's portfolio",
  description: "portfolio of samuel onasis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-black text-foreground transition-colors duration-500`}
      >
        <Providers>
          <Cursor />
          <main className="max-w-5xl mx-auto px-6 pt-10 pb-24 lg:pb-10 relative min-h-screen flex flex-col">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
