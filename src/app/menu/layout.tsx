import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dinner & Bar Menu",
  description: "Explore The Fat Chef's award-winning dinner menu, featuring USDA Prime Steaks, fresh seafood, scratch-made pasta, and a curated wine list.",
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
