# Prompt d'onboarding — Dev frontend, rendu des artifacts agent

Copie-colle ce prompt à l'agent ou au développeur qui prend le sujet. Il est autoporté.

---

Tu rejoins **Gemflow**, une SaaS ERP destinée à des **maisons de joaillerie haut de gamme** (production de pièces uniques, traçabilité métaux et pierres, suivi atelier, gestion de marges). Le produit est en français et en anglais. Le tenant cible n'est pas une boutique en ligne grand public, c'est un atelier qui sert des clients HNW et parfois des grandes maisons. Le ton, l'esthétique et la précision des chiffres ne sont pas négociables : tout doit respirer le luxe sobre, jamais le consumer-grade.

## Ta mission

Implémenter le **rendu visuel des artéfacts** retournés par les agents IA du backend, sans toucher au reste de l'UI. Le backend est en place : il expose `POST /api/v2/agents/chat` qui répond avec un texte court (`message`) et un tableau d'objets structurés (`artifacts[]`). Le contrat est figé. Ton boulot est de transformer ces objets en composants React de qualité éditoriale.

Tu ne touches pas aux pages existantes (Orders, Stock, Casting, Dashboard, etc.) — un autre développeur s'en occupe. Tu travailles uniquement dans une nouvelle feature `agents/artifacts/` et tu fournis un `<ArtifactRenderer artifact={...} />` réutilisable plus tard par n'importe quelle page.

## Contexte technique

Le projet vit à `/Users/adrienbeyondcrypto/Dev/Gemflow-SaaS`. Le frontend est dans `frontend/`, déployé sur Vercel. Stack actuelle (déjà installée, ne change rien sans raison) :

- React 18 + TypeScript + Vite (SWC)
- Ant Design 5 (composants UI de base déjà utilisés partout)
- TanStack React Query 5 (server state)
- Axios (HTTP)
- Sass (styling)
- React Router 7
- Supabase JS (auth, déjà câblé)

Pas de Redux, pas de Zustand. State serveur via React Query, state local via `useState`. Suis ces conventions.

## Direction visuelle de référence

Lis et imprègne-toi de **`design-explorations/01-maison.html`** (Direction "Maison refined"). C'est la référence stricte. Tu y trouveras :

- Palette : marine nuit `#131C30`, or signature `#C39A71`, champagne froid `#C9BFA8`, ivoire `#F7F3EB`, paper `#FFFCF5`, plus une échelle d'ink (`#0F0F0E` à `#B0AA9D`).
- Typographies : **Inter Tight** (display, KPIs, titres, weight 600, letter-spacing -0.02em), **Instrument Serif italic** (signatures, noms de pièces), **Inter** (body, ss01 + cv11 + tabular-nums activés), **Geist Mono** (codes, labels, numériques denses, letter-spacing 0.2em uppercase pour les labels).
- Radius modérés : `--r-xs 2px` à `--r-xl 12px`, jamais arrondi excessif.
- Spacing base 4 : `--sp-1` à `--sp-10`.
- Couleurs sémantiques sobres : `success #4F6A41`, `warning #A6741F`, `danger #8E2E20`, `info #324863`, plus leurs variants soft.
- Ombres discrètes : `--sh-1` (à peine), `--sh-2` (cards principales), `--sh-3` (modals).

Reproduis ces tokens dans un fichier `frontend/src/features/agents/artifacts/tokens.ts` (ou directement en CSS variables dans un `.scss`). Ne réinvente pas, ne mélange pas avec d'autres palettes.

## Le contrat d'interface

**Lis intégralement** `docs/agents/artifacts-contract.md`. C'est ta spec. Il contient :

- L'interface TypeScript exacte de la réponse `AgentChatResponse` et de chaque payload.
- Les six types d'artifacts à implémenter : `metric_card`, `kpi_grid`, `table`, `price_recommendation`, `cost_breakdown`, `callout`.
- Pour chacun : schéma TypeScript, wireframe ASCII, mapping précis aux tokens Maison, exemple JSON.
- Les conventions transverses (formatage devise via `Intl`, ordre d'affichage à respecter, limite 32 artifacts, fallback silencieux sur type inconnu).
- Les cas dégradés à gérer (`status` ≠ `SUCCESS`, artifacts vide, message vide).

Si une partie du contrat te paraît ambiguë, lis le code source backend qui le produit (source de vérité côté serveur) :

- `src/main/java/io/hearstcorporation/atelier/service/aiagent/v2/artifact/Artifact.java`
- `src/main/java/io/hearstcorporation/atelier/service/aiagent/v2/artifact/ArtifactTypes.java`
- `src/main/java/io/hearstcorporation/atelier/service/aiagent/v2/tool/impl/EmitArtifactTool.java`
- `src/main/java/io/hearstcorporation/atelier/dto/response/AgentChatResponseDto.java`

## Contraintes non négociables

1. **Aucun emoji nulle part.** Ni dans les composants, ni dans les libellés, ni dans les commentaires. Si tu en croises un dans un payload (bug backend), ne le filtre pas, mais signale-le-moi.
2. **Aucun glyphe décoratif** type "✓", "→", "★". Si tu as besoin d'un séparateur visuel, utilise un `border` CSS ou un em-dash propre.
3. **Sourcer chaque chiffre.** Quand un artifact contient `sources: string[]`, tu dois le rendre lisiblement (typo mono, gold .65, en pied de carte). Pas optionnel.
4. **Pas de réordonnancement.** L'ordre du tableau `artifacts[]` est signifiant. Tu rends dans l'ordre reçu.
5. **Forward-compat.** Si `artifact.type` n'est pas dans ta liste, tu l'ignores silencieusement (pas d'erreur, pas de fallback de remplacement). Le backend pourra ajouter `metric_trend`, `pdf_link`, `gallery` dans des sprints futurs sans casser le front.
6. **Formatage des nombres** par `Intl.NumberFormat` avec la locale utilisateur (`fr-FR` par défaut, `en-US` si choisi). Devises via `style: "currency"`. Ne formate jamais côté serveur.
7. **Pas de paragraphes denses dans le rendu.** Si un payload tente d'en émettre, c'est un bug à remonter — pas à toi de le corriger côté UI.

## Étapes attendues

Voici l'ordre que je te recommande, mais ajuste si tu vois mieux :

1. **Lecture** : `docs/agents/artifacts-contract.md` en entier, puis `design-explorations/01-maison.html` (focus sur la sidebar, les KPI cards, les tables, les callouts qu'on y trouve déjà). Vérifie aussi la structure existante du frontend en listant `frontend/src/features/` et `frontend/src/shared/`.
2. **Tokens** : crée `frontend/src/features/agents/artifacts/tokens.ts` exportant les couleurs, typos, radius, spacing, ombres en constantes typées. Ou en CSS variables si tu préfères, mais reste cohérent avec ce que tu vois déjà dans le projet.
3. **Types** : reprends les interfaces TypeScript du contrat dans `frontend/src/features/agents/artifacts/types.ts`. Une seule source de vérité.
4. **Hook utilitaire** : `useArtifactNumberFormat()` qui retourne des fonctions `formatCurrency(n, currency)`, `formatNumber(n, opts?)`, `formatPercent(n)`. Locale via context user (ou fallback `fr-FR`).
5. **Composants** : un par type, dans `frontend/src/features/agents/artifacts/components/` :
   - `MetricCard.tsx`
   - `KpiGrid.tsx` (compose N `MetricCard`)
   - `ArtifactTable.tsx`
   - `PriceRecommendation.tsx`
   - `CostBreakdown.tsx`
   - `Callout.tsx`
   Chacun rend strictement ce qui est dans le wireframe du contrat. Pas plus, pas moins.
6. **Dispatcher** : `<ArtifactRenderer artifact={...} />` qui fait le `switch` et tombe en silence sur l'inconnu.
7. **Conteneur de réponse** : `<AgentResponseView response={AgentChatResponse} />` qui rend le `message` court en haut puis la liste d'artifacts via le dispatcher, et gère les cas dégradés.
8. **Stories / mocks** : place 4 fixtures JSON typiques (pricing complet, question simple, erreur, max_iterations) dans `frontend/src/features/agents/artifacts/__fixtures__/` et une route Vite-only `/dev/artifacts-preview` qui les rend toutes en grille pour valider visuellement sans backend.
9. **Wiring final** : ne branche pas `AgentResponseView` à une page existante. Laisse-le exporté, prêt à être intégré. Quelqu'un d'autre s'en chargera côté pages.

## Critères d'acceptation

- Les 6 types rendent comme dans les wireframes du contrat. Compare visuellement avec `01-maison.html` — la qualité doit être au même niveau, pas en-dessous.
- La route `/dev/artifacts-preview` permet de voir les 6 types en isolation et les 4 cas dégradés sans backend.
- `Intl` formate correctement EUR, USD et CHF en `fr-FR` et `en-US`.
- Les tableaux ont `font-variant-numeric: tabular-nums` et alignent les nombres à droite.
- Les `price_recommendation` sont print-friendly (un `@media print` propre suffit — fond blanc, pas d'ombres, conserve la mise en page).
- Aucun emoji ni glyphe décoratif dans le code rendu.
- Le `<ArtifactRenderer>` ignore silencieusement un type inconnu sans warn console.
- Aucune page existante n'a été modifiée.

## Boucle de test sans backend

Tu n'as pas besoin que le backend tourne pour développer. Pour chaque composant :

1. Crée la fixture JSON depuis l'exemple du contrat.
2. Importe-la dans la page `/dev/artifacts-preview`.
3. Itère visuellement.

Quand tu veux la chaîne complète (rare au début), demande au mainteneur backend de te lancer un environnement local et fais un `curl` sur `/api/v2/agents/chat` avec `{"agent":"pricing","message":"…","conversationId":null}`.

## Quand tu doutes

- Si le contrat est ambigu sur un point esthétique : regarde `01-maison.html` et fais comme la maison y aurait fait. La logique : sobre, dense en information, hiérarchie typographique forte, espaces blancs maîtrisés.
- Si tu hésites entre deux composants AntD : choisis le plus minimal et restyle-le aux tokens Maison plutôt que d'introduire une dépendance.
- Si une donnée te manque dans un payload : ne l'invente pas et ne fais pas de fallback silencieux qui maquillerait l'erreur. Affiche un `Callout` `info` discret du type "Donnée X manquante dans la réponse de l'agent".

## Livrables finaux

- Le code dans `frontend/src/features/agents/artifacts/`.
- Les 4 fixtures dans `__fixtures__/`.
- La route de prévisualisation `/dev/artifacts-preview`.
- Aucun changement dans `frontend/src/pages/`, `frontend/src/features/orders/`, ou autre.

Reviens vers moi avec un PR sur la branche `feat/agent-artifacts-rendering`.
