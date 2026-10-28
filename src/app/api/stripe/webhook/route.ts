import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";
import { headers } from "next/headers";
import { activateSubscription, cancelSubscription, recordTranslation } from "@/lib/cv-usage";

// Disable body parsing — Stripe needs the raw body
export const runtime = "nodejs";

// CV-related plans
const CV_PLANS = ["cv-single", "cv-monthly", "cv-yearly"];

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
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

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_details?.email || session.metadata?.email;
        const customerId = session.customer as string;
        const plan = session.metadata?.plan || "premium";

        console.log(`[webhook] Checkout completado: ${email} - plan: ${plan}`);

        if (email) {
          // Handle CV plans
          if (CV_PLANS.includes(plan)) {
            if (plan === "cv-single") {
              // Single CV purchase - record as paid translation credit
              await recordTranslation(email, true);
              console.log(`[webhook] CV single purchase recorded for ${email}`);
            } else {
              // CV subscription (monthly/yearly)
              const expiresAt = new Date();
              if (plan === "cv-monthly") {
                expiresAt.setMonth(expiresAt.getMonth() + 1);
              } else {
                expiresAt.setFullYear(expiresAt.getFullYear() + 1);
              }

              await activateSubscription(
                email,
                customerId,
                plan === "cv-monthly" ? "monthly" : "yearly",
                expiresAt.toISOString()
              );
              console.log(`[webhook] CV subscription activated for ${email}`);
            }
          } else {
            // General premium subscription
            console.log(`[webhook] Premium subscription for ${email}`);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const plan = sub.metadata?.plan;

        console.log(`[webhook] Subscription cancelled: ${customerId}`);

        // Get customer email
        const stripe = getStripe();
        const customer = await stripe.customers.retrieve(customerId);

        if (customer && !customer.deleted && "email" in customer && customer.email) {
          if (plan && CV_PLANS.includes(plan)) {
            await cancelSubscription(customer.email);
            console.log(`[webhook] CV subscription cancelled for ${customer.email}`);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const status = sub.status;
        const plan = sub.metadata?.plan;

        console.log(`[webhook] Subscription ${status}: ${customerId}`);

        // If subscription became active after payment retry
        if (status === "active" && plan && CV_PLANS.includes(plan)) {
          const stripe = getStripe();
          const customer = await stripe.customers.retrieve(customerId);

          if (customer && !customer.deleted && "email" in customer && customer.email) {
            // Calculate expiration based on plan type
            const expiresAt = new Date();
            if (plan === "cv-monthly") {
              expiresAt.setMonth(expiresAt.getMonth() + 1);
            } else {
              expiresAt.setFullYear(expiresAt.getFullYear() + 1);
            }

            await activateSubscription(
              customer.email,
              customerId,
              plan === "cv-monthly" ? "monthly" : "yearly",
              expiresAt.toISOString()
            );
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[webhook] Pago fallido: ${invoice.customer_email}`);
        // Could send notification email here
        break;
      }
    }
  } catch (err) {
    console.error("[webhook] Processing error:", err);
    // Don't return error to Stripe - we got the event, just failed to process
  }

  return NextResponse.json({ received: true });
}
