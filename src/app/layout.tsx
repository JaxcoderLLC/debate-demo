import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "../context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IncentiVibe",
  description:
    "IncentiVibe is a decentralized social event protocol and platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white`}
      >
        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-50">
          <Navbar />
        </header>
        <div className="isolate mt-20 text-center">
          {/* <Providers>{children}</Providers> */}
          {children}
        </div>
        {/* Footer */}
        <footer>
          <div id="console" className="text-red">
            <p></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
