import psg from "@/assets/jersey-psg.jpg";
import real from "@/assets/jersey-real.jpg";
import barca from "@/assets/jersey-barca.jpg";
import senegal from "@/assets/jersey-senegal.jpg";
import civ from "@/assets/jersey-civ.jpg";
import manu from "@/assets/jersey-manu.jpg";
import mancity from "@/assets/jersey-mancity.jpg";
import liverpool from "@/assets/jersey-liverpool.jpg";
import brazil from "@/assets/jersey-brazil.jpg";
import france from "@/assets/jersey-france.jpg";
import argentina from "@/assets/jersey-argentina.jpg";
import bayern from "@/assets/jersey-bayern.jpg";
import chelsea from "@/assets/jersey-chelsea.jpg";
import arsenal from "@/assets/jersey-arsenal.jpg";
import juve from "@/assets/jersey-juve.jpg";
import milan from "@/assets/jersey-milan.jpg";
import dortmund from "@/assets/jersey-dortmund.jpg";
import maroc from "@/assets/jersey-maroc.jpg";
import nigeria from "@/assets/jersey-nigeria.jpg";
import portugal from "@/assets/jersey-portugal.jpg";
import allemagne from "@/assets/jersey-allemagne.jpg";
import atletico from "@/assets/jersey-atletico.jpg";
import napoli from "@/assets/jersey-napoli.jpg";
import cameroun from "@/assets/jersey-cameroun.jpg";


export type Categorie = "club" | "selection";

export interface Product {
  id: string;
  nom: string;
  equipe: string;
  prix: number; // FCFA
  stock: number;
  categorie: Categorie;
  image: string;
  description: string;
  featured?: boolean;
  tailles: string[];
}

const T = ["S", "M", "L", "XL"];

export const products: Product[] = [
  { id: "psg-home", nom: "Maillot PSG Domicile 24/25", equipe: "PSG", prix: 10000, stock: 12, categorie: "club", image: psg, description: "Maillot officiel domicile du Paris Saint-Germain, tissu respirant et coupe ajustée.", featured: true, tailles: T },
  { id: "real-home", nom: "Maillot Real Madrid Domicile 24/25", equipe: "Real Madrid", prix: 12000, stock: 8, categorie: "club", image: real, description: "L'iconique maillot blanc des Merengues, édition saison 24/25.", featured: true, tailles: T },
  { id: "barca-home", nom: "Maillot FC Barcelone Domicile", equipe: "FC Barcelone", prix: 11500, stock: 10, categorie: "club", image: barca, description: "Blaugrana traditionnel, coupe moderne et confort optimal.", featured: true, tailles: T },
  { id: "manu-home", nom: "Maillot Manchester United", equipe: "Man United", prix: 11000, stock: 6, categorie: "club", image: manu, description: "Le rouge légendaire des Red Devils.", tailles: T },
  { id: "mancity-home", nom: "Maillot Manchester City", equipe: "Man City", prix: 11000, stock: 9, categorie: "club", image: mancity, description: "Bleu ciel des Citizens, coupe premium.", tailles: T },
  { id: "liverpool-home", nom: "Maillot Liverpool FC", equipe: "Liverpool", prix: 11000, stock: 7, categorie: "club", image: liverpool, description: "You'll Never Walk Alone — l'authentique maillot des Reds.", tailles: T },
  { id: "bayern-home", nom: "Maillot Bayern Munich", equipe: "Bayern Munich", prix: 11500, stock: 5, categorie: "club", image: bayern, description: "Le rouge dominant du Rekordmeister allemand.", tailles: T },
  { id: "senegal-home", nom: "Maillot Sénégal Domicile", equipe: "Sénégal", prix: 9500, stock: 15, categorie: "selection", image: senegal, description: "Les Lions de la Teranga, fierté du continent.", featured: true, tailles: T },
  { id: "civ-home", nom: "Maillot Côte d'Ivoire", equipe: "Côte d'Ivoire", prix: 9500, stock: 14, categorie: "selection", image: civ, description: "Champions d'Afrique — le maillot des Éléphants.", featured: true, tailles: T },
  { id: "brazil-home", nom: "Maillot Brésil Domicile", equipe: "Brésil", prix: 10500, stock: 11, categorie: "selection", image: brazil, description: "Le mythique jaune de la Seleção.", tailles: T },
  { id: "france-home", nom: "Maillot France Domicile", equipe: "France", prix: 10500, stock: 9, categorie: "selection", image: france, description: "Les Bleus, deux étoiles, un maillot iconique.", tailles: T },
  { id: "argentina-home", nom: "Maillot Argentine Domicile", equipe: "Argentine", prix: 10500, stock: 10, categorie: "selection", image: argentina, description: "Champion du monde — l'Albiceleste dans toute sa splendeur.", featured: true, tailles: T },

  // Nouveaux clubs
  { id: "chelsea-home", nom: "Maillot Chelsea FC Domicile", equipe: "Chelsea", prix: 11000, stock: 10, categorie: "club", image: chelsea, description: "Le bleu roi des Blues de Londres.", tailles: T },
  { id: "arsenal-home", nom: "Maillot Arsenal FC Domicile", equipe: "Arsenal", prix: 11000, stock: 8, categorie: "club", image: arsenal, description: "Les Gunners dans leur rouge iconique.", tailles: T },
  { id: "juve-home", nom: "Maillot Juventus Domicile", equipe: "Juventus", prix: 11500, stock: 7, categorie: "club", image: juve, description: "La Vieille Dame et ses rayures noir & blanc.", tailles: T },
  { id: "milan-home", nom: "Maillot AC Milan Domicile", equipe: "AC Milan", prix: 11500, stock: 6, categorie: "club", image: milan, description: "Rossoneri — les rayures rouge et noire mythiques.", tailles: T },
  { id: "dortmund-home", nom: "Maillot Borussia Dortmund", equipe: "Dortmund", prix: 11000, stock: 9, categorie: "club", image: dortmund, description: "Le mur jaune, l'énergie du Signal Iduna Park.", tailles: T },
  { id: "atletico-away", nom: "Maillot Atlético Madrid Extérieur", equipe: "Atlético Madrid", prix: 11000, stock: 8, categorie: "club", image: atletico, description: "Le vert éclatant des Colchoneros à l'extérieur.", tailles: T },
  { id: "napoli-home", nom: "Maillot Napoli Domicile", equipe: "Napoli", prix: 11000, stock: 7, categorie: "club", image: napoli, description: "Bleu Azzurro — les Partenopei, champions d'Italie.", tailles: T },

  // Nouvelles sélections
  { id: "maroc-home", nom: "Maillot Maroc Domicile", equipe: "Maroc", prix: 9500, stock: 16, categorie: "selection", image: maroc, description: "Les Lions de l'Atlas, demi-finalistes de la Coupe du Monde.", featured: true, tailles: T },
  { id: "nigeria-home", nom: "Maillot Nigeria Super Eagles", equipe: "Nigeria", prix: 9500, stock: 13, categorie: "selection", image: nigeria, description: "Les Super Eagles et leur design plumage légendaire.", tailles: T },
  { id: "cameroun-home", nom: "Maillot Cameroun Domicile", equipe: "Cameroun", prix: 9500, stock: 12, categorie: "selection", image: cameroun, description: "Les Lions Indomptables, fierté de l'Afrique centrale.", tailles: T },
  { id: "portugal-home", nom: "Maillot Portugal Domicile", equipe: "Portugal", prix: 10500, stock: 10, categorie: "selection", image: portugal, description: "A Seleção das Quinas dans son rouge légendaire.", tailles: T },
  { id: "allemagne-away", nom: "Maillot Allemagne Extérieur", equipe: "Allemagne", prix: 10500, stock: 9, categorie: "selection", image: allemagne, description: "La Mannschaft en tenue extérieure minimaliste.", tailles: T },

  // Éditions rétro & alternatives (variantes de kits)
  { id: "psg-third", nom: "Maillot PSG Third Édition", equipe: "PSG", prix: 12000, stock: 6, categorie: "club", image: psg, description: "Édition Third du PSG, coupe premium.", tailles: T },
  { id: "real-retro", nom: "Maillot Real Madrid Rétro", equipe: "Real Madrid", prix: 13500, stock: 4, categorie: "club", image: real, description: "Édition rétro collector — hommage aux grandes années.", tailles: T },
  { id: "barca-away", nom: "Maillot FC Barcelone Extérieur", equipe: "FC Barcelone", prix: 11500, stock: 7, categorie: "club", image: barca, description: "Version extérieur du Barça, coupe ajustée.", tailles: T },
  { id: "liverpool-cl", nom: "Maillot Liverpool Édition Champions", equipe: "Liverpool", prix: 12500, stock: 5, categorie: "club", image: liverpool, description: "Édition spéciale Ligue des Champions.", tailles: T },
  { id: "bayern-away", nom: "Maillot Bayern Munich Extérieur", equipe: "Bayern Munich", prix: 11500, stock: 6, categorie: "club", image: bayern, description: "Kit extérieur du Rekordmeister.", tailles: T },
  { id: "brazil-away", nom: "Maillot Brésil Extérieur", equipe: "Brésil", prix: 10500, stock: 8, categorie: "selection", image: brazil, description: "Alternative au maillot jaune de la Seleção.", tailles: T },
  { id: "senegal-away", nom: "Maillot Sénégal Extérieur", equipe: "Sénégal", prix: 9500, stock: 11, categorie: "selection", image: senegal, description: "Kit extérieur des Lions de la Teranga.", tailles: T },
  { id: "civ-away", nom: "Maillot Côte d'Ivoire Extérieur", equipe: "Côte d'Ivoire", prix: 9500, stock: 10, categorie: "selection", image: civ, description: "Version extérieur des Éléphants.", tailles: T },
  { id: "france-away", nom: "Maillot France Extérieur", equipe: "France", prix: 10500, stock: 8, categorie: "selection", image: france, description: "Les Bleus à l'extérieur.", tailles: T },
  { id: "argentina-away", nom: "Maillot Argentine Extérieur", equipe: "Argentine", prix: 10500, stock: 7, categorie: "selection", image: argentina, description: "Kit extérieur de l'Albiceleste.", tailles: T },
];


export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatFCFA = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
