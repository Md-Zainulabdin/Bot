import { Message, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { getTokens, processMessageToken } from "@/lib/tokenManager";
import { SYSTEM_PROMPT } from "@/lib/prompt";
import { revalidatePath } from "next/cache";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid request format or no messages provided", {
        status: 400,
      });
    }

    const lastMessage = messages[messages.length - 1];
    const tokenData = await getTokens();

    if (tokenData.tokens <= 0) {
      return new Response("No tokens available. Please try again tomorrow.", {
        status: 403,
      });
    }

    const canProcessToken = await processMessageToken(lastMessage);
    if (!canProcessToken) {
      const errorMessage = generateErrorMessage(lastMessage, tokenData);
      return new Response(errorMessage, { status: 403 });
    }

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: SYSTEM_PROMPT,
    });

    // Revalidate the path after processing is complete
    revalidatePath("/");

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Route error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

function generateErrorMessage(
  message: Message,
  tokenData: { textMessageCount: number },
): string {
  const imageCount =
    message.experimental_attachments?.filter((attachment) =>
      attachment.contentType?.startsWith("image/"),
    ).length ?? 0;

  let errorMessage = "Insufficient tokens.";
  if (imageCount > 0) {
    errorMessage += ` You need ${imageCount} token(s) for images.`;
  }
  if (tokenData.textMessageCount >= 15) {
    errorMessage += " You need 1 token for text messages.";
  }
  return errorMessage;
}
