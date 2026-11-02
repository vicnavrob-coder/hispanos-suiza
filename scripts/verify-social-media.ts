#!/usr/bin/env tsx
/**
 * Script de verificación de redes sociales
 *
 * Verifica que los tokens de Facebook e Instagram sean válidos
 * y que el sistema esté configurado correctamente.
 *
 * Uso:
 *   npm run verify:social-media
 */

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  🔍 Verificando Configuración de Redes Sociales         ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Verificar variables de entorno
  const fbToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const fbPageId = process.env.FACEBOOK_PAGE_ID;
  const igToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const igAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  let allGood = true;

  // 1. Verificar variables
  console.log('1️⃣ Verificando variables de entorno...\n');

  if (!fbToken || fbToken === 'PENDING') {
    console.log('   ❌ FACEBOOK_ACCESS_TOKEN no configurado');
    allGood = false;
  } else {
    console.log(`   ✅ FACEBOOK_ACCESS_TOKEN configurado (${fbToken.substring(0, 20)}...)`);
  }

  if (!fbPageId || fbPageId === 'PENDING') {
    console.log('   ❌ FACEBOOK_PAGE_ID no configurado');
    allGood = false;
  } else {
    console.log(`   ✅ FACEBOOK_PAGE_ID configurado (${fbPageId})`);
  }

  if (!igToken || igToken === 'PENDING') {
    console.log('   ❌ INSTAGRAM_ACCESS_TOKEN no configurado');
    allGood = false;
  } else {
    console.log(`   ✅ INSTAGRAM_ACCESS_TOKEN configurado`);
  }

  if (!igAccountId || igAccountId === 'PENDING') {
    console.log('   ⚠️  INSTAGRAM_BUSINESS_ACCOUNT_ID no configurado (opcional)');
  } else {
    console.log(`   ✅ INSTAGRAM_BUSINESS_ACCOUNT_ID configurado (${igAccountId})`);
  }

  if (!allGood) {
    console.log('\n❌ Faltan variables de entorno.');
    console.log('   Ejecuta: npm run setup:social-media\n');
    return;
  }

  // 2. Verificar token de Facebook
  console.log('\n2️⃣ Verificando token de Facebook...\n');

  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${fbPageId}?fields=name,fan_count,followers_count&access_token=${fbToken}`
    );

    if (!fbResponse.ok) {
      const error = await fbResponse.json();
      console.log('   ❌ Token de Facebook inválido o expirado');
      console.log(`   Error: ${error.error?.message || 'Desconocido'}`);
      console.log('   Ejecuta: npm run setup:social-media\n');
      allGood = false;
    } else {
      const data = await fbResponse.json();
      console.log('   ✅ Token de Facebook válido');
      console.log(`   📄 Página: ${data.name}`);
      console.log(`   👥 Seguidores: ${data.followers_count || 0}`);
      console.log(`   ❤️  Me gusta: ${data.fan_count || 0}`);
    }
  } catch (error) {
    console.log('   ❌ Error al verificar Facebook:', error);
    allGood = false;
  }

  // 3. Verificar Instagram (si está configurado)
  if (igAccountId && igAccountId !== 'PENDING') {
    console.log('\n3️⃣ Verificando cuenta de Instagram...\n');

    try {
      const igResponse = await fetch(
        `https://graph.facebook.com/v18.0/${igAccountId}?fields=username,followers_count,media_count&access_token=${igToken}`
      );

      if (!igResponse.ok) {
        const error = await igResponse.json();
        console.log('   ❌ No se pudo verificar Instagram');
        console.log(`   Error: ${error.error?.message || 'Desconocido'}`);
      } else {
        const data = await igResponse.json();
        console.log('   ✅ Cuenta de Instagram conectada');
        console.log(`   👤 Usuario: @${data.username}`);
        console.log(`   👥 Seguidores: ${data.followers_count || 0}`);
        console.log(`   📸 Posts: ${data.media_count || 0}`);
      }
    } catch (error) {
      console.log('   ⚠️  Error al verificar Instagram:', error);
    }
  } else {
    console.log('\n3️⃣ Instagram no configurado (opcional)\n');
    console.log('   Para habilitar Instagram:');
    console.log('   1. Conecta una cuenta de Instagram Business a tu página de Facebook');
    console.log('   2. Ejecuta: npm run setup:social-media\n');
  }

  // 4. Verificar función de publicación
  console.log('\n4️⃣ Verificando función de publicación...\n');

  try {
    const { generateSocialCaption } = await import('../src/lib/social-media');

    const testHistoria = {
      titulo: 'Test de publicación',
      contenido: 'Esta es una historia de prueba para verificar que el sistema funciona correctamente.',
      autorNombre: 'Usuario Test',
      autorPais: 'España',
      ciudadSuiza: 'Zúrich',
      tema: 'trabajo',
      slug: 'test-publicacion',
      id: 'test',
      autorEmail: 'test@test.com',
      publishedAt: new Date().toISOString(),
    };

    const caption = generateSocialCaption(testHistoria);

    if (caption.includes('Nueva historia') && caption.includes('HispanosEnSuiza')) {
      console.log('   ✅ Función generateSocialCaption funciona correctamente');
      console.log('\n   📝 Vista previa del caption generado:');
      console.log('   ' + '─'.repeat(60));
      caption.split('\n').forEach(line => console.log(`   ${line}`));
      console.log('   ' + '─'.repeat(60));
    } else {
      console.log('   ⚠️  La función generateSocialCaption puede tener problemas');
    }
  } catch (error) {
    console.log('   ❌ Error al verificar función de publicación:', error);
    allGood = false;
  }

  // Resumen final
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  if (allGood) {
    console.log('║  ✅ Sistema configurado correctamente                    ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    console.log('🎉 Todo listo! Las historias se publicarán automáticamente en:');
    console.log('   • Facebook');
    if (igAccountId && igAccountId !== 'PENDING') {
      console.log('   • Instagram');
    }
    console.log('\n📝 Crea una historia en /historias-reales para probar.\n');
  } else {
    console.log('║  ⚠️  Hay problemas de configuración                      ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    console.log('🔧 Ejecuta: npm run setup:social-media para configurar.\n');
  }
}

main().catch(console.error);
