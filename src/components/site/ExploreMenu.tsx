import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Corners, GoldRule } from "./ornaments";
import menuFood from "@/assets/menu-food.jpg";
import menuBarista from "@/assets/menu-barista.jpg";
import menuDessert from "@/assets/menu-dessert.jpg";

const blocks = [
  {
    n: "I",
    label: "Food menu",
    title: "Mezze, mains & the open-fire grill",
    text: "Hot and cold appetizers, seafood from the morning market, charcoal BBQ, sandwiches for the road, and the Arabic Corner — the dishes our grandmothers would recognise.",
    img: menuFood,
    alt: "A Lebanese feast of grilled meats and mezze on dark marble",
  },
  {
    n: "II",
    label: "Barista",
    title: "Hot drinks, fresh juices & frozen favourites",
    text: "Cardamom coffee poured from the dallah, pomegranate pressed to order, mojitos, smoothies, milkshakes and ice coffees for Colombo afternoons.",
    img: menuBarista,
    alt: "Arabic coffee being poured beside juices and iced coffee",
  },
  {
    n: "III",
    label: "Dessert menu",
    title: "Oriental sweets, cakes & the bakery counter",
    text: "Knafeh with the cheese still stretching, pistachio baklava, maamoul, and celebration cakes by the kilo from our own bakery.",
    img: menuDessert,
    alt: "Golden knafeh being cut with syrup pouring",
  },
];

export function ExploreMenu() {
  return (
    <section className="relative">
      {blocks.map((b, i) => {
        const dark = i % 2 === 1;
        return (
          <div key={b.n} className={cn("relative py-20 lg:py-28", dark ? "bg-khatam bg-emerald-deep" : "bg-ivory")}>
            <div
              className={cn(
                "relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20",
              )}
            >
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <div className={cn("corner-frame border p-2.5", dark ? "border-gold/60" : "border-gold/50")}>
                  <Corners />
                  <img
                    src={b.img}
                    alt={b.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={120} className={cn(i % 2 === 1 && "lg:order-1")}>
                <div className="flex items-start gap-6">
                  <span className="gold-text font-display text-7xl leading-none italic sm:text-8xl">{b.n}</span>
                  <div className="pt-2">
                    <p className={cn("font-display text-xl italic", dark ? "text-gold" : "text-gold-dark")}>{b.label}</p>
                    <h3 className={cn("mt-2 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]", dark ? "text-ivory" : "text-ink")}>
                      {b.title}
                    </h3>
                  </div>
                </div>
                <GoldRule className="mt-6" />
                <p className={cn("mt-6 max-w-lg font-light leading-relaxed", dark ? "text-sand" : "text-muted-foreground")}>
                  {b.text}
                </p>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
