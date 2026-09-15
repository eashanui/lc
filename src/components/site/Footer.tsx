import { LogoMark, StarMark, Wordmark } from "./ornaments";
import { SocialLinks } from "./SocialLinks";
import { NAV } from "./Header";
import { CONTACT } from "./About";

export function Footer() {
  return (
    <footer className="bg-khatam relative bg-ink">
      <div className="h-px bg-linear-to-r from-transparent via-gold to-transparent shadow-[0_0_18px_2px_color-mix(in_oklab,var(--gold)_45%,transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <Wordmark />
          </div>
          <p className="mt-6 max-w-sm font-light leading-relaxed text-sand">
            Ten years of Beirut on Galle Road. Charcoal, cardamom and a table that is always set for one more.
          </p>
          <div className="mt-6 flex items-center gap-1">
            <SocialLinks />
          </div>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-lg text-ivory">
            <StarMark /> Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-gold text-sm font-light tracking-wide text-sand hover:text-gold-light">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-lg text-ivory">
            <StarMark /> Visit
          </h3>
          <ul className="mt-5 space-y-3 text-sm font-light text-sand">
            <li>{CONTACT.address}</li>
            <li>
              <a href={CONTACT.phoneHref} className="link-gold hover:text-gold-light">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="link-gold hover:text-gold-light">
                {CONTACT.email}
              </a>
            </li>
            <li className="pt-2 text-xs tracking-wide text-sand-muted">
              Mon–Thu 11am–11pm · Fri–Sat 11am–12am · Sun 12pm–11pm
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-gold/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs tracking-wide text-sand-muted sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} Lebanon Chef, Colombo. All rights reserved.</span>
          <span>Galle Face · Colombo 03 · Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}
