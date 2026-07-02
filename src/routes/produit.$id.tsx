import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { getProduct, formatFCFA } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.nom} — together-shopping` },
          { name: "description", content: loaderData.product.description },
        ]
      : [{ title: "Produit introuvable" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Produit introuvable</h1>
      <Link to="/boutique" className="mt-6 inline-block text-primary">Retour à la boutique</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [taille, setTaille] = useState(product.tailles[1] ?? product.tailles[0]);
  const [qte, setQte] = useState(1);
  const { add } = useCart();

  const handleAdd = () => {
    add(product.id, taille, qte);
    toast.success("Ajouté au panier", {
      description: `${product.nom} — Taille ${taille} × ${qte}`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
      <Link to="/boutique" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Retour à la boutique
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-black">
          <img
            src={product.image}
            alt={product.nom}
            width={800}
            height={800}
            className="h-full w-full object-cover"
          />
          <span className="absolute top-4 left-4 rounded-full bg-black/70 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {product.categorie === "club" ? "Club" : "Sélection nationale"}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="text-sm uppercase tracking-widest text-muted-foreground">{product.equipe}</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl leading-tight">{product.nom}</h1>
          <div className="mt-4 font-display text-4xl text-primary text-glow">{formatFCFA(product.prix)}</div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <div className="text-xs font-bold uppercase tracking-wider mb-3">Taille</div>
            <div className="flex flex-wrap gap-2">
              {product.tailles.map((t: string) => (
                <button
                  key={t}
                  onClick={() => setTaille(t)}
                  className={`min-w-14 rounded-md border px-4 py-2 text-sm font-bold transition-colors ${
                    taille === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-wider mb-3">Quantité</div>
            <div className="inline-flex items-center rounded-md border border-border">
              <button onClick={() => setQte((q) => Math.max(1, q - 1))} className="px-4 py-2 hover:text-primary">
                −
              </button>
              <span className="w-10 text-center font-bold">{qte}</span>
              <button onClick={() => setQte((q) => Math.min(product.stock, q + 1))} className="px-4 py-2 hover:text-primary">
                +
              </button>
            </div>
            <span className="ml-3 text-sm text-muted-foreground">{product.stock} en stock</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="h-4 w-4" />
            Ajouter au panier
          </button>

          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Livraison rapide en Afrique</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Paiement Mobile Money ou cash à la livraison</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Tissu respirant, coupe officielle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
