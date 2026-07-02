import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Zap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" width={1600} height={1024} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Nouvelle saison 24/25
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide">
              Porte les couleurs.
              <br />
              <span className="text-primary text-glow">Vis le match.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Maillots officiels de clubs et sélections nationales. Livraison rapide, paiement en FCFA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/boutique"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-all hover:scale-105"
              >
                Voir la boutique <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/boutique"
                search={{ categorie: "selection" }}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 backdrop-blur px-6 py-3 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
              >
                Sélections nationales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: Truck, title: "Livraison rapide", desc: "Partout en Afrique" },
            { icon: ShieldCheck, title: "Paiement sécurisé", desc: "Mobile Money & cash" },
            { icon: Zap, title: "Prix en FCFA", desc: "Sans conversion cachée" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Top ventes</div>
            <h2 className="font-display text-4xl md:text-5xl">Maillots en vedette</h2>
          </div>
          <Link to="/boutique" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
            Tout voir <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-10 md:p-16 text-center">
          <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative">
            <h3 className="font-display text-3xl md:text-5xl">Rejoins la team des vrais supporters</h3>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Découvre toute la collection : clubs européens, champions d'Afrique et sélections mondiales.
            </p>
            <Link
              to="/boutique"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
            >
              Explorer la boutique <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
