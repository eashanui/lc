import { Reveal } from "./Reveal";
import { SectionHeading } from "./ornaments";
import g1 from "@/assets/guest-1.jpg";
import g2 from "@/assets/guest-2.jpg";
import g3 from "@/assets/guest-3.jpg";

const quotes = [
  { name: "Sarah A", img: g1, text: "Lebanon Chef's authentic flavours transport me back to the streets of Beirut. Every dish is a masterpiece!" },
  { name: "Emine S", img: g2, text: "As a lover of Arabic cuisine, Lebanon Chef exceeded my expectations. The flavours are simply divine!" },
  { name: "Emily S", img: g3, text: "The ambiance at Lebanon Chef is as inviting as the food. A must-visit for anyone in Colombo!" },
];

export function Testimonials() {
  return (
    <section className="bg-khatam relative bg-ink py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading align="center" title="Words from our table" />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 140}>
              <figure className="gold-hairline relative flex h-full flex-col bg-ink-2/70 px-8 pb-9 pt-10">
                <span className="gold-text absolute -top-3 left-6 font-display text-8xl italic leading-none">“</span>
                <blockquote className="relative mt-6 flex-1 font-display text-xl leading-relaxed text-ivory/90">
                  {q.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="octagon relative grid h-14 w-14 place-items-center bg-linear-to-br from-gold-dark via-gold to-gold-light p-[1.5px]">
                    <img src={q.img} alt={q.name} width={512} height={512} loading="lazy" className="octagon h-full w-full object-cover" />
                  </span>
                  <div>
                    <div className="text-sm font-medium tracking-wide text-ivory">{q.name}</div>
                    <div className="text-xs tracking-[0.2em] text-sand-muted">COLOMBO</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
