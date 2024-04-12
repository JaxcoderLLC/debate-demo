import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import Providers from "../context/Providers";
import React from "react";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IncentiVibe",
  description:
    "IncentiVibe is a decentralized social event protocol and platform.",
};

export default function RootLayout({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${inter.className} flex flex-col h-max justify-between text-gray-700`}
        >
          {/* Header */}
          <header className="absolute inset-x-0 top-0 z-50">
            <Navbar />
          </header>
          <div className="isolate mt-20">{children}</div>
          {/* Footer */}
          <footer className="static inset-x-0 bottom-0">
            <Footer />
          </footer>
        </body>
      </Providers>
    </html>
  );
}
