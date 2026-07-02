import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export interface CartItem {
  productId: string;
  taille: string;
  quantite: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (productId: string, taille: string, quantite?: number) => void;
  remove: (productId: string, taille: string) => void;
  setQuantite: (productId: string, taille: string, quantite: number) => void;
  clear: () => void;
  count: number;
  total: number;
  detailed: Array<CartItem & { product: Product; sousTotal: number }>;
}

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "together-shopping-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartContextValue["add"] = (productId, taille, quantite = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productId === productId && x.taille === taille);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantite: next[i].quantite + quantite };
        return next;
      }
      return [...prev, { productId, taille, quantite }];
    });
  };

  const remove: CartContextValue["remove"] = (productId, taille) =>
    setItems((prev) => prev.filter((x) => !(x.productId === productId && x.taille === taille)));

  const setQuantite: CartContextValue["setQuantite"] = (productId, taille, quantite) => {
    if (quantite <= 0) return remove(productId, taille);
    setItems((prev) =>
      prev.map((x) =>
        x.productId === productId && x.taille === taille ? { ...x, quantite } : x,
      ),
    );
  };

  const clear = () => setItems([]);

  const detailed = items
    .map((it) => {
      const product = products.find((p) => p.id === it.productId);
      if (!product) return null;
      return { ...it, product, sousTotal: product.prix * it.quantite };
    })
    .filter(Boolean) as CartContextValue["detailed"];

  const total = detailed.reduce((s, it) => s + it.sousTotal, 0);
  const count = items.reduce((s, it) => s + it.quantite, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQuantite, clear, count, total, detailed }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
