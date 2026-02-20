-- Migração: marcação por bike + 3 tipos de aluguel (mensal, diária, avulso)
-- Execute no SQL Editor do Supabase DEPOIS do schema inicial.

-- 1) Tabela de bikes (4 bikes)
create table if not exists bikes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

insert into bikes (id, name) values
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Bike 1'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Bike 2'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Bike 3'),
  ('00000000-0000-0000-0000-000000000004'::uuid, 'Bike 4')
on conflict (id) do nothing;

-- 2) Novas colunas em rentals (se já existir a tabela)
alter table rentals add column if not exists bike_id uuid references bikes(id);
alter table rentals add column if not exists rental_type text not null default 'avulso';
alter table rentals add column if not exists start_at timestamptz;
alter table rentals add column if not exists end_at timestamptz;

comment on column rentals.rental_type is 'avulso | diaria | mensal';
comment on column rentals.start_at is 'Horário de entrega (início do aluguel)';
comment on column rentals.end_at is 'Horário de devolução';

-- Índice para checagem rápida de disponibilidade
create index if not exists idx_rentals_bike_dates on rentals(bike_id, start_at, end_at);
create index if not exists idx_rentals_dates on rentals(start_at, end_at);
