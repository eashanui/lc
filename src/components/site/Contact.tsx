import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ornaments";
import { CONTACT } from "./About";

export function Contact() {
  return (
    <section id="contact" className="relative grid lg:grid-cols-2">
      <Reveal className="bg-arabesque relative bg-ink-2 px-5 py-20 sm:px-10 lg:px-16 lg:py-28 [&::before]:opacity-[0.05]">
        <div className="relative mx-auto max-w-lg lg:ml-auto lg:mr-10">
          <SectionHeading
            title="Find us on Galle Road"
            intro="Walk-ins are welcome, though the dining room fills quickly on weekends. Call ahead and we will keep a table by the window."
          />
          <ul className="mt-10 space-y-6">
            {[
              { Icon: MapPin, label: "Address", value: CONTACT.address },
              { Icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
              { Icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
            ].map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/50 text-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </span>
                <div>
                  <div className="text-[0.65rem] tracking-[0.25em] text-sand-muted">{label.toUpperCase()}</div>
                  {href ? (
                    <a href={href} className="link-gold mt-1 inline-block text-ivory hover:text-gold-light">
                      {value}
                    </a>
                  ) : (
                    <div className="mt-1 text-ivory">{value}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={120} className="relative min-h-[22rem] bg-ink p-3 lg:min-h-0">
        <div className="h-full w-full border border-gold/60 p-1.5">
          <iframe
            title="Lebanon Chef on Google Maps"
            src="https://www.google.com/maps?q=No+56+Galle+Road+Colombo+03+Galle+Face&output=embed"
            className="h-full min-h-[20rem] w-full grayscale-[0.3] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Reveal>
    </section>
  );
}
