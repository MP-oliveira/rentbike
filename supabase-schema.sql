-- Tabela de aluguéis para o RentBike Lauro (Supabase)
-- Execute no SQL Editor do seu projeto Supabase

create table if not exists rentals (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  user_phone text not null,
  payment_method text not null,
  payment_status text not null default 'pending',
  amount numeric not null,
  created_at timestamptz not null default now()
);

comment on table rentals is 'Aluguéis de bicicleta - RentBike Lauro de Freitas';
comment on column rentals.payment_status is 'pending | approved | rejected';
