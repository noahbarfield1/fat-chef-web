import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Accolades from "../components/Accolades";
import StoryVideo from "../components/StoryVideo";

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
          src="/post-pics/outdoor-owners-2.jpg"
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

      {/* Main narrative — The Origin */}
      <section className="w-full flex justify-center pt-16 md:pt-24 pb-24 px-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-5">Where It All Began</p>
            <h2 className="font-serif text-4xl font-bold text-[#F0EBE1] mb-6 leading-tight" style={{ textWrap: 'balance' } as React.CSSProperties}>
              A Dream Built in a <em className="gold-text not-italic">Log Cabin</em>
            </h2>
            <div className="w-10 h-px bg-[rgba(197,160,89,0.5)] mb-8" />

            <blockquote className="font-serif italic text-xl text-[#C5A059] leading-relaxed mb-8 border-l-2 border-[rgba(197,160,89,0.4)] pl-6">
              &ldquo;When we left that little log cabin building, we joked about how &lsquo;someday&rsquo; we were going to return and build the cutest place that felt like home to us.&rdquo;
            </blockquote>

            <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed mb-5">
              Years ago, Richard and Christine were living out at Rocky Branch on Beaver Lake when they first noticed a little log cabin sitting along Highway 12. They&apos;d grown tired of the same struggle — every time they wanted quality, sit-down dining, it meant a long drive into Bentonville or Fayetteville. Nothing local. Nothing that felt like home.
            </p>

            <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed mb-5">
              They joked about it at first. But the dream stayed with them. And a little over two years later, they did exactly that — transforming that rustic log cabin into one of Northwest Arkansas&apos; most beloved dining destinations.
            </p>

            <p className="font-sans text-[14px] text-[#6A5E4E] italic mb-10">
              — Richard &amp; Christine, Founders
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-border p-5 text-center">
                <p className="font-serif text-2xl font-bold text-[#C5A059]">From Scratch</p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-[#6A5E4E] mt-1">Every Dish, Every Day</p>
              </div>
              <div className="card-border p-5 text-center flex flex-col justify-center h-full">
                <p className="font-serif text-xl font-bold text-[#C5A059] leading-tight">Award-Winning</p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-[#6A5E4E] mt-2">Fine Dining</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] overflow-hidden col-span-2">
              <Image
                src="/post-pics/owners-awards.jpg"
                alt="Richard and Christine holding their Best of Northwest Arkansas awards" fill className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(7,7,7,0.4)] to-transparent" />
            </div>
            <div className="relative aspect-[1/1] overflow-hidden">
              <Image
                src="/post-pics/richard-award.jpg"
                alt="Chef Richard holding his People's Choice Best Bite award" fill className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,7,0.5)] to-transparent" />
            </div>
            <div className="relative aspect-[1/1] overflow-hidden">
              <Image
                src="/post-pics/dining-room-interior.jpg"
                alt="The Fat Chef dining room — log cabin interior with elegant table settings" fill className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,7,0.5)] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Story Video */}
      <StoryVideo />

      {/* The Family */}
      <section className="w-full flex justify-center py-24 px-6 bg-[#0a0a0a]">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] md:aspect-[4/3] overflow-hidden order-2 md:order-1">
            <Image
              src="/post-pics/outdoor-owners-1.jpg"
              alt="The Fat Chef family — Richard, Christine, and Joan" fill className="object-cover md:object-center object-[60%_20%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.6)] to-transparent" />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-5">Three Generations</p>
            <h2 className="font-serif text-4xl font-bold text-[#F0EBE1] mb-6 leading-tight" style={{ textWrap: 'balance' } as React.CSSProperties}>
              A True <em className="gold-text not-italic">Family</em> Affair
            </h2>
            <div className="w-10 h-px bg-[rgba(197,160,89,0.5)] mb-8" />

            <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed mb-5">
              The Fat Chef is a true &ldquo;Mom &amp; Pop&rdquo; — and they wouldn&apos;t have it any other way. Richard is the chef, crafting every dish with intention. Christine manages front of house, making sure every guest feels at home. And Mom &ldquo;Joan&rdquo; keeps the heart of the place beating.
            </p>

            <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed mb-5">
              Together, they built something rare: a restaurant where the owners know your name, the bread is baked fresh daily with herbed butter, the sauces and dressings are house-made, and the desserts are crafted from scratch every single day.
            </p>

            <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed mb-8">
              The Fat Chef isn&apos;t a fast-food restaurant. It&apos;s a dining experience meant to be savored — a place where you slow down, enjoy great food in a warm atmosphere, and leave knowing you just had something truly special.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="card-border p-4 text-center">
                <p className="font-serif text-lg font-bold text-[#C5A059]">Richard</p>
                <p className="font-sans text-[9px] tracking-widest uppercase text-[#6A5E4E] mt-1">The Chef</p>
              </div>
              <div className="card-border p-4 text-center">
                <p className="font-serif text-lg font-bold text-[#C5A059]">Christine</p>
                <p className="font-sans text-[9px] tracking-widest uppercase text-[#6A5E4E] mt-1">Front of House</p>
              </div>
              <div className="card-border p-4 text-center">
                <p className="font-serif text-lg font-bold text-[#C5A059]">Joan</p>
                <p className="font-sans text-[9px] tracking-widest uppercase text-[#6A5E4E] mt-1">The Heart</p>
              </div>
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
          <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed max-w-2xl mx-auto mb-6 text-center">
            Nestled along Highway 12 in the Prairie Creek community of Rogers, Arkansas, The Fat Chef occupies a charming log cabin that sets the tone for everything that follows: warm, intimate, and wholly unexpected.
          </p>
          <p className="font-sans text-[15px] text-[#8A7E6E] leading-relaxed max-w-2xl mx-auto mb-6 text-center">
            Voted Best Steakhouse, Best Fine Dining, Best Seafood, and Best Romantic Dinner in Northwest Arkansas — this hidden gem on the way to Beaver Lake has become one of the region&apos;s most celebrated dining destinations.
          </p>
          <p className="font-sans text-[13px] text-[#5A4E40] italic max-w-lg mx-auto mb-12 text-center">
            &ldquo;We are so in love with what we have built. We welcome you all to have a wonderful dining experience — come in, relax, and taste the best steak and seafood there is.&rdquo;
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
