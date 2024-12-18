import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

// inter font initilization
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snap2Code - AI-Powered UI Code Generator",
  description: "Transform UI screenshots into production-ready code using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
