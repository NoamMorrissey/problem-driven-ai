-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ============================================================================
-- TABLE: profiles
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  first_name text,
  last_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Admin users can view all profiles"
  on public.profiles for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert profiles"
  on public.profiles for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update profiles"
  on public.profiles for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete profiles"
  on public.profiles for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: contacts
-- ============================================================================
create table if not exists public.contacts (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  first_name text,
  last_name text,
  phone text,
  company text,
  message text,
  source text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.contacts enable row level security;

create policy "Admin users can view all contacts"
  on public.contacts for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert contacts"
  on public.contacts for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update contacts"
  on public.contacts for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete contacts"
  on public.contacts for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: workshops
-- ============================================================================
create table if not exists public.workshops (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  content text,
  slug text unique not null,
  image_url text,
  published boolean default false,
  published_at timestamp with time zone,
  duration_hours integer,
  level text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.workshops enable row level security;

create policy "Admin users can view all workshops"
  on public.workshops for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert workshops"
  on public.workshops for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update workshops"
  on public.workshops for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete workshops"
  on public.workshops for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: workshop_registrations
-- ============================================================================
create table if not exists public.workshop_registrations (
  id uuid primary key default uuid_generate_v4(),
  workshop_id uuid not null references public.workshops (id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  status text default 'registered',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.workshop_registrations enable row level security;

create policy "Admin users can view all workshop_registrations"
  on public.workshop_registrations for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert workshop_registrations"
  on public.workshop_registrations for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update workshop_registrations"
  on public.workshop_registrations for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete workshop_registrations"
  on public.workshop_registrations for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: companies
-- ============================================================================
create table if not exists public.companies (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text,
  logo_url text,
  website_url text,
  location text,
  industry text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.companies enable row level security;

create policy "Admin users can view all companies"
  on public.companies for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert companies"
  on public.companies for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update companies"
  on public.companies for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete companies"
  on public.companies for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: company_services
-- ============================================================================
create table if not exists public.company_services (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  description text,
  price numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.company_services enable row level security;

create policy "Admin users can view all company_services"
  on public.company_services for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert company_services"
  on public.company_services for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update company_services"
  on public.company_services for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete company_services"
  on public.company_services for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: testimonials
-- ============================================================================
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references public.companies (id) on delete set null,
  author_name text not null,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.testimonials enable row level security;

create policy "Admin users can view all testimonials"
  on public.testimonials for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert testimonials"
  on public.testimonials for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update testimonials"
  on public.testimonials for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete testimonials"
  on public.testimonials for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: events
-- ============================================================================
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  content text,
  slug text unique not null,
  image_url text,
  event_date timestamp with time zone not null,
  location text,
  capacity integer,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.events enable row level security;

create policy "Admin users can view all events"
  on public.events for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert events"
  on public.events for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update events"
  on public.events for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete events"
  on public.events for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: illustrations
-- ============================================================================
create table if not exists public.illustrations (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text not null,
  alt_text text,
  category text,
  tags text[],
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.illustrations enable row level security;

create policy "Admin users can view all illustrations"
  on public.illustrations for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert illustrations"
  on public.illustrations for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update illustrations"
  on public.illustrations for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete illustrations"
  on public.illustrations for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: ebook_downloads
-- ============================================================================
create table if not exists public.ebook_downloads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  first_name text,
  last_name text,
  ebook_title text not null,
  download_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.ebook_downloads enable row level security;

create policy "Admin users can view all ebook_downloads"
  on public.ebook_downloads for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert ebook_downloads"
  on public.ebook_downloads for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update ebook_downloads"
  on public.ebook_downloads for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete ebook_downloads"
  on public.ebook_downloads for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: communications
-- ============================================================================
create table if not exists public.communications (
  id uuid primary key default uuid_generate_v4(),
  contact_id uuid references public.contacts (id) on delete set null,
  subject text not null,
  body text not null,
  communication_type text,
  sent_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.communications enable row level security;

create policy "Admin users can view all communications"
  on public.communications for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert communications"
  on public.communications for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update communications"
  on public.communications for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete communications"
  on public.communications for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- TABLE: site_settings
-- ============================================================================
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.site_settings enable row level security;

create policy "Admin users can view all site_settings"
  on public.site_settings for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert site_settings"
  on public.site_settings for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update site_settings"
  on public.site_settings for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete site_settings"
  on public.site_settings for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- CREATE INDEXES for performance
-- ============================================================================
create index if not exists idx_contacts_email on public.contacts (email);
create index if not exists idx_contacts_status on public.contacts (status);
create index if not exists idx_workshops_slug on public.workshops (slug);
create index if not exists idx_workshops_published on public.workshops (published);
create index if not exists idx_companies_name on public.companies (name);
create index if not exists idx_events_slug on public.events (slug);
create index if not exists idx_events_event_date on public.events (event_date);
create index if not exists idx_illustrations_category on public.illustrations (category);
create index if not exists idx_site_settings_key on public.site_settings (key);
