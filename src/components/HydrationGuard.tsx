'use client';

import { ReactNode, useEffect, useState } from 'react';

interface HydrationGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Prevents hydration mismatches by only rendering children after hydration is complete.
 * Use this wrapper around components that modify the DOM in ways that cause hydration mismatches.
 */
export function HydrationGuard({ children, fallback = null }: HydrationGuardProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : fallback;
}

export default HydrationGuard;
