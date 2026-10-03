"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, ConsentValue } from "./CookieBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export default function Analytics() {
  const [consent, setConsent] = useState<ConsentValue>(null);

  useEffect(() => {
    setConsent(getConsent());

    const handler = (e: Event) => {
      setConsent((e as CustomEvent<ConsentValue>).detail);
    };
    window.addEventListener("hs-consent-change", handler);
    return () => window.removeEventListener("hs-consent-change", handler);
  }, []);

  if (!GA_ID || consent !== "all") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}
