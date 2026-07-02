import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground font-black text-lg transition-transform group-hover:scale-105">
            T
          </span>
          <span className="font-display text-2xl tracking-wider">
            TOGETHER<span className="text-primary">.</span>SHOPPING
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
            Accueil
          </Link>
          <Link to="/boutique" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
            Boutique
          </Link>
          <Link to="/boutique" search={{ categorie: "club" }} className="hover:text-primary transition-colors">
            Clubs
          </Link>
          <Link to="/boutique" search={{ categorie: "selection" }} className="hover:text-primary transition-colors">
            Sélections
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/panier"
            className="relative grid h-10 w-10 place-items-center rounded-md border border-border hover:border-primary hover:text-primary transition-colors"
            aria-label="Panier"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3 text-sm">
          <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link to="/boutique" onClick={() => setOpen(false)}>Boutique</Link>
          <Link to="/boutique" search={{ categorie: "club" }} onClick={() => setOpen(false)}>Clubs</Link>
          <Link to="/boutique" search={{ categorie: "selection" }} onClick={() => setOpen(false)}>Sélections</Link>
        </nav>
      )}
    </header>
  );
}
