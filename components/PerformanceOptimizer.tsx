'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyReducedMotion = (e: MediaQueryList | MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
      }
    };

    applyReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', applyReducedMotion);

    const preconnectLinks = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    preconnectLinks.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    return () => {
      mediaQuery.removeEventListener('change', applyReducedMotion);
    };
  }, []);

  return null;
}
