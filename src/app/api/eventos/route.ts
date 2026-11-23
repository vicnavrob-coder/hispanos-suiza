import { NextResponse } from 'next/server';
import { getEventos } from '@/lib/eventos';

export async function GET() {
  try {
    const data = await getEventos();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en /api/eventos:', error);
    return NextResponse.json(
      { error: 'Error obteniendo eventos', eventos: [], total: 0 },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; // Revalidar cada 1 hora
