"use client";

import { useEffect, useRef } from "react";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay blocked — user needs to interact first
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/home/video-poster.jpg"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-surface-deepest/70" />
    </div>
  );
}
