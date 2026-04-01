"use client";

import { motion, Variants } from "framer-motion";

import { useEffect, useState } from "react";

export type Review = {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  time: string;
};

type ReviewsApiResponse = {
  reviews: Review[];
  rating?: number;
  totalReviews?: number;
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill={filled ? "#C5A059" : "none"}
    stroke="#C5A059"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(4.5);
  const [totalReviews, setTotalReviews] = useState(257);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then((data: ReviewsApiResponse) => {
        setReviews(data.reviews || []);
        if (data.rating) setRating(data.rating);
        if (data.totalReviews) setTotalReviews(data.totalReviews);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      className="w-full flex justify-center px-6 bg-[#080808]"
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      aria-label="Guest reviews"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-4">
            Guest Experiences
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F0EBE1] mb-4">
            What Our Guests Are Saying
          </h2>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-[rgba(197,160,89,0.2)] rounded-full">
            <GoogleIcon />
            <span className="font-sans text-[11px] tracking-widest uppercase text-[#8A7E6E]">
              {rating.toFixed(1)} Stars · {totalReviews}+ Google Reviews
            </span>
            <div className="flex items-center gap-0.5 ml-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= Math.round(rating)} />
              ))}
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[rgba(197,160,89,0.2)] border-t-[#C5A059] animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {reviews.map((review: Review) => (
              <motion.article
                key={review.id}
                variants={cardVariant}
                className="relative p-7 flex flex-col gap-4"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(197,160,89,0.10)",
                  borderRadius: "2px",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent)" }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} filled={i <= review.rating} />
                    ))}
                  </div>
                  <GoogleIcon />
                </div>

                <p className="font-sans text-[13px] leading-relaxed text-[#B8A99A] flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="pt-3 border-t border-[rgba(197,160,89,0.08)] flex items-center justify-between">
                  <p className="font-serif text-sm text-[#E6C875]">{review.authorName}</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-[#5A4E3E]">
                    {review.time}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/maps/search/The+Fat+Chef+Rogers+Arkansas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase text-[#C5A059] hover:text-[#E6C875] transition-colors"
          >
            <GoogleIcon />
            Read All Reviews on Google
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
