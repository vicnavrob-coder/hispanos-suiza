import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/productos/*/descargar/',
          '/unia/proponer/',
          '/unia/elegir/',
          '/_next/',
          '/static/',
        ],
      },
      // GoogleBot específico - full access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/productos/*/descargar/',
          '/unia/proponer/',
          '/unia/elegir/',
        ],
      },
      // Bingbot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/productos/*/descargar/',
          '/unia/proponer/',
          '/unia/elegir/',
        ],
      },
    ],
    sitemap: 'https://hispanosensuiza.ch/sitemap.xml',
  };
}
