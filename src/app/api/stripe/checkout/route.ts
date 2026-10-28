import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Plan configuration with Stripe price IDs
const PLANS: Record<string, { priceId: string; mode: "subscription" | "payment"; successPath: string }> = {
  // General premium subscription
  premium: {
    priceId: process.env.STRIPE_PRICE_ID_PREMIUM || "",
    mode: "subscription",
    successPath: "/suscripcion/exito",
  },
  // CV Translator plans
  "cv-single": {
    priceId: process.env.STRIPE_PRICE_ID_CV_SINGLE || "",
    mode: "payment",
    successPath: "/herramientas/traductor-cv?payment=success",
  },
  "cv-monthly": {
    priceId: process.env.STRIPE_PRICE_ID_CV_MONTHLY || "",
    mode: "subscription",
    successPath: "/herramientas/traductor-cv?payment=success",
  },
  "cv-yearly": {
    priceId: process.env.STRIPE_PRICE_ID_CV_YEARLY || "",
    mode: "subscription",
    successPath: "/herramientas/traductor-cv?payment=success",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { email, nombre, plan = "premium", returnUrl } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const planConfig = PLANS[plan];
    if (!planConfig) {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 });
    }

    if (!planConfig.priceId) {
      console.error(`[stripe/checkout] Missing price ID for plan: ${plan}`);
      return NextResponse.json({ error: "Configuración de plan incompleta" }, { status: 500 });
    }

    const origin = req.headers.get("origin") || "https://hispanosensuiza.ch";
    const successUrl = returnUrl || `${origin}${planConfig.successPath}`;
    const cancelUrl = returnUrl || `${origin}/precios`;

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

    // Build session config based on mode
    const sessionConfig: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      customer: customerId,
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      mode: planConfig.mode,
      success_url: `${successUrl}${successUrl.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      locale: "es",
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        email,
        plan,
        source: "hispanosensuiza.ch",
      },
    };

    // Add subscription metadata for subscription mode
    if (planConfig.mode === "subscription") {
      sessionConfig.subscription_data = {
        metadata: {
          email,
          plan,
          source: "hispanosensuiza.ch",
        },
      };
    }

    // Add payment intent metadata for payment mode
    if (planConfig.mode === "payment") {
      sessionConfig.payment_intent_data = {
        metadata: {
          email,
          plan,
          source: "hispanosensuiza.ch",
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("[stripe/checkout]", err);
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
