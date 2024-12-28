import { cookies } from 'next/headers'

const DAILY_TOKENS = 10;
const TOKEN_EXPIRY_DAYS = 1;
const TOKEN_USAGE_THRESHOLD = 250;

export async function getTokens(): Promise<number> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('chatTokens');
  
  if (!tokenCookie) {
    setTokens(DAILY_TOKENS);
    return DAILY_TOKENS;
  }

  const { tokens, lastUpdated } = JSON.parse(tokenCookie.value);
  const now = new Date();
  const lastUpdate = new Date(lastUpdated);

  if (now.getDate() !== lastUpdate.getDate() || now.getMonth() !== lastUpdate.getMonth() || now.getFullYear() !== lastUpdate.getFullYear()) {
    setTokens(DAILY_TOKENS);
    return DAILY_TOKENS;
  }

  return tokens;
}

export async function setTokens(tokens: number): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('chatTokens', JSON.stringify({ tokens, lastUpdated: new Date().toISOString() }), {
    expires: new Date(Date.now() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

export async function useToken(tokenUsage: number): Promise<boolean> {
  if (tokenUsage <= TOKEN_USAGE_THRESHOLD) {
    return true;
  }

  const currentTokens = await getTokens();
  if (currentTokens > 0) {
    await setTokens(currentTokens - 1);
    return true;
  }

  return false;
}

