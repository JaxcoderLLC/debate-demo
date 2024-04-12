import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Debate & Donate",
  description:
    "Debate & Donate is a platform that allows you to donate to your favorite candidates and see how they perform in debates.",
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
          className={`${inter.className} flex flex-col min-h-screen justify-between text-gray-700`}
        >
          {/* Header */}
          <header>
            <Navbar />
          </header>
          <div className="isolate mt-20">{children}</div>
          {/* Footer */}
          <footer className="mt-auto">
            <Footer />
          </footer>
        </body>
      </Providers>
    </html>
  );
}
