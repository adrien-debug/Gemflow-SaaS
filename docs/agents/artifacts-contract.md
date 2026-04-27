# Gemflow — Contrat d'interface `agent.artifacts[]`

**Public**: développeur frontend qui implémente le rendu des réponses de `/api/v2/agents/chat`.
**Statut**: stable. Toute modification de ce contrat passe par une PR backend + bump de la version dans la réponse (`apiVersion`, à venir).
**Direction visuelle de référence**: `design-explorations/01-maison.html` (Maison refined — marine nuit + or `#C39A71` + champagne froid + ivoire).

---

## 1. Objet

Quand un agent répond à un message, il produit deux choses :

1. **Un texte** (`message`, court — une à deux phrases).
2. **Un tableau d'artéfacts visuels** (`artifacts[]`) que le front rend en cards / tableaux / panneaux dédiés.

Les agents sont contraints par leur *system prompt* d'émettre au moins un artefact dès qu'il y a des chiffres ou une recommandation. **Le texte ne doit jamais répliquer ce qui est déjà dans un artefact** — c'est au front de rendre les artifacts visuellement, et au texte de poser le contexte.

Aucun emoji n'est jamais émis (ni dans le texte, ni dans les artifacts). Aucun glyphe décoratif. Si tu en vois un, c'est un bug à remonter.

---

## 2. Forme de la réponse

```ts
// POST /api/v2/agents/chat
// Body: { message: string, conversationId?: UUID, agent?: "default" | "pricing" }

interface AgentChatResponse {
  conversationId: string;          // UUID
  agent: string;                   // "default" | "pricing" | ...
  model: string;                   // "claude-sonnet-4-6" | "claude-opus-4-7" | ...
  status: "SUCCESS" | "ERROR" | "MAX_ITERATIONS";
  errorMessage: string | null;
  message: string | null;          // texte conversationnel, court
  toolsUsed: string[];             // pour debug / dev tools
  artifacts: Artifact[];           // <-- ce que tu rends
  iterations: number;
  durationMs: number;
  usage: {
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheCreationTokens: number;
    costMicroUsd: number;          // 1 USD = 1_000_000 micro-USD
  };
}
```

### Cas dégradés

| `status` | À afficher |
|---|---|
| `SUCCESS` + artifacts vides | rendre uniquement `message` |
| `SUCCESS` + `message` vide + artifacts | rendre les artifacts seuls (rare mais possible) |
| `ERROR` | un seul `callout` de niveau `critical` avec `errorMessage` (ne pas afficher `message`) |
| `MAX_ITERATIONS` | rendre ce qui est arrivé + `callout` `warning` "L'analyse a été interrompue, relance ou précise ta question" |

---

## 3. Type discriminé `Artifact`

```ts
type ArtifactType =
  | "metric_card"
  | "kpi_grid"
  | "table"
  | "price_recommendation"
  | "cost_breakdown"
  | "callout";

interface Artifact {
  type: ArtifactType;
  title: string | null;            // headline au-dessus, max 200 chars
  payload: ArtifactPayload;        // structure dépend de `type`
}

type ArtifactPayload =
  | MetricCardPayload
  | KpiGridPayload
  | TablePayload
  | PriceRecommendationPayload
  | CostBreakdownPayload
  | CalloutPayload;
```

Le front fait un `switch (artifact.type)` et rend le composant correspondant. Inconnu = ignorer silencieusement (forward-compat).

---

## 4. Catalogue des six types

### 4.1 `metric_card` — un KPI isolé

```ts
interface MetricCardPayload {
  value: string | number;          // affiché tel quel ou formaté locale
  label: string;                   // sous le chiffre
  unit?: string | null;            // "USD", "g", "carats", "h"
  deltaPercent?: number | null;    // signe porte la couleur (vert >0, rouge <0)
  sublabel?: string | null;        // micro-info en italique sous le label
}
```

**Wireframe** (rendu cible, sur fond ivory):

```
┌───────────────────────────────────────────┐
│                                           │
│   COÛT TOTAL                              │  ← label, mono uppercase 9.5px gold .55
│                                           │
│   11 430                            USD   │  ← value Inter Tight 38px, unit Geist Mono
│                                           │
│   +2.3% sur 24 h                          │  ← deltaPercent, color = warning si >0 sur "coût"
│                                           │
└───────────────────────────────────────────┘
   bord ivory `#E2DED2`, radius 5px, sh-1
```

**Mapping design system Maison**:
- Container: `bg #FFFCF5 (--m-paper)`, border `1px solid #E2DED2`, radius `--r-md (5px)`, shadow `--sh-1`
- `value`: `font-family: Inter Tight; font-size: 38px; font-weight: 600; letter-spacing: -0.02em; color: #0F0F0E`
- `unit`: `font-family: Geist Mono; font-size: 14px; color: #6B655A` aligné droite, baseline du value
- `label`: `font-family: Geist Mono; font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(195,154,113,.55)`
- `sublabel`: `font-family: Instrument Serif; font-style: italic; font-size: 13px; color: #6B655A`
- `deltaPercent`: positif vert `#4F6A41`, négatif rouge `#8E2E20` — sauf override sémantique (pour "coût matière", +X% est défavorable, à inverser via prop)

**Exemple JSON**:
```json
{
  "type": "metric_card",
  "title": null,
  "payload": {
    "value": 11430,
    "label": "Coût total de revient",
    "unit": "USD",
    "deltaPercent": 2.3,
    "sublabel": "Calculé depuis order_stock.total_cost"
  }
}
```

---

### 4.2 `kpi_grid` — plusieurs KPIs alignés

```ts
interface KpiGridPayload {
  items: MetricCardPayload[];      // 2 à 6 idéalement
}
```

**Wireframe**:

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ COÛT TOTAL      │ MARGE IMPL.     │ DÉLAI MOYEN     │ COMPARABLES     │
│                 │                 │                 │                 │
│ 11 430 USD      │ 42.5 %          │ 38 j            │ 47              │
│                 │                 │                 │                 │
│ +2.3% sur 24 h  │ vs 38 % collec. │ −4 j vs cible   │ Estate · 24 mois│
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

Grid 1×N (responsive: 2×N puis 1×N). `gap: --sp-4 (16px)`. Chaque cellule = un `metric_card` complet.

---

### 4.3 `table` — tabulaire dense

```ts
interface TablePayload {
  columns: Array<{
    key: string;
    label: string;
    align?: "left" | "right" | "center";   // défaut: right si rows[*][key] est number, sinon left
  }>;
  rows: Array<Record<string, string | number | null>>;
  footer?: Record<string, string | number | null> | null;  // une ligne, mêmes clés
}
```

**Wireframe**:

```
┌──────────────────────────────────────────────────────────────┐
│  COMPARABLES — COLLECTION ESTATE · 24 MOIS                   │  ← title (mono uppercase)
├──────────────────────────────────────────────────────────────┤
│  Indicateur                                          Valeur  │  ← header marine #131C30 / texte ivoire
├──────────────────────────────────────────────────────────────┤
│  Nombre de pièces                                        47  │
│  Prix médian                                     19 600 USD  │  ← row hover: gold-soft 12%
│  Prix minimum                                    11 200 USD  │
│  Prix maximum                                    31 400 USD  │
│  Prix moyen                                      20 180 USD  │
└──────────────────────────────────────────────────────────────┘
```

**Mapping**:
- Header bg: `--m-marine-800 #131C30`, texte `#F1E5D2` (gold 100), `Inter Tight 11px ; letter-spacing 0.15em ; uppercase`
- Cellules: `Inter 13px`, lignes séparées par `1px solid #E2DED2`
- Row hover: `bg: rgba(195,154,113,.07)` (gold soft)
- Numériques: `font-variant-numeric: tabular-nums` + `Geist Mono` si > 4 chiffres
- Footer (optionnel): `font-weight: 600`, séparé par `border-top: 1px solid --m-gold-line`

---

### 4.4 `price_recommendation` — la recommandation pricing

```ts
interface PriceRecommendationPayload {
  currency: string;                // ISO 4217 : "USD", "EUR", "CHF"
  low: number;
  mid: number;
  high: number;
  impliedMarginPercent: number;    // ex 42.5 = 42.5%
  drivers: string[];               // 2 à 5 puces, raisons positives
  risks: string[];                 // 0 à 3 puces, alertes
  sources: string[];               // noms de tools, ex ["get_order_cost_breakdown", ...]
}
```

**Wireframe** (le composant signature de l'agent pricing):

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  RECOMMANDATION                                          Order #42   │  ← title à droite, mono
│                                                                      │
│   ┌──────────┐       ┌──────────┐       ┌──────────┐                 │
│   │  18 200  │       │  20 500  │       │  22 800  │       USD       │  ← value Inter Tight 32-44
│   │   bas    │       │  médian  │       │   haut   │                 │  ← label Inter 11 mono
│   └──────────┘       └──────╪═══┘       └──────────┘                 │
│                             ╲                                        │  ← bracket gold sous le mid
│                                                                      │
│   Marge implicite ······························  42.5 %             │  ← Inter Tight 18, dotted leader
│                                                                      │
│   Facteurs                                                           │
│   ─ Coût matière 6 850 USD (or 18k, 14.2 g)                          │  ← Instrument Serif italic puces
│   ─ Comparables Estate 24 mois : médiane 19 600 USD                  │
│   ─ Sertissage pavé 18.5 h vs 14 h moyenne collection                │
│                                                                      │
│   Risques                                                            │
│   ─ Or spot +2.3 % sur 24 h — coût matière à 7 008 USD si livr. >30j │
│                                                                      │
│   Sources : get_order_cost_breakdown · get_similar_orders_pricing    │  ← mono 10px gold
│            · get_metal_live_prices                                   │
└──────────────────────────────────────────────────────────────────────┘
   border 1px gold-line, radius 8px, shadow sh-2, fond paper
```

**Mapping**:
- 3 colonnes prix sur grid `1fr 1fr 1fr`. Le mid est mis en avant par : padding plus large, bracket or sous le chiffre (`border-bottom: 2px solid #C39A71` ou un small bracket SVG).
- Currency: en haut à droite des 3 valeurs, `Geist Mono 14px gold`.
- `drivers` et `risks` rendus avec puce em-dash (`─`) couleur `--m-gold-500`, texte en `Instrument Serif italic 14px`.
- `sources`: pied de carte, `Geist Mono 10px ; letter-spacing 0.1em ; gold .65`.
- Si `risks.length === 0`, ne pas afficher la section "Risques" du tout.
- Si `drivers.length === 0`, idem.

**Exemple JSON**:
```json
{
  "type": "price_recommendation",
  "title": "Recommandation — Order #42",
  "payload": {
    "currency": "USD",
    "low": 18200, "mid": 20500, "high": 22800,
    "impliedMarginPercent": 42.5,
    "drivers": [
      "Coût matière 6 850 USD (or 18k, 14.2 g)",
      "Comparables Estate 24 mois : médiane 19 600 USD",
      "Sertissage pavé 18.5 h vs 14 h moyenne collection"
    ],
    "risks": [
      "Or spot +2.3% sur 24h — coût matière à 7 008 USD si livraison > 30j"
    ],
    "sources": [
      "get_order_cost_breakdown",
      "get_similar_orders_pricing",
      "get_metal_live_prices"
    ]
  }
}
```

---

### 4.5 `cost_breakdown` — décomposition en barres

```ts
interface CostBreakdownPayload {
  currency: string;
  total: number;
  items: Array<{
    category: string;              // "Métal (or 18k)", "Diamants", "Main-d'œuvre", ...
    amount: number;
    percentOfTotal: number;        // ex 59.9
  }>;
  sources: string[];
}
```

**Wireframe** (barres horizontales ordonnées par amount desc):

```
┌────────────────────────────────────────────────────────────────────────┐
│  DÉCOMPOSITION DES COÛTS                          Total · 11 430 USD   │
│                                                                        │
│  Métal (or 18k)                ████████████████████   6 850   59.9 %   │
│  Diamants                      █████████              2 900   25.4 %   │
│  Main-d'œuvre                  ████                   1 480   12.9 %   │
│  Gemmes colorées               █                        200    1.8 %   │
│                                                                        │
│  Source : get_order_cost_breakdown                                     │
└────────────────────────────────────────────────────────────────────────┘
```

**Mapping**:
- Bar fill couleur `--m-gold-500 #C39A71`, fond track `--m-sand-100 #ECE5D5`
- Largeur de barre proportionnelle à `percentOfTotal`
- `category`: `Inter 13px` aligné gauche (largeur fixe ~200px)
- `amount`: `Geist Mono 13px` aligné droite, tabular-nums
- `percentOfTotal`: `Geist Mono 12px` gold .65, après l'amount

---

### 4.6 `callout` — note, warning, critique

```ts
interface CalloutPayload {
  level: "info" | "warning" | "critical";
  title: string;
  body: string;                    // peut contenir des sauts de ligne (\n)
}
```

**Wireframe**:

```
┌──────┬─────────────────────────────────────────────────────────────────┐
│ ▎    │  Volatilité métal                                               │  ← title Inter Tight 14 600
│ ▎    │                                                                 │
│ ▎    │  L'or a progressé de 2.3 % en 24 h. Si la livraison est         │  ← body Inter 13 ink-700
│ ▎    │  repoussée au-delà de 30 jours, recalculer le coût matière      │
│ ▎    │  avec get_metal_live_prices avant de figer le prix client.      │
└──────┴─────────────────────────────────────────────────────────────────┘
   bord gauche 3px, fond soft selon level, radius 5px
```

**Mapping par level** (tokens depuis le design system) :

| level | bord gauche | fond | titre |
|---|---|---|---|
| `info` | `#324863` (info) | `#DDE3EC` (info-soft) | `#324863` |
| `warning` | `#A6741F` (warning) | `#F4E9D2` (warning-soft) | `#A6741F` |
| `critical` | `#8E2E20` (danger) | `#F1DAD3` (danger-soft) | `#8E2E20` |

Pas d'icône à gauche. Le bord vertical 3px suffit visuellement — sobriété Maison.

---

## 5. Conventions transverses

### Devises et formatage
- Le backend ne formate jamais les nombres. Il envoie `number` brut + `currency` ISO 4217 séparée.
- C'est au **front** de formater selon `Intl.NumberFormat(locale, { style: "currency", currency })`.
- Locale: `fr-FR` par défaut, `en-US` si l'utilisateur a sélectionné l'anglais. Détection via context user.
- Pour les nombres sans devise (poids, durées, comptes) : utiliser `Intl.NumberFormat` sans `style: currency`.

### Sources
- Le tableau `sources[]` (présent sur `price_recommendation`, `cost_breakdown`) liste les **noms de tools** (techniques) ayant produit les chiffres.
- Tu peux les afficher tels quels en pied de carte (typo mono, gold .65), ou les masquer derrière un toggle "Détails techniques" — au choix UX, pas de contrainte.
- C'est aussi disponible globalement dans `response.toolsUsed[]`.

### Précision et arrondis
- Les nombres arrivent **non arrondis** (BigDecimal côté Java → JSON number ou string). Tu arrondis pour l'affichage (`maximumFractionDigits` selon le type : 0 pour USD entiers, 2 pour pourcentages, 3 pour grammes).
- Ne **jamais** arrondir avant un calcul si tu en fais — préfère tout recalculer côté backend via un appel agent.

### Ordre d'affichage
- Les artifacts doivent être rendus **dans l'ordre du tableau**. L'agent les émet dans un ordre signifiant (généralement : recommandation principale d'abord, puis breakdowns, puis tableaux, puis callouts en fin).
- Pas de réordonnancement client.

### Limite
- Maximum 32 artifacts par run (enforced backend). En pratique : 2 à 6.

---

## 6. Exemples bout-en-bout

### Pricing complet (réponse "réelle" attendue)

```json
{
  "conversationId": "0b8e63c1-3b76-4d3f-9be9-2c9e7db1bf22",
  "agent": "pricing",
  "model": "claude-sonnet-4-6",
  "status": "SUCCESS",
  "errorMessage": null,
  "message": "Pour la commande #42, le prix recommandé se situe entre 18 200 et 22 800 USD selon le positionnement souhaité. La marge implicite reste cohérente avec les comparables Collection Estate sur les 24 derniers mois.",
  "toolsUsed": ["get_order_cost_breakdown","get_order_labour_breakdown","get_metal_live_prices","get_similar_orders_pricing","emit_artifact"],
  "artifacts": [
    { "type": "price_recommendation", "title": "Recommandation — Order #42", "payload": { ... } },
    { "type": "cost_breakdown",       "title": "Décomposition des coûts",     "payload": { ... } },
    { "type": "table",                "title": "Comparables Estate · 24 mois","payload": { ... } },
    { "type": "callout",              "title": "Risque détecté",              "payload": { "level": "warning", ... } }
  ],
  "iterations": 5,
  "durationMs": 4310,
  "usage": { "inputTokens": 4820, "outputTokens": 612, "cacheReadTokens": 3200, "cacheCreationTokens": 0, "costMicroUsd": 12450 }
}
```

### Question simple sans chiffres

```json
{
  "agent": "default",
  "status": "SUCCESS",
  "message": "La commande #42 est en sertissage depuis hier matin. Prochaine étape : polissage prévu en fin de semaine.",
  "artifacts": [],
  "...": "..."
}
```

→ rendre uniquement `message`. Pas de carte vide.

### Erreur

```json
{
  "agent": "pricing",
  "status": "ERROR",
  "errorMessage": "ANTHROPIC_API_KEY is not configured",
  "message": null,
  "artifacts": [],
  "...": "..."
}
```

→ rendre un `callout` `critical` synthétique côté front avec `errorMessage`.

---

## 7. Évolutivité

- **Ne jamais** rendre une erreur si `artifact.type` est inconnu — fallback silencieux. Cela permet d'ajouter des types côté backend (`metric_trend`, `gallery`, `pdf_link`...) sans casser le front.
- Les payloads sont étendus en mode additif uniquement (nouveaux champs optionnels). Tout breaking change passera par un `apiVersion` bumpé dans la réponse.
- Si tu as besoin d'un type qui n'existe pas, ouvre une issue avec : usage métier, payload proposé, wireframe. On l'ajoute dans le prochain sprint.

---

## 8. Checklist d'intégration

- [ ] 6 composants React, un par type, dans `src/features/agents/artifacts/` (par exemple).
- [ ] Un `ArtifactRenderer` qui dispatch sur `type` et tombe en silence sur l'inconnu.
- [ ] Format devise / nombre via `Intl` avec locale utilisateur.
- [ ] Mapping strict aux tokens du design system Maison (`design-explorations/01-maison.html`).
- [ ] Aucun emoji ni glyphe décoratif dans le rendu.
- [ ] Cas dégradés (`status` ≠ `SUCCESS`, artifacts vides, message vide) traités explicitement.
- [ ] Rendu print-friendly bonus (le `price_recommendation` doit pouvoir être imprimé tel quel pour un comité de pricing).

---

**Contact backend**: les schémas TypeScript ci-dessus sont la source de vérité côté front. La source de vérité côté serveur est `service/aiagent/v2/artifact/` et `service/aiagent/v2/tool/impl/EmitArtifactTool.java`. Toute divergence remonte à corriger.
