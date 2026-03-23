"use client";

import { motion, Variants } from "framer-motion";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    date: "December 2024",
    text: "Absolutely the best dining experience in all of Northwest Arkansas. The filet mignon was cooked to perfection — melt-in-your-mouth tender. The lobster bisque should be illegal it's so good. Our server made the entire evening feel like a celebration. We will be back for every anniversary from now on.",
  },
  {
    name: "James T.",
    rating: 5,
    date: "October 2024",
    text: "The Fat Chef is in a league of its own. Fresh fish flown in daily, homemade bread that you can't stop eating, and desserts that warrant a separate visit. The husband-and-wife team run this place with genuine passion and it shows in every single dish. Best steakhouse in the state — period.",
  },
  {
    name: "Linda K.",
    rating: 5,
    date: "September 2024",
    text: "We drove two hours just to eat here and it was completely worth it. The surf and turf was unreal — perfectly seared ribeye paired with the most tender sea scallops I've ever had. The atmosphere is romantic and intimate without being stuffy. This is what fine dining is supposed to feel like.",
  },
  {
    name: "Robert & Carol D.",
    rating: 5,
    date: "August 2024",
    text: "Celebrated our 30th anniversary here on a recommendation and cannot thank whoever told us about this place enough. From the amuse-bouche to the crème brûlée, every course was flawless. The wine selection is curated thoughtfully and the staff are some of the most attentive we've ever encountered.",
  },
  {
    name: "Brandon H.",
    rating: 5,
    date: "July 2024",
    text: "As someone who has eaten at Michelin-starred restaurants in New York and Chicago, The Fat Chef competes at that level — in Rogers, Arkansas. The dry-aged steak is exceptional. The sides aren't afterthoughts; the truffle mac was one of the best things I've eaten this year. Reservations are a must.",
  },
  {
    name: "Michelle P.",
    rating: 5,
    date: "June 2024",
    text: "The best seafood in Arkansas is not just marketing — it's the truth. The Chilean sea bass was flawless. I also love that this is a locally-owned restaurant where the owners are present and care deeply about every guest's experience. Rare to find this level of quality and hospitality in the same place.",
  },
];

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
              4.5 Stars on Google
            </span>
            <div className="flex items-center gap-0.5 ml-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= 4} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reviews.map((review) => (
            <motion.article
              key={review.name}
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
                <p className="font-serif text-sm text-[#E6C875]">{review.name}</p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-[#5A4E3E]">
                  {review.date}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
