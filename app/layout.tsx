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
  metadataBase: new URL("https://wsnsam.my.id"),
  title: {
    default: "Samuel Onasis – Frontend Engineer (React & Next.js)",
    template: "%s | Samuel Onasis",
  },
  description:
    "Frontend Engineer specializing in React, Next.js, and modern web technologies. Showcasing real-world projects, systems, and UI-focused solutions.",
  keywords: [
    "Frontend Engineer Portfolio",
    "React Developer Portfolio",
    "Next.js Developer",
    "Web Developer Indonesia",
    "UI Engineer",
  ],
  authors: [{ name: "Samuel Onasis" }],
  creator: "Samuel Onasis",
  openGraph: {
    title: "Samuel Onasis – Frontend Engineer (React & Next.js)",
    description:
      "Frontend Engineer specializing in React, Next.js, and modern web technologies. Showcasing real-world projects, systems, and UI-focused solutions.",
    url: "https://wsnsam.my.id",
    siteName: "Samuel Onasis – Frontend Engineer (React & Next.js)",
    images: [
      {
        url: "https://wsnsam.my.id/assets/logo.jpg",
        width: 1200,
        height: 630,
        alt: "sam's portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Onasis – Frontend Engineer (React & Next.js)",
    description:
      "Frontend Engineer specializing in React, Next.js, and modern web technologies. Showcasing real-world projects, systems, and UI-focused solutions.",
    creator: "@wsn_samm",
    images: ["https://wsnsam.my.id/assets/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/logo_transparent.png",
  },
};

import StarBackground from "@/components/StarBackground";

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
          <StarBackground />
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
