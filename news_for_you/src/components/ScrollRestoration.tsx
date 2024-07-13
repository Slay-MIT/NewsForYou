'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollPositions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
      const currentPosition = scrollPositions[pathname + searchParams.toString()];

      if (currentPosition) {
        window.scrollTo(0, currentPosition);
      }
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = () => {
        const scrollPositions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
        scrollPositions[pathname + searchParams.toString()] = window.scrollY;
        sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [pathname, searchParams]);

  return null;
}