"use server";

import { Message } from "ai";
import { cookies } from "next/headers";

const DAILY_TOKENS = 10;
const TOKEN_EXPIRY_DAYS = 1;
const TEXT_MESSAGE_THRESHOLD = 15; // Number of text messages per token
const IMAGE_TOKEN_COST = 1; // Token cost for each image

interface TokenData {
  tokens: number;
  lastUpdated: string;
  textMessageCount: number;
}

export async function getTokens(): Promise<TokenData> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("chatTokens");

  const defaultData: TokenData = {
    tokens: DAILY_TOKENS,
    lastUpdated: new Date().toISOString(),
    textMessageCount: 0,
  };

  if (!tokenCookie) {
    await setTokenData(defaultData);
    return defaultData;
  }

  const data: TokenData = JSON.parse(tokenCookie.value);
  const now = new Date();
  const lastUpdate = new Date(data.lastUpdated);

  // Reset if it's a new day
  if (
    now.getDate() !== lastUpdate.getDate() ||
    now.getMonth() !== lastUpdate.getMonth() ||
    now.getFullYear() !== lastUpdate.getFullYear()
  ) {
    await setTokenData(defaultData);
    return defaultData;
  }

  return data;
}

async function setTokenData(data: TokenData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("chatTokens", JSON.stringify(data), {
    expires: new Date(Date.now() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function processMessageToken(message: Message): Promise<boolean> {
  const tokenData = await getTokens();

  if (tokenData.tokens <= 0) {
    return false;
  }

  let tokensNeeded = 0;

  // Calculate tokens needed for images
  const imageCount =
    message.experimental_attachments?.filter((attachment) =>
      attachment.contentType?.startsWith("image/"),
    ).length ?? 0;

  if (imageCount > 0) {
    tokensNeeded += imageCount * IMAGE_TOKEN_COST;
  }

  // Update text message count and calculate tokens needed
  const newTextMessageCount = tokenData.textMessageCount + 1;
  if (newTextMessageCount >= TEXT_MESSAGE_THRESHOLD) {
    tokensNeeded += 1;
    tokenData.textMessageCount = 0; // Reset counter after using a token
  } else {
    tokenData.textMessageCount = newTextMessageCount;
  }

  if (tokensNeeded > tokenData.tokens) {
    return false;
  }

  // Update tokens if needed
  if (tokensNeeded > 0) {
    tokenData.tokens -= tokensNeeded;
    await setTokenData(tokenData);
  } else {
    // Just update the text message count
    await setTokenData(tokenData);
  }

  return true;
}
