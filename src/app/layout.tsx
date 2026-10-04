import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import RegistroPrompt from "@/components/RegistroPrompt";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { BASE_URL, SITE_NAME, TWITTER_HANDLE, organizationSchema, websiteSchema } from "@/lib/seo";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "600", "700", "900"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — La guía real para vivir en Suiza`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Guías, experiencias reales y herramientas para españoles y latinoamericanos que viven o quieren vivir en Suiza. Vivienda, trabajo, seguros, banca y más.",
  keywords: ["vivir en suiza", "españoles en suiza", "emigrar a suiza", "latinoamericanos suiza", "trabajar en suiza", "guia suiza hispanohablantes"],
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
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
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
        <AuthProvider>
          <Analytics />
          <Header />
          <AuthModal />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <RegistroPrompt />
        </AuthProvider>
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
