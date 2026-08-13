import { band } from "@/content/band";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-border/60 bg-background-soft/60">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-black text-foreground tracking-tight">{band.name}</p>
          <p className="text-xs text-muted mt-1">
            © {currentYear} {band.englishName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
