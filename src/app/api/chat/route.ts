import { streamText } from "ai";
import { google } from "@ai-sdk/google";

import { SYSTEM_PROMPT } from "@/lib/prompt";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
    system: SYSTEM_PROMPT,
  });

  return result.toDataStreamResponse();
}
