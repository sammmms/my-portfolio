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
    default: "Samuel Onasis – Frontend Engineer Portfolio",
    template: "%s | Samuel Onasis",
  },
  description:
    "Frontend Engineer specializing in React, Next.js, and modern web technologies. Showcasing real-world projects, systems, and UI-focused solutions.",
  keywords: [
    "Samuel Onasis",
    "Samuel Onasis Portfolio",
    "Samuel Onasis Frontend Engineer",
    "Samuel Onasis React Developer",
    "Samuel Onasis Next.js Developer",
    "Samuel Onasis Web Developer",
    "Samuel Onasis Software Engineer",
    "Samuel Onasis TypeScript",
    "Samuel Onasis Tailwind CSS",
    "Samuel Onasis UI/UX",
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
    icon: [
      { url: "/assets/favicon.ico" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/assets/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/assets/favicon.ico",
    apple: [{ url: "/assets/apple-touch-icon.png" }],
  },
};

import StarBackground from "@/components/StarBackground";

import Footer from "@/components/Footer";

// ... existing imports ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Samuel Onasis",
        url: "https://wsnsam.my.id",
        sameAs: [
          "https://www.linkedin.com/in/samuel-onasis",
          "https://github.com/sammmms",
        ],
        jobTitle: "Frontend Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Bizapps",
        },
      }),
    }}
  />;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-black text-foreground transition-colors duration-500`}
      >
        <Providers>
          <StarBackground />
          <Cursor />
          <main className="max-w-5xl mx-auto px-6 pt-24 md:pt-10 pb-10 md:pb-24 relative min-h-screen flex flex-col">
            {children}
            <Footer />
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
