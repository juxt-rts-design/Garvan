import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatFCFA } from "@/lib/products";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Passer commande — together-shopping" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Commande,
});

const schema = z.object({
  nom: z.string().trim().min(2, "Nom requis").max(100),
  telephone: z.string().trim().min(6, "Téléphone requis").max(30),
  adresse: z.string().trim().min(5, "Adresse requise").max(300),
  paiement: z.enum(["mobile", "cash"]),
});

function Commande() {
  const { detailed, total, count, clear } = useCart();
  const [form, setForm] = useState({ nom: "", telephone: "", adresse: "", paiement: "mobile" as "mobile" | "cash" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState<string | null>(null);

  if (count === 0 && !orderId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Ton panier est vide</h1>
        <Link to="/boutique" className="mt-6 inline-block text-primary font-bold">Aller à la boutique</Link>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-display text-4xl">Commande confirmée !</h1>
        <p className="mt-3 text-muted-foreground">
          Ton numéro de commande : <span className="font-mono text-primary">{orderId}</span>
        </p>
        <p className="mt-2 text-muted-foreground">
          Nous te contactons sous peu pour finaliser la livraison.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const id = "TS-" + Date.now().toString(36).toUpperCase();
    setOrderId(id);
    clear();
    toast.success("Commande envoyée !");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-8">Finaliser la commande</h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Nom complet</label>
            <input
              type="text"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              maxLength={100}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:border-primary focus:outline-none"
              placeholder="Ex : Amadou Diallo"
            />
            {errors.nom && <p className="mt-1 text-xs text-destructive">{errors.nom}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Téléphone</label>
            <input
              type="tel"
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              maxLength={30}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:border-primary focus:outline-none"
              placeholder="+221 77 000 00 00"
            />
            {errors.telephone && <p className="mt-1 text-xs text-destructive">{errors.telephone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Adresse de livraison</label>
            <textarea
              value={form.adresse}
              onChange={(e) => setForm({ ...form, adresse: e.target.value })}
              maxLength={300}
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:border-primary focus:outline-none"
              placeholder="Ville, quartier, point de repère..."
            />
            {errors.adresse && <p className="mt-1 text-xs text-destructive">{errors.adresse}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-3">Mode de paiement</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { v: "mobile", label: "Mobile Money", desc: "Orange, Wave, MTN..." },
                { v: "cash", label: "Cash à la livraison", desc: "Paie en recevant" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.v}
                  onClick={() => setForm({ ...form, paiement: opt.v as "mobile" | "cash" })}
                  className={`rounded-md border p-4 text-left transition-colors ${
                    form.paiement === opt.v
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Ta commande</h2>
          <div className="mt-4 space-y-3 max-h-64 overflow-auto">
            {detailed.map((it) => (
              <div key={`${it.productId}-${it.taille}`} className="flex items-center gap-3 text-sm">
                <img src={it.product.image} alt="" width={48} height={48} className="h-12 w-12 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{it.product.nom}</div>
                  <div className="text-xs text-muted-foreground">Taille {it.taille} × {it.quantite}</div>
                </div>
                <div className="text-primary font-bold">{formatFCFA(it.sousTotal)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-4 flex justify-between items-baseline">
            <span className="font-bold">Total</span>
            <span className="font-display text-3xl text-primary">{formatFCFA(total)}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
          >
            Confirmer la commande
          </button>
        </aside>
      </form>
    </div>
  );
}
