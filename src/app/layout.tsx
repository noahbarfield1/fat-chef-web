import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

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
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#070707] text-[#F0EBE1]">
        <Nav />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
