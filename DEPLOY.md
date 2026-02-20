# RentBike — O que você precisa para colocar no ar

## Resumo rápido

1. **Supabase** — sim, precisa. É onde ficam os aluguéis (nome, telefone, status do pagamento).
2. **Mercado Pago** — precisa. Para receber PIX/cartão e atualizar o status no Supabase.
3. **Vercel** — para hospedar o site e a API (ou outro host que você preferir).

---

## Passo a passo

### 1. Supabase (banco de dados)

- Crie uma conta em [supabase.com](https://supabase.com) e um projeto.
- No menu **SQL Editor**, rode o script que está em `supabase-schema.sql` (ou o que está no README).
- Em **Settings → API** anote:
  - **Project URL** → vai em `SUPABASE_URL`
  - **service_role** (secret) → vai em `SUPABASE_SERVICE_KEY` (não use a key “anon” no backend).

**Precisa do Supabase?** Sim, para gravar cada aluguel (quem alugou, telefone, status do pagamento). Sem ele o checkout até abre, mas nada fica salvo.

---

### 2. Mercado Pago (pagamentos)

- Crie uma conta em [mercadopago.com.br](https://mercadopago.com.br) (desenvolvedor).
- Em **Suas integrações → Credenciais**, pegue o **Access Token** (produção ou teste).
- Coloque esse token em `MERCADOPAGO_ACCESS_TOKEN`.

Depois do deploy, em **Webhooks / Notificações**, configure:

- URL: `https://SEU-DOMINIO.vercel.app/api/webhook`
- Eventos: pagamentos

Assim o Mercado Pago avisa quando o pagamento for aprovado e o status é atualizado no Supabase.

---

### 3. Variáveis de ambiente

**No seu computador (desenvolvimento):**

- Copie `.env.example` para `.env`.
- Preencha no `.env`:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_KEY`
  - `MERCADOPAGO_ACCESS_TOKEN`
  - `FRONTEND_URL` = `http://localhost:5173` (para testes locais)

**Na Vercel (produção):**

- No projeto da Vercel: **Settings → Environment Variables**.
- Adicione as mesmas variáveis, mas com:
  - `FRONTEND_URL` = a URL do seu site (ex: `https://rentbike.vercel.app`).
- Não precisa de `VITE_API_URL` se o front e a API estiverem no mesmo domínio (Vercel faz o proxy de `/api`).

---

### 4. Deploy na Vercel

1. Crie um repositório no GitHub (ou GitLab) e faça o push do projeto (veja commit/push abaixo).
2. Em [vercel.com](https://vercel.com), **Add New Project** e importe esse repositório.
3. Deixe o **Build Command** como `npm run build` e **Output Directory** como `dist`.
4. Configure as variáveis de ambiente (item 3).
5. Dê **Deploy**. A Vercel vai buildar o front e expor a API em `/api/*`.

Depois do primeiro deploy, use a URL que a Vercel te der em:
- `FRONTEND_URL` (e atualize no Supabase/Mercado Pago se precisar).
- Webhook do Mercado Pago: `https://SUA-URL.vercel.app/api/webhook`.

---

### 5. Contatos (WhatsApp e Instagram)

No código, troque os placeholders:

- **WhatsApp:** em `src/components/Footer.jsx` e `src/components/WhatsAppButton.jsx` → constante `WHATSAPP_NUMBER` (ex: `5571999999999`).
- **Instagram:** em `src/components/Footer.jsx` → constante `INSTAGRAM` (link do perfil).

---

## Checklist antes de “estar no ar”

- [ ] Projeto Supabase criado e tabela `rentals` criada (script em `supabase-schema.sql`).
- [ ] `SUPABASE_URL` e `SUPABASE_SERVICE_KEY` no `.env` (local) e na Vercel.
- [ ] Conta Mercado Pago com Access Token em `MERCADOPAGO_ACCESS_TOKEN`.
- [ ] Webhook do Mercado Pago apontando para `https://SEU-DOMINIO/api/webhook`.
- [ ] `FRONTEND_URL` na Vercel = URL final do site.
- [ ] WhatsApp e Instagram atualizados no código.
- [ ] Deploy na Vercel feito e teste de um pagamento (modo teste do MP).

Se algo falhar, confira o README e os logs da Vercel (Functions) e do Mercado Pago (notificações/webhooks).
