"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";

import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageExtension = (lang: string) => {
    switch (lang) {
      case "javascript":
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        return javascript();
      case "python":
      case "py":
        return python();
      case "css":
        return css();
      case "html":
        return html();
      case "json":
        return json();
      case "markdown":
      case "md":
        return markdown();
      case "sql":
        return sql();
      default:
        return javascript();
    }
  };

  return (
    <div className="relative rounded-lg border bg-muted">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-sm text-muted-foreground">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <CodeMirror
        value={code}
        theme={dracula}
        extensions={[getLanguageExtension(language)]}
        editable={false}
        className="text-sm"
      />
    </div>
  );
}
