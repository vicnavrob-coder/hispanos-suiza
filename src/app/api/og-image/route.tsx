import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const titulo = searchParams.get('titulo') || 'Nueva Historia';
    const autor = searchParams.get('autor') || 'Hispanos en Suiza';
    const ciudad = searchParams.get('ciudad') || 'Suiza';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#DC2626',
            backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
            padding: '60px',
          }}
        >
          {/* Logo / Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                fontSize: '36px',
                marginRight: '12px',
              }}
            >
              🇨🇭
            </span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              HISPANOS EN SUIZA
            </span>
          </div>

          {/* Título de la historia */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '50px 60px',
              width: '90%',
              maxWidth: '900px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h1
              style={{
                fontSize: titulo.length > 50 ? '48px' : '64px',
                fontWeight: 'bold',
                color: '#1F2937',
                textAlign: 'center',
                margin: '0 0 30px 0',
                lineHeight: 1.2,
              }}
            >
              {titulo}
            </h1>

            {/* Metadata */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                fontSize: '24px',
                color: '#6B7280',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                👤 {autor}
              </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                📍 {ciudad}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: '40px',
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '600',
            }}
          >
            HispanosEnSuiza.ch
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
