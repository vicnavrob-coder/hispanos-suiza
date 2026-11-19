import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import RegistroPrompt from "@/components/RegistroPrompt";
import NewsletterPopup from "@/components/NewsletterPopup";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import SessionProvider from "@/components/SessionProvider";
import { BASE_URL, SITE_NAME, TWITTER_HANDLE, organizationSchema, websiteSchema } from "@/lib/seo";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "600", "700", "900"] });
// Temporarily disabled DM_Sans due to Turbopack bug in Next.js 16.3.8
// const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "Emigrar a Suiza 2026: Guía Completa + Calculadoras Gratuitas",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Emigra a Suiza sin perderte → Calculadora salario neto, buscador trabajo + vivienda, 50+ guías verificadas, comparador seguros. 100% gratis. Ahorra CHF 15.000/año ✓",
  keywords: [
    // Generales
    "vivir en suiza", "españoles en suiza", "emigrar a suiza", "latinoamericanos suiza",
    "trabajar en suiza", "guia suiza hispanohablantes", "mudarse a suiza",
    // Específicas
    "salario neto suiza", "calculadora salario suiza", "seguro médico suiza",
    "alquiler suiza", "piso zurich", "trabajo zurich", "trabajo ginebra",
    "permiso residencia suiza", "visa trabajo suiza", "impuestos suiza",
    // Long-tail
    "como emigrar a suiza desde españa", "cuanto se gana en suiza",
    "costo de vida suiza", "requisitos para trabajar en suiza",
    "mejores ciudades suiza para vivir", "expatriados suiza",
    // Long-tail específicos (high intent)
    "permiso B suiza requisitos", "permiso L suiza", "permiso C suiza",
    "buscar piso en zurich español", "alquilar apartamento ginebra",
    "ofertas empleo suiza español", "trabajos suiza sin aleman",
    "seguro basico suiza precio", "comparar seguros medicos suiza",
    "costo vivir zurich 2026", "salarios reales suiza",
    "abrir cuenta bancaria suiza extranjero",
    // Nacionalidades específicas
    "venezolanos en suiza", "colombianos en suiza", "argentinos en suiza",
    "mexicanos en suiza", "peruanos en suiza", "chilenos en suiza",
    // Problemas/necesidades específicas
    "primer mes en suiza que hacer", "registrarse comuna suiza",
    "encontrar medico familia suiza", "impuesto fuente suiza",
    "tercer pilar suiza explicacion", "deducciones fiscales suiza",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      "es":    BASE_URL,
      "es-ES": BASE_URL,
      "es-MX": BASE_URL,
      "es-AR": BASE_URL,
      "es-CO": BASE_URL,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["es_MX", "es_AR", "es_CO"],
    siteName: SITE_NAME,
    url: BASE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F6F3]">
        {/* Google Identity Services — solo se carga si hay Client ID configurado */}
        {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="afterInteractive"
          />
        )}
        <SessionProvider>
          <AuthProvider>
            <Analytics />
            <Header />
            <AuthModal />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
            <RegistroPrompt />
            <NewsletterPopup />
          </AuthProvider>
        </SessionProvider>
        {process.env.VERCEL === "1" && <VercelAnalytics />}
        {process.env.VERCEL === "1" && <SpeedInsights />}
      </body>
    </html>
  );
}
