import { NextResponse } from 'next/server';

export async function GET() {
  const mockReviews = [
    {
      id: "rev_1",
      authorName: "Sarah Jenkins",
      rating: 5,
      text: "Absolutely the best steak I've had in Northwest Arkansas. The atmosphere is incredible and the waitstaff treats you like family. Highly recommend the Porterhouse!",
      time: "2 weeks ago"
    },
    {
      id: "rev_2",
      authorName: "Michael R.",
      rating: 5,
      text: "A hidden gem! The Chilean Sea Bass melted in my mouth. We came for our anniversary and the ambiance was perfect. You truly feel like you're in a high-end luxury restaurant.",
      time: "1 month ago"
    },
    {
      id: "rev_3",
      authorName: "David C.",
      rating: 5,
      text: "From the Crab Rangoon Dip to the 16oz Ribeye, every single bite was phenomenal. The new cocktail menu is also top tier. We will definitely be back.",
      time: "2 months ago"
    }
  ];

  return NextResponse.json({ reviews: mockReviews });
}
