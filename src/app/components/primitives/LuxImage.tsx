"use client";

import Image, { ImageProps } from "next/image";

export default function LuxImage({ alt, className, style, fill, ...rest }: ImageProps) {
  const wrapperClass = fill ? "absolute inset-0" : "relative w-full h-full";
  
  return (
    <div className={`${wrapperClass} overflow-hidden group`}>
      <Image
        alt={alt || ""}
        fill={fill}
        {...rest}
        className={`object-cover w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] ${className || ''}`}
        style={{
          filter: "contrast(1.15) saturate(1.15) brightness(0.85)",
          ...style
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.8)] via-[rgba(5,5,5,0.1)] to-[rgba(5,5,5,0.4)] pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-[#C5A059] opacity-[0.07] pointer-events-none mix-blend-color" />
      <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.7)] pointer-events-none" />
    </div>
  );
}
