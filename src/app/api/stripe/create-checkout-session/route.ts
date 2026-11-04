import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { email, nombre } = await req.json();

    const stripe = getStripe();

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: "Template Notion: Checklist Completa Emigrar a Suiza",
              description: "Sistema completo con 50 pasos, 7 guías profesionales, tracker de gastos y 50+ contactos verificados",
              images: ["https://hispanosensuiza.ch/og-template.jpg"],
            },
            unit_amount: 1900, // CHF 19.00 en centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/productos/template-emigrar-suiza/compra-exitosa?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/productos/template-emigrar-suiza`,
      customer_email: email,
      metadata: {
        customer_name: nombre || "",
        product: "template-emigrar-suiza",
        email: email || "",
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Error creando sesión de Stripe:", error);
    return NextResponse.json(
      { error: error.message || "Error al crear sesión de pago" },
      { status: 500 }
    );
  }
}
