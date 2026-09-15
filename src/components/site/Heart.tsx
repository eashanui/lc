import { Reveal } from "./Reveal";
import { SectionHeading, StarMark } from "./ornaments";
import heart from "@/assets/heart.jpg";

const tags = ["Open-fire grill", "Fresh mezze daily", "House-baked bread", "Family-style service"];

export function Heart() {
  return (
    <section className="bg-khatam relative bg-ink-2 py-24 lg:py-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <div className="absolute -inset-[1px] bg-linear-to-b from-gold-light via-gold to-gold-dark" />
            <div className="relative m-[1px] bg-ink">
              <img
                src={heart}
                alt="The candlelit dining room at Lebanon Chef with pointed arches and brass lanterns"
                width={1000}
                height={1200}
                loading="lazy"
                className="aspect-[5/6] w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
            </div>
            <StarMark className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="font-display text-xl italic text-gold">In the heart of Colombo</p>
          <SectionHeading
            title="Experience the world of authentic Arabic cuisine"
            intro="Steps from the Galle Face promenade, our dining room glows with lantern light and the scent of charcoal. Come for a long lunch, a late dinner, or a table of shared plates that never seems to end."
          />
          <ul className="mt-8 flex flex-wrap gap-3">
            {tags.map((t) => (
              <li
                key={t}
                className="shimmer-hover border border-gold/55 px-4 py-2 text-xs tracking-[0.15em] text-gold-light transition-colors hover:border-gold-light"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
