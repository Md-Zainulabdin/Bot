import { getTokens } from "@/lib/tokenManager";

export async function GET() {
  const tokenData = await getTokens();
  return Response.json(tokenData);
}
