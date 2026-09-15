import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./Buttons";
import { Corners, SectionHeading } from "./ornaments";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";

export const CONTACT = {
  phone: "+94 117 933 733",
  phoneHref: "tel:+94117933733",
  email: "reservation@lebananchef.com",
  address: "No. 56, Galle Road, Colombo 03 (Galle Face)",
};

export function About() {
  return (
    <section id="about" className="bg-arabesque relative bg-ivory py-24 lg:py-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] w-[78%]">
            <div className="corner-frame h-full w-full border border-gold/60 p-2.5">
              <Corners />
              <img
                src={about1}
                alt="Chef drizzling olive oil over hummus with spiced lamb"
                width={900}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="corner-frame absolute -bottom-10 right-0 w-[52%] border border-gold/60 bg-ivory p-2.5 shadow-panel">
            <Corners />
            <img
              src={about2}
              alt="Pistachio baklava on a brass tray with Arabic coffee"
              width={900}
              height={900}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="animate-glow-pulse gold-fill absolute left-[62%] top-[8%] grid h-28 w-28 -translate-x-1/2 place-items-center rounded-full text-center sm:h-32 sm:w-32">
            <div className="leading-none">
              <div className="font-display text-4xl font-semibold sm:text-5xl">10+</div>
              <div className="mt-1 text-[0.6rem] tracking-[0.2em]">YEARS OF CRAFT</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="pt-8 lg:pt-0">
          <SectionHeading
            tone="light"
            title="About Lebanon Chef"
            intro="Serving authentic Arabic cuisine in Colombo, Sri Lanka, with ten years of culinary excellence."
          />
          <p className="mt-5 max-w-xl font-light leading-relaxed text-muted-foreground">
            From the charcoal grill to the mezze counter, every plate is built the way it would be in a Beirut
            family kitchen — slow marinades, hand-rolled kibbeh, bread pulled from the oven as you sit down. We
            opened on Galle Road a decade ago and have never stopped chasing the taste of home.
          </p>
          <ul className="mt-8 space-y-4 text-[0.95rem]">
            {[
              { Icon: Phone, text: CONTACT.phone, href: CONTACT.phoneHref },
              { Icon: Mail, text: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { Icon: MapPin, text: CONTACT.address },
            ].map(({ Icon, text, href }) => (
              <li key={text} className="flex items-center gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-gold/50 text-gold-dark">
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </span>
                {href ? (
                  <a href={href} className="link-gold text-ink/85 hover:text-gold-dark">
                    {text}
                  </a>
                ) : (
                  <span className="text-ink/85">{text}</span>
                )}
              </li>
            ))}
          </ul>
          <ButtonLink href="#reservation" className="mt-10">
            Reserve your table
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
