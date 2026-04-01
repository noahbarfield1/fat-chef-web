import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Book your table at The Fat Chef, Rogers, Arkansas. Fine dining Wednesday through Saturday, 5–9 PM. Reserve online via OpenTable or call 479.202.5106.",
  openGraph: {
    title: "Reserve a Table | The Fat Chef",
    description:
      "Book a table at The Fat Chef in Rogers, AR. Fine dining Wed–Sat, 5–9 PM. Reserve online or call 479.202.5106.",
    images: [
      {
        url: "https://static.wixstatic.com/media/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg",
        width: 1920,
        height: 1043,
        alt: "The Fat Chef — Reserve a Table",
      },
    ],
  },
};

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
