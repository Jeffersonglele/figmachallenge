import { Poppins, Inter } from "next/font/google";

/**
 * Poppins — Titres (H1 à H4)
 * Géométrique et arrondie, en écho aux courbes du logo NA HUN
 * (cœurs + goutte), tout en gardant assez de structure pour
 * rester crédible sur un sujet de santé publique.
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/**
 * Inter — Texte courant
 * Excellente lisibilité écran, y compris en petit corps :
 * essentiel pour la FAQ, les fiches centres et les formulaires.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
