import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";
import { headers } from "next/headers";
import { activateSubscription, cancelSubscription, recordTranslation } from "@/lib/cv-usage";
import { StripeCheckoutMetadataSchema, validateData } from "@/lib/validation-schemas";
import { logger } from "@/lib/logger";
import { savePurchase, sendTemplateEmail } from "@/lib/stripe-helpers";

// Disable body parsing — Stripe needs the raw body
export const runtime = "nodejs";

// CV-related plans
const CV_PLANS = ["cv-single", "cv-monthly", "cv-yearly"];
const TEMPLATE_PRODUCT = "template-emigrar-suiza";

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
    const error = err instanceof Error ? err : new Error(message);
    logger.error("Webhook signature verification failed", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  logger.webhook("Stripe", event.type, true);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Validate metadata
        const metadataValidation = validateData(StripeCheckoutMetadataSchema, session.metadata || {});
        if (!metadataValidation.success) {
          logger.warn("Invalid Stripe checkout metadata", { errors: metadataValidation.errors });
        }

        const email = session.customer_details?.email || session.metadata?.email;
        const customerId = session.customer as string;
        const plan = session.metadata?.plan || "premium";
        const product = session.metadata?.product;

        logger.info("Stripe checkout completed", { email, plan, customerId, product });

        if (email) {
          // Handle Template Emigrar Suiza
          if (product === TEMPLATE_PRODUCT) {
            const customerName = session.metadata?.customer_name || session.customer_details?.name || "";
            const downloadId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

            try {
              // Save purchase
              await savePurchase({
                id: downloadId,
                sessionId: session.id,
                email,
                name: customerName,
                amount: session.amount_total! / 100,
                currency: session.currency!,
                timestamp: new Date().toISOString(),
                product: TEMPLATE_PRODUCT,
              });

              // Send download email
              await sendTemplateEmail({
                to: email,
                name: customerName,
                downloadId,
              });

              logger.info("Template purchase processed", { email, downloadId });
            } catch (error) {
              logger.error("Error processing template purchase", error instanceof Error ? error : new Error(String(error)));
            }
          }
          // Handle CV plans
          else if (CV_PLANS.includes(plan)) {
            if (plan === "cv-single") {
              // Single CV purchase - record as paid translation credit
              await recordTranslation(email, true);
              logger.info("CV single purchase recorded", { email, plan });
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
              logger.info("CV subscription activated", { email, plan, expiresAt: expiresAt.toISOString() });
            }
          } else {
            // General premium subscription
            logger.info("Premium subscription activated", { email, plan });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const plan = sub.metadata?.plan;

        logger.info("Subscription cancelled", { customerId, plan });

        // Get customer email
        const stripe = getStripe();
        const customer = await stripe.customers.retrieve(customerId);

        if (customer && !customer.deleted && "email" in customer && customer.email) {
          if (plan && CV_PLANS.includes(plan)) {
            await cancelSubscription(customer.email);
            logger.info("CV subscription cancelled", { email: customer.email, plan });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const status = sub.status;
        const plan = sub.metadata?.plan;

        logger.info("Subscription status updated", { customerId, status, plan });

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
        logger.warn("Payment failed", { customerEmail: invoice.customer_email });
        // Could send notification email here
        break;
      }
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    logger.error("Webhook processing error", error);
    // Don't return error to Stripe - we got the event, just failed to process
  }

  return NextResponse.json({ received: true });
}
