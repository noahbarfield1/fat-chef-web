"use client";

import Image, { ImageProps } from "next/image";

/**
 * LuxImage — premium image wrapper
 *
 * Performance notes:
 * - CSS `filter` is removed from the <img> element. Applying filter on a
 *   composited layer forces the GPU to re-rasterize on EVERY scroll tick,
 *   causing consistent 15–20fps jank on mid-range mobile.
 * - The cinematic color treatment is achieved instead via stacked
 *   `mix-blend-mode` overlay divs, which are cheap flat composites that
 *   don't require rasterization of the underlying bitmap.
 */
export default function LuxImage({ alt, className, style, fill, ...rest }: ImageProps) {
  const wrapperClass = fill ? "absolute inset-0" : "relative w-full h-full";

  return (
    <div className={`${wrapperClass} overflow-hidden group`}>
      <Image
        alt={alt || ""}
        fill={fill}
        {...rest}
        className={`object-cover w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] ${className || ''}`}
        style={style}
      />
      {/* Cinematic darkening + slight warmth — no filter, pure blend overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.75)] via-[rgba(5,5,5,0.08)] to-[rgba(5,5,5,0.35)] pointer-events-none" />
      <div className="absolute inset-0 bg-[#C5A059] opacity-[0.06] pointer-events-none mix-blend-color" />
      <div className="absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.6)] pointer-events-none" />
    </div>
  );
}
