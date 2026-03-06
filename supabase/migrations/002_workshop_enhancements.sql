-- ============================================================================
-- ALTER TABLE: workshops - Add new columns
-- ============================================================================
alter table if exists public.workshops
add column if not exists workshop_date timestamp with time zone,
add column if not exists location text,
add column if not exists max_capacity integer,
add column if not exists price numeric default 0,
add column if not exists status text default 'draft',
add column if not exists language text default 'es';

-- ============================================================================
-- TABLE: workshop_photos
-- ============================================================================
create table if not exists public.workshop_photos (
  id uuid primary key default uuid_generate_v4(),
  workshop_id uuid not null references public.workshops (id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.workshop_photos enable row level security;

create policy "Admin users can view all workshop_photos"
  on public.workshop_photos for select
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can insert workshop_photos"
  on public.workshop_photos for insert
  with check (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can update workshop_photos"
  on public.workshop_photos for update
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Admin users can delete workshop_photos"
  on public.workshop_photos for delete
  using (auth.role() = 'authenticated' and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- ============================================================================
-- ALTER TABLE: workshop_registrations - Add contact_id
-- ============================================================================
alter table if exists public.workshop_registrations
add column if not exists contact_id uuid references public.contacts (id) on delete set null;

-- ============================================================================
-- CREATE INDEXES for performance
-- ============================================================================
create index if not exists idx_workshop_photos_workshop_id on public.workshop_photos (workshop_id);
create index if not exists idx_workshops_status on public.workshops (status);
create index if not exists idx_workshops_language on public.workshops (language);
create index if not exists idx_workshop_registrations_workshop_id on public.workshop_registrations (workshop_id);
