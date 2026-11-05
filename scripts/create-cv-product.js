#!/usr/bin/env node
/**
 * Script para crear el producto "CV Generator" en Stripe
 * Precio: 6.99 CHF (pago único)
 */

const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

// Leer .env.local manualmente
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');

  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
}

loadEnv();

async function createCVProduct() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error('❌ Error: STRIPE_SECRET_KEY no encontrado en .env.local');
    process.exit(1);
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-12-18.acacia',
  });

  console.log('🔧 Creando producto en Stripe...\n');

  try {
    // 1. Crear el producto
    const product = await stripe.products.create({
      name: 'CV Suizo - Generador Profesional',
      description: 'Generación de CV profesional en formato suizo estándar. Descarga inmediata en PDF de alta calidad.',
      active: true,
      metadata: {
        source: 'hispanosensuiza.ch',
        type: 'cv-generator',
      },
    });

    console.log('✅ Producto creado:');
    console.log(`   ID: ${product.id}`);
    console.log(`   Nombre: ${product.name}`);
    console.log('');

    // 2. Crear el precio (6.99 CHF - pago único)
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 699, // 6.99 CHF en centavos
      currency: 'chf',
      billing_scheme: 'per_unit',
      metadata: {
        source: 'hispanosensuiza.ch',
      },
    });

    console.log('✅ Precio creado:');
    console.log(`   Price ID: ${price.id}`);
    console.log(`   Precio: ${(price.unit_amount / 100).toFixed(2)} ${price.currency.toUpperCase()}`);
    console.log(`   Tipo: One-time payment`);
    console.log('');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ PRODUCTO CREADO EXITOSAMENTE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📋 Añade esta línea a tu .env.local:');
    console.log('');
    console.log(`STRIPE_PRICE_ID_CV_GENERATOR=${price.id}`);
    console.log('');
    console.log('🔗 Ver en Stripe Dashboard:');
    console.log(`   https://dashboard.stripe.com/products/${product.id}`);
    console.log('');

    return { product, price };
  } catch (error) {
    console.error('❌ Error al crear el producto:', error.message);

    if (error.type === 'StripeAuthenticationError') {
      console.error('\n⚠️  Verifica que STRIPE_SECRET_KEY sea válido y esté en modo LIVE');
    }

    process.exit(1);
  }
}

// Ejecutar
createCVProduct()
  .then(() => {
    console.log('✨ Script completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
