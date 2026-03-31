"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, syncTouch: true }}>
      {children as any}
    </ReactLenis>
  );
}
