import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

// inter font initilization
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bot | AI-Powered Assistant",
  description: "Engage with a modern AI chatbot built with Google Gemini, delivering interactive and intelligent responses.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
