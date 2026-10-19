import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cita UNIA · HispanosEnSuiza",
  robots: { index: false, follow: false },
};

export default function UniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
