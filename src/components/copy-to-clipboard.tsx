"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props {
  text: string;
  code?: boolean;
}

export function CopyButton({ text, code }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        "rounded-md p-2 transition-colors hover:bg-muted",
        code
          ? "absolute right-2 top-2 rounded-md bg-zinc-700 p-2 transition-colors hover:bg-zinc-600"
          : "",
      )}
      title="Copy to clipboard"
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
