# The Fat Chef — Website Build Instructions

You are building a luxury restaurant website for "The Fat Chef", an upscale family-owned restaurant located in a charming log cabin in Rogers, AR. The target audience includes Walmart vendors, $150k+ HHI locals, and private aviation arrivals. The aesthetic must be highly premium, leveraging a dark mode theme, elegant typography, and smooth, subtle micro-animations (e.g., via `framer-motion`).

## Core Requirements & Tech Stack
- **Framework:** Next.js (App Router, use `src/app`)
- **Styling:** Tailwind CSS + Vanilla CSS tokens in `globals.css`
- **Animations:** High-end, smooth animations using `framer-motion`. Do not use basic fast transitions. Add `framer-motion` via npm/pnpm.
- **Design System:** Needs a rich aesthetic:
  - Deep dark backgrounds (e.g., `#070707`, `#111111`)
  - Accent colors: Gold (`#C5A059` / `#E6C875`) for luxury typography and borders.
  - Fonts: Use `Playfair Display` for headings/serifs, `Lato` or `Inter` for body.

## Content (Must be used accurately)
Please read `C:\Users\noahb\.gemini\antigravity\brain\8934c823-a24a-4357-bb39-3ecc8996edb6\scraped_content.md` for ALL textual content.
- Include the exact **Dinner Menu** and **Brunch Menu**.
- Include their Brand Story ("Seven years ago my wife and I stopped by...").
- Include the accolades: Best New Restaurant, Best Fine Dining, Best Romantic Dinner, Best Steakhouse in NWA, Best Seafood in NWA.
- Include precise hours, phone number, and location (`14550 E HWY 12 Rogers AR 72756`).
- **Reservation System:** Add a "Reserve a Table" form or button indicating reservations are handled via phone or email for now (or embed a Calendly widget if capable).

## Assets (Use existing real media)
Use these exact image URLs in the site to ensure it's grounded in reality:
- **Logo:** `https://static.wixstatic.com/media/019c1a_c87be2dca2204b02a9aed5f1a5f72057~mv2.png`
- **Hero / Interior:** `https://static.wixstatic.com/media/019c1a_a4ea7513132c4145933f7cac161a41ce~mv2.jpg`
- **Meat Entree:** `https://static.wixstatic.com/media/11062b_a1ea136152184e7b89aa72d3a910d0fb~mv2.jpg`
- **Seared Tuna:** `https://static.wixstatic.com/media/019c1a_a717f53bbcf346268137c9f90b1b610c~mv2.jpg`
- **Patio Ambiance:** `https://static.wixstatic.com/media/019c1a_754d9b825c2f4dbd9fa38b3b3100f3ba~mv2.jpg`
- **Bar Ambiance:** `https://static.wixstatic.com/media/019c1a_6a3e4beb359e44fb8c6983f9d8f4cc0c~mv2.jpg`

## Structure Rules
1. Build a stunning 1-page long-scroll or multi-page structure: Home, Menu, About, Reservations.
2. Focus on SEO semantics (`<h1>`, `<meta>`, alt tags for all images).
3. Do not use generic placeholders where real content is provided.

**Getting Started:** Begin by configuring Tailwind/CSS, importing fonts, and installing `framer-motion`. Then assemble the Hero page and Menu components.
