#!/usr/bin/env node

/**
 * Script para crear el producto y precio de suscripción Premium en Stripe
 *
 * Uso:
 *   node scripts/create-premium-subscription.js
 *
 * Este script crea:
 * - Producto: "Plan Premium HispanosEnSuiza"
 * - Precio: 2.99 CHF/mes (recurrente)
 */

require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createPremiumSubscription() {
  try {
    console.log('🚀 Creando producto Premium en Stripe...\n');

    // 1. Crear el producto
    const product = await stripe.products.create({
      name: 'Plan Premium HispanosEnSuiza',
      description: 'Acceso completo a todas las herramientas premium: comparadores multi-cantón, gráficos visuales, exportar PDF, histórico, alertas, búsquedas ilimitadas y CVs ilimitados.',
      metadata: {
        plan: 'premium',
        monthly_price: '2.99',
        currency: 'CHF',
        features: JSON.stringify([
          'Comparadores multi-cantón/ciudad',
          'Gráficos visuales y análisis avanzados',
          'Exportar informes PDF ilimitados',
          'Histórico y guardado de cálculos',
          'Alertas y notificaciones personalizadas',
          'Búsquedas ilimitadas',
          'CVs ilimitados',
          'Consejos personalizados de ahorro',
          'Soporte prioritario'
        ])
      }
    });

    console.log('✅ Producto creado:');
    console.log(`   ID: ${product.id}`);
    console.log(`   Nombre: ${product.name}`);
    console.log(`   Descripción: ${product.description}\n`);

    // 2. Crear el precio recurrente mensual
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 299, // 2.99 CHF = 299 céntimos
      currency: 'chf',
      recurring: {
        interval: 'month',
        interval_count: 1,
      },
      metadata: {
        plan: 'premium',
        display_name: 'Premium Mensual'
      }
    });

    console.log('✅ Precio creado:');
    console.log(`   ID: ${price.id}`);
    console.log(`   Cantidad: ${price.unit_amount / 100} ${price.currency.toUpperCase()}`);
    console.log(`   Recurrencia: ${price.recurring.interval_count} ${price.recurring.interval}\n`);

    // 3. Mostrar las variables de entorno para .env.local
    console.log('📝 Variables de entorno a añadir en .env.local:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`STRIPE_PRODUCT_ID_PREMIUM=${product.id}`);
    console.log(`STRIPE_PRICE_ID_PREMIUM=${price.id}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('✨ Producto Premium creado exitosamente en Stripe!\n');
    console.log('💡 Copia las variables de entorno de arriba a tu archivo .env.local\n');

    return { product, price };

  } catch (error) {
    console.error('❌ Error creando producto Premium:', error.message);
    if (error.type) {
      console.error(`   Tipo de error: ${error.type}`);
    }
    process.exit(1);
  }
}

// Ejecutar script
createPremiumSubscription()
  .then(() => {
    console.log('✅ Script completado.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error fatal:', err);
    process.exit(1);
  });
