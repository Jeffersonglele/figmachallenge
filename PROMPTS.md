# PROMPTS.md — NAHUN

Ce document retrace la méthodologie de conception assistée par IA du projet **NAHUN**, landing page d'information sur le don de sang au Bénin, réalisée pour l'édition 4 du Figma to Code Challenge.

Conformément au brief, ce fichier privilégie l'honnêteté intellectuelle à l'exhaustivité technique : il documente ce qui a été demandé, ce qui a été ajusté manuellement, et les limites concrètement rencontrées — y compris les cas où l'IA a refusé ou corrigé une demande.

**Note sur la paternité du design** : l'ensemble des choix de direction artistique et d'architecture de contenu de ce projet (identité NA HUN, palette, structure des sections, angle éditorial) est de mon fait ; l'IA est intervenue en exécution et en relecture. Une seule exception assumée : le mécanisme d'interaction de la Navbar au scroll (section 1 et section 11 ci-dessous) est directement adapté d'une référence externe trouvée en ligne, pas d'une idée originale de ma part.

---

## Outil d'IA sollicité

**Claude** (Anthropic), utilisé en conversation continue tout au long du projet, pour :
- la conception de composants (Navbar, Hero, carte des centres, Déroulement, Réserves, FAQ, Footer, bouton retour en haut),
- la relecture de code existant et le diagnostic d'erreurs,
- la recherche et vérification d'informations factuelles (statistiques ANTS/OMS),
- la configuration technique (favicon, manifest, structuration de `page.tsx`),
- la structuration de ce fichier PROMPTS.md.

**Seedance**, utilisé pour la génération de la vidéo IA de la section Hero.
- Prompt:
SUBJECT: A West African woman in her late 20s, calm and at ease, seated in a
comfortable donation chair at a blood donation center. A friendly nurse in
her 30s sits beside her, engaged in warm conversation.

ENVIRONMENT: A modern, welcoming blood donation room in Benin — soft daylight
through large windows, warm cream-colored walls with subtle deep red (brick
red, #c13e32-toned) accent details, a few other donors resting comfortably
and chatting quietly in the soft-focus background, plants, a relaxed
community atmosphere rather than a sterile hospital feel.

ACTION: The nurse hands the donor a glass of water/juice, smiles warmly and
speaks to her. The donor smiles back, nods, and gives a soft grateful
response. Their eyes meet, both smile genuinely.

AUDIO / DIALOGUE: Spoken in French, warm and natural West African French
intonation, no subtitles, no on-screen text. Nurse says, smiling: "Merci
beaucoup, c'est un très beau geste." The donor replies softly, with a smile:
"Avec plaisir." Gentle room tone in the background (soft ambient chatter),
no music.

CAMERA: Single continuous shot, slow gentle push-in (dolly in), eye-level,
medium shot transitioning to a soft close-up on the smile at the end.
Handheld-adjacent but stabilized, natural and observational, not overly
polished commercial framing.

LIGHTING & COLOR: Warm, soft natural daylight, golden-hour undertone,
gentle contrast, warm color grade emphasizing cream, warm skin tones, and
deep brick red accents in the environment (chair trim, wall detail,
nurse's badge) — no cold clinical blue/green fluorescent lighting.

STYLE: Cinematic documentary realism, authentic and intimate, not
stock-footage generic, not overly glossy commercial — should feel like a
genuine moment captured, not staged.

DURATION & FORMAT: 8 seconds, 16:9, 24fps, no on-screen text, no burned-in
captions, no logos or watermarks.

AVOID: no visible needle, no blood, no IV lines, no close-up of arm/vein
insertion, no clinical/sterile white-and-blue hospital aesthetic, no
distressed or fearful expressions, no generic international stock-footage
look, no subtitles, no text overlays.
---

## Séquence des prompts significatifs

### 1. Navbar
Prompt de départ : construction du composant à partir du brief et du design system Tailwind fourni par l'utilisateur (tokens `primary`/`secondary`/`neutral`, polices Poppins/Inter). Premier jet en `sticky`, liens ancrés vers les sections du brief, CTA unique.

Itération suivante : fourniture d'une référence visuelle externe (site type "Explore/Destinations", nav flottante + mega-menu) avec la consigne de s'en inspirer pour le style. L'IA a repris le **mécanisme** (transparence sur hero, mega-menu, CTA en pilule) mais a explicitement écarté l'**esthétique sombre** de la référence, jugée incohérente avec le ton rassurant exigé par le brief pour un public de donneurs novices anxieux.

Le mega-menu "Centres" a été construit non comme décoration mais pour répondre à l'exigence brief C6 (8+ centres, filtrage par ville).

*Voir aussi section 11 : troisième itération de ce composant, avec attribution explicite d'une source copiée.*

### 2. Hero — premier jet (C1 — Pourquoi donner)
Sur la base d'une seconde référence visuelle (toujours au style sombre), consigne explicite de ne pas reproduire l'esthétique mais de garder une structure de nav flottante adaptée à un hero clair.

Angle éditorial retenu : plutôt qu'un chiffre générique, exploitation d'un fait vérifiable et spécifique au don de sang (séparation en 3 composants : globules rouges, plasma, plaquettes) comme signature visuelle (goutte scindée en SVG), pour éviter le pattern "gros chiffre + gradient" identifié comme trop générique.

### 3. Section Centres / Carte (C6, C7)
Fourniture de code de référence pour la cartographie : un fichier Blade contenant le rendu HTML d'une page similaire avec carte SVG interactive des départements du Bénin.

Ce fichier a permis d'extraire les **tracés SVG des départements** (données géographiques factuelles, non protégées) et le **mécanisme d'interaction** (carte cliquable synchronisée avec un panneau de contenu), sans reprendre les textes éditoriaux ni les photographies du site source.

Itération finale : demande explicite d'un comportement à trois temps —
1. noms des départements affichés directement sur la carte,
2. pins de villes masqués tant que le département n'est pas sélectionné, révélés au clic,
3. panneau d'info à gauche listant villes + centres du département sélectionné,

avec référence à la page officielle de l'ANTS (`ants.bj/lieu_sang`) et sa nomenclature STS (Service de Transfusion) / PTS (Poste de Transfusion).

**Correction ultérieure** : le même fichier de référence a permis d'identifier un département manquant (le Plateau) dans le tracé initialement transcrit — le contour réel a été récupéré depuis ce même fichier source et réintégré. Les positions des villes ont par ailleurs été validées géométriquement (test point-dans-polygone) après un signalement visuel de pins mal placés, révélant que 5 des 15 villes tombaient hors du contour de leur département.

### 4. FAQ — premier jet (C8)
Structure proposée par l'IA : séparation entre "idées reçues" (format mythe → réalité) et "questions pratiques" (Q&A classique), pour répondre à l'exigence brief de "déconstruire les idées reçues" plutôt que d'empiler des questions génériques.

### 5. Footer
Choix assumé d'un fond sombre (`secondary`) en fin de parcours, différencié du hero clair — argumenté comme convention de clôture plutôt que point d'entrée, avec intégration de la mention réglementaire obligatoire du brief ("seul un entretien médical professionnel peut confirmer l'aptitude au don").

### 6. Bouton retour en haut de page
Fourniture d'une capture d'écran d'un site tiers (studio de communication) présentant un bouton circulaire à texte rotatif autour d'une flèche, avec la précision que l'utilisateur pensait initialement qu'il s'agissait d'une image statique. L'IA a confirmé qu'il s'agissait d'un composant animé (SVG `textPath` + rotation CSS) et l'a reproduit dans la palette NAHUN (blanc/rouge), sans reprendre la palette jaune/anthracite de la référence. Version flottante proposée par défaut (apparition au scroll), avec repli documenté vers une version ancrée dans le footer si préférée.

### 7. Hero — enrichissement du contenu (C1)
Deux itérations successives :

**a. Ajout de statistiques réelles.** L'utilisateur a fourni un extrait de texte de la page `ants.bj/pourquoi_donner_sang`. L'IA a vérifié ce contenu par récupération directe de la page avant de l'intégrer, puis a reformulé (paraphrase, pas de citation verbatim) les chiffres clés : une demande de poche de sang toutes les 3 minutes au Bénin, 51% au profit d'enfants, seuil OMS d'au moins 1% de la population donneuse.

**b. Retour utilisateur : contenu jugé insuffisamment développé et stats peu compréhensibles hors contexte.** Demande d'ajout de l'ancrage culturel du nom du projet : en fongbé, « na hun » signifie « donner du sang », sourcé par l'utilisateur via plusieurs références linguistiques externes (dictionnaires/grammaires fongbé). L'IA a intégré cet ancrage dès l'ouverture de la section (badge visuel + reprise du terme dans le texte courant) et a explicitement signalé à l'utilisateur son incapacité à vérifier elle-même cette étymologie, recommandant une double vérification avant publication.

### 8. Déroulement — suppression des durées par étape (C4, C5)
Demande explicite de l'utilisateur de retirer toute mention de temps, jugée imprévisible (affluence du centre, variabilité de l'entretien médical). L'IA a signalé que le brief exige explicitement la mention d'une durée totale (C4) et a proposé un compromis : suppression des minutages fixes par étape, remplacés par une formulation qualitative assumant l'incertitude ("le temps sur place varie selon l'affluence") plutôt que la suppression complète de toute notion de durée.

### 9. Réserves — reconstruction avec recherche documentaire (C7)
Retour utilisateur : section jugée froide, peu parlante, sans réelle information de fond. L'IA a effectué une recherche web ciblée (ANTS, OMS Afrique) et confirmé qu'aucune donnée publique en temps réel par groupe sanguin n'existe pour le Bénin — les pourcentages du composant restent donc nécessairement des exemples, explicitement signalés comme tels.

En revanche, la recherche a permis d'intégrer des faits réels et sourcés en introduction de section : la demande en sang dépasse structurellement l'offre au Bénin (analyse ANTS 2016-2019), 55% des poches collectées bénéficient à des enfants de moins de 5 ans et 16% à des femmes en âge de procréer (Ministère de la Santé, 2021, via OMS Afrique), et les pénuries sont reconnues comme cycliques par la direction générale de l'ANTS elle-même. Chaque carte de groupe sanguin a également été enrichie d'une explication de compatibilité (fait médical général, non spécifique au Bénin) pour rendre l'information personnellement actionnable plutôt que purement statistique.

L'IA a signalé à l'utilisateur une différence de méthodologie entre cette statistique (55% de bénéficiaires réels, Ministère de la Santé 2021) et celle déjà utilisée dans le Hero (51% de demandes formulées, ANTS) : les deux sont réelles mais ne mesurent pas exactement la même chose, pour éviter une impression d'incohérence à la lecture.

### 10. FAQ — relecture de cohérence (C8)
Demande d'amélioration de la section FAQ après les changements apportés aux sections Déroulement et Réserves. L'IA a identifié de sa propre initiative une incohérence : le mythe "durée" de la FAQ affirmait encore des minutages précis (10 min de prélèvement, 45 min au total) supprimés entre-temps de la section Déroulement à la demande de l'utilisateur. Corrections apportées :
- reformulation du mythe "durée" sans aucun chiffre, alignée sur la position adoptée en section Déroulement ;
- ajout de l'étiquette "eyebrow" manquante en tête de section, absente alors que toutes les autres sections de la page en comportent une (incohérence de gabarit repérée par l'IA) ;
- ajout d'un nouveau mythe ("il y a toujours assez de réserves") s'appuyant sur les faits découverts lors de la reconstruction de la section Réserves (pénuries cycliques, demande structurellement supérieure à l'offre), créant un lien thématique entre les deux sections plutôt que de les laisser isolées.

### 11. Navbar — refonte du comportement au scroll, source directement copiée
Contrairement aux itérations précédentes (sections 1, 2, 3, 6) où seul le **mécanisme** d'une référence était repris tout en écartant son esthétique, cette itération part d'une consigne différente : reproduire fidèlement le comportement d'un menu trouvé en ligne (panneau plein écran coulissant depuis la droite, gros intitulés, item dépliable avec tags secondaires), avec la précision explicite de l'utilisateur que ce design n'est pas une idée originale mais un choix directement copié.

Comportement implémenté :
- en haut de page (non scrollé) : navigation inline complète, identique à l'existant (section 1) ;
- au scroll : disparition de la navigation inline et du CTA, ne subsistent que le logo et un bouton menu ;
- au clic sur ce bouton : ouverture du panneau plein écran (mobile) / demi-écran ancré à droite (desktop), avec item "Centres" dépliable révélant les villes en tags — adaptation du bloc "Services" de la référence à notre propre mega-menu existant plutôt qu'un ajout arbitraire.

Palette et typographie de la référence (noir/blanc/gris, `Clash Grotesk`) non reprises, remplacées par les tokens NAHUN (`primary`/`secondary`, Poppins/Inter), conformément au principe déjà appliqué en sections 1 et 6. Ajouts d'accessibilité non présents dans la référence : fermeture au clic extérieur et à `Échap`, focus renvoyé sur le bouton de fermeture à l'ouverture, `role="dialog"` + `aria-modal`.

---

## Ajustements manuels effectués

| Ajustement | Quoi | Pourquoi |
|---|---|---|
| Esthétique du Hero et de la Navbar | Rejet du fond sombre des références visuelles fournies (site "Explore/Destinations", puis capture du bouton retour en haut) | Incohérence avec le ton rassurant exigé par le brief pour un public novice anxieux (le brief disqualifie explicitement une page "froide") |
| Granularité de la carte des centres | Département (référence source) → ville | Le brief exige un filtrage par ville, pas par grande zone administrative |
| Contenu des régions/villes touristiques | Non repris tel quel dans les fichiers de référence fournis | Contenu éditorial et photographique protégé, appartenant au site source (voir Limites) |
| Données des centres (STS/PTS) | Remplacées par les structures réelles listées sur `ants.bj/lieu_sang` (relevé manuel) ; horaires, types de don et modalité de rendez-vous restent à confirmer | Les données mock initiales ont été remplacées dès que la liste réelle a pu être collectée manuellement (voir Limites pour la partie encore incomplète) |
| Durées affichées (Déroulement + FAQ) | Suppression des minutages fixes par étape, remplacés par une formulation qualitative | Demande explicite de l'utilisateur ; l'imprécision d'un chronométrage fixe risquait de créer de fausses attentes |
| Contenu Hero | Ajout de statistiques réelles (ANTS) et de l'ancrage culturel du nom NAHUN (étymologie fongbé) | Contenu jugé insuffisamment développé par l'utilisateur en première version |
| Contenu Réserves | Ajout d'un paragraphe de contexte structurel sourcé (ANTS/OMS) et de compatibilités par groupe sanguin | Section jugée froide et peu informative par l'utilisateur en première version |
| Comportement Navbar au scroll | Remplacement de la barre inline persistante par un menu plein écran déclenché par un bouton unique | Design directement copié d'une référence externe à la demande explicite de l'utilisateur (voir section 11) |

---

## Limites rencontrées avec l'outil

1. **Récupération partielle des données réelles de l'ANTS (centres).** La page `ants.bj/lieu_sang` charge la liste des structures STS/PTS de manière dynamique (JavaScript) ; l'outil de récupération web utilisé par l'IA ne peut lire que le HTML statique initial, sans exécuter de JavaScript. La liste des 15 structures (noms, localisation) a donc été collectée manuellement par l'utilisateur puis transmise à l'IA pour intégration — les horaires, types de don acceptés et modalités de rendez-vous, non disponibles sur la page source dans l'état actuel de la collecte, restent marqués "à confirmer" plutôt que d'être inventés.

2. **Absence de donnée publique en temps réel (réserves par groupe sanguin).** Contrairement aux centres, ce n'est pas une limite technique de l'outil mais une limite de la donnée elle-même : après recherche, aucune source publique ne publie l'état des stocks de sang par groupe sanguin au Bénin (donnée opérationnelle interne à l'ANTS). Les pourcentages affichés en section Réserves restent donc des exemples ; en revanche, le contexte narratif autour (pénuries structurelles, répartition par bénéficiaires) s'appuie sur des sources réelles et vérifiées.

3. **Vérification impossible d'une affirmation culturelle/linguistique.** L'étymologie fongbé du nom NAHUN (« na hun » = « donner du sang ») repose sur des sources externes fournies par l'utilisateur, que l'IA n'a pas les moyens de vérifier de manière indépendante (absence de compétence linguistique fiable en fongbé). Ce point a été explicitement signalé comme nécessitant une double vérification par l'utilisateur avant publication finale.