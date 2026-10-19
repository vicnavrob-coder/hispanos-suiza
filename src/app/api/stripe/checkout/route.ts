import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { email, nombre, plan = "premium" } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    if (plan !== "premium") {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 });
    }
    const priceId = process.env.STRIPE_PRICE_ID_PREMIUM!;

    const origin = req.headers.get("origin") || "https://hispanosensuiza.ch";

    const stripe = getStripe();

    // Check if customer already exists in Stripe
    const existing = await stripe.customers.list({ email, limit: 1 });
    let customerId: string;

    if (existing.data.length > 0) {
      customerId = existing.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email,
        name: nombre || undefined,
        metadata: { source: "hispanosensuiza.ch" },
      });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/suscripcion/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/precios`,
      locale: "es",
      subscription_data: {
        metadata: {
          email,
          plan,
          source: "hispanosensuiza.ch",
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("[stripe/checkout]", err);
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
