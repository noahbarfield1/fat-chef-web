import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Accolades from "../components/Accolades";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind The Fat Chef — a family-run fine dining destination born from a love of quality food in Rogers, Arkansas.",
};

export default function AboutPage() {
  return (
    <main className="pt-20 bg-[#070707]">

      {/* Page hero */}
      <div className="relative h-72 md:h-96 flex items-end pb-14 px-6 overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/019c1a_754d9b825c2f4dbd9fa38b3b3100f3ba~mv2.jpg/v1/fill/w_1220,h_681,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/019c1a_754d9b825c2f4dbd9fa38b3b3100f3ba~mv2.jpg"
          alt="The Fat Chef patio dining" fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[rgba(7,7,7,0.55)] to-[rgba(7,7,7,0.1)]" />
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-6xl">
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-2">The Family Behind the Food</p>
            <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F0EBE1]">Our Story</h1>
          </div>
        </div>
      </div>

      {/* Main narrative */}
      <section className="w-full flex justify-center py-24 px-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-5">In Their Own Words</p>
            <h2 className="font-serif text-4xl font-bold text-[#F0EBE1] mb-6 leading-tight">
              Born from a <em className="gold-text not-italic">Passion</em> for Quality
            </h2>
            <div className="w-10 h-px bg-[rgba(197,160,89,0.5)] mb-8" />

            <blockquote className="font-serif italic text-xl text-[#C5A059] leading-relaxed mb-8 border-l-2 border-[rgba(197,160,89,0.4)] pl-6">
              &quot;Seven years ago my wife and I stopped by this building on our way home when we lived out at Rocky Branch on Beaver Lake. We had struggled to find the kind of restaurant that offered quality sit-down dining without having to go all the way into Bentonville.&quot;
            </blockquote>

            <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed mb-5">
              We welcome you all to have a wonderful dining experience with high-quality food, a lot of fun in a pleasant atmosphere. We are by no means a fast-food restaurant, but instead offer a dining experience meant to be savored and enjoyed.
            </p>

            <p className="font-sans text-[14px] text-[#6A5E4E] italic mb-10">
              — Richard, Christine &amp; Joan, Family &amp; Founders
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-border p-5 text-center">
                <p className="font-serif text-3xl font-bold text-[#C5A059]">7+</p>
                <p className="font-sans text-[11px] tracking-widest uppercase text-[#6A5E4E] mt-1">Years Serving NWA</p>
              </div>
              <div className="card-border p-5 text-center">
                <p className="font-serif text-3xl font-bold text-[#C5A059]">5</p>
                <p className="font-sans text-[11px] tracking-widest uppercase text-[#6A5E4E] mt-1">Award Wins</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/019c1a_6a3e4beb359e44fb8c6983f9d8f4cc0c~mv2.jpg/v1/fill/w_1220,h_681,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/019c1a_6a3e4beb359e44fb8c6983f9d8f4cc0c~mv2.jpg"
                alt="The Fat Chef bar ambiance" fill className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(7,7,7,0.4)] to-transparent" />
            </div>
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg/v1/fill/w_1920,h_1043,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg"
                alt="The Fat Chef dining room interior" fill className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,7,0.5)] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Accolades */}
      <Accolades />

      {/* The setting */}
      <section className="w-full flex justify-center py-24 px-6">
        <div className="w-full max-w-6xl text-center">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-4 text-center">The Setting</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F0EBE1] mb-6 leading-tight text-center">Log Cabin Charm.<br/><em className="gold-text not-italic">Fine Dining Prestige.</em></h2>
          <div className="w-14 h-px bg-[rgba(197,160,89,0.4)] mx-auto my-7" />
          <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed max-w-2xl mx-auto mb-12 text-center">
            Nestled just off Highway 12 in Rogers, Arkansas, The Fat Chef occupies a charming log cabin that sets the tone for everything that follows: warm, intimate, and wholly unexpected. From the crackling atmosphere to the impeccably sourced ingredients, every detail is a deliberate choice.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link href="/menu" className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 bg-[#C5A059] text-[#070707] hover:bg-[#E6C875] transition-colors duration-300 text-center">
              Explore Our Menu
            </Link>
            <Link href="/reservations" className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-4 border border-[rgba(197,160,89,0.4)] text-[#C5A059] hover:bg-[rgba(197,160,89,0.08)] transition-all duration-300 text-center">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
