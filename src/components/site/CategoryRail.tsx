import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { LatticeDivider, SectionHeading, StarMark } from "./ornaments";

import arabicCorner from "@/assets/cat-arabic-corner.jpg";
import mainCourse from "@/assets/cat-main-course.jpg";
import bbq from "@/assets/cat-bbq.jpg";
import sandwiches from "@/assets/cat-sandwiches.jpg";
import seafood from "@/assets/cat-seafood.jpg";
import hotApp from "@/assets/cat-hot-appetizers.jpg";
import coldApp from "@/assets/cat-cold-appetizers.jpg";
import soups from "@/assets/cat-soups.jpg";
import bakery from "@/assets/cat-bakery.jpg";
import juices from "@/assets/cat-fresh-juices.jpg";
import hotDrinks from "@/assets/cat-hot-drinks.jpg";
import shakes from "@/assets/cat-milk-shakes.jpg";
import smoothies from "@/assets/cat-smoothies.jpg";
import frozen from "@/assets/cat-frozen-beverages.jpg";
import mojitos from "@/assets/cat-mojitos.jpg";
import iceCoffee from "@/assets/cat-ice-coffees.jpg";
import sweets from "@/assets/cat-oriental-sweets.jpg";
import cakes from "@/assets/cat-cakes.jpg";

const categories = [
  { name: "Arabic Corner", img: arabicCorner },
  { name: "Main Course", img: mainCourse },
  { name: "BBQ", img: bbq },
  { name: "Sandwiches", img: sandwiches },
  { name: "Seafood Corner", img: seafood },
  { name: "Hot Appetizers", img: hotApp },
  { name: "Cold Appetizers", img: coldApp },
  { name: "Soups", img: soups },
  { name: "Bakery", img: bakery },
  { name: "Fresh Juices", img: juices },
  { name: "Hot Drinks", img: hotDrinks },
  { name: "Milk Shakes", img: shakes },
  { name: "Smoothies", img: smoothies },
  { name: "Frozen Beverages", img: frozen },
  { name: "Mojitos", img: mojitos },
  { name: "Ice Coffees", img: iceCoffee },
  { name: "Oriental Sweets", img: sweets },
  { name: "Cakes (per KG)", img: cakes },
];

export function CategoryRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const paused = useRef(false);
  const drag = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);

  // Track visibility of the rail
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-scroll (marquee-style) while in view and idle
  useEffect(() => {
    const el = railRef.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused.current && !drag.current) {
        el.scrollLeft += dt * 0.035;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el || !drag.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current = null;
  };

  const list = [...categories, ...categories];

  return (
    <section id="menu" className="relative bg-ivory-2 py-24 lg:py-32">
      <LatticeDivider className="absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-display text-xl italic text-gold-dark">From our kitchen</p>
          <SectionHeading
            tone="light"
            title="A world of flavour"
            intro="Eighteen corners of the menu, from the mezze counter to the barista's bar. Drag to wander."
          />
        </Reveal>
      </div>

      <div
        ref={railRef}
        className="scrollbar-none mt-14 flex cursor-grab select-none gap-5 overflow-x-auto px-5 active:cursor-grabbing sm:px-8"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
        onDragStart={(e) => e.preventDefault()}
      >
        {list.map((c, i) => (
          <Reveal
            key={`${c.name}-${i}`}
            delay={i < categories.length ? Math.min(i, 6) * 90 : 0}
            className="w-[15.5rem] shrink-0 sm:w-[17rem]"
          >
            <article className="gold-hairline group relative overflow-hidden bg-ink">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  width={768}
                  height={960}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100",
                    "bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0_0_0/0.55)_100%)]",
                  )}
                />
              </div>
              <div className="relative flex items-center justify-between bg-ink-2 px-5 py-4">
                <h3 className="link-gold font-display text-xl text-ivory group-hover:after:scale-x-100 group-hover:after:origin-left">
                  {c.name}
                </h3>
                <StarMark className="h-3.5 w-3.5 opacity-80" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
