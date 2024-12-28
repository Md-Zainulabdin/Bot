import { Message, streamText } from "ai";
import { google } from "@ai-sdk/google";

import { getTokens, useToken as checkTokenUsage } from "@/lib/tokenManager";
import { SYSTEM_PROMPT } from "@/lib/prompt";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Check available tokens
  const availableTokens = await getTokens();
  if (availableTokens <= 0) {
    return new Response("No tokens available. Please try again tomorrow.", {
      status: 403,
    });
  }

  // Estimate token usage (this is a rough estimate, you might want to implement a more accurate method)
  const estimatedTokenUsage = messages.reduce(
    (acc: number, msg: Message) => acc + msg.content.length,
    0,
  );

  // Use a token if necessary
  if (!checkTokenUsage(estimatedTokenUsage)) {
    return new Response("Token usage exceeded. Please try a shorter message.", {
      status: 403,
    });
  }

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
    system: SYSTEM_PROMPT,
  });

  return result.toDataStreamResponse();
}
