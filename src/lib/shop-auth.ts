export function getShopDisplayToken(): string | undefined {
  return process.env.SHOP_DISPLAY_TOKEN?.trim() || undefined;
}

export function isShopDisplayEnabled(): boolean {
  return Boolean(getShopDisplayToken());
}

export function verifyShopToken(request: Request): boolean {
  const expected = getShopDisplayToken();
  if (!expected) return false;

  const url = new URL(request.url);
  const headerToken = request.headers.get("x-shop-token");
  const queryToken = url.searchParams.get("token");

  return headerToken === expected || queryToken === expected;
}
