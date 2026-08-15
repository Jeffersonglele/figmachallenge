/**
 * NA HUN — Design Tokens
 * Miroir TypeScript de globals.css, pour toute logique JS/TS qui a
 * besoin des valeurs de couleur directement (ex: badges de statut
 * calculés dynamiquement, graphiques de réserves de sang, etc.)
 * La source de vérité pour le rendu visuel reste globals.css.
 */

export const colors = {
  primary: {
    50: "#fbf0ef",
    100: "#f7e1df",
    200: "#eec2be",
    300: "#e2958e",
    400: "#d5675d",
    500: "#c13e32", // couleur de référence de la marque
    600: "#a1342a",
    700: "#802921",
    800: "#601f19",
    900: "#3f1410",
  },
  secondary: {
    DEFAULT: "#000000",
    hover: "#1a1a1a",
    soft: "#333333",
  },
  tertiary: {
    DEFAULT: "#2b2b2b",
    light: "#404040",
  },
  neutral: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  white: "#ffffff",
  semantic: {
    success: { base: "#2f9e44", bg: "#ebfbf0", text: "#1e7a34" },
    warning: { base: "#e8890c", bg: "#fef6e7", text: "#b96a09" },
    error: { base: "#dc2626", bg: "#fdecec", text: "#b91c1c" },
  },
} as const;

export const typography = {
  fontFamily: {
    heading: "var(--font-poppins)",
    body: "var(--font-inter)",
  },
  scale: {
    h1: { size: "3.5rem", lineHeight: "1.1", weight: 700 },
    h2: { size: "2.5rem", lineHeight: "1.2", weight: 600 },
    h3: { size: "1.75rem", lineHeight: "1.3", weight: 600 },
    h4: { size: "1.375rem", lineHeight: "1.4", weight: 600 },
    bodyLg: { size: "1.125rem", lineHeight: "1.6", weight: 400 },
    body: { size: "1rem", lineHeight: "1.6", weight: 400 },
    small: { size: "0.875rem", lineHeight: "1.5", weight: 400 },
  },
} as const;

export const radius = {
  sm: "4px",
  md: "8px",
  lg: "16px",
  full: "9999px",
} as const;

/**
 * Helper pour le simulateur d'éligibilité :
 * mappe un statut à ses tokens de couleur sémantique.
 */
export type EligibilityStatus = "eligible" | "not-eligible" | "pending";

export function getStatusColors(status: EligibilityStatus) {
  switch (status) {
    case "eligible":
      return colors.semantic.success;
    case "not-eligible":
      return colors.semantic.error;
    case "pending":
      return colors.semantic.warning;
  }
}
