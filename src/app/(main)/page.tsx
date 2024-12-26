"use client";

import { useChat } from "ai/react";

import Chat from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";

export default function Home() {
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    stop,
    error,
  } = useChat();

  return (
    <div>
      {/* Chat Messages Component */}
      <div className="grid h-screen w-full place-items-center">
        <ChatMessages isLoading={isLoading} error={error} messages={messages} />
      </div>

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

