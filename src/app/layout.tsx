import type { Metadata } from "next";
import { Inter, Fraunces, Tajawal } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darova-immobilier.ma";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Darova Immobilier — Agence immobilière à Casablanca",
    template: "%s | Darova Immobilier",
  },
  description:
    "Darova Immobilier, votre agence de référence à Casablanca pour l'achat, la vente et la location d'appartements, villas, maisons, bureaux, commerces et terrains. Estimation gratuite.",
  keywords: [
    "immobilier Casablanca",
    "agence immobilière Maroc",
    "appartement à vendre Casablanca",
    "villa à vendre Casablanca",
    "location appartement Casablanca",
    "estimation immobilière Maroc",
  ],
  authors: [{ name: "Darova Immobilier" }],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: siteUrl,
    siteName: "Darova Immobilier",
    title: "Darova Immobilier — Agence immobilière à Casablanca",
    description:
      "Votre partenaire de confiance pour l'achat, la vente et la location de biens immobiliers à Casablanca. معاك فكل خطوة نحو دارك",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Darova Immobilier" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darova Immobilier — Agence immobilière à Casablanca",
    description: "Achat, vente et location de biens immobiliers à Casablanca.",
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl, languages: { fr: siteUrl, ar: `${siteUrl}/ar` } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Darova Immobilier",
    image: `${siteUrl}/images/og-cover.jpg`,
    "@id": siteUrl,
    url: siteUrl,
    telephone: "+212522000000",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Boulevard Zerktouni",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    areaServed: {
      "@type": "City",
      name: "Casablanca",
    },
    sameAs: [
      "https://facebook.com/darovaimmobilier",
      "https://instagram.com/darovaimmobilier",
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} ${tajawal.variable}`}>
      <body className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
