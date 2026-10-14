-- =====================================================================
-- UVM Consulting Group – Seite "Aktuelles"
-- Datenbank-Schema und Zugriffsregeln für Supabase
--
-- Einmal komplett im Supabase SQL-Editor ausführen (Run).
-- Kann gefahrlos mehrfach ausgeführt werden.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Redakteure: Wer darf Beiträge anlegen, ändern und löschen?
--    Nur E-Mail-Adressen, die hier stehen UND in Supabase unter
--    Authentication > Users ein Konto haben, dürfen schreiben.
-- ---------------------------------------------------------------------
create table if not exists public.aktuelles_redakteure (
  email       text primary key,
  name        text,
  erstellt_am timestamptz not null default now()
);

-- Erste Redakteure. Weitere können später über die Verwaltungsseite
-- oder hier per INSERT ergänzt werden.
insert into public.aktuelles_redakteure (email, name) values
  ('eberhard.steiner@uvm-institut.de', 'Prof. Dr. Eberhard Steiner')
on conflict (email) do nothing;

-- ---------------------------------------------------------------------
-- 2. Beiträge
-- ---------------------------------------------------------------------
create table if not exists public.aktuelles (
  id              uuid primary key default gen_random_uuid(),
  datum           date not null default current_date,
  typ             text not null
                  check (typ in ('linkedin','podcast','buch','artikel','video','veranstaltung','link')),
  titel           text not null check (char_length(titel) between 1 and 200),
  kurztext        text check (kurztext is null or char_length(kurztext) <= 2000),
  url             text check (url is null or url ~* '^https?://'),
  bild_url        text check (bild_url is null or bild_url ~* '^https?://'),
  einbettung_url  text check (einbettung_url is null or einbettung_url ~* '^https://'),
  veroeffentlicht boolean not null default true,
  erstellt_von    text,
  erstellt_am     timestamptz not null default now(),
  aktualisiert_am timestamptz not null default now()
);

create index if not exists aktuelles_datum_idx on public.aktuelles (datum desc);
create index if not exists aktuelles_typ_idx   on public.aktuelles (typ);

-- Zeitstempel bei Änderung automatisch setzen
create or replace function public.aktuelles_set_aktualisiert_am()
returns trigger
language plpgsql
as $$
begin
  new.aktualisiert_am := now();
  return new;
end;
$$;

drop trigger if exists aktuelles_aktualisiert_am on public.aktuelles;
create trigger aktuelles_aktualisiert_am
  before update on public.aktuelles
  for each row execute function public.aktuelles_set_aktualisiert_am();

-- ---------------------------------------------------------------------
-- 3. Prüffunktion: Ist der angemeldete Nutzer ein Redakteur?
--    Wird von den Zugriffsregeln und von der Verwaltungsseite benutzt.
-- ---------------------------------------------------------------------
create or replace function public.ist_redakteur()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.aktuelles_redakteure r
    where lower(r.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.ist_redakteur() from public;
grant execute on function public.ist_redakteur() to anon, authenticated, service_role;

-- ---------------------------------------------------------------------
-- 4. Zugriffsrechte (GRANTs) – seit Supabase-Umstellung Pflicht
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;

grant select on public.aktuelles to anon;
grant select, insert, update, delete on public.aktuelles to authenticated, service_role;

revoke all on public.aktuelles_redakteure from anon;
grant select, insert, update, delete on public.aktuelles_redakteure to authenticated, service_role;

-- ---------------------------------------------------------------------
-- 5. Row Level Security: Die Datenbank selbst setzt die Regeln durch.
--    Lesen: jeder, aber nur veröffentlichte Beiträge.
--    Schreiben: nur angemeldete Redakteure.
-- ---------------------------------------------------------------------
alter table public.aktuelles enable row level security;
alter table public.aktuelles_redakteure enable row level security;

drop policy if exists "aktuelles_lesen_oeffentlich" on public.aktuelles;
create policy "aktuelles_lesen_oeffentlich"
  on public.aktuelles for select
  to anon, authenticated
  using (veroeffentlicht = true or public.ist_redakteur());

drop policy if exists "aktuelles_anlegen_redakteur" on public.aktuelles;
create policy "aktuelles_anlegen_redakteur"
  on public.aktuelles for insert
  to authenticated
  with check (public.ist_redakteur());

drop policy if exists "aktuelles_aendern_redakteur" on public.aktuelles;
create policy "aktuelles_aendern_redakteur"
  on public.aktuelles for update
  to authenticated
  using (public.ist_redakteur())
  with check (public.ist_redakteur());

drop policy if exists "aktuelles_loeschen_redakteur" on public.aktuelles;
create policy "aktuelles_loeschen_redakteur"
  on public.aktuelles for delete
  to authenticated
  using (public.ist_redakteur());

drop policy if exists "redakteure_lesen_redakteur" on public.aktuelles_redakteure;
create policy "redakteure_lesen_redakteur"
  on public.aktuelles_redakteure for select
  to authenticated
  using (public.ist_redakteur());

drop policy if exists "redakteure_anlegen_redakteur" on public.aktuelles_redakteure;
create policy "redakteure_anlegen_redakteur"
  on public.aktuelles_redakteure for insert
  to authenticated
  with check (public.ist_redakteur());

drop policy if exists "redakteure_loeschen_redakteur" on public.aktuelles_redakteure;
create policy "redakteure_loeschen_redakteur"
  on public.aktuelles_redakteure for delete
  to authenticated
  using (public.ist_redakteur() and lower(email) <> lower(coalesce(auth.jwt() ->> 'email', '')));

-- Fertig. Prüfung: Die folgende Abfrage muss eine Zeile liefern.
select email, name from public.aktuelles_redakteure;
