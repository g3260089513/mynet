import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { VideoBackground } from "@/components/layout/VideoBackground";
import { AudioPlayer } from "@/components/layout/AudioPlayer";
import { getAbout } from "@/lib/content/about";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MYhao's Portfolio | 个人生涯展示",
    template: "%s | MYhao's Portfolio",
  },
  description: "个人游戏测评、作品展示与学习记录",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const about = getAbout();

  return (
    <html
      lang="zh-CN"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface-deepest text-text-primary">
        <VideoBackground />
        <GrainOverlay />
        <Header avatar={about?.avatar} />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <AudioPlayer />
      </body>
    </html>
  );
}
