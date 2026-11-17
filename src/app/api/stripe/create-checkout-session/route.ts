import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Configuración de productos
const PRODUCTS = {
  "template-emigrar-suiza": {
    name: "Template Notion: Checklist Completa Emigrar a Suiza",
    description: "Sistema completo con 50 pasos, 7 guías profesionales, tracker de gastos y 50+ contactos verificados",
    image: "https://hispanosensuiza.ch/og-template.jpg",
    price: 1900, // CHF 19.00 en centavos
    successUrl: "/productos/template-emigrar-suiza/compra-exitosa",
    cancelUrl: "/productos/template-emigrar-suiza",
  },
  "swiss-starter-pack": {
    name: "Swiss Starter Pack - Guía Completa Trabajar en Suiza",
    description: "eBook 70+ páginas, plantillas en alemán, calculadora salarios y directorio de recursos verificados",
    image: "https://hispanosensuiza.ch/og-swiss-pack.jpg",
    price: 6700, // CHF 67.00 en centavos
    successUrl: "/productos/swiss-starter-pack/compra-exitosa",
    cancelUrl: "/productos/swiss-starter-pack",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { email, nombre, productId = "template-emigrar-suiza" } = await req.json();

    // Validar que el producto existe
    const productConfig = PRODUCTS[productId as keyof typeof PRODUCTS];
    if (!productConfig) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: productConfig.name,
              description: productConfig.description,
              images: [productConfig.image],
              tax_code: "txcd_10000000", // General - Electronically Supplied Services
            },
            unit_amount: productConfig.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}${productConfig.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}${productConfig.cancelUrl}`,
      customer_email: email,
      metadata: {
        customer_name: nombre || "",
        product: productId,
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
