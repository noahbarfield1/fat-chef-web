import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SmoothScroller from "./components/primitives/SmoothScroller";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thefatchefnwa.com"),
  title: { template: "%s | The Fat Chef", default: "The Fat Chef — Fine Dining in Rogers, AR" },
  description: "Award-winning fine dining in Rogers, Arkansas. USDA Prime steaks, fresh seafood, and handcrafted cuisine. Voted Best Fine Dining & Best Steakhouse in NWA.",
  keywords: "fine dining Rogers AR, steakhouse NWA, seafood Northwest Arkansas, The Fat Chef",
  openGraph: {
    siteName: "The Fat Chef",
    type: "website",
    locale: "en_US",
    images: [{
      url: "https://static.wixstatic.com/media/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg",
      width: 1920, height: 1043,
      alt: "The Fat Chef Restaurant Interior",
    }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "The Fat Chef",
    "url": "https://www.thefatchefnwa.com",
    "telephone": "+14792025106",
    "email": "TheFatChefNWA@gmail.com",
    "priceRange": "$$$",
    "servesCuisine": ["American", "Steakhouse", "Seafood"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "14550 E HWY 12",
      "addressLocality": "Rogers",
      "addressRegion": "AR",
      "postalCode": "72756",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "17:00",
        "closes": "21:00"
      }
    ],
    "hasMap": "https://www.google.com/maps/dir//The+Fat+Chef,+14550+E+Hwy+12,+Rogers,+AR+72756"
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#070707] text-[#F0EBE1]" suppressHydrationWarning>
        <SmoothScroller>
          <Nav />
          {children}
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}
