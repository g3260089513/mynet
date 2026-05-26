"use client";

import { useState, useRef, useEffect } from "react";

export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt autoplay — most browsers block this,
    // user will need to click the button to start
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    // Try on first user interaction with the page
    const handleInteraction = () => {
      tryPlay();
      document.removeEventListener("click", handleInteraction);
    };
    document.addEventListener("click", handleInteraction, { once: true });

    return () => document.removeEventListener("click", handleInteraction);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/bgm.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggle}
        className="fixed right-6 bottom-6 z-50 w-11 h-11 rounded-full border border-border-subtle bg-surface-glass backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:border-gold-400/40 hover:shadow-[0_0_20px_rgba(212,168,83,0.15)] group"
        aria-label={playing ? "暂停音乐" : "播放音乐"}
      >
        {/* Speaker icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-colors duration-300 ${
            playing ? "text-gold-400" : "text-text-muted group-hover:text-text-primary"
          }`}
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          {playing && (
            <>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </>
          )}
          {!playing && (
            <line x1="23" y1="9" x2="17" y2="15" />
          )}
          {!playing && (
            <line x1="17" y1="9" x2="23" y2="15" />
          )}
        </svg>
      </button>
    </>
  );
}
