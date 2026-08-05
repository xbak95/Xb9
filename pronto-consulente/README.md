# Pronto Consulente

**La consulenza giusta. Subito.**

Marketplace digitale che mette in contatto clienti privati, professionisti e aziende con consulenti qualificati in 22 settori (finanza agevolata, legale, HSE, marketing, cybersecurity, privacy/GDPR, e altri). Questo repository contiene l'MVP: un'applicazione Next.js completa, con dati dimostrativi realistici e un'architettura pronta per essere collegata a un backend Supabase reale.

> Questo progetto vive nella cartella `pronto-consulente/` di questo repository, separato dal sito "Casa in Chiaro" presente alla radice.

## Stack tecnico

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design system con palette brand (blu navy `#071A3D`, blu istituzionale `#124A8A`, oro `#C89B4A`, verde verificato `#2E9D67`)
- **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`) — client predisposto, con fallback automatico ai dati demo se non configurato
- **lucide-react** per le icone lineari
- Font **Plus Jakarta Sans** (titoli) e **Inter** (corpo testo)

## Avvio in locale

```bash
cd pronto-consulente
npm install
npm run dev
```

L'app funziona immediatamente **senza alcuna configurazione**: tutti i contenuti (consulenti, categorie, servizi, recensioni, prenotazioni, ecc.) provengono dai dati demo in `/data`. Per collegare un progetto Supabase reale, copia `.env.example` in `.env.local` e valorizza le chiavi — l'app userà `lib/supabase/client.ts` / `lib/supabase/server.ts` solo dove esplicitamente cablato.

## Struttura del progetto

```
app/
  (marketing)/        Homepage, ricerca, profilo consulente, pagine statiche/legali, blog, matching AI
  dashboard/cliente/   Area personale del cliente
  dashboard/consulente/Area personale del consulente
  admin/               Pannello amministrativo interno (noindex)
components/
  ui/                  Design system: Button, Card, Badge, Modal, Toast, Tabs, RatingStars, Chart, Logo, ecc.
  home/, search/, profile/, booking/, messaging/, reviews/, onboarding/, dashboard/, faq/
data/                  Dati demo tipizzati (12 consulenti, 22 categorie, 21 servizi, 16 recensioni, 6 case study, 5 articoli blog, ecc.)
lib/                   Tipi condivisi, utility, client Supabase, motore di matching AI
supabase/
  migrations/0001_init.sql   Schema completo (25+ tabelle, enum, indici, Row Level Security)
  seed.sql                    Esempio di popolamento
```

## Cosa è reale e cosa è simulato

Coerentemente con la richiesta di un MVP, questa prima versione implementa **tutta l'esperienza utente e l'interfaccia** con dati e interazioni dimostrative, mentre le integrazioni esterne sono predisposte ma non collegate:

| Funzione | Stato |
|---|---|
| Homepage, ricerca/filtri, profilo consulente, confronto | ✅ Complete e funzionanti con dati demo |
| Registrazione cliente, wizard consulente a 12 step | ✅ UI completa, invio simulato (nessuna persistenza reale) |
| Prenotazione, coupon, messaggistica, recensioni | ✅ Flussi completi con stato locale (non persistito) |
| Dashboard cliente/consulente, area admin | ✅ Complete con KPI, grafici e dati demo coerenti |
| Matching AI | ✅ Algoritmo di scoring reale (categoria, modalità, lingua, rating, esperienza, budget, settore) su dati demo — nessuna chiamata a un LLM esterno |
| Autenticazione reale | ⏳ Da collegare a Supabase Auth (client predisposto in `lib/supabase/`) |
| Pagamenti | ⏳ UI di checkout completa, da collegare a Stripe |
| Videochiamata | ⏳ Da collegare a Zoom / Google Meet |
| Calendario | ⏳ Da collegare a Google Calendar / Outlook |
| Database | ⏳ Schema SQL pronto in `supabase/migrations/0001_init.sql`, da eseguire su un progetto Supabase |

## Database Supabase

Lo schema in `supabase/migrations/0001_init.sql` copre tutte le entità richieste (`users`, `client_profiles`, `consultant_profiles`, `consultant_services`, `categories`, `bookings`, `messages`, `reviews`, `payments`, `subscriptions`, `verification_requests`, ecc.), con 4 ruoli (cliente, consulente, admin, moderatore) e **Row Level Security** attiva su ogni tabella. Per applicarlo:

```bash
supabase db push
# oppure, con la CLI collegata a un progetto:
psql "$DATABASE_URL" -f supabase/migrations/0001_init.sql
psql "$DATABASE_URL" -f supabase/seed.sql
```

## Note e limiti noti

- **Sicurezza dipendenze**: il progetto usa Next.js `14.2.35` (ultima patch della serie 14.x). Alcuni advisory di sicurezza pubblicati per Next.js risultano corretti solo in Next 16; riguardano principalmente Server Actions, middleware e deployment self-hosted con Image Optimizer — funzionalità non utilizzate in questo MVP. Da valutare l'upgrade a Next 15/16 prima di un rilascio in produzione.
- **`/admin/categorie`** importa l'intero set di icone `lucide-react` per la selezione dinamica dell'icona categoria: bundle più pesante di altre pagine admin. Accettabile per un'area interna (non indicizzata), da ottimizzare con un import mirato in un secondo momento.
- I prezzi degli abbonamenti consulente (`data/pricing-plans.ts`) sono volutamente segnati "da definire", come richiesto.
- Multi-lingua e multi-valuta: l'architettura è pronta (formattazione centralizzata in `lib/utils.ts` con `Intl`), ma l'interfaccia è oggi solo in italiano/EUR.

## Verifiche eseguite

- `npx tsc --noEmit` — nessun errore di tipo
- `npx next build` — build di produzione completa, 87 pagine generate correttamente
- Smoke test manuale delle rotte principali (homepage, ricerca, profilo, matching, dashboard cliente/consulente, admin, blog, auth) — tutte rispondono con contenuto corretto
