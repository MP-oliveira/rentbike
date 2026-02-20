# RentBike Lauro de Freitas

Landing page e checkout para aluguel de bicicletas em Lauro de Freitas - BA.  
**R$25 por 30 minutos.** Stack: React + Vite, Node + Express, Supabase, Mercado Pago.

## Estrutura

- **Frontend:** `src/` — React, CSS por componente, mobile-first
- **Backend:** `server/` — Express (create-payment, webhook)
- **Vercel:** `api/index.js` — serverless que usa o mesmo app Express

## Pré-requisitos

- Node 18+
- Conta [Supabase](https://supabase.com) e [Mercado Pago](https://mercadopago.com.br)

## Banco (Supabase)

No SQL Editor do Supabase, execute:

```sql
create table if not exists rentals (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  user_phone text not null,
  payment_method text not null,
  payment_status text not null default 'pending',
  amount numeric not null,
  created_at timestamptz not null default now()
);
```

Use a **service_role key** no backend; ela ignora RLS. Se ativar RLS na tabela, crie uma policy que permita acesso ao backend.

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

| Variável | Descrição |
|----------|-----------|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | Service role key (Settings → API) |
| `MERCADOPAGO_ACCESS_TOKEN` | Token de produção ou teste (Mercado Pago) |
| `FRONTEND_URL` | URL do front (ex: `https://seu-app.vercel.app`) — usado no redirect após pagamento |
| `PORT` | Porta do servidor (opcional, default 3001) |

No frontend (Vercel ou `.env.local`):

| Variável | Descrição |
|----------|-----------|
| `VITE_API_URL` | Deixe vazio em dev (proxy no Vite). Em produção: URL do app (ex: `https://seu-app.vercel.app`) |

## Rodar localmente

```bash
npm install
cp .env.example .env
# Edite .env com suas chaves

# Terminal 1 – API
npm run server

# Terminal 2 – Front
npm run dev
```

Ou em um único terminal: `npm run dev:all`

Acesse: [http://localhost:5173](http://localhost:5173). O front faz proxy de `/api` para `http://localhost:3001`.

## Deploy (Vercel)

1. Conecte o repositório na Vercel.
2. Em **Settings → Environment Variables** adicione todas as variáveis do `.env` (incluindo `SUPABASE_*` e `MERCADOPAGO_ACCESS_TOKEN`).
3. Defina `FRONTEND_URL` como a URL do deploy (ex: `https://rentbike.vercel.app`).
4. Deploy. O build gera o front em `dist` e a rota `/api/*` é atendida pela serverless em `api/index.js`.

## Webhook Mercado Pago

No painel do Mercado Pago, configure a URL de notificação para:

- Produção: `https://seu-dominio.vercel.app/api/webhook`
- Método: POST

Assim o status do pagamento (approved/rejected) é atualizado na tabela `rentals`.

## Contatos (placeholder)

Edite no código:

- **WhatsApp:** `WHATSAPP_NUMBER` em `Footer.jsx` e `WhatsAppButton.jsx` (ex: `5571999999999`).
- **Instagram:** constante `INSTAGRAM` em `Footer.jsx`.

---

© RentBike Lauro · Lauro de Freitas - BA
