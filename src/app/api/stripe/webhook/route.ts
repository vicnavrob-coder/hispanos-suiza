import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { headers } from "next/headers";

// Disable body parsing — Stripe needs the raw body
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("[webhook] signature failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  console.log(`[webhook] ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.metadata?.email;
      const customerId = session.customer as string;
      console.log(`[webhook] Nueva suscripción: ${email} (${customerId})`);
      // Future: persist to Supabase/DB here
      break;
    }

    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;
      const status = sub.status;
      console.log(`[webhook] Suscripción ${status}: ${customerId}`);
      // Future: update DB here
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[webhook] Pago fallido: ${invoice.customer_email}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
