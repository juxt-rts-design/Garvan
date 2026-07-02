export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-xl tracking-wider">
            TOGETHER<span className="text-primary">.</span>SHOPPING
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Ta boutique de maillots de football — clubs, sélections, éditions Coupe du Monde. Paiement en FCFA.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Accueil</li>
            <li>Boutique</li>
            <li>Panier</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Paiement</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Mobile Money</li>
            <li>Cash à la livraison</li>
            <li>Livraison rapide en Afrique</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} together-shopping — Tous droits réservés.
      </div>
    </footer>
  );
}
