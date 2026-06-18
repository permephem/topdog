import { NextResponse } from "next/server";
import { createTestAlert } from "@/lib/callback-store";
import { isShopDisplayEnabled, verifyShopToken } from "@/lib/shop-auth";

export async function POST(request: Request) {
  if (!isShopDisplayEnabled()) {
    return NextResponse.json({ error: "Shop display is not configured." }, { status: 503 });
  }

  if (!verifyShopToken(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const alert = await createTestAlert();
  return NextResponse.json({ ok: true, alert });
}
