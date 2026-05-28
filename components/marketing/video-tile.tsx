"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** Direct .mp4 URL. Prefer Pexels HD 720p (~3-5 MB) over UHD (30+ MB) for autoplay reliability. */
  src: string;
  /** Poster shown until the video starts playing; also stays in place if playback fails. */
  poster: string;
  ratio?: string;
  radius?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Absolutely-positioned content layered over the video (gradients, captions). */
  overlay?: React.ReactNode;
}

/**
 * Autoplaying muted looping video tile. Relies on the browser's native
 * autoplay (which is allowed for muted videos) — no IntersectionObserver
 * fragility, no readyState gates. Poster image stays as a fallback if the
 * mp4 fails to load.
 */
export function VideoTile({
  src,
  poster,
  ratio = "4/5",
  radius = "var(--m-radius-md)",
  className,
  style,
  overlay,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // Some browsers still need a nudge after `canplay` fires — kick play() so
  // the poster fades out as soon as we actually have data.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay can be blocked by power-saving / data-saver settings.
          // Leave the poster up; user can still scroll past.
        });
    };
    v.addEventListener("canplay", tryPlay);
    tryPlay();
    return () => v.removeEventListener("canplay", tryPlay);
  }, [src]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: "hidden",
        background: "var(--m-soft)",
        isolation: "isolate",
        width: "100%",
        ...style,
      }}
    >
      {/* Poster fallback (z-0). Fades out once the video is actually playing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: playing && !failed ? 0 : 1,
          transition: "opacity .4s ease",
          zIndex: 0,
        }}
      />
      {!failed && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onError={() => setFailed(true)}
          onPlaying={() => setPlaying(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            zIndex: 1,
          }}
        />
      )}
      {overlay && (
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
          {overlay}
        </div>
      )}
    </div>
  );
}
