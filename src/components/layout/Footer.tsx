import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle bg-surface-base">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="font-heading text-lg font-bold gold-gradient-text tracking-wide"
            >
              MYhao
            </Link>
            <p className="mt-2 text-text-muted text-sm max-w-xs">
              游戏玩家 · 开发者 · 终身学习者
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 tracking-wide uppercase">
              导航
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-text-secondary hover:text-gold-400 transition-colors">
                关于我
              </Link>
              <Link href="/game-reviews" className="text-sm text-text-secondary hover:text-gold-400 transition-colors">
                游戏测评
              </Link>
              <Link href="/portfolio" className="text-sm text-text-secondary hover:text-gold-400 transition-colors">
                作品集
              </Link>
              <Link href="/learning-journal" className="text-sm text-text-secondary hover:text-gold-400 transition-colors">
                学习笔记
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 tracking-wide uppercase">
              联系
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/g3260089513"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-gold-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:3260089513@qq.com"
                className="text-sm text-text-secondary hover:text-gold-400 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle text-center text-text-muted text-xs">
          &copy; {new Date().getFullYear()} MYhao. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
