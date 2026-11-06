#!/usr/bin/env node

/**
 * Script para crear el Gist de usuarios en GitHub
 *
 * Uso:
 *   node scripts/create-users-gist.js
 *
 * Este script crea un Gist privado para almacenar:
 * - Usuarios registrados
 * - Estado premium
 * - IDs de Stripe
 */

require('dotenv').config({ path: '.env.local' });
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function createUsersGist() {
  try {
    console.log('🚀 Creando Gist de usuarios en GitHub...\n');

    const initialData = {
      users: [],
      metadata: {
        created: new Date().toISOString(),
        description: 'HispanosEnSuiza - User authentication and premium status',
        version: '1.0.0'
      }
    };

    const gist = await octokit.gists.create({
      description: 'HispanosEnSuiza - Users Database',
      public: false,
      files: {
        'users.json': {
          content: JSON.stringify(initialData.users, null, 2)
        },
        'README.md': {
          content: `# HispanosEnSuiza - Users Database

Este Gist almacena:
- Usuarios registrados (email, nombre, imagen)
- Estado premium (isPremium)
- IDs de cliente Stripe
- IDs de suscripción

## Estructura de datos:

\`\`\`json
[
  {
    "id": "user_xxx",
    "email": "usuario@email.com",
    "name": "Usuario Nombre",
    "image": "https://...",
    "isPremium": false,
    "stripeCustomerId": "cus_xxx",
    "subscriptionId": "sub_xxx",
    "subscriptionStatus": "active",
    "createdAt": "2026-11-05T12:00:00.000Z"
  }
]
\`\`\`

## Campos:
- **id**: ID único del usuario
- **email**: Email del usuario (único)
- **name**: Nombre del usuario
- **image**: URL de la imagen de perfil
- **isPremium**: true si tiene suscripción activa
- **stripeCustomerId**: ID del cliente en Stripe
- **subscriptionId**: ID de la suscripción en Stripe
- **subscriptionStatus**: Estado de la suscripción (active, canceled, past_due, etc.)
- **createdAt**: Fecha de creación del usuario

Creado: ${new Date().toISOString()}
`
        }
      }
    });

    console.log('✅ Gist creado exitosamente!');
    console.log(`   ID: ${gist.data.id}`);
    console.log(`   URL: ${gist.data.html_url}\n`);

    console.log('📝 Variable de entorno para .env.local:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`USERS_GIST_ID=${gist.data.id}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('💡 Añade esta variable a tu archivo .env.local\n');

    return gist.data;

  } catch (error) {
    console.error('❌ Error creando Gist:', error.message);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    process.exit(1);
  }
}

// Ejecutar script
createUsersGist()
  .then(() => {
    console.log('✅ Script completado.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error fatal:', err);
    process.exit(1);
  });
