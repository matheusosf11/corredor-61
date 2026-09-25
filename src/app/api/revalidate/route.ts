import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) return false;
  const fromQuery = request.nextUrl.searchParams.get("secret");
  const fromHeader = request.headers.get("x-webhook-secret");
  return fromQuery === expected || fromHeader === expected;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("sanity", "max");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
