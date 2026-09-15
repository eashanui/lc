import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { About } from "@/components/site/About";
import { Heart } from "@/components/site/Heart";
import { CategoryRail } from "@/components/site/CategoryRail";
import { ExploreMenu } from "@/components/site/ExploreMenu";
import { Testimonials } from "@/components/site/Testimonials";
import { CtaBand } from "@/components/site/CtaBand";
import { Reservation } from "@/components/site/Reservation";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const TITLE = "Lebanon Chef — Authentic Arabic Cuisine in Colombo";
const DESCRIPTION =
  "Lebanon Chef serves authentic Lebanese and Arabic cuisine on Galle Road, Colombo 03 — mezze, open-fire grill, fresh juices and oriental sweets. Book your table.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-ink">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Heart />
        <CategoryRail />
        <ExploreMenu />
        <Testimonials />
        <CtaBand />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
