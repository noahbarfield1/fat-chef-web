"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    // syncTouch: false — let iOS handle its own momentum scroll natively.
    // JS-driven smooth scroll on touch feels laggy and fights the browser.
    <ReactLenis root options={{ lerp: 0.09, syncTouch: false }}>
      {children as any}
    </ReactLenis>
  );
}
