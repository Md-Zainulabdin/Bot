"use client";

import useSWR from "swr";
import Link from "next/link";
import { Bot } from "lucide-react";

import { Button } from "@/components/ui/button";

const TEXT_MESSAGE_THRESHOLD = 15;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Navbar = () => {
  const { data: tokenData } = useSWR("/api/token", fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
    revalidateOnFocus: true,
  });

  const messagesUntilNextToken = tokenData
    ? TEXT_MESSAGE_THRESHOLD - tokenData.textMessageCount
    : 0;

  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-background shadow-md">
      <nav className="m-auto flex items-center justify-between px-10 py-6">
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
        >
          <Link href="/">
            <Bot className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="group font-medium">
            <div className="flex flex-col items-end">
              <span className="text-lg">
                {tokenData ? `${tokenData.tokens} Tokens` : "Loading..."}
              </span>
              {tokenData && tokenData.textMessageCount > 0 && (
                <span className="text-sm text-muted-foreground">
                  {messagesUntilNextToken} msg
                  {messagesUntilNextToken !== 1 ? "s" : ""} until next token
                </span>
              )}
            </div>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
