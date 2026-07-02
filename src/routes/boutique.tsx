import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  categorie: fallback(z.enum(["all", "club", "selection"]), "all").default("all"),
  prixMax: fallback(z.number(), 20000).default(20000),
  q: fallback(z.string(), "").default(""),
});

type BoutiqueSearch = z.infer<typeof searchSchema>;


export const Route = createFileRoute("/boutique")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Boutique — together-shopping" },
      { name: "description", content: "Tous nos maillots de football, filtrés par club, sélection ou prix." },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  const { categorie, prixMax, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/boutique" });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categorie !== "all" && p.categorie !== categorie) return false;
      if (p.prix > prixMax) return false;
      if (q && !`${p.nom} ${p.equipe}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [categorie, prixMax, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Catalogue</div>
        <h1 className="font-display text-4xl md:text-6xl">La boutique</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* FILTERS */}
        <aside className="space-y-6 rounded-xl border border-border bg-card p-5 h-fit lg:sticky lg:top-24">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Recherche</label>
            <input
              type="text"
              value={q}
              onChange={(e) =>
                navigate({ search: (prev: BoutiqueSearch) => ({ ...prev, q: e.target.value }) })
              }
              placeholder="Club, pays..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Catégorie</label>
            <div className="flex flex-col gap-1">
              {(["all", "club", "selection"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() =>
                    navigate({ search: (prev: BoutiqueSearch) => ({ ...prev, categorie: c }) })
                  }
                  className={`text-left rounded-md px-3 py-2 text-sm transition-colors ${
                    categorie === c
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-secondary"
                  }`}
                >
                  {c === "all" ? "Tous" : c === "club" ? "Clubs" : "Sélections nationales"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Prix max : <span className="text-primary">{prixMax.toLocaleString("fr-FR")} FCFA</span>
            </label>
            <input
              type="range"
              min={5000}
              max={20000}
              step={500}
              value={prixMax}
              onChange={(e) =>
                navigate({ search: (prev: BoutiqueSearch) => ({ ...prev, prixMax: Number(e.target.value) }) })
              }
              className="w-full accent-[color:var(--color-primary)]"
            />
          </div>
        </aside>

        {/* GRID */}
        <div>
          <div className="mb-4 text-sm text-muted-foreground">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
              Aucun produit ne correspond à ces filtres.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
