import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book your luxury dining experience at The Fat Chef in Rogers, AR. Confirm your table for USDA Prime Steaks and fresh seafood.",
};

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
