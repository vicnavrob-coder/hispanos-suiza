#!/usr/bin/env tsx
/**
 * Setup script para obtener tokens de Facebook & Instagram
 *
 * Este script ayuda a configurar la publicación automática en redes sociales.
 *
 * Uso:
 *   npm run setup:social-media
 *
 * Requisitos previos:
 *   1. Tener cuenta hispanosensuiza@gmail.com
 *   2. Ser admin de la página de Facebook "HispanosEnSuiza"
 *   3. Tener cuenta de Instagram Business conectada a la página
 */

import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  🇨🇭 Setup: Publicación Automática en Redes Sociales   ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('Este script te ayudará a configurar la publicación automática');
  console.log('de historias en Facebook e Instagram.\n');

  console.log('📋 PASOS A SEGUIR:\n');
  console.log('1. Ve a https://developers.facebook.com/tools/explorer/');
  console.log('2. Selecciona la app "HispanosEnSuiza" (o crea una nueva)');
  console.log('3. Genera un User Access Token con estos permisos:');
  console.log('   ✓ pages_show_list');
  console.log('   ✓ pages_read_engagement');
  console.log('   ✓ pages_manage_posts');
  console.log('   ✓ pages_manage_metadata');
  console.log('   ✓ instagram_basic');
  console.log('   ✓ instagram_content_publish\n');

  const userToken = await question('4. Pega el User Access Token aquí: ');

  if (!userToken.trim()) {
    console.log('\n❌ Token vacío. Abortando.');
    rl.close();
    return;
  }

  console.log('\n🔍 Obteniendo información de páginas...\n');

  try {
    // Obtener páginas del usuario
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${userToken}`
    );

    if (!pagesResponse.ok) {
      const error = await pagesResponse.json();
      console.log('❌ Error al obtener páginas:', error);
      rl.close();
      return;
    }

    const pagesData = await pagesResponse.json();

    if (!pagesData.data || pagesData.data.length === 0) {
      console.log('❌ No se encontraron páginas. Asegúrate de ser admin de la página HispanosEnSuiza.');
      rl.close();
      return;
    }

    console.log('\n📄 Páginas encontradas:\n');
    pagesData.data.forEach((page: any, index: number) => {
      console.log(`${index + 1}. ${page.name} (ID: ${page.id})`);
    });

    const pageIndex = await question('\n¿Qué página quieres usar? (número): ');
    const selectedPage = pagesData.data[parseInt(pageIndex) - 1];

    if (!selectedPage) {
      console.log('❌ Página no válida.');
      rl.close();
      return;
    }

    console.log(`\n✅ Seleccionada: ${selectedPage.name}`);
    console.log(`   Page ID: ${selectedPage.id}`);
    console.log(`   Page Token: ${selectedPage.access_token.substring(0, 20)}...`);

    // Obtener cuenta de Instagram Business conectada
    console.log('\n🔍 Buscando cuenta de Instagram conectada...\n');

    const igResponse = await fetch(
      `https://graph.facebook.com/v18.0/${selectedPage.id}?fields=instagram_business_account&access_token=${selectedPage.access_token}`
    );

    let instagramAccountId = 'PENDING';

    if (igResponse.ok) {
      const igData = await igResponse.json();
      if (igData.instagram_business_account) {
        instagramAccountId = igData.instagram_business_account.id;
        console.log(`✅ Instagram Business Account ID: ${instagramAccountId}`);
      } else {
        console.log('⚠️  No se encontró cuenta de Instagram Business conectada.');
        console.log('   → Conecta una cuenta de Instagram Business a tu página de Facebook');
        console.log('   → Docs: https://www.facebook.com/business/help/898752960195806\n');
      }
    }

    // Convertir token a long-lived (60 días)
    console.log('\n🔄 Convirtiendo token a long-lived (60 días)...\n');

    const appId = await question('Ingresa App ID (de https://developers.facebook.com/apps/): ');
    const appSecret = await question('Ingresa App Secret: ');

    const longLivedResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${selectedPage.access_token}`
    );

    let finalPageToken = selectedPage.access_token;

    if (longLivedResponse.ok) {
      const longLivedData = await longLivedResponse.json();
      finalPageToken = longLivedData.access_token;
      console.log('✅ Token convertido a long-lived');
    } else {
      console.log('⚠️  No se pudo convertir a long-lived, usando token original');
    }

    // Actualizar .env.local
    console.log('\n💾 Actualizando .env.local...\n');

    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf-8');

    // Actualizar valores
    envContent = envContent.replace(
      /FACEBOOK_ACCESS_TOKEN=.*/,
      `FACEBOOK_ACCESS_TOKEN=${finalPageToken}`
    );
    envContent = envContent.replace(
      /FACEBOOK_PAGE_ID=.*/,
      `FACEBOOK_PAGE_ID=${selectedPage.id}`
    );
    envContent = envContent.replace(
      /INSTAGRAM_ACCESS_TOKEN=.*/,
      `INSTAGRAM_ACCESS_TOKEN=${finalPageToken}`
    );
    envContent = envContent.replace(
      /INSTAGRAM_BUSINESS_ACCOUNT_ID=.*/,
      `INSTAGRAM_BUSINESS_ACCOUNT_ID=${instagramAccountId}`
    );

    fs.writeFileSync(envPath, envContent);

    console.log('✅ Archivo .env.local actualizado\n');
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║  ✅ Configuración completada exitosamente               ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    console.log('📝 Resumen:\n');
    console.log(`   Facebook Page: ${selectedPage.name}`);
    console.log(`   Page ID: ${selectedPage.id}`);
    console.log(`   Instagram Account ID: ${instagramAccountId}`);
    console.log(`   Token expira en: ~60 días\n`);
    console.log('🎉 Ahora puedes publicar historias y se compartirán automáticamente!');
    console.log('   Prueba creando una historia en /historias-reales\n');
    console.log('⚠️  IMPORTANTE: Renueva el token cada 60 días ejecutando este script de nuevo.\n');

  } catch (error) {
    console.log('\n❌ Error:', error);
  }

  rl.close();
}

main();
