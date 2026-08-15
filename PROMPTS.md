# PROMPTS.md — NAHUN

Ce document retrace la méthodologie de conception assistée par IA du projet **NAHUN**, landing page d'information sur le don de sang au Bénin, réalisée pour l'édition 4 du Figma to Code Challenge.

Conformément au brief, ce fichier privilégie l'honnêteté intellectuelle à l'exhaustivité technique : il documente ce qui a été demandé, ce qui a été ajusté manuellement, et les limites concrètement rencontrées — y compris les cas où l'IA a refusé ou corrigé une demande.

---

## Outil d'IA sollicité

**Claude** (Anthropic), utilisé en conversation continue tout au long du projet, pour :
- la conception de composants (Navbar, Hero, carte des centres, FAQ, Footer),
- la relecture de code existant et le diagnostic d'erreurs,
- la configuration technique (favicon, manifest),
- la structuration de ce fichier PROMPTS.md.

Aucun autre outil d'IA générative n'a été utilisé sur ce projet.

---

## Séquence des prompts significatifs

### 1. Navbar
Prompt de départ : construction du composant à partir du brief HemoLink (nom de travail initial) et du design system Tailwind fourni (tokens `primary`/`secondary`/`neutral`, polices Poppins/Inter). Premier jet en `sticky`, liens ancrés vers les sections du brief, CTA unique.

Itération suivante : fourniture d'une référence visuelle externe (site type "Explore/Destinations", nav flottante + mega-menu) avec la consigne de s'en inspirer pour le style. L'IA a repris le **mécanisme** (transparence sur hero, mega-menu, CTA en pilule) mais a explicitement écarté l'**esthétique sombre** de la référence, jugée incohérente avec le ton rassurant exigé par le brief pour un public de donneurs novices anxieux.

Le mega-menu "Centres" a été construit non comme décoration mais pour répondre à l'exigence brief C6 (8+ centres, filtrage par ville).

### 2. Renommage du projet
Le projet a été renommé **NAHUN** en cours de route (le brief autorise explicitement le choix du nom). Demande de mise à jour systématique du composant Navbar (logo, wordmark, aria-labels) suite à ce renommage.

### 3. Hero (C1 — Pourquoi donner)
Sur la base d'une seconde référence visuelle (toujours au style sombre), consigne explicite de ne pas reproduire l'esthétique mais de garder une structure de nav flottante adaptée à un hero clair.

Angle éditorial retenu pour le hero : plutôt qu'un chiffre générique, exploitation d'un fait vérifiable et spécifique au don de sang (séparation en 3 composants : globules rouges, plasma, plaquettes) comme signature visuelle (goutte scindée en SVG), pour éviter le pattern "gros chiffre + gradient" identifié comme trop générique.

### 4. Section Centres / Carte (C6, C7)
Deux tentatives de fourniture de code de référence pour la cartographie :
- un zip contenant une sauvegarde complète du site officiel du tourisme béninois (`benin.bj`) — écarté, voir section Limites ;
- un fichier Blade contenant le rendu HTML d'une page similaire avec carte SVG interactive des départements du Bénin, également extraite du même site source.

Le second fichier a permis d'extraire les **tracés SVG des départements** (données géographiques factuelles, non protégées) et le **mécanisme d'interaction** (carte cliquable synchronisée avec un panneau de contenu), sans reprendre les textes éditoriaux ni les photographies du site source.

Itération finale : demande explicite d'un comportement à trois temps —
1. noms des départements affichés directement sur la carte,
2. pins de villes masqués tant que le département n'est pas sélectionné, révélés au clic,
3. panneau d'info à gauche listant villes + centres du département sélectionné,

avec référence à la page officielle de l'ANTS (`ants.bj/lieu_sang`) et sa nomenclature STS (Service de Transfusion) / PTS (Poste de Transfusion).

### 5. FAQ (C8)
Demande directe de construction de la dernière section restante. Structure proposée par l'IA : séparation entre "idées reçues" (format mythe → réalité) et "questions pratiques" (Q&A classique), pour répondre à l'exigence brief de "déconstruire les idées reçues" plutôt que d'empiler des questions génériques.

### 6. Footer
Demande de clôture de la page. Choix assumé d'un fond sombre (`secondary`) en fin de parcours, différencié du hero clair — argumenté comme convention de clôture plutôt que point d'entrée, avec intégration de la mention réglementaire obligatoire du brief ("seul un entretien médical professionnel peut confirmer l'aptitude au don").

### 7. Configuration favicon
Suite à la génération d'un jeu d'icônes via un générateur externe (favicon.ico, favicon.svg, favicon-96x96.png, apple-touch-icon.png, web-app-manifest-*.png, site.webmanifest), plusieurs allers-retours pour déterminer l'emplacement réel des fichiers (`public/` racine vs `public/favicon/`) et adapter en conséquence les chemins déclarés dans `site.webmanifest` et dans `metadata.icons` du `layout.tsx`.

---

## Ajustements manuels effectués

| Ajustement | Quoi | Pourquoi |
|---|---|---|
| Nom du projet | `HemoLink` (nom d'exemple du brief) → `NAHUN` | Choix de nom personnel, autorisé par le brief |
| Esthétique du Hero et de la Navbar | Rejet du fond sombre des références visuelles fournies | Incohérence avec le ton rassurant exigé par le brief pour un public novice anxieux (le brief disqualifie explicitement une page "froide") |
| Code du logo (`<Image>`) | Ajout des props `alt`, `width`, `height` manquantes | Le code initial collé par erreur aurait fait échouer le build Next.js |
| Granularité de la carte des centres | Département (référence source) → ville | Le brief exige un filtrage par ville, pas par grande zone administrative |
| Contenu des régions/villes touristiques | Non repris tel quel dans les fichiers de référence fournis | Contenu éditorial et photographique protégé, appartenant au site source (voir Limites) |
| Données des centres (STS/PTS) | Remplacées par des données d'exemple explicitement marquées comme telles | Impossibilité de récupérer les vraies données ANTS (voir Limites) |
| `theme_color`/emplacement favicon | Chemins du `site.webmanifest` réécrits en fonction de l'emplacement réel choisi (`public/favicon/`) | Le manifest généré par l'outil externe utilisait des chemins racine incompatibles avec un sous-dossier |

---

## Limites rencontrées avec l'outil

1. **Refus de réutiliser du contenu tiers protégé.** Deux fichiers fournis comme référence de cartographie (un zip de sauvegarde complète du site `benin.bj`, puis un fichier Blade contenant du HTML rendu du même site) contenaient du contenu éditorial et photographique appartenant à un tiers identifiable (texte descriptif des régions, photos hébergées sur le Cloudinary du site officiel). L'IA a refusé de reprendre ce contenu, n'extrayant que les éléments non protégés (tracés géographiques des départements, mécanisme d'interaction générique carte/panneau).

2. **Impossibilité de récupérer les données réelles de l'ANTS.** La page `ants.bj/lieu_sang` charge la liste des structures STS/PTS de manière dynamique (JavaScript), après le chargement initial de la page. L'outil de récupération web utilisé par l'IA ne peut lire que le HTML statique initial, sans exécuter de JavaScript — la liste réelle des centres, leurs adresses et horaires n'a donc pas pu être extraite automatiquement. Ce point a été anticipé et accepté : les données de centres du projet sont explicitement des exemples ("mock"), à remplacer par les vraies informations dans une itération ultérieure.

3. **Erreurs de build ponctuelles.** Au moins une itération de code fournie par l'utilisateur contenait une balise `<Image>` Next.js incomplète (sans `alt`/dimensions), qui aurait fait échouer la compilation si elle n'avait pas été corrigée avant intégration.

4. **Ambiguïté d'emplacement de fichiers statiques.** La configuration de la favicon a nécessité plusieurs itérations pour déterminer l'emplacement réel choisi par l'utilisateur (`public/` vs `public/favicon/`), les deux étant valides mais impliquant des chemins de configuration différents dans `metadata.icons` et `site.webmanifest`.
