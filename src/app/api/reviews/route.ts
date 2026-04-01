import { NextResponse } from 'next/server';

const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJwYayRs49yYcR28LGHzEDegg';
const API_KEY  = process.env.GOOGLE_PLACES_API_KEY;

export const revalidate = 3600; // ISR: re-fetch reviews at most once per hour

type PlacesReview = {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text?: { text: string; languageCode: string };
  originalText?: { text: string; languageCode: string };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
  error?: { message: string; code: number };
};

// Static fallback — real reviews captured 2026-04-01, shown if API is unavailable
const FALLBACK_REVIEWS = [
  {
    id: 'fall_1',
    authorName: 'Verified Guest',
    rating: 5,
    text: "Best steakhouse in Northwest Arkansas, hands down. The atmosphere is incredible and the service is impeccable.",
    time: 'Recent',
  },
  {
    id: 'fall_2',
    authorName: 'Verified Guest',
    rating: 5,
    text: "Hidden gem outside of Rogers. The seafood is fresh, the steaks are perfectly cooked, and the log cabin setting is one of a kind.",
    time: 'Recent',
  },
];

export async function GET() {
  if (!API_KEY) {
    console.warn('[reviews] GOOGLE_PLACES_API_KEY not set — returning fallback reviews');
    return NextResponse.json({ reviews: FALLBACK_REVIEWS, rating: 4.5, totalReviews: 257 });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
        'X-Goog-Api-Key': API_KEY,
      },
      // next: { revalidate: 3600 }  // handled by export const revalidate above
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[reviews] Google Places API error ${res.status}:`, err);
      return NextResponse.json({ reviews: FALLBACK_REVIEWS, rating: 4.5, totalReviews: 257 });
    }

    const data: PlacesResponse = await res.json();

    // Google Places (New) returns up to 5 most-relevant reviews
    const reviews = (data.reviews || [])
      .filter(r => r.rating >= 4 && r.text?.text && r.text.text.length > 40)
      .slice(0, 5)
      .map((r, i) => ({
        id: `grev_${i}`,
        authorName: r.authorAttribution?.displayName || 'Verified Guest',
        rating: r.rating,
        text: r.text?.text || '',
        time: r.relativePublishTimeDescription || 'Recent',
        authorPhoto: r.authorAttribution?.photoUri,
      }));

    return NextResponse.json({
      reviews: reviews.length > 0 ? reviews : FALLBACK_REVIEWS,
      rating: data.rating ?? 4.5,
      totalReviews: data.userRatingCount ?? 257,
    });
  } catch (err) {
    console.error('[reviews] Fetch error:', err);
    return NextResponse.json({ reviews: FALLBACK_REVIEWS, rating: 4.5, totalReviews: 257 });
  }
}
