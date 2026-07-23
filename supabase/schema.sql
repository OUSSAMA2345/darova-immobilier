-- =========================================================
-- DAROVA IMMOBILIER — Supabase Database Schema
-- Run this in the Supabase SQL editor (Project > SQL Editor)
-- =========================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- ---------------------------------------------------------
-- ENUM TYPES
-- ---------------------------------------------------------
create type listing_type as enum ('vente', 'location');
create type property_type as enum ('appartement', 'villa', 'maison', 'bureau', 'commerce', 'terrain');
create type property_status as enum ('disponible', 'reserve', 'vendu', 'loue');
create type lead_source as enum ('contact', 'property', 'evaluation', 'callback');
create type lead_status as enum ('nouveau', 'en_cours', 'traite', 'perdu');
create type user_role as enum ('admin', 'agent', 'editeur');

-- ---------------------------------------------------------
-- USERS (extends Supabase auth.users via profile table)
-- ---------------------------------------------------------
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  role user_role not null default 'agent',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- PROPERTIES
-- ---------------------------------------------------------
create table public.properties (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  description text not null,
  listing_type listing_type not null,
  property_type property_type not null,
  status property_status not null default 'disponible',
  price numeric(14,2) not null,
  city text not null,
  neighborhood text not null,
  address text not null,
  latitude double precision,
  longitude double precision,
  surface_area numeric(10,2) not null,
  bedrooms int not null default 0,
  bathrooms int not null default 0,
  floor int,
  year_built int,
  has_parking boolean not null default false,
  has_elevator boolean not null default false,
  has_pool boolean not null default false,
  has_garden boolean not null default false,
  is_furnished boolean not null default false,
  is_featured boolean not null default false,
  images text[] not null default '{}',
  amenities text[] not null default '{}',
  agent_id uuid references public.users(id) on delete set null,
  agent_name text,
  agent_phone text,
  agent_whatsapp text,
  views_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_properties_listing_type on public.properties(listing_type);
create index idx_properties_property_type on public.properties(property_type);
create index idx_properties_city on public.properties(city);
create index idx_properties_price on public.properties(price);
create index idx_properties_status on public.properties(status);
create index idx_properties_featured on public.properties(is_featured);

-- ---------------------------------------------------------
-- TESTIMONIALS
-- ---------------------------------------------------------
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_role text,
  client_avatar text,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  city text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- BLOG POSTS
-- ---------------------------------------------------------
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image text,
  category text not null,
  author_id uuid references public.users(id) on delete set null,
  author_name text,
  author_avatar text,
  read_time int not null default 5,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_blog_posts_published on public.blog_posts(is_published, published_at desc);

-- ---------------------------------------------------------
-- LEADS (property inquiries, visit requests, evaluations, callbacks)
-- ---------------------------------------------------------
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text,
  phone text not null,
  message text,
  source lead_source not null,
  property_id uuid references public.properties(id) on delete set null,
  status lead_status not null default 'nouveau',
  assigned_to uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_leads_status on public.leads(status);
create index idx_leads_source on public.leads(source);
create index idx_leads_created on public.leads(created_at desc);

-- ---------------------------------------------------------
-- CONTACT MESSAGES (general contact form)
-- ---------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- PROPERTY VIEWS (lightweight analytics log)
-- ---------------------------------------------------------
create table public.property_views (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references public.properties(id) on delete cascade,
  viewed_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_properties_updated_at before update on public.properties
  for each row execute function public.set_updated_at();
create trigger trg_users_updated_at before update on public.users
  for each row execute function public.set_updated_at();
create trigger trg_blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();
create trigger trg_leads_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------
-- Auto-create a public.users profile row on signup
-- ---------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, full_name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), new.email, 'agent');
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------
alter table public.users enable row level security;
alter table public.properties enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;
alter table public.property_views enable row level security;

-- Public (anon + authenticated) can read published/public-facing data
create policy "Public can view properties" on public.properties
  for select using (true);

create policy "Public can view published testimonials" on public.testimonials
  for select using (is_published = true);

create policy "Public can view published blog posts" on public.blog_posts
  for select using (is_published = true);

create policy "Anyone can log a property view" on public.property_views
  for insert with check (true);

-- Anyone (including anonymous visitors) can submit leads & contact messages
create policy "Anyone can submit a lead" on public.leads
  for insert with check (true);

create policy "Anyone can submit a contact message" on public.contact_messages
  for insert with check (true);

-- Authenticated staff (admin/agent/editeur) manage everything
create policy "Staff can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Staff can manage properties" on public.properties
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Staff can manage testimonials" on public.testimonials
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Staff can manage blog posts" on public.blog_posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Staff can view and manage leads" on public.leads
  for select using (auth.role() = 'authenticated');
create policy "Staff can update leads" on public.leads
  for update using (auth.role() = 'authenticated');

create policy "Staff can view contact messages" on public.contact_messages
  for select using (auth.role() = 'authenticated');
create policy "Staff can update contact messages" on public.contact_messages
  for update using (auth.role() = 'authenticated');

create policy "Staff can view property analytics" on public.property_views
  for select using (auth.role() = 'authenticated');

-- ---------------------------------------------------------
-- Convenience view: dashboard stats
-- ---------------------------------------------------------
create or replace view public.dashboard_stats as
select
  (select count(*) from public.properties) as total_properties,
  (select count(*) from public.properties where status = 'disponible') as available_properties,
  (select count(*) from public.properties where listing_type = 'vente') as for_sale,
  (select count(*) from public.properties where listing_type = 'location') as for_rent,
  (select count(*) from public.leads where status = 'nouveau') as new_leads,
  (select count(*) from public.leads) as total_leads,
  (select count(*) from public.contact_messages where is_read = false) as unread_messages;
