import type { Metadata } from "next";
import { Geist, Geist_Mono, Nobile } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const nobile = Nobile({
  subsets: ['latin'],
  variable: "--font-nobile",
  display: "swap",
  weight: "400"
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nemori",
  description: "hi",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Image src="/icon.png" alt="Site Icon" width={100} height={100} />
        {children}
      </body>
    </html>
  );
}
