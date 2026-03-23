"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Menu image CDN base (served from fat-chef-pages on Vercel)
const CDN = "https://fat-chef-pages.vercel.app";

type Item = { name: string; price: string; desc: string };
type Cat  = { category: string; note?: string; items: Item[] };

const dinner: Cat[] = [
  { category: "Appetizers", items: [
    { name: "Crab Rangoon Dip", price: "36", desc: "Rich and creamy dip served with wonton chips." },
    { name: "Mushrooms & Onion Ring Combination", price: "29", desc: "Hand-breaded and fried until golden." },
    { name: "Prime Steak & Spinach Dip with Bacon", price: "34", desc: "Savory dip topped with prime steak bits." },
    { name: "Beef Wellington Bites", price: "36", desc: "Tender beef wrapped in flaky puff pastry." },
    { name: "Stuffed Mushrooms", price: "28", desc: "Classic preparation with savory filling." },
  ]},
  { category: "Salads & Soups", items: [
    { name: "House Salad", price: "12", desc: "Mixed greens with choice of house-made dressing." },
    { name: "Wedge Salad", price: "15", desc: "Crisp iceberg, bacon, blue cheese, and tomatoes." },
    { name: "Caesar", price: "12", desc: "Romaine with classic Caesar dressing." },
    { name: "Caprese", price: "18", desc: "Fresh mozzarella, tomatoes, and balsamic glaze." },
    { name: "Dinner Salad", price: "36", desc: "Romaine and spinach with salmon and shrimp, warm bacon vinaigrette." },
    { name: "Soup Du Jour", price: "10 / 15", desc: "Cup or Bowl — ask your server for today's selection." },
  ]},
  { category: "Prime Steaks", note: "USDA Prime, Hand Cut Daily. All entrees include starch, vegetable du jour, house salad & fresh baked bread.", items: [
    { name: "Porterhouse (24–26 oz)", price: "98", desc: "The ultimate steak experience." },
    { name: "T-Bone (24–26 oz)", price: "88", desc: "Classic bone-in cut with bold, beefy flavour." },
    { name: "Filet (6 oz / 8 oz)", price: "60 / 72", desc: "Bacon wrapped and pan-seared to perfection." },
    { name: "Ribeye (14–16 oz)", price: "74", desc: "Rich marbling with robust flavour." },
    { name: "New York Strip (14–16 oz)", price: "70", desc: "A classic cut of superior quality." },
    { name: "Surf & Turf", price: "128 / 140", desc: "6 oz or 8 oz Filet with 8–10 oz Maine Lobster tail." },
  ]},
  { category: "From the Sea", items: [
    { name: "Sea Scallops", price: "68", desc: "Five pan-seared scallops basted with white wine and garlic butter." },
    { name: "Chilean Sea Bass", price: "74", desc: "Pan-seared with fresh herbs." },
    { name: "Crab Cakes", price: "66", desc: "Two lump crab cakes topped with quail eggs." },
    { name: "Great Northern Walleye", price: "52", desc: "Classically seasoned or Pecan Parmesan encrusted." },
    { name: "Atlantic Wild Salmon", price: "58", desc: "Pan-seared to medium with herb butter." },
    { name: "Classic Shrimp Scampi", price: "58", desc: "Colossal shrimp and lump crab in scampi butter." },
    { name: "Lobster Tail Dinner", price: "96", desc: "8–10 oz Maine Lobster with drawn butter." },
  ]},
  { category: "Perfect Pasta", items: [
    { name: "Seafood Pasta", price: "78", desc: "Lobster, shrimp, scallops, and clams in garlic parmesan cream." },
    { name: "Basil Chicken Pasta", price: "64", desc: "Pan-seared chicken with artichokes, tomatoes, and basil." },
    { name: "Lobster & Shrimp Ravioli", price: "84", desc: "House-made ravioli in white wine cream sauce." },
  ]},
];

const bar: Cat[] = [
  { category: "House Wines by the Glass", items: [
    { name: "Cabernet", price: "", desc: "" },{ name: "Chardonnay", price: "", desc: "" },
    { name: "Merlot", price: "", desc: "" },{ name: "Moscato", price: "", desc: "" },
    { name: "Pinot Grigio", price: "", desc: "" },{ name: "Pinot Noir", price: "", desc: "" },
    { name: "Sauvignon Blanc", price: "", desc: "" },{ name: "White Zinfandel", price: "", desc: "" },
  ]},
  { category: "Specialty Drinks by the Glass", items: [
    { name: "Sake Sunset", price: "", desc: "Sake, Orange Juice, Grenadine" },
    { name: "PlumTini", price: "", desc: "Sake and Plum Wine" },
    { name: "Sake Sour", price: "", desc: "Sake and Sweet and Sour" },
    { name: "Sake by the Glass", price: "", desc: "" },{ name: "Classic Mimosa", price: "", desc: "" },
    { name: "Glass of Champagne", price: "", desc: "" },{ name: "Sunset Mimosa", price: "", desc: "" },
  ]},
  { category: "Signature Drinks", items: [
    { name: "Bloody Mary", price: "", desc: "Premium Vodka with perfect mix. Spicy on request." },
    { name: "Cosmopolitan", price: "", desc: "Premium Vodka with triple sec, cranberry and lime juice." },
    { name: "Classic Martini", price: "", desc: "Premium Vodka or Gin, shaken or stirred." },
    { name: "Classic Margarita", price: "", desc: "Premium Tequila with Triple Sec, sour and lime juice on ice." },
    { name: "French 75", price: "", desc: "Premium Gin with lemon juice and Champagne." },
    { name: "Gimlet", price: "", desc: "Premium Gin with lime juice on ice." },
    { name: "Long Island Iced Tea", price: "", desc: "Premium Vodka, Gin, Rum, Tequila and Triple Sec with sour and Coke." },
    { name: "Manhattan", price: "", desc: "Premium Bourbon with a dash of sweet vermouth." },
    { name: "Negroni", price: "", desc: "Premium Gin with sweet vermouth and Campari." },
    { name: "Saketini", price: "", desc: "Premium Gin with premium Sake over ice." },
    { name: "SeaBreeze", price: "", desc: "Premium Vodka with cranberry and grapefruit juice." },
    { name: "Sidecar", price: "", desc: "Premium Cognac with Cointreau and lemon juice." },
    { name: "The Godfather", price: "", desc: "Premium Amaretto and Scotch on ice." },
  ]},
  { category: "Beer — Domestic", items: [
    { name: "Bud Light", price: "", desc: "" },{ name: "Budweiser", price: "", desc: "" },
    { name: "Coors Light", price: "", desc: "" },{ name: "Miller Lite", price: "", desc: "" },{ name: "Ultra", price: "", desc: "" },
  ]},
  { category: "Beer — Craft & Local", items: [
    { name: "Black Apple Hibiscus", price: "", desc: "" },{ name: "Blue Moon", price: "", desc: "" },
    { name: "Love Honey Bock", price: "", desc: "" },{ name: "Ozark IPA", price: "", desc: "" },{ name: "Ozark Cream Stout", price: "", desc: "" },
  ]},
  { category: "Beer — Import", items: [
    { name: "Corona", price: "", desc: "" },{ name: "LaBatts", price: "", desc: "" },
    { name: "Moosehead", price: "", desc: "" },{ name: "Peroni", price: "", desc: "" },
    { name: "Stella", price: "", desc: "" },{ name: "Yuengling", price: "", desc: "" },
  ]},
  { category: "Beer — Specialty & Seltzer", items: [
    { name: "Modelo Especial", price: "", desc: "" },{ name: "Shinerbock", price: "", desc: "" },
    { name: "Truly", price: "", desc: "" },{ name: "White Claw", price: "", desc: "" },
  ]},
  { category: "Red Wines — Cabernet Sauvignon", items: [
    { name: "Sebastiani Cabernet", price: "", desc: "North Coast, California" },
    { name: "Cloisonne Cabernet", price: "", desc: "Napa Valley, California" },
    { name: "Buckshack Bourbon Barrel Aged Cabernet", price: "", desc: "Lake County, California" },
    { name: "Mira", price: "", desc: "Napa Valley, California" },
    { name: "Caymus Cabernet", price: "", desc: "Napa Valley, California" },
    { name: "Shafer One Point Five Cabernet", price: "", desc: "Stags Leap District, Napa Valley, California" },
    { name: "Quilceda Creek Cabernet '16", price: "", desc: "Columbia Valley, Washington" },
  ]},
  { category: "Red Wines — Malbec & Merlot", items: [
    { name: "Corazon Del Sol Malbec", price: "", desc: "Mendoza, Argentina" },
    { name: "Kaiken Ultra Malbec", price: "", desc: "Mendoza, Argentina" },
    { name: "Parcel 41 Merlot", price: "", desc: "North Coast, California" },
    { name: "Keenan Merlot", price: "", desc: "Napa Valley, California" },
  ]},
  { category: "Red Wines — Pinot Noir & Syrah", items: [
    { name: "Block 9 Pinot Noir", price: "", desc: "Caiden's Vineyard, California" },
    { name: "Alexana Pinot Noir", price: "", desc: "Dundee Hills, Oregon" },
    { name: "Albert Bichot Bourgogne Pinot Noir", price: "", desc: "Burgundy, France" },
    { name: "True Grit Petite Syrah", price: "", desc: "Mendocino, California" },
    { name: "Presquile Syrah", price: "", desc: "Santa Barbara, California" },
  ]},
  { category: "Red Wines — Zinfandel & More", items: [
    { name: "Gehricke Zinfandel", price: "", desc: "Russian River Valley, California" },
    { name: "Robert Craig Zinfandel", price: "", desc: "Howell Mountain, Napa Valley, California" },
    { name: "Sean Minor Nicole Merie Red Blend", price: "", desc: "North Coast, California" },
    { name: "Masi Campofiorin", price: "", desc: "Veneto, Italy" },
    { name: "Les Chasse des Princes du-Pape", price: "", desc: "Rhône, France" },
    { name: "Masi Costasera Amarone", price: "", desc: "Veneto, Italy" },
  ]},
  { category: "White Wines — Chardonnay & Pinot Grigio", items: [
    { name: "Ron Rubin Chardonnay", price: "", desc: "North Coast, California" },
    { name: "Mira", price: "", desc: "Napa Valley, California" },
    { name: "Albert Bichot Pouilly Fuissé", price: "", desc: "Burgundy, France" },
    { name: "Montinore", price: "", desc: "Willamette Valley, Oregon" },
    { name: "Santa Margherita Pinot Grigio", price: "", desc: "Alto Adige, Italy" },
  ]},
  { category: "White Wines — Moscato, Sauvignon Blanc & Riesling", items: [
    { name: "Marrenco Scrapona Moscato di Asti", price: "", desc: "Piemonte, Italy" },
    { name: "Spy Valley", price: "", desc: "Marlborough, New Zealand" },
    { name: "Chateau De Sancerre", price: "", desc: "Loire, France" },
    { name: "St. Urbans-Hof Riesling", price: "", desc: "Mosel Valley, Germany" },
  ]},
  { category: "Rosé & Bubbles", items: [
    { name: "Hogwash", price: "", desc: "California" },
    { name: "Gerard Bertrand Source of Joy Organic Rosé", price: "", desc: "Languedoc, France" },
    { name: "Pol René", price: "", desc: "" },
    { name: "La Gioiosa Prosecco", price: "", desc: "Veneto, Italy" },
    { name: "Piper Sonoma Brut Rosé", price: "", desc: "Sonoma, California" },
    { name: "Lucien Albrecht Crémant Brut", price: "", desc: "Alsace, France" },
    { name: "Piper-Heidsieck Brut", price: "", desc: "Champagne, France" },
  ]},
];

const brunch: Cat[] = [
  { category: "Signature Entrees", items: [
    { name: "Stuffed Fried Egg Wrap", price: "Market", desc: "Asparagus, bacon, and parmesan in an egg blanket with bourbon hollandaise." },
    { name: "Elite Omelet", price: "Market", desc: "Black forest ham and baby swiss with a crispy cheddar crust." },
    { name: "The Carnivore Omelet", price: "Market", desc: "Prime tenderloin, sausage, bacon, ham, and caramelized onions." },
    { name: "Prime Tenderloin Bagel", price: "Market", desc: "Open-faced bagel with tenderloin, onions, and over-easy eggs." },
    { name: "Fat Chef Hash", price: "Market", desc: "Choice of Corned Beef or Ribeye with potatoes and bourbon hollandaise." },
    { name: "Belgium Waffle / Vanilla Bean Pancakes", price: "Market", desc: "Served with real maple syrup and fresh berries." },
  ]},
  { category: "Lighter Fare", items: [
    { name: "Avocado Basil Toast", price: "Market", desc: "Smashed avocado, cherry tomatoes, and balsamic reduction." },
    { name: "Banana Split", price: "Market", desc: "Vanilla yogurt, granola, almonds, and local honey." },
  ]},
];

function FeatureSpotlight() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[55%_45%] my-12 overflow-hidden" style={{ border: "1px solid rgba(197,160,89,0.22)" }}>
      <div className="relative h-64 sm:h-auto overflow-hidden bento-tile">
        <div className="bento-kb absolute inset-0" style={{ animation: "kenburns-a 10s ease-in-out infinite alternate" }}>
          <Image src={`${CDN}/menu/fat_chef_steak.png`} alt="USDA Prime Ribeye" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
        </div>
      </div>
      <div className="flex flex-col justify-between p-6" style={{ background: "#0D0B08", borderLeft: "1px solid rgba(197,160,89,0.15)" }}>
        <div>
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#C5A059] mb-4">Tonight&apos;s Signature</p>
          <p className="font-serif text-3xl font-bold text-[#F0EBE1] leading-[1.05]" style={{ fontVariant: "small-caps" }}>USDA Prime<br />Ribeye</p>
          <p className="font-sans text-[12px] text-[#5A4E40] mt-4 leading-relaxed">14–16 oz. Rich marbling with robust flavour. Hand-cut daily from USDA Prime beef.</p>
        </div>
        <div>
          <div className="h-px bg-[rgba(197,160,89,0.15)] mb-3 mt-6" />
          <div className="flex items-baseline justify-between">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#4A3E2E]">USDA Prime</span>
            <span className="font-serif text-2xl font-bold text-[#C5A059]">$74</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow() {
  const tiles = [
    { src: `${CDN}/menu/fat_chef_surf_turf.png`, label: "Surf & Turf",   price: "$128", dir: "a", delay: "0s",   category: "Chef's Selection" },
    { src: `${CDN}/menu/fat_chef_lobster.png`,   label: "Lobster Tail",  price: "$96",  dir: "b", delay: "1.5s", category: "From the Sea" },
    { src: `${CDN}/menu/fat_chef_seafood.png`,   label: "Sea Scallops",  price: "$68",  dir: "a", delay: "3s",   category: "From the Sea" },
  ] as const;
  return (
    <div className="grid grid-cols-3 gap-1.5 mb-12">
      {tiles.map((tile) => (
        <div key={tile.src} className="relative overflow-hidden bento-tile" style={{ height: "148px", border: "1px solid rgba(197,160,89,0.2)" }}>
          <div className="bento-kb absolute inset-0" style={{ animation: `kenburns-${tile.dir} 8s ease-in-out infinite alternate`, animationDelay: tile.delay }}>
            <Image src={tile.src} alt={tile.label} fill className="object-cover" sizes="15vw" />
          </div>
          <div className="absolute inset-x-0 bottom-0 px-2.5 pt-8 pb-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)" }}>
            <p className="font-sans text-[8px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "rgba(197,160,89,0.65)" }}>{tile.category}</p>
            <div className="flex items-baseline justify-between gap-1">
              <p className="font-serif text-[11px] font-semibold text-[#F0EBE1]" style={{ fontVariant: "small-caps" }}>{tile.label}</p>
              <span className="font-serif text-[11px] text-[#C5A059] shrink-0">{tile.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureAmbiance() {
  return (
    <div className="relative overflow-hidden my-12" style={{ height: "160px", border: "1px solid rgba(197,160,89,0.15)" }}>
      <div className="absolute inset-0" style={{ animation: "kenburns-b 12s ease-in-out infinite alternate" }}>
        <Image src={`${CDN}/menu/fat_chef_ambiance.png`} alt="The Fat Chef dining room" fill className="object-cover" sizes="(max-width: 768px) 100vw, 56vw" />
      </div>
      <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2">
        <p className="font-sans text-[9px] tracking-[0.32em] uppercase text-[rgba(197,160,89,0.6)]">Rogers, Arkansas</p>
        <p className="font-serif text-xl text-[#F0EBE1] tracking-[0.15em] uppercase" style={{ fontVariant: "small-caps" }}>Reserve Your Table</p>
        <p className="font-sans text-[12px] tracking-[0.12em] text-[#C5A059] mt-1">479.202.5106</p>
      </div>
    </div>
  );
}

function SectionBreaker({ src, label, kbDir }: { src: string; label: string; kbDir: "a" | "b" }) {
  return (
    <div className="relative h-48 md:h-72 overflow-hidden my-10" style={{ border: "1px solid rgba(197,160,89,0.12)" }}>
      <div className="absolute inset-0" style={{ animation: `kenburns-${kbDir} 12s ease-in-out infinite alternate` }}>
        <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" unoptimized />
      </div>
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <p className="font-serif text-[13px] md:text-[15px] text-[#C5A059] tracking-[0.4em] uppercase" style={{ fontVariant: "small-caps" }}>{label}</p>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [tab, setTab] = useState<"dinner" | "brunch" | "bar">("dinner");
  const menu = tab === "dinner" ? dinner : tab === "brunch" ? brunch : bar;

  return (
    <main className="pt-20">
      {/* Page hero */}
      <div className="relative h-56 md:h-72 w-full flex justify-center items-end pb-12 px-6 overflow-hidden bg-[#0a0a0a]">
        <Image
          src="https://static.wixstatic.com/media/11062b_a1ea136152184e7b89aa72d3a910d0fb~mv2.jpg/v1/fill/w_1225,h_444,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_a1ea136152184e7b89aa72d3a910d0fb~mv2.jpg"
          alt="The Fat Chef signature steak dish" fill className="object-cover opacity-30" sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[rgba(10,10,10,0.6)] to-transparent" />
        <div className="relative w-full max-w-6xl">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C5A059] mb-2">Crafted Daily</p>
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F0EBE1]">Our Menus</h1>
        </div>
      </div>

      {tab !== "bar" && (
        <div className="bg-[#0a0a0a] border-b border-[rgba(197,160,89,0.1)] py-4 px-6 w-full flex justify-center">
          <p className="w-full max-w-6xl font-sans text-[12px] text-[#6A5E4E] italic text-center">
            All dinner entrees include starch, vegetable du jour, house salad &amp; fresh baked bread with herbed butter.
          </p>
        </div>
      )}

      {/* Tab selector — sticky */}
      <div className="bg-[#0a0a0a] sticky top-20 z-20 border-b border-[rgba(197,160,89,0.1)] flex justify-center py-4 px-6">
        <div className="flex border border-[rgba(197,160,89,0.25)]">
          {(["dinner", "brunch", "bar"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={tab === t}
              className={`px-8 py-2.5 font-sans text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${
                tab === t ? "bg-[#C5A059] text-[#070707]" : "text-[#8A7E6E] hover:text-[#E6C875]"
              }`}
            >
              {t === "dinner" ? "Dinner" : t === "brunch" ? "Brunch" : "Bar & Wine"}
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <div className="bg-[#070707] min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            {tab === "bar" ? (
              <div className="w-full flex justify-center">
                <div className="w-full max-w-5xl px-6 py-16">
                {bar.map((cat, ci) => (
                  <div key={cat.category} className={ci < bar.length - 1 ? "mb-12" : ""}>
                    <div className="text-center mb-5">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(197,160,89,0.3)]" />
                        <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#C5A059] whitespace-nowrap">{cat.category}</span>
                        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(197,160,89,0.3)]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                      {cat.items.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.02, duration: 0.35 }}
                          className="menu-row group py-3"
                        >
                          <p className="font-serif text-[15px] font-semibold text-[#F0EBE1] group-hover:text-[#E6C875] transition-colors leading-snug">{item.name}</p>
                          {item.desc && <p className="font-sans text-[11px] text-[#5A4E40] mt-0.5 leading-relaxed">{item.desc}</p>}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="text-center font-sans text-xs text-[#5A4E40] italic mt-12">
                  Must be 21 with valid ID · 4% discount applied for cash payments.
                </p>
                </div>
              </div>

            ) : tab === "dinner" ? (
              <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl px-6 py-16">
                {dinner.map((cat, ci) => (
                  <div key={cat.category}>
                    <div className="mb-10">
                      <div className="text-center mb-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(197,160,89,0.3)]" />
                          <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#C5A059] whitespace-nowrap">{cat.category}</span>
                          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(197,160,89,0.3)]" />
                        </div>
                        {cat.note && (
                          <p className="font-sans text-[12px] text-[#6A5E4E] italic max-w-md mx-auto">{cat.note}</p>
                        )}
                      </div>
                      {cat.items.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ delay: i * 0.04, duration: 0.45 }}
                          className="menu-row group py-5 flex items-baseline justify-between gap-6"
                        >
                          <div className="flex-1">
                            <p className="font-serif text-[17px] font-semibold text-[#F0EBE1] group-hover:text-[#E6C875] transition-colors duration-300 leading-snug">{item.name}</p>
                            {item.desc && <p className="font-sans text-[13px] text-[#6A5E4E] mt-1 leading-relaxed">{item.desc}</p>}
                          </div>
                          {item.price && (
                            <span className="font-serif text-[16px] font-bold text-[#C5A059] whitespace-nowrap shrink-0">${item.price}</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    {ci === 0 && <FeatureSpotlight />}
                    {ci === 2 && (
                      <>
                        <SectionBreaker src="/menu/fat_chef_seafood.png" label="From the Sea" kbDir="b" />
                        <FeatureRow />
                      </>
                    )}
                    {ci === 3 && (
                      <SectionBreaker src="/menu/fat_chef_dessert.png" label="The Sweet Finish" kbDir="a" />
                    )}
                  </div>
                ))}
                <FeatureAmbiance />
                <p className="text-center font-sans text-xs text-[#5A4E40] italic mt-4">
                  Steak enhancements: Blackened (+$5) · Oscar Style (+$18) · Au Poivre (+$20)
                </p>
                </div>
              </div>

            ) : (
              <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl px-6 py-16">
                {menu.map((cat, ci) => (
                  <div key={cat.category} className={ci < menu.length - 1 ? "mb-16" : ""}>
                    <div className="text-center mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(197,160,89,0.3)]" />
                        <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#C5A059] whitespace-nowrap">{cat.category}</span>
                        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(197,160,89,0.3)]" />
                      </div>
                      {cat.note && <p className="font-sans text-[12px] text-[#6A5E4E] italic max-w-md mx-auto">{cat.note}</p>}
                    </div>
                    {cat.items.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ delay: i * 0.04, duration: 0.45 }}
                        className="menu-row group py-5 flex items-baseline justify-between gap-6"
                      >
                        <div className="flex-1">
                          <p className="font-serif text-[17px] font-semibold text-[#F0EBE1] group-hover:text-[#E6C875] transition-colors duration-300 leading-snug">{item.name}</p>
                          {item.desc && <p className="font-sans text-[13px] text-[#6A5E4E] mt-1 leading-relaxed">{item.desc}</p>}
                        </div>
                        {item.price && (
                          <span className="font-serif text-[16px] font-bold text-[#C5A059] whitespace-nowrap shrink-0">{item.price}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
