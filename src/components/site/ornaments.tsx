import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

/** Four line-art corner flourishes, for framed images, cards and panels. */
export function Corners() {
  return (
    <>
      <span aria-hidden className="corner corner-tl" />
      <span aria-hidden className="corner corner-tr" />
      <span aria-hidden className="corner corner-br" />
      <span aria-hidden className="corner corner-bl" />
    </>
  );
}

/** Mashrabiya lattice divider band with a soft gold glow. */
export function LatticeDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative flex items-center justify-center py-2", className)}>
      <div className="lattice-band w-full max-w-5xl" />
    </div>
  );
}

/** Small 8-point star mark. */
export function StarMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3 w-3", className)} aria-hidden {...props}>
      <path
        d="M12 1 L14.6 8.2 L22 6.9 L16.8 12 L22 17.1 L14.6 15.8 L12 23 L9.4 15.8 L2 17.1 L7.2 12 L2 6.9 L9.4 8.2 Z"
        fill="url(#starGold)"
      />
      <defs>
        <linearGradient id="starGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B6B2E" />
          <stop offset="0.5" stopColor="#C9A44C" />
          <stop offset="1" stopColor="#F0D998" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Short gold rule with a diamond at the end — used under headings. */
export function GoldRule({ className, align = "left" }: { className?: string; align?: "left" | "center" }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center gap-2", align === "center" && "justify-center", className)}
    >
      <span className="h-px w-12 bg-linear-to-r from-gold-dark via-gold to-gold-light" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-6 bg-linear-to-r from-gold to-transparent" />
    </div>
  );
}

/** Large rotating arabesque line-art ornament (hero). */
export function Arabesque({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="200" cy="200" r="190" />
      <circle cx="200" cy="200" r="150" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="100" />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 200 200)`}>
          <path d="M200 10 C230 80 230 120 200 170 C170 120 170 80 200 10Z" />
          <path d="M200 100 C215 130 215 150 200 170 C185 150 185 130 200 100Z" />
          <path d="M200 20 L212 60 L200 100 L188 60Z" />
        </g>
      ))}
      <path d="M200 60 L240 200 L200 340 L160 200Z M60 200 L200 160 L340 200 L200 240Z" />
    </svg>
  );
}

/** Arabesque line icons for the features trio. */
export function FeatureIcon({ kind, className }: { kind: "cuisine" | "excellence" | "location"; className?: string }) {
  const common = { fill: "none", stroke: "url(#iconGold)", strokeWidth: 1.1, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 64 64" className={cn("h-14 w-14", className)} aria-hidden>
      <defs>
        <linearGradient id="iconGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B6B2E" />
          <stop offset="0.5" stopColor="#C9A44C" />
          <stop offset="1" stopColor="#F0D998" />
        </linearGradient>
      </defs>
      {kind === "cuisine" && (
        <g {...common}>
          <path d="M10 38 Q32 28 54 38 Q32 56 10 38Z" />
          <path d="M6 38 H58" />
          <path d="M32 12 C40 18 40 26 32 30 C24 26 24 18 32 12Z" />
          <path d="M20 24 C26 26 28 30 28 32 M44 24 C38 26 36 30 36 32" />
          <circle cx="32" cy="21" r="1.4" fill="#F0D998" stroke="none" />
        </g>
      )}
      {kind === "excellence" && (
        <g {...common}>
          <path d="M32 6 L37 22 L54 22 L40 32 L45 48 L32 38 L19 48 L24 32 L10 22 L27 22Z" />
          <circle cx="32" cy="29" r="5" />
          <path d="M22 56 H42 M18 52 H46" />
        </g>
      )}
      {kind === "location" && (
        <g {...common}>
          <path d="M32 58 C32 58 14 40 14 26 A18 18 0 0 1 50 26 C50 40 32 58 32 58Z" />
          <path d="M32 16 C38 20 38 28 32 32 C26 28 26 20 32 16Z" />
          <path d="M8 60 Q20 54 32 60 Q44 66 56 60" />
        </g>
      )}
    </svg>
  );
}

/** Logo mark: rotated square with gold gradient border and "LC". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid h-10 w-10 shrink-0 place-items-center",
        className,
      )}
      aria-hidden
    >
      <span className="gold-border absolute inset-0 rotate-45 [--bg-fill:var(--ink)]" />
      <span className="gold-border absolute inset-[5px] rotate-45 opacity-60 [--bg-fill:transparent]" />
      <span className="gold-text relative font-display text-base font-semibold tracking-wider">LC</span>
    </span>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={cn("gold-text font-display font-semibold tracking-wide", compact ? "text-xl" : "text-2xl")}>
        Lebanon Chef
      </span>
      <span className="mt-1 text-[0.58rem] tracking-[0.32em] text-sand-muted">COLOMBO · GALLE FACE</span>
    </span>
  );
}

export function SectionHeading({
  title,
  intro,
  align = "left",
  tone = "dark",
  children,
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <h2
        className={cn(
          "text-4xl leading-[1.05] sm:text-5xl lg:text-[3.4rem]",
          tone === "dark" ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      <GoldRule className="mt-5" align={align} />
      {intro && (
        <p className={cn("mt-5 text-base font-light leading-relaxed sm:text-lg", tone === "dark" ? "text-sand" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
