# NA HUN — Donner du sang, sauver des vies

> **Nă hùn** (fongbé) : « donner du sang ». Une landing page d'information et de sensibilisation au don de sang au Bénin, conçue comme un prototype fonctionnel dans le cadre du projet Terre Béninoise.

---

## Le problème

Au Bénin, la demande en sang dépasse structurellement l'offre disponible. Plus de la moitié des poches collectées sont destinées à des enfants de moins de 5 ans, principalement à cause du paludisme. Le pays peine à atteindre le seuil de 1 % de donneurs recommandé par l'OMS. L'information sur le don — éligibilité, centres, déroulement — reste dispersée et peu accessible en ligne.

## Ce que fait NA HUN

Une page unique, claire et complète, qui répond aux questions essentielles d'un potentiel donneur :

| Section | Rôle |
|---|---|
| **Hero** | Accroche avec chiffres clés (3 min entre deux demandes, 51 % d'enfants concernés) |
| **Éligibilité** | Critères généraux + simulateur interactif en 6 questions |
| **Déroulement** | Les 4 étapes du don + conseils de préparation (avant / jour J / après) |
| **Carte des centres** | Carte SVG interactive des 13 départements du Bénin avec 16 centres répertoriés |
| **Réserves** | État illustratif des stocks par groupe sanguin (O−, O+, A+, A−, B+, B−, AB+, AB−) |
| **FAQ** | Idées reçues déconstruites au format « Ce qu'on croit / Ce qui est vrai » |

---

## Stack technique

| Couche | Choix |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Langage** | TypeScript |
| **UI** | React 19, composants serveur par défaut, `"use client"` uniquement là où il y a de l'interactivité |
| **Styles** | Tailwind CSS 4 via `@tailwindcss/postcss` — design tokens déclarés dans `globals.css` via `@theme inline` |
| **Typographie** | Poppins (titres) + Inter (corps) via `next/font/google` |
| **Icônes** | [Lucide React](https://lucide.dev) |
| **Carte** | SVG pur embarqué (pas de dépendance cartographique externe) |

### Pas de dépendance superflue

Aucune librairie d'UI (shadcn, Radix, MUI…), aucune librairie de formulaires, aucun state manager. L'interactivité est gérée avec `useState`, `useMemo`, `useEffect` natifs de React.

---

## Architecture

```
app/
├── layout.tsx              # Layout racine (lang=fr, fonts, metadata)
├── page.tsx                # Assemblage des sections
├── globals.css             # Design tokens + utilities typographiques
├── fonts.ts                # Configuration Poppins & Inter
├── design-tokens.ts        # Tokens exportés côté JS
├── components/
│   ├── Navbar.tsx           # Navigation sticky avec ancres
│   ├── Hero.tsx             # Accroche + chiffres clés + goutte SVG
│   ├── EligibilitySection.tsx  # Critères + simulateur interactif
│   ├── DeroulementSection.tsx  # Étapes du don + préparation
│   ├── MapSection.tsx       # Carte SVG des 13 départements + recherche
│   ├── ReservesSection.tsx  # Stocks par groupe sanguin
│   ├── FaqSection.tsx       # FAQ accordéon
│   ├── Footer.tsx           # Pied de page
│   └── BackToTop.tsx        # Bouton retour en haut
└── lib/                    # Utilitaires (à étoffer)
```

---

## Partis pris de conception

### Ancrage culturel
Le nom **NA HUN** est en fongbé, la langue la plus parlée au sud du Bénin. Le projet s'adresse d'abord à un public béninois : les textes, les références géographiques et les données sont contextualisés pour ce pays.

### Choix du logo
Le logo a été conçu entièrement avec Canva par moi-même. Il ressort un coeur dans laquelle est disposé une petite goutte de sang. Cette disposition donne un autre effet visuel au design qui tend à montrer deux petites gouttes de sang qui s'enlacent.

![Logo Nahun](logo/logo_nahun.png)
![Logo Nahun](logo/logo2_nahun.png)

### Ton éditorial
Les textes évitent le ton médical froid et les formulations sensationnalistes. L'approche : expliquer avec précision, sans dramatiser ni minimiser. Les durées et chiffres non confirmés par l'ANTS ne sont pas inventés — ils sont signalés comme illustratifs ou omis.

### Carte SVG sur mesure
Les 12 départements du Bénin (Alibori, Atacora, Atlantique, Borgou, Collines, Couffo, Donga, Littoral, Mono, Ouémé, Plateau, Zou) sont tracés en SVG pur. Chaque département est cliquable et sélectionne les centres associés. La barre de recherche synchronise automatiquement la carte : une recherche par ville ou département sélectionne visuellement la zone concernée.

### Design system maison
- **Couleur primaire** : `#c13e32` (rouge sang) déclinée en 9 nuances
- **Hiérarchie typographique** : 4 niveaux de titres (`text-h1` à `text-h4`), 3 niveaux de corps (`text-body-lg`, `text-body`, `text-small`)
- **Focus visible** : outline de 2 px sur tous les éléments interactifs (navigation clavier)
- **Pas de dark mode** : choix délibéré pour cette v1 — le sujet (santé publique, information) se prête à un fond clair

### Données sources
Les centres de don listés proviennent d'un relevé manuel sur [ants.bj](https://ants.bj). Les pourcentages de réserves par groupe sont illustratifs — aucune API publique de l'ANTS ne fournit ces données en temps réel.

---

## Lancer le projet

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Build de production

```bash
npm run build
npm start
```

---

## Licence

