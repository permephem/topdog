import { NextResponse } from "next/server";
import { acknowledgeAlert } from "@/lib/callback-store";
import { isShopDisplayEnabled, verifyShopToken } from "@/lib/shop-auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  if (!isShopDisplayEnabled()) {
    return NextResponse.json({ error: "Shop display is not configured." }, { status: 503 });
  }

  if (!verifyShopToken(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const alert = await acknowledgeAlert(id);

  if (!alert) {
    return NextResponse.json({ error: "Alert not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, alert });
}
