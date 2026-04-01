"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    // syncTouch: false — let iOS handle its own momentum scroll natively.
    // outline: none on the wrapper kills the blue focus-ring glow that mobile
    // browsers paint around the Lenis scroll container on touch/scroll events.
    <ReactLenis
      root
      options={{ lerp: 0.09, syncTouch: false }}
      props={{
        style: { outline: "none" },
        tabIndex: -1,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}
