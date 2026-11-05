/**
 * Crear una foto placeholder profesional para el CV de ejemplo
 */

const { jsPDF } = require('jspdf');

// Crear una imagen placeholder profesional
function createPhotoPlaceholder() {
  // Crear un pequeño canvas para la foto placeholder
  const canvas = require('canvas');
  const canvasObj = canvas.createCanvas(300, 300);
  const ctx = canvasObj.getContext('2d');

  // Fondo gradiente profesional
  const gradient = ctx.createLinearGradient(0, 0, 300, 300);
  gradient.addColorStop(0, '#1a365d');
  gradient.addColorStop(1, '#3182ce');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 300);

  // Silueta de persona (círculo para cabeza y rectángulo para hombros)
  ctx.fillStyle = '#ffffff';

  // Cabeza (círculo)
  ctx.beginPath();
  ctx.arc(150, 110, 45, 0, Math.PI * 2);
  ctx.fill();

  // Hombros (semi-círculo)
  ctx.beginPath();
  ctx.ellipse(150, 220, 80, 60, 0, 0, Math.PI);
  ctx.fill();

  // Texto "FOTO"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('FOTO', 150, 270);
  ctx.font = '14px Arial';
  ctx.fillText('PROFESIONAL', 150, 290);

  return canvasObj.toDataURL('image/jpeg', 0.9);
}

try {
  const photoData = createPhotoPlaceholder();
  const fs = require('fs');

  // Guardar como módulo exportable
  fs.writeFileSync(
    __dirname + '/photo-placeholder.js',
    `module.exports = ${JSON.stringify(photoData)};`
  );

  console.log('✅ Foto placeholder creada!');
} catch (error) {
  console.error('Error:', error.message);
  console.log('⚠️  Instalando canvas: npm install canvas');
}
