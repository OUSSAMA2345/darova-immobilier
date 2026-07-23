# Darova Immobilier — Plateforme immobilière premium

Site vitrine + back-office complet pour une agence immobilière basée à Casablanca, Maroc.

**Stack** : Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · shadcn/ui (Radix) ·
Framer Motion · Supabase (PostgreSQL + Auth) · Recharts · React Hook Form + Zod.

---

## 1. Structure du projet

```
darova-immobilier/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Accueil
│   │   ├── layout.tsx                    # Layout racine (SEO, polices, header/footer)
│   │   ├── proprietes-a-vendre/          # Liste des biens à vendre
│   │   ├── proprietes-a-louer/           # Liste des biens à louer
│   │   ├── propriete/[slug]/             # Fiche détail d'un bien
│   │   ├── a-propos/
│   │   ├── contact/
│   │   ├── estimation-gratuite/          # Formulaire d'estimation
│   │   ├── blog/  &  blog/[slug]/
│   │   ├── faq/
│   │   ├── confidentialite/              # Politique de confidentialité
│   │   ├── conditions-generales/         # CGU
│   │   ├── sitemap.ts  &  robots.ts
│   │   └── admin/                        # Back-office (protégé par Supabase Auth)
│   │       ├── login/
│   │       ├── page.tsx                  # Dashboard
│   │       ├── proprietes/               # Liste, ajout, édition
│   │       ├── leads/                    # Gestion des prospects
│   │       ├── utilisateurs/             # Gestion des utilisateurs
│   │       └── analytics/                # Statistiques
│   ├── components/
│   │   ├── layout/                       # Header, Footer, WhatsAppButton, PageHeader
│   │   ├── home/                         # Sections page d'accueil
│   │   ├── properties/                   # Card, Gallery, Filters, Map, Forms
│   │   ├── admin/                        # Sidebar, Topbar, PropertyForm, Charts
│   │   ├── seo/                          # JsonLd
│   │   └── ui/                           # Design system (shadcn-style primitives)
│   └── lib/
│       ├── data/                         # Contenu réaliste (fallback / seed)
│       ├── supabase/                     # Clients browser / server / middleware
│       ├── types.ts
│       └── utils.ts
├── supabase/
│   └── schema.sql                        # Schéma complet (tables, RLS, triggers, vues)
├── scripts/
│   └── seed.ts                           # Peuple Supabase avec le contenu de démonstration
├── middleware.ts                         # Protège /admin, rafraîchit la session Supabase
└── .env.example
```

---

## 2. Installation locale

Prérequis : Node.js 20+, un compte [Supabase](https://supabase.com) gratuit.

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env.local
# puis renseigner les valeurs (voir section 3)

# 3. Lancer le serveur de développement
npm run dev
```

Le site est disponible sur `http://localhost:3000`, l'administration sur `http://localhost:3000/admin`.

> Le site fonctionne **immédiatement sans Supabase configuré** : toutes les pages publiques
> utilisent le contenu réaliste de démonstration situé dans `src/lib/data/`. Les formulaires
> (contact, visite, estimation) se dégradent gracieusement si Supabase n'est pas branché.
> Pour activer la persistance réelle des leads et le back-office, suivez la section 3.

---

## 3. Configuration Supabase

### 3.1 Créer le projet
1. Créez un projet sur [supabase.com](https://supabase.com/dashboard).
2. Dans **Project Settings → API**, récupérez :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ ne jamais exposer côté client)

### 3.2 Créer le schéma
1. Ouvrez **SQL Editor** dans Supabase.
2. Collez le contenu de `supabase/schema.sql` et exécutez-le.
   Cela crée : `users`, `properties`, `testimonials`, `blog_posts`, `leads`,
   `contact_messages`, `property_views`, les enums, les triggers `updated_at`,
   la synchronisation automatique `auth.users → public.users`, les politiques RLS,
   et la vue `dashboard_stats`.

### 3.3 Peupler la base (contenu de démonstration)
```bash
npm run seed
```
Ce script insère les 8 propriétés, 4 témoignages et 4 articles de blog réalistes fournis avec le
projet, directement dans votre base Supabase.

### 3.4 Créer un compte administrateur
1. Dans Supabase → **Authentication → Users → Add user**, créez un compte avec e-mail/mot de
   passe (le trigger `handle_new_user` crée automatiquement le profil dans `public.users`).
2. Dans **Table editor → users**, passez son `role` à `admin`.
3. Connectez-vous sur `/admin/login` avec ces identifiants.

### 3.5 Stockage des images (optionnel)
Pour l'upload direct de photos depuis le formulaire d'ajout de propriété :
1. Créez un bucket **Storage** nommé `properties`, en accès public en lecture.
2. Remplacez le champ "coller une URL" du composant `PropertyForm.tsx` par un appel à
   `supabase.storage.from('properties').upload(...)`.

---

## 4. Variables d'environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique (anon) Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé serveur, utilisée uniquement par `scripts/seed.ts` |
| `NEXT_PUBLIC_SITE_URL` | URL canonique du site (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp par défaut (format international, sans +) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optionnel — pour une carte Google Maps avec clé API |

---

## 5. Déploiement sur Vercel

1. Poussez le projet sur un dépôt GitHub/GitLab.
2. Sur [vercel.com](https://vercel.com/new), importez le dépôt.
3. Renseignez les variables d'environnement listées ci-dessus dans
   **Project Settings → Environment Variables**.
4. Déployez. Vercel détecte automatiquement Next.js 15 (aucune configuration additionnelle
   requise).
5. Ajoutez votre nom de domaine dans **Project Settings → Domains**, puis mettez à jour
   `NEXT_PUBLIC_SITE_URL` en conséquence et redéployez pour régénérer le sitemap et les balises
   Open Graph avec la bonne URL.

---

## 6. Design system

| Token | Valeur | Usage |
|---|---|---|
| `navy-900` | `#0F172A` | Couleur principale, fonds sombres, texte |
| `gold-500` | `#D4AF37` | Accent premium, CTA, badges |
| `cream` | `#FAF8F3` | Fond de section alterné |
| Police d'affichage | **Fraunces** | Titres, montants |
| Police de texte | **Inter** | Corps de texte |
| Police arabe | **Tajawal** | Slogan et contenu RTL |

Composants shadcn-style dans `src/components/ui/` : Button, Input, Textarea, Label, Select,
Dialog, Tabs, Checkbox, Badge, Card — tous stylés avec les tokens ci-dessus.

---

## 7. Fonctionnalités livrées

- Recherche + filtres (ville, type, prix, chambres, salles de bain, surface)
- Galerie photo avec lightbox, carte Google Maps intégrée par bien
- Bouton WhatsApp flottant + lien direct WhatsApp sur chaque fiche bien
- Formulaires : contact, demande de visite, estimation gratuite, rappel — tous connectés à la
  table `leads` / `contact_messages` de Supabase
- Back-office : authentification Supabase, dashboard avec statistiques et graphiques (Recharts),
  CRUD propriétés, gestion des prospects (statuts), gestion des utilisateurs/rôles
- SEO : métadonnées par page, Open Graph, JSON-LD (organisation, produit, article),
  `sitemap.xml` et `robots.txt` générés dynamiquement
- Contenu bilingue : interface FR, slogan et bascule AR (RTL) prêtes à étendre

## 8. Prochaines étapes suggérées

- Brancher `PropertyForm` sur Supabase Storage pour l'upload réel de photos
- Ajouter la pagination côté serveur pour les listes de propriétés au-delà de quelques dizaines
  de biens
- Traduire l'intégralité du site en arabe (actuellement : structure RTL prête, contenu FR par
  défaut)
- Ajouter un système d'alertes e-mail (ex. Resend) déclenché à la création d'un lead
