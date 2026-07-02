import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { formatFCFA } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produit/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.nom}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-black/70 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
          {product.categorie === "club" ? "Club" : "Sélection"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{product.equipe}</div>
        <div className="font-semibold leading-tight line-clamp-2">{product.nom}</div>
        <div className="mt-auto flex items-baseline justify-between pt-2">
          <span className="font-display text-xl text-primary">{formatFCFA(product.prix)}</span>
          <span className="text-xs text-muted-foreground">{product.stock} en stock</span>
        </div>
      </div>
    </Link>
  );
}
