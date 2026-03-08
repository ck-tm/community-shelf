# CityShelf / Biblio•tech•a — Frontend (Next.js)

## What is this project?

A multi-tenant community library platform. Libraries get their own subdomain (e.g. `demo.localhost:3000`) where members can browse titles, request loans, and admins manage their catalog. The platform landing page lives at `localhost:3000`.

## Scope — frontend-next only

You are working **only** inside `frontend-next/`. The Django backend is a separate service you connect to via API — **do not modify anything in `backend/`** or any other directory outside `frontend-next/`.

The backend is a black box. Its API is already built and stable. Your job is to improve the frontend UI/UX.

## Quick start

```bash
cd frontend-next
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL to the production API:
#   NEXT_PUBLIC_API_URL=https://api-library.costico.eu
npm install
npm run dev
```

The dev server starts on **port 3000** with Turbopack.

- **Platform** (landing page): `http://localhost:3000`
- **Tenant** (library site): `http://demo.localhost:3000`

Replace `demo` with any valid library slug.

## Tech stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4** (PostCSS plugin, NOT the Vite plugin)
- **i18next** — bilingual: Romanian (default) + English
- **Leaflet** — maps
- **Lucide React** — icons
- **html5-qrcode** — ISBN barcode scanner

## Architecture

### Multi-tenant routing

Middleware (`middleware.js`) detects the subdomain from the `Host` header and rewrites:
- `demo.localhost:3000/` → internal route `/tenant/`
- `localhost:3000/` → internal route `/platform/`

Both share the same public URL paths (`/`, `/login`, `/contact`, etc.) but render different pages.

### Route structure

```
app/
├── layout.jsx              ← Root layout (ThemeProvider, I18nProvider, AuthProvider)
├── platform/               ← Platform pages (landing, dashboard, legal)
│   ├── layout.jsx          ← PlatformNavbar + Footer
│   ├── page.jsx            ← Landing page
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── contact/page.jsx
│   └── ...
├── tenant/                 ← Tenant/library pages
│   ├── layout.jsx          ← Navbar + Footer + DataProvider
│   ├── page.jsx            ← Browse/catalog (BrowseClient)
│   ├── title/[id]/         ← Title detail
│   ├── lists/              ← Curated lists
│   ├── login/page.jsx
│   ├── account/            ← User account (protected)
│   ├── admin/              ← Admin panel (protected, role-based)
│   │   ├── titles/         ← CRUD titles
│   │   ├── lists/          ← CRUD lists
│   │   ├── types/          ← Manage types
│   │   ├── inquiries/      ← Loan requests
│   │   ├── config/         ← Site theming
│   │   └── description/    ← About page editor
│   └── ...
└── api/[...path]/route.js  ← API proxy to Django
```

### API proxy

All `/api/*` requests are proxied to Django via the route handler at `app/api/[...path]/route.js`. This:
- Preserves trailing slashes (Django requires them)
- Auto-injects `X-Tenant` header from the subdomain
- Rewrites `Set-Cookie` domain in dev so auth works on localhost

**Never call the Django API directly from client code.** Always use relative URLs (`/api/v1/...`).

### Key files

| File | Purpose |
|------|---------|
| `middleware.js` | Subdomain detection, URL rewriting, locale/theme headers |
| `lib/api-client.js` | Client-side fetch wrapper with auth token refresh |
| `lib/api.js` | Server-side fetch wrapper (for Server Components) |
| `lib/endpoints.js` | All API endpoint functions organized by domain |
| `lib/seo.js` | JSON-LD structured data generators |
| `context/AuthContext.jsx` | Auth state, login/logout/register |
| `context/DataContext.jsx` | All tenant data + CRUD operations |
| `context/ThemeProvider.jsx` | Dark/light mode |
| `context/I18nProvider.jsx` | Language switching (en/ro) |

### Components (in `components/`)

Shared UI components: `Navbar`, `Footer`, `TitleCard`, `TitleForm`, `ListCard`, `ListForm`, `TypeIcon`, `StatusBadge`, `ConfirmDialog`, `RequestModal`, `ISBNScanner`, `ShelfView`, `ShelfBook`, `LibraryMap`, `ProtectedRoute`, `AuthorSelect`, `TitlePicker`, `LanguageSwitcher`, `PlatformNavbar`

### Styling

- Tailwind 4 with PostCSS — config in `postcss.config.js`
- Custom theme defined in `app/globals.css`: colors (teal, amber, cream), fonts (Instrument Serif headings, DM Sans body)
- Dark mode: `.dark` class on `<html>`, toggled by ThemeProvider
- 3D book spine animations in globals.css
- Tenant admins can customize colors via Site Config — applied as CSS custom properties in DataContext

### Translations

Two JSON files: `i18n/en.json` and `i18n/ro.json` (~690 keys each). Every user-facing string must use `t("key")` from `react-i18next`. Default language is Romanian.

For bilingual database fields (e.g. `title` vs `titleRo`), use the `useLocalize()` hook which returns a `loc(item, field)` function.

### Path aliases

`@/` maps to the project root (configured in `jsconfig.json`). Use `@/components/Foo` instead of `../../components/Foo`.

## Important conventions

- All interactive pages use `"use client"` directive
- Server Components fetch initial data via `lib/api.js` (`serverFetch`)
- Client Components use `lib/api-client.js` (`api.get(...)`, `api.post(...)`)
- Tenant slug is detected from subdomain, never from URL params
- The `DataProvider` wraps all tenant pages and pre-fetches catalog data
- Protected routes use `<ProtectedRoute>` or `<ProtectedRoute adminOnly>`
- Icons: always use `lucide-react` — do not add other icon libraries

## Do NOT touch

- `backend/` — Django backend (separate service, not your concern)
- `frontend/` — Old Vite SPA (being replaced by this Next.js app)
- `middleware.js` — Routing logic is stable, avoid modifying
- `app/api/[...path]/route.js` — API proxy, avoid modifying
- `next.config.js` — Config is stable
- `lib/api-client.js` / `lib/api.js` — API layer is stable

## Env variables

See `.env.example`. Copy to `.env.local` and adjust:

```
NEXT_PUBLIC_API_URL=https://api-library.costico.eu
NEXT_PUBLIC_BASE_DOMAIN=localhost
NEXT_PUBLIC_PLATFORM_URL=http://localhost:3000
```
