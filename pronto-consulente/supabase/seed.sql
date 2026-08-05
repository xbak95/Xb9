-- ============================================================
-- Pronto Consulente — seed di esempio
-- Script dimostrativo per verificare lo schema definito in
-- supabase/migrations/0001_init.sql. Non rispecchia l'intero
-- set di dati demo presente in /data (12 consulenti, 22 categorie),
-- ma un sottoinsieme minimo e coerente per testare le relazioni
-- principali: categorie, un utente consulente e il suo profilo.
-- ============================================================

-- ============ CATEGORIE DI ESEMPIO ============
insert into public.categories (id, slug, name, description, icon)
values
  ('11111111-1111-1111-1111-111111111101', 'finanza-agevolata', 'Finanza agevolata', 'Bandi, contributi a fondo perduto e credito d''imposta', 'Landmark'),
  ('11111111-1111-1111-1111-111111111102', 'hse-sicurezza-lavoro', 'HSE e sicurezza sul lavoro', 'Sicurezza, ambiente e conformità D.Lgs. 81/08', 'HardHat'),
  ('11111111-1111-1111-1111-111111111103', 'legale', 'Legale', 'Contrattualistica, societario e contenzioso', 'Scale')
on conflict (id) do nothing;

insert into public.subcategories (category_id, slug, name)
values
  ('11111111-1111-1111-1111-111111111101', 'bandi-regionali', 'Bandi regionali'),
  ('11111111-1111-1111-1111-111111111101', 'pnrr', 'PNRR'),
  ('11111111-1111-1111-1111-111111111102', 'rspp-esterno', 'RSPP esterno')
on conflict do nothing;

-- ============ UTENTE E PROFILO CONSULENTE DI ESEMPIO ============
-- NB: in un ambiente Supabase reale la riga in auth.users viene creata dal
-- flusso di autenticazione (Supabase Auth); qui la simuliamo per poter
-- rispettare il vincolo di foreign key di public.users verso auth.users.
insert into auth.users (id, email)
values ('22222222-2222-2222-2222-222222222201', 'alessandro.ferretti@esempio.it')
on conflict (id) do nothing;

insert into public.users (id, email, full_name, role, phone)
values (
  '22222222-2222-2222-2222-222222222201',
  'alessandro.ferretti@esempio.it',
  'Alessandro Ferretti',
  'consulente',
  '+39 02 0000000'
)
on conflict (id) do nothing;

insert into public.consultant_profiles (
  id, user_id, slug, title, bio, category_id, years_experience, location,
  languages, modality, starting_price, avg_response_time_hours, is_published
)
values (
  '33333333-3333-3333-3333-333333333301',
  '22222222-2222-2222-2222-222222222201',
  'alessandro-ferretti-finanza-agevolata',
  'Consulente Finanza Agevolata e Bandi PNRR',
  'Aiuto PMI e startup a intercettare bandi, contributi a fondo perduto e credito d''imposta.',
  '11111111-1111-1111-1111-111111111101',
  12,
  'Milano, Lombardia',
  array['Italiano', 'Inglese'],
  'ibrida',
  90.00,
  2,
  true
)
on conflict (id) do nothing;

insert into public.consultant_services (
  consultant_id, category_id, title, description, price, price_type,
  duration_minutes, delivery_time, modality, includes
)
values (
  '33333333-3333-3333-3333-333333333301',
  '11111111-1111-1111-1111-111111111101',
  'Analisi di ammissibilità a bando',
  'Valutazione preliminare dei requisiti di ammissibilità per il bando individuato.',
  90.00,
  'da',
  60,
  '2 giorni lavorativi',
  'online',
  array['Videocall di 60 minuti', 'Report scritto di ammissibilità']
)
on conflict do nothing;

insert into public.consultant_badges (consultant_id, badge_type)
values
  ('33333333-3333-3333-3333-333333333301', 'identita_verificata'),
  ('33333333-3333-3333-3333-333333333301', 'top_consultant')
on conflict do nothing;
