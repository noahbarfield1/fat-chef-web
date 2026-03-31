import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[rgba(197,160,89,0.12)] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <Image
            src="https://static.wixstatic.com/media/019c1a_c87be2dca2204b02a9aed5f1a5f72057~mv2.png/v1/fill/w_464,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Asset%201Vector.png"
            alt="The Fat Chef" width={130} height={40}
            className="object-contain h-8 w-auto mb-5"
          />
          <p className="font-sans text-[13px] text-[#5A4E40] leading-relaxed">
            Family-owned fine dining in a log cabin setting. Rogers, Arkansas.
          </p>
        </div>
        <div>
          <h3 className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#C5A059] mb-4">Navigate</h3>
          <ul className="flex flex-col gap-2.5">
            {[["/","Home"],["/menu","Menu"],["/about","Our Story"],["/reservations","Reserve"]].map(([href,label]) => (
              <li key={href}><Link href={href} className="font-sans text-[13px] text-[#5A4E40] hover:text-[#C5A059] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#C5A059] mb-4">Hours</h3>
          <p className="font-sans text-[13px] text-[#5A4E40]">Wednesday – Saturday</p>
          <p className="font-sans text-[13px] text-[#C5A059] font-semibold">5:00 PM – 9:00 PM</p>
        </div>
        <div>
          <h3 className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#C5A059] mb-4">Contact</h3>
          <a href="tel:4792025106" className="block font-sans text-[13px] text-[#5A4E40] hover:text-[#C5A059] transition-colors mb-1">479.202.5106</a>
          <a href="mailto:TheFatChefNWA@gmail.com" className="block font-sans text-[12px] text-[#5A4E40] hover:text-[#C5A059] transition-colors break-all mb-3">TheFatChefNWA@gmail.com</a>
          <address className="not-italic font-sans text-[12px] text-[#5A4E40] leading-relaxed mb-3">14550 E HWY 12<br/>Rogers, AR 72756</address>
          <p className="font-sans text-[11px] text-[#C5A059] italic mb-4 leading-relaxed">&ldquo;Just 3 miles from downtown Rogers on highway 12 towards Beaver lake.&rdquo;</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-[rgba(197,160,89,0.08)] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-sans text-[11px] text-[#3A3228]">&copy; {new Date().getFullYear()} The Fat Chef. All rights reserved.</p>
        <p className="font-serif italic text-[11px] text-[#3A3228]">Best Steakhouse · Best Seafood · Best Fine Dining — NWA</p>
      </div>
    </footer>
  );
}
