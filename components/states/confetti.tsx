"use client";

import { useEffect, useMemo, useState } from "react";

const COLORS = ["#00B86B", "#7BC950", "#DFF3C3", "#F8F060", "#050505", "#F7C948"];

export function Confetti({ count = 80, duration = 4500 }: { count?: number; duration?: number }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.4,
        dur: 2.5 + Math.random() * 2.5,
        rot: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        width: 4 + Math.random() * 4,
        height: 6 + Math.random() * 10,
      })),
    [count],
  );

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[40]">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="m-confetti"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
