import { Reveal } from "./Reveal";
import { ButtonLink } from "./Buttons";
import { GoldRule } from "./ornaments";

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  delay: `${(i * 1.7) % 14}s`,
  size: 2 + (i % 3),
  duration: `${12 + (i % 5) * 2}s`,
}));

export function CtaBand() {
  return (
    <section className="bg-arabesque relative overflow-hidden py-28 lg:py-36 [background-image:var(--gradient-oxblood)]">
      <div className="absolute inset-0 opacity-60 [&::before]:opacity-100" />
      {/* Gold dust */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="animate-dust absolute bottom-0 block rounded-full bg-gold-light"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: 0,
              boxShadow: "0 0 6px var(--gold)",
            }}
          />
        ))}
      </div>
      <Reveal className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl">
          Colombo's home for authentic Arabic cuisine
        </h2>
        <GoldRule className="mt-6" align="center" />
        <p className="mt-6 text-lg font-light text-sand">
          Bringing the flavours of Arabia to Colombo, one shared plate at a time.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="#reservation">Book a table</ButtonLink>
          <ButtonLink href="#menu" variant="outline">
            View the menu
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
