import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Menu",
  description:
    "Explore The Fat Chef's full dinner menu featuring USDA Prime steaks, fresh Chilean Sea Bass, Maine lobster, handcrafted pastas, and signature cocktails in Rogers, Arkansas.",
  openGraph: {
    title: "Our Menu | The Fat Chef",
    description:
      "USDA Prime steaks, fresh seafood, and handcrafted cuisine. View our full dinner and cocktail menu.",
    images: [
      {
        url: "https://static.wixstatic.com/media/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg",
        width: 1920,
        height: 1043,
        alt: "The Fat Chef Prime Steak and Shrimp",
      },
    ],
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
