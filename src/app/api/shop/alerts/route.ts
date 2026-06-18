import { NextResponse } from "next/server";
import { getPendingAlerts } from "@/lib/callback-store";
import { isShopDisplayEnabled, verifyShopToken } from "@/lib/shop-auth";

export async function GET(request: Request) {
  if (!isShopDisplayEnabled()) {
    return NextResponse.json({ error: "Shop display is not configured." }, { status: 503 });
  }

  if (!verifyShopToken(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const alerts = await getPendingAlerts();
  return NextResponse.json({ alerts });
}
