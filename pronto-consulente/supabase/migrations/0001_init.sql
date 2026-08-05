-- ============================================================
-- Pronto Consulente — schema iniziale del database
-- Marketplace di consulenza professionale (Postgres / Supabase)
-- ============================================================
-- Convenzioni:
--   - chiavi primarie uuid con default gen_random_uuid()
--   - timestamp created_at / updated_at su tutte le tabelle principali
--   - nomi tabelle e colonne in snake_case
--   - Row Level Security abilitata su tutte le tabelle
-- ============================================================

-- ============ ESTENSIONI ============
create extension if not exists "pgcrypto";

-- ============ FUNZIONE DI SUPPORTO: updated_at automatico ============
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============ ENUM ============
create type public.user_role as enum ('cliente', 'consulente', 'admin', 'moderatore');
create type public.account_type as enum ('privato', 'aziendale');
create type public.modality as enum ('online', 'presenza', 'ibrida');
create type public.price_type as enum ('fisso', 'da');
create type public.skill_level as enum ('Base', 'Intermedio', 'Avanzato', 'Esperto');
create type public.verification_badge as enum (
  'identita_verificata',
  'curriculum_verificato',
  'certificazioni_verificate',
  'partita_iva_verificata',
  'top_consultant',
  'risposta_rapida',
  'consulente_premium'
);
create type public.booking_status as enum ('in_attesa', 'confermata', 'completata', 'annullata', 'riprogrammata');
create type public.payment_status as enum ('in_attesa', 'completato', 'fallito', 'rimborsato');
create type public.invoice_status as enum ('bozza', 'emessa', 'pagata', 'annullata');
create type public.subscription_plan as enum ('base', 'professional', 'premium');
create type public.subscription_status as enum ('attiva', 'in_prova', 'scaduta', 'annullata');
create type public.quote_status as enum ('in_attesa', 'inviato', 'accettato', 'rifiutato');
create type public.support_ticket_status as enum ('aperto', 'in_lavorazione', 'risolto', 'chiuso');
create type public.report_status as enum ('in_attesa', 'in_revisione', 'risolta', 'archiviata');
create type public.verification_request_status as enum ('in_attesa', 'approvata', 'respinta');

-- ============ UTENTI ============
-- Estende auth.users di Supabase con i dati applicativi comuni a tutti i ruoli.
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null default 'cliente',
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_users_role on public.users (role);

create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- ============ FUNZIONE HELPER: ruolo amministrativo ============
-- Definita dopo la tabella users perché la interroga.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users u
    where u.id = auth.uid() and u.role in ('admin', 'moderatore')
  );
$$;

-- ============ PROFILI CLIENTE ============
create table public.client_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users (id) on delete cascade,
  account_type public.account_type not null default 'privato',
  company_name text,
  vat_number text,
  billing_address text,
  city text,
  country text not null default 'Italia',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_client_profiles_updated_at
  before update on public.client_profiles
  for each row execute function public.set_updated_at();

-- ============ CATEGORIE E SOTTOCATEGORIE ============
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  icon text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_categories_slug on public.categories (slug);

create trigger trg_categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

create table public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  slug text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (category_id, slug)
);

create index idx_subcategories_category_id on public.subcategories (category_id);

-- ============ PROFILI CONSULENTE ============
create table public.consultant_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users (id) on delete cascade,
  slug text not null unique,
  title text,
  bio text,
  category_id uuid references public.categories (id) on delete set null,
  years_experience integer not null default 0,
  location text,
  languages text[] not null default '{}',
  modality public.modality not null default 'ibrida',
  vat_number text,
  starting_price numeric(10, 2),
  avg_response_time_hours numeric(6, 2),
  profile_views integer not null default 0,
  conversion_rate numeric(5, 2),
  cancellation_policy text,
  reschedule_policy text,
  refund_policy text,
  cv_url text,
  avatar_url text,
  cover_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_consultant_profiles_slug on public.consultant_profiles (slug);
create index idx_consultant_profiles_category_id on public.consultant_profiles (category_id);
create index idx_consultant_profiles_is_published on public.consultant_profiles (is_published);

create trigger trg_consultant_profiles_updated_at
  before update on public.consultant_profiles
  for each row execute function public.set_updated_at();

-- ============ SERVIZI OFFERTI DAI CONSULENTI ============
create table public.consultant_services (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  category_id uuid references public.categories (id) on delete set null,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  price_type public.price_type not null default 'fisso',
  duration_minutes integer not null default 60,
  delivery_time text,
  modality public.modality not null default 'online',
  includes text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_consultant_services_consultant_id on public.consultant_services (consultant_id);
create index idx_consultant_services_category_id on public.consultant_services (category_id);
create index idx_consultant_services_is_active on public.consultant_services (is_active);

create trigger trg_consultant_services_updated_at
  before update on public.consultant_services
  for each row execute function public.set_updated_at();

-- ============ COMPETENZE ============
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  name text not null,
  level public.skill_level not null default 'Intermedio',
  years integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_skills_consultant_id on public.skills (consultant_id);

-- ============ CERTIFICAZIONI ============
create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  name text not null,
  issuer text,
  year integer,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_certifications_consultant_id on public.certifications (consultant_id);

-- ============ ESPERIENZE LAVORATIVE ============
create table public.work_experiences (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  role text not null,
  organization text,
  period text,
  description text,
  created_at timestamptz not null default now()
);

create index idx_work_experiences_consultant_id on public.work_experiences (consultant_id);

-- ============ FORMAZIONE ============
create table public.education (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  degree text not null,
  institution text,
  period text,
  description text,
  created_at timestamptz not null default now()
);

create index idx_education_consultant_id on public.education (consultant_id);

-- ============ PORTFOLIO / CASE STUDY ============
create table public.portfolios (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  title text not null,
  client text,
  summary text,
  result text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index idx_portfolios_consultant_id on public.portfolios (consultant_id);

-- ============ DISPONIBILITÀ ============
create table public.availability (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  date date not null,
  time_slot time not null,
  is_booked boolean not null default false,
  created_at timestamptz not null default now(),
  unique (consultant_id, date, time_slot)
);

create index idx_availability_consultant_id on public.availability (consultant_id);
create index idx_availability_date on public.availability (date);

-- ============ PRENOTAZIONI ============
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users (id) on delete restrict,
  consultant_id uuid not null references public.consultant_profiles (id) on delete restrict,
  service_id uuid references public.consultant_services (id) on delete set null,
  date date not null,
  time time not null,
  modality public.modality not null default 'online',
  price numeric(10, 2) not null,
  status public.booking_status not null default 'in_attesa',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_bookings_client_id on public.bookings (client_id);
create index idx_bookings_consultant_id on public.bookings (consultant_id);
create index idx_bookings_status on public.bookings (status);
create index idx_bookings_date on public.bookings (date);

create trigger trg_bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- ============ DOCUMENTI ALLEGATI ALLE PRENOTAZIONI ============
create table public.booking_documents (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  uploaded_by uuid not null references public.users (id) on delete cascade,
  file_url text not null,
  file_name text,
  created_at timestamptz not null default now()
);

create index idx_booking_documents_booking_id on public.booking_documents (booking_id);

-- ============ CONVERSAZIONI E MESSAGGI ============
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users (id) on delete cascade,
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  booking_id uuid references public.bookings (id) on delete set null,
  last_message_at timestamptz,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  unique (client_id, consultant_id, booking_id)
);

create index idx_conversations_client_id on public.conversations (client_id);
create index idx_conversations_consultant_id on public.conversations (consultant_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.users (id) on delete cascade,
  text text not null,
  attachment_url text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_messages_conversation_id on public.messages (conversation_id);
create index idx_messages_sender_id on public.messages (sender_id);

-- ============ RECENSIONI ============
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings (id) on delete cascade,
  client_id uuid not null references public.users (id) on delete cascade,
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  rating_overall numeric(2, 1) not null check (rating_overall between 1 and 5),
  rating_competence numeric(2, 1) check (rating_competence between 1 and 5),
  rating_clarity numeric(2, 1) check (rating_clarity between 1 and 5),
  rating_punctuality numeric(2, 1) check (rating_punctuality between 1 and 5),
  rating_value_for_money numeric(2, 1) check (rating_value_for_money between 1 and 5),
  comment text,
  would_recommend boolean not null default true,
  verified boolean not null default true,
  consultant_reply text,
  consultant_reply_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_reviews_consultant_id on public.reviews (consultant_id);
create index idx_reviews_client_id on public.reviews (client_id);

-- ============ PREFERITI ============
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users (id) on delete cascade,
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (client_id, consultant_id)
);

create index idx_favorites_client_id on public.favorites (client_id);

-- ============ PAGAMENTI ============
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete restrict,
  client_id uuid not null references public.users (id) on delete restrict,
  amount numeric(10, 2) not null,
  currency text not null default 'EUR',
  status public.payment_status not null default 'in_attesa',
  provider text,
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_payments_booking_id on public.payments (booking_id);
create index idx_payments_client_id on public.payments (client_id);
create index idx_payments_status on public.payments (status);

create trigger trg_payments_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

-- ============ FATTURE ============
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references public.payments (id) on delete set null,
  consultant_id uuid not null references public.consultant_profiles (id) on delete restrict,
  client_id uuid not null references public.users (id) on delete restrict,
  invoice_number text not null unique,
  amount numeric(10, 2) not null,
  status public.invoice_status not null default 'bozza',
  issued_at date,
  due_at date,
  pdf_url text,
  created_at timestamptz not null default now()
);

create index idx_invoices_consultant_id on public.invoices (consultant_id);
create index idx_invoices_client_id on public.invoices (client_id);
create index idx_invoices_status on public.invoices (status);

-- ============ ABBONAMENTI CONSULENTE ============
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null unique references public.consultant_profiles (id) on delete cascade,
  plan public.subscription_plan not null default 'base',
  status public.subscription_status not null default 'attiva',
  started_at timestamptz not null default now(),
  renews_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_subscriptions_consultant_id on public.subscriptions (consultant_id);
create index idx_subscriptions_status on public.subscriptions (status);

create trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ============ NOTIFICHE ============
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_notifications_user_id on public.notifications (user_id);
create index idx_notifications_read on public.notifications (read);

-- ============ RICHIESTE DI PREVENTIVO ============
create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users (id) on delete cascade,
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  category_id uuid references public.categories (id) on delete set null,
  description text not null,
  budget text,
  amount numeric(10, 2),
  status public.quote_status not null default 'in_attesa',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_quotes_client_id on public.quotes (client_id);
create index idx_quotes_consultant_id on public.quotes (consultant_id);
create index idx_quotes_status on public.quotes (status);

create trigger trg_quotes_updated_at
  before update on public.quotes
  for each row execute function public.set_updated_at();

-- ============ TICKET DI ASSISTENZA ============
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  subject text not null,
  message text not null,
  status public.support_ticket_status not null default 'aperto',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_support_tickets_user_id on public.support_tickets (user_id);
create index idx_support_tickets_status on public.support_tickets (status);

create trigger trg_support_tickets_updated_at
  before update on public.support_tickets
  for each row execute function public.set_updated_at();

-- ============ SEGNALAZIONI ============
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.users (id) on delete set null,
  reported_user_id uuid references public.users (id) on delete cascade,
  reported_consultant_id uuid references public.consultant_profiles (id) on delete cascade,
  type text not null,
  reference text,
  description text not null,
  status public.report_status not null default 'in_attesa',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_reports_reporter_id on public.reports (reporter_id);
create index idx_reports_status on public.reports (status);

create trigger trg_reports_updated_at
  before update on public.reports
  for each row execute function public.set_updated_at();

-- ============ RICHIESTE DI VERIFICA CONSULENTE ============
create table public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  badge_type public.verification_badge not null,
  document_url text,
  status public.verification_request_status not null default 'in_attesa',
  reviewed_by uuid references public.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_verification_requests_consultant_id on public.verification_requests (consultant_id);
create index idx_verification_requests_status on public.verification_requests (status);

-- ============ BADGE ASSEGNATI (esito delle verifiche approvate) ============
create table public.consultant_badges (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultant_profiles (id) on delete cascade,
  badge_type public.verification_badge not null,
  granted_at timestamptz not null default now(),
  unique (consultant_id, badge_type)
);

create index idx_consultant_badges_consultant_id on public.consultant_badges (consultant_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users enable row level security;
alter table public.client_profiles enable row level security;
alter table public.consultant_profiles enable row level security;
alter table public.consultant_services enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.skills enable row level security;
alter table public.certifications enable row level security;
alter table public.work_experiences enable row level security;
alter table public.education enable row level security;
alter table public.portfolios enable row level security;
alter table public.availability enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_documents enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.payments enable row level security;
alter table public.invoices enable row level security;
alter table public.subscriptions enable row level security;
alter table public.notifications enable row level security;
alter table public.quotes enable row level security;
alter table public.support_tickets enable row level security;
alter table public.reports enable row level security;
alter table public.verification_requests enable row level security;
alter table public.consultant_badges enable row level security;

-- ============ POLICY: users ============
create policy "users_select_self_or_admin"
  on public.users for select
  using (id = auth.uid() or public.is_admin());

create policy "users_insert_self"
  on public.users for insert
  with check (id = auth.uid());

create policy "users_update_self_or_admin"
  on public.users for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

create policy "users_delete_admin_only"
  on public.users for delete
  using (public.is_admin());

-- ============ POLICY: client_profiles ============
create policy "client_profiles_select_self_or_admin"
  on public.client_profiles for select
  using (user_id = auth.uid() or public.is_admin());

create policy "client_profiles_insert_self"
  on public.client_profiles for insert
  with check (user_id = auth.uid());

create policy "client_profiles_update_self_or_admin"
  on public.client_profiles for update
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

create policy "client_profiles_delete_self_or_admin"
  on public.client_profiles for delete
  using (user_id = auth.uid() or public.is_admin());

-- ============ POLICY: categories / subcategories (lettura pubblica) ============
create policy "categories_select_public"
  on public.categories for select
  using (true);

create policy "categories_write_admin_only"
  on public.categories for insert
  with check (public.is_admin());

create policy "categories_update_admin_only"
  on public.categories for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "categories_delete_admin_only"
  on public.categories for delete
  using (public.is_admin());

create policy "subcategories_select_public"
  on public.subcategories for select
  using (true);

create policy "subcategories_write_admin_only"
  on public.subcategories for insert
  with check (public.is_admin());

create policy "subcategories_update_admin_only"
  on public.subcategories for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "subcategories_delete_admin_only"
  on public.subcategories for delete
  using (public.is_admin());

-- ============ POLICY: consultant_profiles ============
-- I profili pubblicati sono visibili a chiunque; il proprietario e l'admin vedono anche le bozze.
create policy "consultant_profiles_select_public_or_owner"
  on public.consultant_profiles for select
  using (is_published = true or user_id = auth.uid() or public.is_admin());

create policy "consultant_profiles_insert_self"
  on public.consultant_profiles for insert
  with check (user_id = auth.uid());

create policy "consultant_profiles_update_owner_or_admin"
  on public.consultant_profiles for update
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

create policy "consultant_profiles_delete_owner_or_admin"
  on public.consultant_profiles for delete
  using (user_id = auth.uid() or public.is_admin());

-- ============ POLICY: consultant_services ============
create policy "consultant_services_select_public_or_owner"
  on public.consultant_services for select
  using (
    is_active = true
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = consultant_services.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "consultant_services_write_owner_or_admin"
  on public.consultant_services for insert
  with check (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = consultant_services.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "consultant_services_update_owner_or_admin"
  on public.consultant_services for update
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = consultant_services.consultant_id and cp.user_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = consultant_services.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "consultant_services_delete_owner_or_admin"
  on public.consultant_services for delete
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = consultant_services.consultant_id and cp.user_id = auth.uid()
    )
  );

-- ============ POLICY: sotto-risorse del profilo consulente ============
-- skills, certifications, work_experiences, education, portfolios, availability
-- seguono lo stesso pattern: lettura pubblica se il profilo è pubblicato, scrittura solo al proprietario o admin.

create policy "skills_select_public_or_owner"
  on public.skills for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = skills.consultant_id and (cp.is_published = true or cp.user_id = auth.uid())
    )
  );

create policy "skills_write_owner_or_admin"
  on public.skills for insert
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = skills.consultant_id and cp.user_id = auth.uid())
  );

create policy "skills_update_owner_or_admin"
  on public.skills for update
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = skills.consultant_id and cp.user_id = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = skills.consultant_id and cp.user_id = auth.uid())
  );

create policy "skills_delete_owner_or_admin"
  on public.skills for delete
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = skills.consultant_id and cp.user_id = auth.uid())
  );

create policy "certifications_select_public_or_owner"
  on public.certifications for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = certifications.consultant_id and (cp.is_published = true or cp.user_id = auth.uid())
    )
  );

create policy "certifications_write_owner_or_admin"
  on public.certifications for insert
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = certifications.consultant_id and cp.user_id = auth.uid())
  );

create policy "certifications_update_owner_or_admin"
  on public.certifications for update
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = certifications.consultant_id and cp.user_id = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = certifications.consultant_id and cp.user_id = auth.uid())
  );

create policy "certifications_delete_owner_or_admin"
  on public.certifications for delete
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = certifications.consultant_id and cp.user_id = auth.uid())
  );

create policy "work_experiences_select_public_or_owner"
  on public.work_experiences for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = work_experiences.consultant_id and (cp.is_published = true or cp.user_id = auth.uid())
    )
  );

create policy "work_experiences_write_owner_or_admin"
  on public.work_experiences for insert
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = work_experiences.consultant_id and cp.user_id = auth.uid())
  );

create policy "work_experiences_update_owner_or_admin"
  on public.work_experiences for update
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = work_experiences.consultant_id and cp.user_id = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = work_experiences.consultant_id and cp.user_id = auth.uid())
  );

create policy "work_experiences_delete_owner_or_admin"
  on public.work_experiences for delete
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = work_experiences.consultant_id and cp.user_id = auth.uid())
  );

create policy "education_select_public_or_owner"
  on public.education for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = education.consultant_id and (cp.is_published = true or cp.user_id = auth.uid())
    )
  );

create policy "education_write_owner_or_admin"
  on public.education for insert
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = education.consultant_id and cp.user_id = auth.uid())
  );

create policy "education_update_owner_or_admin"
  on public.education for update
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = education.consultant_id and cp.user_id = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = education.consultant_id and cp.user_id = auth.uid())
  );

create policy "education_delete_owner_or_admin"
  on public.education for delete
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = education.consultant_id and cp.user_id = auth.uid())
  );

create policy "portfolios_select_public_or_owner"
  on public.portfolios for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = portfolios.consultant_id and (cp.is_published = true or cp.user_id = auth.uid())
    )
  );

create policy "portfolios_write_owner_or_admin"
  on public.portfolios for insert
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = portfolios.consultant_id and cp.user_id = auth.uid())
  );

create policy "portfolios_update_owner_or_admin"
  on public.portfolios for update
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = portfolios.consultant_id and cp.user_id = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = portfolios.consultant_id and cp.user_id = auth.uid())
  );

create policy "portfolios_delete_owner_or_admin"
  on public.portfolios for delete
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = portfolios.consultant_id and cp.user_id = auth.uid())
  );

create policy "availability_select_public_or_owner"
  on public.availability for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = availability.consultant_id and (cp.is_published = true or cp.user_id = auth.uid())
    )
  );

create policy "availability_write_owner_or_admin"
  on public.availability for insert
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = availability.consultant_id and cp.user_id = auth.uid())
  );

create policy "availability_update_owner_or_admin"
  on public.availability for update
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = availability.consultant_id and cp.user_id = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = availability.consultant_id and cp.user_id = auth.uid())
  );

create policy "availability_delete_owner_or_admin"
  on public.availability for delete
  using (
    public.is_admin()
    or exists (select 1 from public.consultant_profiles cp where cp.id = availability.consultant_id and cp.user_id = auth.uid())
  );

-- ============ POLICY: bookings ============
create policy "bookings_select_participants_or_admin"
  on public.bookings for select
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = bookings.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "bookings_insert_client"
  on public.bookings for insert
  with check (client_id = auth.uid() or public.is_admin());

create policy "bookings_update_participants_or_admin"
  on public.bookings for update
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = bookings.consultant_id and cp.user_id = auth.uid()
    )
  )
  with check (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = bookings.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "bookings_delete_admin_only"
  on public.bookings for delete
  using (public.is_admin());

-- ============ POLICY: booking_documents ============
create policy "booking_documents_select_participants_or_admin"
  on public.booking_documents for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.bookings b
      left join public.consultant_profiles cp on cp.id = b.consultant_id
      where b.id = booking_documents.booking_id
        and (b.client_id = auth.uid() or cp.user_id = auth.uid())
    )
  );

create policy "booking_documents_insert_participants"
  on public.booking_documents for insert
  with check (
    uploaded_by = auth.uid()
    and exists (
      select 1 from public.bookings b
      left join public.consultant_profiles cp on cp.id = b.consultant_id
      where b.id = booking_documents.booking_id
        and (b.client_id = auth.uid() or cp.user_id = auth.uid())
    )
  );

create policy "booking_documents_delete_owner_or_admin"
  on public.booking_documents for delete
  using (uploaded_by = auth.uid() or public.is_admin());

-- ============ POLICY: conversations e messages ============
create policy "conversations_select_participants_or_admin"
  on public.conversations for select
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = conversations.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "conversations_insert_client_or_consultant"
  on public.conversations for insert
  with check (
    client_id = auth.uid()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = conversations.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "conversations_update_participants_or_admin"
  on public.conversations for update
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = conversations.consultant_id and cp.user_id = auth.uid()
    )
  )
  with check (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = conversations.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "messages_select_participants_or_admin"
  on public.messages for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.conversations c
      left join public.consultant_profiles cp on cp.id = c.consultant_id
      where c.id = messages.conversation_id
        and (c.client_id = auth.uid() or cp.user_id = auth.uid())
    )
  );

create policy "messages_insert_participants"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations c
      left join public.consultant_profiles cp on cp.id = c.consultant_id
      where c.id = messages.conversation_id
        and (c.client_id = auth.uid() or cp.user_id = auth.uid())
    )
  );

create policy "messages_update_participants_or_admin"
  on public.messages for update
  using (
    public.is_admin()
    or exists (
      select 1 from public.conversations c
      left join public.consultant_profiles cp on cp.id = c.consultant_id
      where c.id = messages.conversation_id
        and (c.client_id = auth.uid() or cp.user_id = auth.uid())
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.conversations c
      left join public.consultant_profiles cp on cp.id = c.consultant_id
      where c.id = messages.conversation_id
        and (c.client_id = auth.uid() or cp.user_id = auth.uid())
    )
  );

-- ============ POLICY: reviews ============
-- Le recensioni verificate sono pubbliche in lettura.
create policy "reviews_select_public"
  on public.reviews for select
  using (true);

create policy "reviews_insert_client_owner"
  on public.reviews for insert
  with check (
    client_id = auth.uid()
    and exists (
      select 1 from public.bookings b
      where b.id = reviews.booking_id and b.client_id = auth.uid() and b.status = 'completata'
    )
  );

create policy "reviews_update_client_or_consultant_reply_or_admin"
  on public.reviews for update
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = reviews.consultant_id and cp.user_id = auth.uid()
    )
  )
  with check (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = reviews.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "reviews_delete_admin_only"
  on public.reviews for delete
  using (public.is_admin());

-- ============ POLICY: favorites ============
create policy "favorites_select_owner_or_admin"
  on public.favorites for select
  using (client_id = auth.uid() or public.is_admin());

create policy "favorites_insert_owner"
  on public.favorites for insert
  with check (client_id = auth.uid());

create policy "favorites_delete_owner_or_admin"
  on public.favorites for delete
  using (client_id = auth.uid() or public.is_admin());

-- ============ POLICY: payments ============
create policy "payments_select_participants_or_admin"
  on public.payments for select
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.bookings b
      join public.consultant_profiles cp on cp.id = b.consultant_id
      where b.id = payments.booking_id and cp.user_id = auth.uid()
    )
  );

create policy "payments_insert_client_or_admin"
  on public.payments for insert
  with check (client_id = auth.uid() or public.is_admin());

create policy "payments_update_admin_only"
  on public.payments for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============ POLICY: invoices ============
create policy "invoices_select_participants_or_admin"
  on public.invoices for select
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = invoices.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "invoices_write_admin_only"
  on public.invoices for insert
  with check (public.is_admin());

create policy "invoices_update_admin_only"
  on public.invoices for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============ POLICY: subscriptions ============
create policy "subscriptions_select_owner_or_admin"
  on public.subscriptions for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = subscriptions.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "subscriptions_insert_owner_or_admin"
  on public.subscriptions for insert
  with check (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = subscriptions.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "subscriptions_update_owner_or_admin"
  on public.subscriptions for update
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = subscriptions.consultant_id and cp.user_id = auth.uid()
    )
  )
  with check (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = subscriptions.consultant_id and cp.user_id = auth.uid()
    )
  );

-- ============ POLICY: notifications ============
create policy "notifications_select_owner_or_admin"
  on public.notifications for select
  using (user_id = auth.uid() or public.is_admin());

create policy "notifications_insert_admin_only"
  on public.notifications for insert
  with check (public.is_admin());

create policy "notifications_update_owner_or_admin"
  on public.notifications for update
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

create policy "notifications_delete_owner_or_admin"
  on public.notifications for delete
  using (user_id = auth.uid() or public.is_admin());

-- ============ POLICY: quotes ============
create policy "quotes_select_participants_or_admin"
  on public.quotes for select
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = quotes.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "quotes_insert_client"
  on public.quotes for insert
  with check (client_id = auth.uid() or public.is_admin());

create policy "quotes_update_participants_or_admin"
  on public.quotes for update
  using (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = quotes.consultant_id and cp.user_id = auth.uid()
    )
  )
  with check (
    client_id = auth.uid()
    or public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = quotes.consultant_id and cp.user_id = auth.uid()
    )
  );

-- ============ POLICY: support_tickets ============
create policy "support_tickets_select_owner_or_admin"
  on public.support_tickets for select
  using (user_id = auth.uid() or public.is_admin());

create policy "support_tickets_insert_owner"
  on public.support_tickets for insert
  with check (user_id = auth.uid());

create policy "support_tickets_update_owner_or_admin"
  on public.support_tickets for update
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- ============ POLICY: reports ============
create policy "reports_select_reporter_or_admin"
  on public.reports for select
  using (reporter_id = auth.uid() or public.is_admin());

create policy "reports_insert_authenticated"
  on public.reports for insert
  with check (reporter_id = auth.uid() or reporter_id is null);

create policy "reports_update_admin_only"
  on public.reports for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============ POLICY: verification_requests ============
create policy "verification_requests_select_owner_or_admin"
  on public.verification_requests for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.consultant_profiles cp
      where cp.id = verification_requests.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "verification_requests_insert_owner"
  on public.verification_requests for insert
  with check (
    exists (
      select 1 from public.consultant_profiles cp
      where cp.id = verification_requests.consultant_id and cp.user_id = auth.uid()
    )
  );

create policy "verification_requests_update_admin_only"
  on public.verification_requests for update
  using (public.is_admin())
  with check (public.is_admin());

-- ============ POLICY: consultant_badges ============
-- I badge assegnati sono informazione pubblica (mostrata nei profili); solo l'admin li assegna.
create policy "consultant_badges_select_public"
  on public.consultant_badges for select
  using (true);

create policy "consultant_badges_write_admin_only"
  on public.consultant_badges for insert
  with check (public.is_admin());

create policy "consultant_badges_update_admin_only"
  on public.consultant_badges for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "consultant_badges_delete_admin_only"
  on public.consultant_badges for delete
  using (public.is_admin());
