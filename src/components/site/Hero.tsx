import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./Buttons";
import { Arabesque } from "./ornaments";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    img: hero1,
    alt: "Sizzling Lebanese mixed grill on a gold-rimmed platter",
    title: "We believe good food offers a great smile",
    text: "Our mission is to bring joy through delicious meals, creating memorable moments with every bite.",
  },
  {
    img: hero2,
    alt: "An elaborate mezze spread by candlelight",
    title: "Bringing the joy of Arabia to your plate",
    text: "We strive to delight your taste buds and create unforgettable culinary experiences.",
  },
  {
    img: hero3,
    alt: "Lamb skewers over an open charcoal fire",
    title: "Exploring a delicious world of flavour",
    text: "Explore our diverse menu and savour every bite, discovering new tastes with every dish.",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active] ?? slides[0]!;

  return (
    <section id="home" className="bg-khatam relative isolate flex min-h-svh items-end overflow-hidden bg-ink lg:items-center">
      {/* Backgrounds */}
      {slides.map((s, i) => (
        <div
          key={s.img}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-[1600ms] ease-out",
            i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]",
          )}
        >
          <img
            src={s.img}
            alt={s.alt}
            width={1600}
            height={1000}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            className={cn("h-full w-full object-cover", i === active && "animate-ken-burns")}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/75 to-ink/25" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/50" />

      {/* Steam wisps */}
      <div aria-hidden className="pointer-events-none absolute bottom-[28%] right-[18%] hidden lg:block">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-steam absolute block h-40 w-16 rounded-full bg-ivory/40 blur-2xl"
            style={{ left: `${i * 34}px`, animationDelay: `${i * 2.2}s` }}
          />
        ))}
      </div>

      {/* Rotating arabesque */}
      <Arabesque className="animate-spin-slow pointer-events-none absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 text-gold opacity-[0.14] lg:right-[6%] lg:h-[40rem] lg:w-[40rem]" />

      {/* Copy */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="animate-draw h-px w-14 origin-left bg-linear-to-r from-gold-dark via-gold to-gold-light" />
            <span className="animate-fade-in text-sm font-light tracking-[0.12em] text-gold-light [animation-delay:600ms]">
              Ten years of Beirut on Galle Road
            </span>
          </div>

          <h1 key={active} className="mt-7 text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-[5.2rem]">
            {slide.title.split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.28em] align-top">
                <span className="animate-rise inline-block" style={{ animationDelay: `${200 + i * 90}ms` }}>
                  {w}
                </span>
              </span>
            ))}
          </h1>

          <p
            key={`p-${active}`}
            className="animate-fade-in mt-6 max-w-lg text-base font-light leading-relaxed text-sand sm:text-lg [animation-delay:900ms]"
          >
            {slide.text}
          </p>

          <div className="animate-fade-in mt-10 flex flex-wrap gap-4 [animation-delay:1100ms]">
            <ButtonLink href="#reservation">Book a table</ButtonLink>
            <ButtonLink href="#menu" variant="outline">
              View the menu
            </ButtonLink>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-14 flex items-center gap-3 lg:absolute lg:bottom-16 lg:left-8 lg:mt-0" role="tablist" aria-label="Hero slides">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className="group grid h-6 w-6 place-items-center"
            >
              <span
                className={cn(
                  "block rotate-45 transition-all duration-500",
                  i === active
                    ? "h-2.5 w-2.5 bg-linear-to-br from-gold-dark via-gold to-gold-light shadow-[0_0_10px_var(--gold)]"
                    : "h-1.5 w-1.5 bg-ivory/40 group-hover:bg-gold",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
