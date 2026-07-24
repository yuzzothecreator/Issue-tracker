"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const NavigationProgress = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setVisible(true);
    setWidth(20);

    const tick = window.setInterval(() => {
      setWidth((current) => {
        if (current >= 90) return current;
        return current + Math.random() * 12;
      });
    }, 180);

    const finish = window.setTimeout(() => {
      setWidth(100);
      window.setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 220);
    }, 450);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(finish);
    };
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-[var(--accent-9)] transition-[width] duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default NavigationProgress;
