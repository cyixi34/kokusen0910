import { band } from "@/content/band";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLabels: Record<string, string> = {
    weibo: "微博",
    bilibili: "B站",
    netease: "网易云",
    xiaohongshu: "小红书",
  };

  return (
    <footer className="py-12 px-6 border-t border-border/60 bg-background-soft/60">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-black text-foreground tracking-tight">{band.name}</p>
          <p className="text-xs text-muted mt-1">
            © {currentYear} {band.englishName}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {Object.entries(band.social).map(([key, value]) => (
            <a
              key={key}
              href={value}
              className="px-4 py-2 rounded-full text-xs font-bold text-muted bg-background-soft border border-border hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
            >
              {socialLabels[key] || key}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
