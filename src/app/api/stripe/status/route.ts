import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ active: false });

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (!customers.data.length) return NextResponse.json({ active: false });

    const customerId = customers.data[0].id;
    const subs = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    const active = subs.data.length > 0;
    const plan = active ? (subs.data[0].metadata?.plan || "premium") : null;
    const renewsAt = active
      ? new Date(subs.data[0].billing_cycle_anchor * 1000).toISOString()
      : null;

    return NextResponse.json({ active, plan, renewsAt, customerId });
  } catch {
    return NextResponse.json({ active: false });
  }
}
