import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatFCFA } from "@/lib/products";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier — together-shopping" },
      { name: "description", content: "Ton panier de maillots de football." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Panier,
});

function Panier() {
  const { detailed, total, setQuantite, remove, count } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-4xl">Ton panier est vide</h1>
        <p className="mt-3 text-muted-foreground">Découvre notre sélection de maillots officiels.</p>
        <Link
          to="/boutique"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
        >
          Aller à la boutique <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-8">Mon panier</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {detailed.map((it) => (
            <div
              key={`${it.productId}-${it.taille}`}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <img
                src={it.product.image}
                alt={it.product.nom}
                width={120}
                height={120}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.product.equipe}</div>
                    <div className="font-semibold">{it.product.nom}</div>
                    <div className="text-xs text-muted-foreground">Taille : {it.taille}</div>
                  </div>
                  <button
                    onClick={() => remove(it.productId, it.taille)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-md border border-border text-sm">
                    <button onClick={() => setQuantite(it.productId, it.taille, it.quantite - 1)} className="px-3 py-1.5 hover:text-primary">−</button>
                    <span className="w-8 text-center font-bold">{it.quantite}</span>
                    <button onClick={() => setQuantite(it.productId, it.taille, it.quantite + 1)} className="px-3 py-1.5 hover:text-primary">+</button>
                  </div>
                  <div className="font-display text-lg text-primary">{formatFCFA(it.sousTotal)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Récapitulatif</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total ({count} article{count > 1 ? "s" : ""})</span>
              <span>{formatFCFA(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-primary">À définir</span>
            </div>
          </div>
          <div className="mt-4 border-t border-border pt-4 flex justify-between items-baseline">
            <span className="font-bold">Total</span>
            <span className="font-display text-3xl text-primary">{formatFCFA(total)}</span>
          </div>
          <Link
            to="/commande"
            className="mt-6 flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
          >
            Passer commande <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/boutique"
            className="mt-3 flex items-center justify-center rounded-md border border-border px-6 py-2.5 text-sm hover:border-primary"
          >
            Continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  );
}
