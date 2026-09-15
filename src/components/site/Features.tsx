import { Reveal } from "./Reveal";
import { FeatureIcon } from "./ornaments";

const items = [
  {
    kind: "cuisine" as const,
    title: "Authentic Arabic cuisine",
    text: "The true taste of Arabia, crafted meticulously with recipes carried straight from Beirut.",
  },
  {
    kind: "excellence" as const,
    title: "Culinary excellence",
    text: "A decade of experience behind the grill, still surpassing our own expectations every service.",
  },
  {
    kind: "location" as const,
    title: "Vibrant location",
    text: "Set where Galle Road meets the ocean — Lebanon Chef sits in the heart of Colombo.",
  },
];

export function Features() {
  return (
    <section className="bg-khatam relative bg-ink py-20 lg:py-28">
      <div className="relative mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 140}>
            <article className="gold-hairline relative h-full bg-ink-2/60 px-8 py-10 shadow-[inset_0_0_60px_-30px_color-mix(in_oklab,var(--gold)_35%,transparent)]">
              <span className="gold-text absolute right-6 top-5 font-display text-lg italic">0{i + 1}</span>
              <FeatureIcon kind={it.kind} />
              <h3 className="mt-6 text-2xl text-ivory">{it.title}</h3>
              <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-sand">{it.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
