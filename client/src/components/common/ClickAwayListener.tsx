'use client';

import React, { useEffect, useRef } from 'react';

interface ClickAwayListenerProps {
  children: React.ReactElement;
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  excludeRefs?: React.RefObject<HTMLElement>[];
  enabled?: boolean;
}

export function ClickAwayListener({
  children,
  onClickAway,
  excludeRefs = [],
  enabled = true,
}: ClickAwayListenerProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click was inside any of the excluded refs
      const clickedOnExcluded = excludeRefs.some(
        (ref) => ref.current && ref.current.contains(event.target as Node)
      );

      // Check if the click was inside our component
      const clickedInside = nodeRef.current && 
        (nodeRef.current === event.target || nodeRef.current.contains(event.target as Node));

      // If clicked outside and not on excluded elements, call onClickAway
      if (!clickedInside && !clickedOnExcluded) {
        onClickAway(event);
      }
    };

    // Use capture phase to catch events before they bubble up
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [enabled, excludeRefs, onClickAway]);

  return <div ref={nodeRef}>{children}</div>;
}
