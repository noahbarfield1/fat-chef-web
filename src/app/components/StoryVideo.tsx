"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const VIDEO_SRC = "/videos/fat-chef-story.mp4";
const POSTER    = "/videos/story-poster.jpg";

export default function StoryVideo() {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded]     = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = useCallback(() => {
    setPlaying(true);
    setEnded(false);
    // Small delay to let the video element mount / become visible
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 120);
  }, []);

  const handleEnded = useCallback(() => {
    setEnded(true);
    setPlaying(false);
  }, []);

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    handlePlay();
  }, [handlePlay]);

  return (
    <section
      className="w-full flex justify-center px-6 py-12 md:py-20"
      aria-label="Our story video"
    >
      <div className="w-full max-w-5xl">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-3">
            Our Story
          </p>
          <h2
            className="font-serif text-2xl md:text-3xl font-bold text-[#F0EBE1]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            A Hidden Gem in Northwest Arkansas
          </h2>
        </motion.div>

        {/* Video container — 16:9 aspect */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden bg-[#0a0a0a]"
          style={{ aspectRatio: "16 / 9" }}
        >
          {/* Poster image (always rendered as background) */}
          <Image
            src={POSTER}
            alt="The Fat Chef — Watch our story"
            fill
            className={`object-cover transition-opacity duration-700 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, 960px"
            priority={false}
          />

          {/* Dark gradient overlay on poster */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[rgba(0,0,0,0.35)] z-10"
              />
            )}
          </AnimatePresence>

          {/* Play button */}
          <AnimatePresence>
            {!playing && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={ended ? handleReplay : handlePlay}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 cursor-pointer group"
                aria-label={ended ? "Replay video" : "Play video"}
              >
                {/* Play circle */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[rgba(197,160,89,0.6)] group-hover:border-[#C5A059] transition-colors duration-300" />
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: "0 0 40px rgba(197,160,89,0.3), inset 0 0 20px rgba(197,160,89,0.1)" }}
                  />
                  {/* Triangle / replay icon */}
                  {ended ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#C5A059" className="relative z-10 ml-1">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  )}
                </div>

                {/* Label */}
                <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#C5A059] group-hover:text-[#E6C875] transition-colors duration-300">
                  {ended ? "Watch Again" : "Watch Our Story"}
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Actual video element */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER}
            playsInline
            preload="none"
            onEnded={handleEnded}
            controls={playing}
            className={`absolute inset-0 w-full h-full object-cover z-[5] transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Gold border accent */}
          <div className="absolute inset-0 pointer-events-none z-30 border border-[rgba(197,160,89,0.12)]" />
        </motion.div>
      </div>
    </section>
  );
}
