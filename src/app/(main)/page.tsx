"use client";

import { useChat } from "ai/react";

import Chat from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

export default function Home() {
  const { messages, input, handleSubmit, handleInputChange, isLoading, stop } =
    useChat();

  return (
    <div>
      {/* Chat Messages Component */}
      <ChatMessages messages={messages} />

      {/* Chat Input Component */}
      <Chat
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        stop={stop}
      />
    </div>
  );
}
{/* <div className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center gap-6 p-8 text-center">
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
      </div> */}