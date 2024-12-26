"use client";

import Image from "next/image";
import type { Message } from "ai";
import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Markdown } from "@/components/chat/markdown";
import { CopyButton } from "@/components/copy-to-clipboard";

interface ChatMessagesProps {
  messages: Message[];
  error?: Error;
  isLoading: boolean;
}

export function ChatMessages({
  messages,
  error,
  isLoading,
}: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current === null) return;
    scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center gap-6 p-8 text-center">
        <div>
          <div className="flex items-center justify-center gap-2">
            <div className="size-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="size-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
          <p className="max-w-3xl text-lg">
            This is an open source chatbot template built with Next.js and the
            AI SDK by Vercel. It uses the{" "}
            <code className="rounded bg-muted px-1">streamText</code> function
            in the server and the{" "}
            <code className="rounded bg-muted px-1">useChat</code> hook on the
            client to create a seamless chat experience.
          </p>
          <br />
          <p className="text-md">
            You can learn more about the AI SDK by visiting the{" "}
            <a
              href="https://sdk.vercel.ai/docs"
              className="underline underline-offset-4 hover:text-primary"
            >
              docs
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="flex h-[650px] w-full flex-col items-start overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700"
    >
      <div className="mx-auto w-full max-w-3xl px-4">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}

        {isLoading && (
          <Message role="assistant" content="Thinking..." id="loading" />
        )}

        {error && (
          <Message
            role="assistant"
            content="Something went wrong. Please try again."
            id="error"
          />
        )}
      </div>
    </ScrollArea>
  );
}

function Message({ role, content, experimental_attachments, id }: Message) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        {role === "assistant" ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-2 pr-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {role === "assistant" ? "AI Assistant" : "You"}
          </p>
          {role === "assistant" && id !== "loading" && (
            <CopyButton text={content} code={false} />
          )}
        </div>
        <div className="mt-2">
          {experimental_attachments
            ?.filter((attachment) =>
              attachment.contentType?.startsWith("image/"),
            )
            .map((attachment, index) => (
              <Image
                key={`${index}`}
                src={attachment.url}
                alt={attachment.name ?? `Attachment ${index + 1}`}
                className="h-auto max-w-full rounded"
                width={500}
                height={500}
              />
            ))}
        </div>
        <div className="prose-container">
          {" "}
          {/* Changed from prose class */}
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
