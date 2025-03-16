"use client";
import { Geist, Geist_Mono, Nobile } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

const nobile = Nobile({
  subsets: ['latin'],
  variable: "--font-nobile",
  display: "swap",
  weight: "400",
  preload: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nobile.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}